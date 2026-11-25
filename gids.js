"use strict";

const form = document.querySelector("form");
const isRoughness = form.id === "ra";
const fields = [...form.querySelectorAll("input")];
const result = document.querySelector("#value");
const feedback = document.querySelector("#feedback");
const canvas = document.querySelector("#chart");
const format = new Intl.NumberFormat("nl-BE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const smallFormat = new Intl.NumberFormat("nl-BE", { maximumFractionDigits: 6 });

function readValue(field) {
  const raw = field.value.trim().replace(",", ".");
  return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw) ? Number(raw) : NaN;
}

function update() {
  const values = fields.map(readValue);
  const validFields = values.map((value, index) => {
    if (!Number.isFinite(value) || value < 0) {
      return false;
    }
    if (isRoughness || index === 1) {
      return value > 0;
    }
    return index === 0 || Number.isSafeInteger(value);
  });
  fields.forEach((field, index) => {
    field.setAttribute("aria-invalid", String(!validFields[index]));
  });

  let total;
  let answer;
  if (validFields.every(Boolean)) {
    const [first, second, parts] = values;
    total = isRoughness ? 1000 * first ** 2 / (32 * second) : first * (second / 60);
    answer = isRoughness || parts === 0 ? total : total / parts;
  }
  if (!Number.isFinite(answer)) {
    result.value = "—";
    feedback.textContent = validFields.every(Boolean)
      ? "Deze waarden vallen buiten het bereik van de berekening."
      : isRoughness
        ? "Vul voor voeding en radius een getal groter dan nul in."
        : "Vul een positief tijdvak, een vermogen vanaf nul en een geheel stukaantal in.";
    draw(null);
    return;
  }

  const asText = (value) => {
    if (value > 0 && value < 0.01) {
      return value < 0.000001 ? "< 0,000001" : smallFormat.format(value);
    }
    return format.format(value);
  };
  if (isRoughness) {
    result.value = asText(answer) + " µm";
    feedback.textContent = "Geometrische schatting voor deze voeding en neusradius.";
  } else {
    result.value = values[2] === 0 ? "—" : asText(answer) + " kWh";
    const totalText = "Totaal in dit venster: " + asText(total) + " kWh.";
    feedback.textContent = values[2] === 0 ? totalText + " Er zijn geen goede stukken." : totalText;
  }
  draw({ values, answer });
}

function draw(example) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  ctx.scale(scale, scale);
  ctx.font = "13px system-ui";
  ctx.fillStyle = "#29473b";

  if (!example) {
    ctx.fillText("Vul de invoer aan om het schema te zien.", 4, height / 2);
    return;
  }

  ctx.strokeStyle = "#195b48";
  ctx.lineWidth = 2;
  if (isRoughness) {
    const span = (width - 26) / 4;
    const rise = Math.min(60, 18 + 12 * Math.log1p(example.answer));
    ctx.beginPath();
    ctx.moveTo(13, 110 - rise);
    for (let index = 0; index < 4; index++) {
      const start = 13 + index * span;
      ctx.quadraticCurveTo(start + span / 2, 110 + rise, start + span, 110 - rise);
    }
    ctx.stroke();
    ctx.fillText("Oppervlakteprofiel", 13, 22);
    ctx.beginPath();
    ctx.moveTo(13, 128);
    ctx.lineTo(13 + span, 128);
    ctx.stroke();
    ctx.fillText("1 omwenteling · " + fields[0].value.trim() + " mm", 13, 154);
    return;
  }

  const [power, duration] = example.values;
  const left = 18;
  const right = width - 14;
  const baseline = 145;
  const top = power === 0 ? baseline : 58;
  ctx.fillStyle = "#a3c9b1";
  ctx.fillRect(left, top, right - left, baseline - top);
  ctx.beginPath();
  ctx.moveTo(left, 36);
  ctx.lineTo(left, baseline);
  ctx.lineTo(right, baseline);
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.stroke();
  ctx.fillStyle = "#29473b";
  ctx.fillText(fields[0].value.trim() + " kW gemiddeld", left + 6, top - 10);
  ctx.fillText("0 min", left, 167);
  ctx.textAlign = "right";
  ctx.fillText(format.format(duration) + " min", right, 167);
}

form.addEventListener("input", update);
form.addEventListener("submit", (event) => event.preventDefault());
new ResizeObserver(update).observe(canvas);
update();
