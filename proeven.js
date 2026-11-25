"use strict";

const lab = document.querySelector("[data-model]");
const form = lab.querySelector("form");
const fields = [...form.elements];
const chart = lab.querySelector("canvas");
const fmt = n => n.toLocaleString("nl-BE", { maximumFractionDigits: 2 });
const samples = values => values.map((v, i) => [String(i + 1), v]);

// Each trial supplies labelled observations, a unit and an interpretation.
const trials = {
  doorbuiging(a, b) {
    const ratio = (b / a) ** 3;
    return [[["Eerste", 100], ["Tweede", ratio * 100]], "% van eerste",
      "Tweede uitsteek: " + fmt(ratio * 100) + "% van de eerste balkdoorbuiging.",
      "Relatieve voorspelling bij gelijke kracht, kerndiameter en materiaalmodulus."];
  },
  machinebenutting(state) {
    const cutting = state === "Snijden" ? 48 : 42;
    return [[["Snijden", cutting], ["Spoelen", 48 - cutting], ["Stilstand", 12]], "min",
      fmt(cutting / 60 * 100) + "% snijtijd in dit uur.",
      "Tijdlijn: eerst 42 minuten snijden, daarna 6 minuten " + state.toLowerCase() + ", tot slot 12 minuten stilstand. Voor volledige OEE ontbreken onder meer kwaliteitsgegevens."];
  },
  chatter(rpm, teeth) {
    const frequency = rpm * teeth / 60;
    return [[[400, 1], [730, 0.7], [800, 0.45]], "relatieve amplitude",
      "Tandpassage: " + fmt(frequency) + " Hz.",
      "Fictieve pieken op 400, 730 en 800 Hz. De stippellijnen markeren de eerste drie tandharmonischen binnen 0–1000 Hz.", frequency];
  },
  slijtage(time, measured) {
    const points = [["20 min", 0.06], ["40 min", 0.12], ["60 min", 0.19]];
    const predicted = points.find(row => row[0] === time + " min")[1];
    const diff = measured - predicted;
    points.push(["Inspectie " + time + " min", measured]);
    return [points, "mm VB", "Gemeten min voorspeld: " + fmt(diff) + " mm.",
      "De eerste drie balken tonen de voorspelling. Vergelijk het inspectiepunt met de voorspelling op hetzelfde tijdstip."];
  },
  afwijkingsdetectie(cycle, limit) {
    const values = cycle === "A" ? [2, 2.1, 1.9, 2, 2.1] : [2, 2.1, 2.4, 2.1, 2];
    const hits = values.filter(v => Math.abs(v - 2) / 0.1 > limit + 1e-9).length;
    return [samples(values), "kW", hits + " van 5 samples buiten de meldgrens.",
      "Vergelijk dezelfde programmafase. De melding is aanleiding om het tijdvak terug te kijken."];
  },
  machineconditie(series) {
    const comparable = series.startsWith("Vast");
    const values = comparable ? [2, 2.1, 2.4, 3] : [2, 2.4, 2.8, 3];
    return [samples(values), "mm/s RMS", "Eerste tot laatste proefloop: +50%.",
      comparable ? "Herhaal de vaste proefloop en controleer montage en onderhoudshistorie." : "Ook het toerental steeg. Herhaal bij gelijk toerental om de conditie te beoordelen."];
  },
  materiaalvariatie(tool) {
    const fresh = tool.startsWith("Verse");
    const b = fresh ? [226, 230, 234] : [247, 250, 253];
    return [[["A1", 196], ["A2", 200], ["A3", 204], ...b.map((v, i) => ["B" + (i + 1), v])], "N",
      "Gemiddelde batch B: " + (fresh ? "230 N (+15%)" : "250 N (+25%)") + " tegenover 200 N bij A.",
      fresh ? "Controleer het verschil op andere stukken en met een onafhankelijke materiaalinspectie." : "Batch én snijkant verschillen. Herhaal met vergelijkbare slijtage."];
  }
};

function updateTrial() {
  const result = lab.querySelector("output");
  const caption = lab.querySelector("figcaption");
  const rect = chart.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  chart.width = Math.round(rect.width * scale);
  chart.height = Math.round(rect.height * scale);
  const ctx = chart.getContext("2d");
  ctx.scale(scale, scale);
  if (!form.checkValidity()) {
    result.value = "Controleer de invoer.";
    caption.textContent = fields.filter(f => !f.validity.valid)
      .map(f => f.labels[0].textContent + ": " + f.min + " tot " + f.max).join(". ");
    return;
  }
  const args = fields.map(f => f.type === "number" ? f.valueAsNumber : f.value);
  const [rows, unit, answer, note, frequency] = trials[lab.dataset.model](...args);
  result.value = answer;
  caption.textContent = note;
  chart.setAttribute("aria-label", rows.map(([label, v]) => label + ": " + fmt(v) + " " + unit).join(", "));
  const width = rect.width;
  ctx.font = "13px system-ui";
  ctx.fillStyle = "#29473b";
  ctx.fillText(unit, 5, 16);
  if (frequency !== undefined) {
    const x = hz => 10 + hz / 1000 * (width - 54);
    for (const [hz, amplitude] of rows) {
      ctx.fillStyle = "#195b48";
      ctx.fillRect(x(hz), 145 - 95 * amplitude, 4, 95 * amplitude);
      ctx.fillText(hz + " Hz", x(hz) - 12, 138 - 95 * amplitude);
    }
    ctx.strokeStyle = "#875324";
    ctx.setLineDash([4, 4]);
    for (let k = 1; k <= 3 && k * frequency <= 1000; k++) {
      ctx.beginPath();
      ctx.moveTo(x(k * frequency), 22);
      ctx.lineTo(x(k * frequency), 148);
      ctx.stroke();
    }
    ctx.fillText("0 Hz", 5, 170);
    ctx.fillText("1000 Hz", width - 53, 170);
    return;
  }
  const peak = Math.max(...rows.map(row => row[1]), 0.001);
  const step = Math.min(32, 153 / rows.length);
  rows.forEach(([label, v], i) => {
    const y = 32 + i * step;
    const left = Math.min(width * 0.37, 115);
    const length = v / peak * Math.max(1, width - left - 73);
    ctx.fillStyle = "#29473b";
    ctx.fillText(label, 4, y + 10, left - 8);
    ctx.fillStyle = "#195b48";
    ctx.fillRect(left, y, length, 11);
    ctx.fillText(fmt(v), left + length + 5, y + 10, 67);
  });
}

form.addEventListener("input", updateTrial);
form.addEventListener("submit", event => event.preventDefault());
new ResizeObserver(updateTrial).observe(chart);
updateTrial();

