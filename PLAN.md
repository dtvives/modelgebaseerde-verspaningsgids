# Van machinevraag naar bruikbaar model

Ontwerpvoorstel voor taak 1 · 25 november 2026

## Wat de eerste versie moet kunnen

Een procesingenieur opent het overzicht met een vraag over zijn machine. Binnen twee klikken ziet hij welk model past, welke informatie hij al heeft, wat hij nog moet meten en hoe hij het resultaat kan controleren. Een nieuwe collega kan hetzelfde pad volgen zonder kennis van TwinCAT of COOCK.

Begin met een statische Nederlandstalige HTML-gids. Elke modelpagina krijgt een eigen deelbare URL en werkt ook offline. Er is voor dit gebruik geen server nodig. Kleine interacties, zoals filteren of een voorbeeldwaarde wijzigen, kunnen later in de pagina zelf. Een webapp met opslag wordt pas interessant als gebruikers machineprofielen of eigen meetreeksen willen bewaren.

## Wat de eerdere pogingen opleveren

| Bron | Wat gebruiken we? |
| --- | --- |
| [Formuleoverzicht](../Resources/Formules/coock_formulas.md) en het bijbehorende COOCK-script | De eerdere inventaris levert de modelnamen, vergelijkingen en een eerste beoordeling voor Buyse. De rangorde voor die machine is geen algemene rangorde. |
| [Negen Python-modelmodules](../Resources/Formules/coock/src/models) | Per model de werkelijk gebruikte invoer, berekende grootheden, eenheden, terugvalwaarden en waarschuwingen nakijken. Zo neemt de Ra-module zonder trillingssensor een neutrale dynamische correctie aan. |
| [SirrisLib](../PLC/TestCoockMatur/TestCoockMaturiteit/SirrisLib/README.md) | De PLC bevat afgebakende bouwstenen voor draaien, frezen, energie, levensduur, doorbuiging en statistiek. Een bouwsteen kan in meerdere modellen terugkomen. De meegeleverde tests geven rekenvoorbeelden. Volgens de projectverantwoordelijke is de bibliotheek nog niet in praktijk getest of gebruikt. |
| [Bestaande Ra-toepassing](../PLC/TestCoockMatur/TestCoockMaturiteit/POUs/Models%20Sirris) | Afzonderlijk spoor om te onderzoeken hoe een uitkomst aan de PLC-toepassing wordt aangeboden. De aanwezigheid van deze code bewijst geen praktijkvalidatie van SirrisLib. |
| Eerdere chat *Locate Sirris formulas analysis* en de Buyse-architectuurnota van 18 juni in de oudere projectmap | Herbruikbaar onderscheid tussen trilling, stroom, CNC-context, gereedschapsgegevens en onafhankelijke referentiemetingen. Gebruik Buyse als gedateerd voorbeeld, niet als beschrijving van elke installatie. |

Een concreet verschil dat zichtbaar moet blijven: de Python-Ra-module beschrijft voor frezen een omzetting via tandenaantal. De PLC heeft een afzonderlijke benadering voor voedingssporen bij frezen op basis van voeding per tand. Ook de ideale geometrische draaiuitkomst en de gecorrigeerde Python-voorspelling beantwoorden verschillende vragen. Laat Sirris vóór publicatie per variant doel, vergelijking en geldigheidsgebied bevestigen.

## Overzichtspagina

Bovenaan staat **“Wat wil je aan je machine verbeteren?”** Daaronder staan negen korte vragen, gegroepeerd in kwaliteit, procesbewaking en productie. Elke kaart toont alleen de vraag, het verwachte resultaat en de belangrijkste vereiste. Wie de formulenaam kent, kan ook rechtstreeks zoeken op bijvoorbeeld Ra, VB of OEE.

| Ingang op het overzicht | Eerste gegevens om naar te vragen | Wat helpt het antwoord te toetsen? |
| --- | --- | --- |
| Hoe glad kan ik draaien? · Ra | Voeding per omwenteling en neusradius | Ruwheidsmeting op hetzelfde oppervlak |
| Wanneer is een snijkant aan vervanging toe? · slijtage/standtijd | Snijkant-ID, snijtijd, snijcondities en passende coëfficiënten | Slijtagemeting of onderbouwde wisselreden |
| Hoeveel kan het gereedschap doorbuigen? | Kracht of krachtinschatting, geometrie, uitsteek en stijfheid | Maatcontrole bij bekende opspanning |
| Is deze snede stabiel? · chatter | Voor frequentieanalyse een snelle trillingsopname, toerental en bij frezen tandenaantal | Vergelijkbare stabiele snede en bevestigde chatter |
| Waar verliezen we productietijd? · OEE | Geplande tijd, toestanden, ideale cyclustijd, totaalaantal en goede stukken | Productielog en kwaliteitsregistratie |
| Hoeveel energie kost een stuk? | Actief vermogen of energieteller, tijdvenster en stukregistratie | Zelfde systeemgrens en vergelijkbare cyclus |
| Verandert de machinetoestand? · onderhoud | Trillingstrend bij vergelijkbaar toerental, belasting en montage | Inspectie of gedocumenteerde ingreep |
| Gedraagt een materiaalbatch zich anders? | Batch-ID, kracht- of akoestische-emissiesignalen en vergelijkbare snijcondities | Materiaalreferentie en meerdere stukken per batch |
| Wijkt een cyclus af van normaal? | Geldig signaal en een representatieve referentiereeks per bedrijfstoestand | Bekende normale en afwijkende cycli |

Deze tabel helpt kiezen. De exacte vereisten horen bij de gekozen variant. Een tweede ingang **“Ik heb deze gegevens”** kan dezelfde kaarten filteren. Toon daarbij concreet wat ontbreekt, bijvoorbeeld “Voor volledige OEE ontbreken goede en afgekeurde stukken”. Een sensorfilter alleen zou de indruk wekken dat de hardware volstaat.

## Opbouw van één modelpagina

1. **Beslissing en uitkomst.** Eén machinevraag, één zin uitleg en één uitkomst met eenheid. Vermeld voor welke bewerking de gekozen variant bedoeld is.
2. **Zo kom je aan de gegevens.** Geef iedere invoer een eigen rij met grootheid, eenheid, mogelijke bron, manier van verkrijgen en rol. Maak zichtbaar of een waarde vereist is, alleen de schatting verfijnt of dient als onafhankelijke controle. Vermeld bij automatische bronnen onder welke voorwaarden ze beschikbaar zijn.
3. **Van invoer naar resultaat.** Toon een klein leesbaar schema: bron → invoer → berekening → resultaat. Zet een eventuele controlemeting op een aparte regel onder het resultaat. Gebruik tekstlabels zodat kleur nooit de enige informatiedrager is.
4. **Probeer een voorbeeld.** Eén doorgerekende voorbeeldbewerking met de gebruikte waarden, de uitkomst en een zin over wat de gebruiker daaruit kan besluiten. Toon wat er gebeurt bij ontbrekende invoer of onbekende eenheden.
5. **Controle op eigen machine.** Beschrijf één uitvoerbare vergelijking, welke gegevens bij hetzelfde stuk moeten horen en wanneer de uitkomst onvoldoende betrouwbaar is om instellingen te wijzigen.
6. **Technische verdieping.** Geef per model de vergelijking, eenheden, aannames en grenzen. Leg een tussenstap zoals netto snijvermogen op de modelpagina uit wanneer de gebruiker die nodig heeft om de juiste invoer te kiezen. Een COOCK-voorbeeld kan illustreren hoe die invoer in één meetopstelling wordt verkregen.

### Zo zou de eerste detailpagina lezen

**Welke theoretische oppervlakteruwheid geeft deze voeding bij draaien?** De ideale geometrische benadering schat het voedingsspoor van een snijplaat met gekende neusradius.

| Gegeven | Hoe kom ik eraan? | Rol |
| --- | --- | --- |
| Voeding, mm/omw | Automatisch uit de CNC als modus en eenheid bevestigd zijn. Anders uit programma of instelblad overnemen. | Vereist voor de berekening |
| Neusradius, mm | Uit gereedschapsdatabase of door de operator van de snijplaatfiche overnemen. | Vereist voor de berekening |
| Ra van het gedraaide stuk, µm | Op hetzelfde bewerkte oppervlak meten met een ruwheidsmeter. | Onafhankelijke controle |

**Rekenvoorbeeld.** Bij 0,20 mm/omw en 0,80 mm neusradius geeft de PLC-formule 1000 × 0,20² / (32 × 0,80) = **1,56 µm**. Hiervoor is geen extra sensor nodig. Een ontbrekende of niet-positieve radius maakt de berekening ongeldig. Trilling en slijtage kunnen het echte oppervlak beïnvloeden. De uitgebreidere Python-variant gebruikt hiervoor correcties. Maak de stap naar eigen meetdata zichtbaar onder de calculator. Gebruik de verdieping voor de extra invoer en aannames. [PLC-formule](../PLC/TestCoockMatur/TestCoockMaturiteit/SirrisLib/Turning/F_SirrisCalcTurningRaIdealUm.TcPOU)

## Inhoud voor de negen modelpagina’s

Deze fiches vormen de inhoudelijke basis voor de HTML-gids. De vraag boven elke fiche wordt de paginatitel. Toon bij elke uitkomst de eenheid en de herkomst: **gemeten**, **berekend uit metingen**, **ingevoerd** of **aangenomen**. Toon een ontbrekend gegeven bij de berekening die het nodig heeft. Zo kan iemand bijvoorbeeld de geometrische ruwheid al berekenen terwijl de correctie voor slijtage nog openstaat. De voorbeelden hieronder zijn illustratief.

### 1. Welke oppervlakteruwheid kan ik verwachten? · Ra

**Doel.** Een voeding of snijplaat kiezen voor een gewenste afwerking. De basisuitkomst is de ideale geometrische Ra in µm. De uitgebreidere voorspelling voegt invloeden van materiaal, slijtage en trilling toe.

| Variant | Invoer en geschikte bron | Hoe tonen we dit? |
| --- | --- | --- |
| Ideaal draaien | Voeding per omwenteling in mm/omw uit CNC of instelblad. Neusradius in mm uit gereedschapsdatabase of snijplaatfiche. Geen extra sensor vereist. | Een profiel met twee opeenvolgende voedingssporen. Laat de gebruiker de voeding verdubbelen en zien dat de theoretische Ra verviervoudigt. Gebruik het doorgerekende voorbeeld hierboven. |
| Voedingssporen bij frezen | Voor de PLC-benadering: voeding per tand in mm/tand en geschikte hoekradius in mm. Bij afleiding uit baanvoeding ook werkelijk toerental en aantal snijdende tanden nodig. | Toon een frees met gemarkeerde tand en hoekradius. Houd het Python-pad voor een scherpe eindmolen apart: dat gebruikt onder meer tandvoeding en diameter. Kies de geometrie vóór de berekening. |
| Gecorrigeerde Ra | Geometrische basis × materiaal-, gereedschaps- en dynamische factor. Materiaalfactor uit proeven of referentiedatabase. Slijtage VB uit inspectie of model 2. Versnellings-RMS uit een gekalibreerde accelerometer op een vastgelegde positie. | Zet geometrische schatting, gecorrigeerde schatting en gemeten Ra naast elkaar. Label neutrale correcties expliciet wanneer een sensor of slijtagemeting ontbreekt. |

**Controle voor de pagina.** Meet Ra met een ruwheidsmeter op dezelfde snede en noteer meetrichting en stuk-ID. In de Python-tak met positieve radius geeft de helper bij invoer in mm rechtstreeks `f²/(32r)` terug, terwijl het resultaat als µm wordt gebruikt. De PLC vermenigvuldigt met 1000. Gebruik het voorbeeld 0,20 en 0,80 als eenhedentest voordat de Python-uitkomst als referentie dient. [Python-bron](../Resources/Formules/coock/src/models/model_ra.py)

#### Wat voegt meten op je eigen machine toe?

Voeding en neusradius geven de ideale geometrische ruwheid bij draaien. De Taylor-vergelijking hoort bij de standtijd van gereedschap. Voor ruwheid gebruikt het uitgebreide Sirris-model de geometrische Ra maal drie factoren voor materiaal, slijtage en trilling.

Stel dat de geometrie **1,56 µm** voorspelt en je bij dezelfde instelling herhaaldelijk ongeveer **2,00 µm** meet. De werkelijke ruwheid ligt dan ongeveer **28% hoger**. De verhouding 1,28 geeft een eerste indicatie van de gezamenlijke correctie voor die proef. Bij neutrale slijtage- en trillingsfactoren van 1 is dit ook de materiaalfactor die bij die meting zou passen.

De Python-code deelt de gemeten Ra door het product van geometrische Ra, slijtagefactor en trillingsfactor. Dat geeft een doelwaarde voor de materiaalfactor. De code stelt de bestaande factor geleidelijk bij richting die doelwaarde. De andere twee factoren volgen uit de geschatte slijtage en de gemeten trilling. De database bewaart de geleerde factor per materiaal. Machine, gereedschap en opspanning kunnen het gemeten verschil mee verklaren. Leg de proefomstandigheden dus vast en toets de factor opnieuw bij een andere opstelling. [Bijstelling uit gemeten Ra](../Resources/Formules/coock/src/models/model_ra.py) · [Opslag per materiaal](../Resources/Formules/coock/src/core/db_writer.py)

#### Hoe pak je dit aan in de praktijk?

1. Kies een terugkerende draaibewerking. Noteer de vereiste Ra, machine, materiaal, snijplaat, neusradius en opspanning.
2. Maak proefstukken bij enkele voedingen binnen het afgesproken werkbereik. Herhaal ook dezelfde instelling om de normale spreiding te zien. Noteer de voeding en geometrische voorspelling per stuk.
3. Meet Ra op hetzelfde bewerkte vlak en in dezelfde meetrichting. Koppel de meting aan het stuk-ID. Registreer de toestand van de snijkant en eventuele trillingsmetingen.
4. Gebruik de eerste reeks om de correctiefactor bij te stellen. Onderzoek grote verschillen tussen herhalingen voordat je één correctie toepast op de hele reeks.
5. Zet de factor vast en toets hem op nieuwe stukken. Vergelijk voor elk stuk de absolute fout in µm van beide voorspellingen ten opzichte van de meting. Zo zie je of kalibratie voor deze bewerking echt helpt.

### 2. Hoe ver is deze snijkant versleten? · VB en standtijd

**Doel.** Een inspectie of wissel plannen. Toon slijtage van de huidige snijkant in mm, verwachte totale standtijd in minuten en resterende tijd als drie afzonderlijke uitkomsten.

| Berekening | Benodigde gegevens en verkrijging |
| --- | --- |
| Slijtage-index uit kracht | Actief vermogen tijdens snijden en een vergelijkbare nullastmeting in W uit vermogensmeter of gevalideerde CNC-vermogenswaarde. Snijsnelheid uit toerental en diameter. Bereken tangentiële kracht. Vergelijk met een scherpe snijkant via referentieproef of Kienzle-referentie `Fc₀ = kc1 × b × h^(1−mc)` met spaanbreedte en -dikte in mm en materiaalcoëfficiënten. Een dynamometer kan de kracht onafhankelijk toetsen. |
| Indirecte VB en slijtageverloop | Zet krachtverhouding `SI_P = Fc/Fc₀` met gekalibreerde slijtagecoëfficiënten om naar VB. De Usui-route schat slijtagegroei uit contactspanning, glijsnelheid, snijtemperatuur en materiaalparameters A/B. Temperatuur en spanning kunnen modelschattingen zijn. Het Kalmanfilter combineert de voorspelling per tijdstap met beschikbare slijtage-informatie en ingestelde ruisvarianties. |
| Taylor-standtijd en resterende tijd | Snijsnelheid, voeding, snedediepte en passende C/n/m/p uit standtijdproeven voor dezelfde combinatie. Registreer snijkant-ID, start, effectieve snijtijd, wisselreden en afgesproken VB-grens. De Python-route kan resterende tijd uit het geschatte verbruikte deel van de toegelaten VB afleiden. |

**Weergave en proef.** Eén tijdlijn per snijkant. Teken de VB-schatting als lijn en inspecties als punten. Een gekalibreerd microscoopbeeld of CutterCamera-beeld met betrouwbare schaal kan een inspectiepunt leveren. Markeer wissels en herstart de toestand per nieuwe snijkant. Bij alleen toerental en gereedschapswissels zijn gebruiksduur en wisselhistorie zichtbaar; de VB-schatting vraagt bijkomende gegevens. [Python-bron](../Resources/Formules/coock/src/models/model_wear.py)

#### Wat voegt meten op je eigen machine toe?

Een foto met gekende schaal koppelt de voorspelde flankslijtage (VB) aan de toestand van een echte snijkant. Stel dat het model na 40 minuten snijtijd 0,12 mm voorspelt en je 0,18 mm meet. De onderschatting is 0,06 mm op dat tijdstip. Herhaalde inspecties tonen of die afwijking groeit met de snijtijd.

#### Hoe aanpakken in de praktijk?

1. Volg enkele snijkanten bij dezelfde bewerking. Geef elke snijkant een ID en registreer effectieve snijtijd, snijcondities en wisselreden.
2. Meet VB op vaste momenten met dezelfde vergroting, schaal en meetdefinitie. Koppel de inspecties aan de voorspellingen. Gebruik een eerste groep snijkanten om de slijtageparameters af te stemmen.
3. Toets op nieuwe snijkanten over hun volledige gebruiksduur. Vergelijk de gemiddelde absolute VB-fout vóór en na afstemming. Voor standtijd vergelijk je ook het voorspelde grensmoment met het interval tussen de laatste inspectie onder en de eerste boven de afgesproken grens.

### 3. Kan doorbuiging mijn maatafwijking verklaren?

**Doel.** Inschatten hoeveel een frees en de machine elastisch meegeven onder radiale belasting. De uitkomst in µm kan naast de maattolerantie worden gezet.

**Invoer.** Meet radiale kracht Fp in N met een dynamometer of schat die uit referentiesnijkracht, radiale krachtverhouding en een eventuele VB-correctie. Leg de herkomst vast: een vermogensmeter levert via snijsnelheid eerst een tangentiële kracht. Uitsteek en kerndiameter in mm komen uit een meting aan de gemonteerde frees of de gereedschapsfiche. Elasticiteitsmodulus komt uit materiaalgegevens. Bepaal de machine-/houderstijfheid in N/mm uit een bekende belasting en gemeten verplaatsing, of markeer de referentiewaarde als aanname.

**Weergave en proef.** Teken frees en houder met krachtpijl en maatlijnen. Toon twee bijdragen: balkdoorbuiging `F L³/(3EI)` en machinedoorbuiging `F/k`. Laat zien dat dubbel zoveel effectieve lengte bij gelijke belasting achtmaal zoveel balkdoorbuiging geeft. De Python-route bepaalt een effectieve lengte; de PLC-functie neemt de opgegeven uitsteek als lengte. Leg de gekozen lengteconventie vast. Vergelijk richting en orde van grootte met een meetklok of maatcontrole op hetzelfde werkstuk. [Python-bron](../Resources/Formules/coock/src/models/model_deflect.py)

#### Wat voegt meten op je eigen machine toe?

Een belastingproef maakt de stijfheid van de eigen opspanning meetbaar. Stel dat een radiale proefkracht van 100 N een verplaatsing van 5 µm geeft. De effectieve stijfheid tussen de gekozen meetpunten is dan 100 / 0,005 = **20.000 N/mm**. Wat je mag invullen in het model hangt af van waar je meet.

#### Hoe aanpakken in de praktijk?

1. Leg gereedschap, uitsteek, opspanning, krachtrichting en meetpunten vast. Meet bij een stilstaande opstelling met een gekende proefkracht en een verplaatsingsmeter.
2. Herhaal bij enkele belastingen en na ontlasten. Bepaal de stijfheid uit de helling van kracht tegen verplaatsing. Omvat de meting ook het buigende gereedschap, dan zit die bijdrage al in de gemeten totale vervorming.
3. Voorspel de verplaatsing bij een afzonderlijke belasting en vergelijk met de meetklok in µm. Toets vervolgens op een proefstuk of richting en grootte van de voorspelde maatfout overeenkomen met de maatcontrole.

### 4. Trilt deze snede door chatter? · Detectie en stabiliteitsvoorspelling

**Doel.** Twee vragen beantwoorden: welke afwijkende trilling zien we tijdens deze snede, en bij welke combinaties van toerental en snedediepte voorspelt het model stabiliteit?

| Route | Invoer, sensor en bron | Beeld op de pagina |
| --- | --- | --- |
| Meten tijdens de snede | Gekalibreerde accelerometer met snelle golfvormopname dicht bij spil of opspanning, inclusief as, bandbreedte en samplefrequentie. Toerental uit CNC of tachometer, tandenaantal uit gereedschapsfiche. Leid RMS en dominante frequentie in Hz af uit hetzelfde venster. Tandpassagefrequentie = toerental × tanden / 60. | Spectrum met tandpassage en harmonischen gemarkeerd. Leg de verdachte snede naast een bekende stabiele snede. Een traag gelogde RMS-reeks kan activiteit tonen, maar bevat onvoldoende informatie voor dit spectrum. |
| Stabiliteit voorspellen | Axiale/radiale ingreep en diameter uit CAM of instelling, snijkrachtcoëfficiënten uit materiaal-/toolproef. Voor de dynamische respons: eigenfrequentie, demping en stijfheid uit gekarakteriseerde opstelling, bijvoorbeeld via impacthamer en accelerometer. | Diagram met toerental horizontaal, grenssnedediepte verticaal en één werkpunt. Toon de verhouding ingestelde diepte/grensdiepte. Vermeld op welke houder, uitsteek en opspanning de curve berust. |

**Controle.** Koppel inspectie van het bewerkte oppervlak en operatorwaarneming aan het meetvenster. De Python-score combineert amplitude, afstand tot tandharmonischen en een analytische indicator. Label het resultaat als modelscore. Een hogere score is pas een kans op chatter als die relatie op gelabelde sneden is aangetoond. [Python-bron](../Resources/Formules/coock/src/models/model_chatter.py)

#### Wat voegt meten op je eigen machine toe?

Eigen opnames laten zien welke frequenties bij een normale snede horen. Bij 6.000 omw/min en vier tanden is de tandpassagefrequentie **400 Hz**. Stel dat een verdachte snede ook een piek rond 730 Hz vertoont. Die piek geeft je een gericht aanknopingspunt om het trillingsbeeld en het oppervlak te vergelijken.

#### Hoe aanpakken in de praktijk?

1. Registreer een gekende stabiele snede met een vast gemonteerde accelerometer. Bewaar toerental, tandenaantal, ingreep, samplefrequentie en het tijdvenster.
2. Vergelijk met een bestaande verdachte opname onder vergelijkbare condities. Markeer tandpassage en harmonischen. Laat het oppervlak onafhankelijk beoordelen en leg het oordeel naast het spectrum.
3. Leg de detectieregel vast en test op afzonderlijke gelabelde sneden. Tel gemiste chatter en valse meldingen. Beoordeel een voorspelde stabiliteitsgrens apart met proefpunten waarvan toerental, diepte en waargenomen stabiliteit bekend zijn.

### 5. Waar gaat productietijd verloren? · Toestanden en OEE

**Doel.** Zicht krijgen op geplande tijd, draaiende spil, werkelijke snijtijd en productkwaliteit. Begin met een tijdlijn. Voeg percentages pas toe wanneer teller en noemer bekend zijn.

**Invoer.** Automatisch uit de CNC: cyclus, spiltoerental, programma, werkelijke voeding en tijdstempels. Voor detectie van snijden gebruikt het Python-model toerental en vermogen ten opzichte van nullast. Een stroomtang of trillingssensor kan met bedrijfslabels een activiteitsproxy leveren. Planning, nominale voeding of ideale cyclustijd komen uit werkvoorbereiding. Goede, afgekeurde en eventueel herwerkte stukken komen uit de kwaliteitsregistratie of van de operator.

**Weergave en proef.** Kleur één dienst op basis van toestand en laat een tijdvak openklappen tot het bewijs. Toon bij de projectspecifieke variant beschikbaarheid = spiltijd/geplande tijd, prestatie = snijtijd/spiltijd × voedingsverhouding en kwaliteit = goed/totaal. Vermeld bij vergelijking met klassieke OEE dat de conventionele prestatiecomponent op ideale cyclustijd en geproduceerde aantallen steunt. Ontbreekt de kwaliteitsregistratie, toon dan alleen de gekende componenten. De Python-terugval naar 1,0 kan zelfs een expliciete nul overschrijven. Test de pagina met drie situaties: alle stukken goed, alle stukken afgekeurd en kwaliteit onbekend. [Python-bron](../Resources/Formules/coock/src/models/model_oee.py)

#### Wat voegt meten op je eigen machine toe?

Een operator kan een stroom- of trillingsplateau herkennen als bijvoorbeeld werken, spoelen of wachten. Stel dat de detectie in een uur 48 minuten als snijden telt. Uit het programmalog blijkt dat zes van die minuten spoelen waren. Als de overige intervallen juist zijn, daalt het geschatte aandeel snijtijd van 80% naar **70%**.

#### Hoe aanpakken in de praktijk?

1. Spreek af welke tijden meetellen. Kies een dienst en registreer geplande tijd, CNC-toestand, programma en operatorlabels op dezelfde klok.
2. Vergelijk de automatisch herkende toestanden per interval met die labels. Pas regels aan op een eerste dienst. Leg voor volledige OEE ook de prestatieformule, de aantallen goed/afkeur en hun herkomst vast.
3. Gebruik een andere dienst als toets. Vergelijk minuten per toestand, controleer de stukaantallen met de kwaliteitsregistratie en herbereken elke OEE-component. Rapporteer onbekende tijd of ontbrekende kwaliteitsgegevens apart.

### 6. Hoeveel energie kost deze bewerking?

**Doel.** Drie beslissingen uit elkaar houden: verbruik van de hele machine per stuk, energie tijdens snijden en energie per verwijderd volume. Die vragen hebben verschillende systeemgrenzen.

**Invoer.** Voor kWh per stuk: begin- en eindstand van een energiemeter, of actief vermogen in W plus geldige tijdstappen. Koppel het interval aan de stukteller of operatorregistratie. Voor netto snijvermogen ook nullast onder vergelijkbare omstandigheden vastleggen. Voor specifieke snijenergie (SEC) het materiaalafnamedebiet (MRR) in mm³/min uit CNC-toerental, geometrie en ingreep berekenen. Gebruik de procesvariant voor draaien of frezen. Een gevalideerde driefasenvermogensmeter is geschikt. Bij een EL3453 moet de actieve-vermogenswaarde daadwerkelijk zijn ontsloten. Alleen fasestroom geeft geen gemeten kW.

**Weergave en proef.** Arceer op een vermogensgrafiek het energieoppervlak en markeer één stuk. Rekenvoorbeeld: 2 kW gemiddeld gedurende 3 minuten geeft 0,10 kWh binnen dat venster. Toon daarnaast SEC = 60 × netto W / MRR in J/mm³, alleen bij positief debiet. Energieaandeel tijdens snijden en een eventuele CO₂-raming krijgen afzonderlijke regels, die laatste met gedateerde emissiefactor in kg/kWh. Vergelijk met de energieteller over hetzelfde interval. De Python-module haalt cumulatieve energie uit de OEE-toestand; controleer welke componenten daar werkelijk zijn opgeteld voordat een grafiek “totaal machineverbruik” heet. [Python-bron](../Resources/Formules/coock/src/models/model_energy.py)

#### Wat voegt meten op je eigen machine toe?

Een echte energiemeting neemt ook wachten, pompen en hulpverbruik mee voor zover ze binnen het meetpunt vallen. Stel dat de teller tijdens een order met **1,20 kWh** stijgt en negen van tien stukken goed zijn. Dan is het verbruik **0,133 kWh per goed stuk**. Wie alle geproduceerde stukken telt, beantwoordt een andere vraag en komt op 0,120 kWh.

#### Hoe aanpakken in de praktijk?

1. Kies het meetpunt en de ordergrenzen. Noteer begin- en eindtijd, meterstanden en het aantal goedgekeurde stukken.
2. Bereken het verschil in kWh per goed stuk. Als je actief vermogen logt, integreer dan over dezelfde tijdstippen en controleer op ontbrekende intervallen.
3. Vergelijk op een volgende order de geïntegreerde kWh met het verschil op een onafhankelijke referentiemeter aan dezelfde systeemgrens. Controleer de noemer tegen de kwaliteitsregistratie. Vergelijk procesinstellingen pas over orders met vergelijkbare inhoud en bezetting.

### 7. Verandert de conditie van spil of lager?

**Doel.** Een inspectie plannen op basis van een veranderende trillingstrend. Een diagnose vraagt meer informatie dan een trendmelding.

**Invoer.** Voor de trend: trillingssnelheid RMS in mm/s van een geschikte sensor, of bandbegrensde integratie van gekalibreerde accelerometerdata. Noteer montage, richting, toerental, belasting en meetband. Voor lagerfrequenties ook aantal rolelementen, diameter van rolelement en steekcirkel en contacthoek uit de lagerfiche. Gebruik werkelijk toerental uit CNC of tachometer. Voor tijd tot een grens: vergelijkbare historische vensters, verlopen draaiuren en een onderbouwde interventiegrens.

**Weergave en proef.** Toon eerst de trend per bedrijfstoestand. Open daarna een spectrum met verwachte buitenring- en binnenringfrequenties (BPFO/BPFI). Een frequentiemarker benoemt een inspectiepunt. Voor extrapolatie toont de pagina helling, spreiding en tijd tot grens uitsluitend bij bruikbare stijgende trend. De conversie van brede acceleratie-RMS via één frequentie uit het prototype is alleen verdedigbaar bij een passende smalbandige component. Controleer een bevinding met inspectie of een gedocumenteerde lagerwissel. [Python-bron](../Resources/Formules/coock/src/models/model_maintenance.py)

#### Wat voegt meten op je eigen machine toe?

Een eigen referentiereeks toont de normale variatie per toerental en belasting. Stel dat bij dezelfde proefloop de trillingssnelheid van 2,0 naar 3,0 mm/s RMS stijgt. Dat is een stijging van **50%** en een reden om montage en conditie te controleren. Voor een lagerdiagnose heb je aanvullende aanwijzingen nodig.

#### Hoe aanpakken in de praktijk?

1. Leg meetpunt, richting, frequentieband, toerental en bedrijfstoestand vast. Verzamel meerdere referentiemetingen bij bekende goede toestand.
2. Volg de trend bij vergelijkbare proeflopen. Herhaal een afwijkende meting na controle van sensor en montage. Gebruik bij een vermoeden van lagerschade de lagergeometrie en werkelijke snelheid om het spectrum te onderzoeken.
3. Leg waarschuwingen uit een volgende periode naast inspecties en onderhoudsbevindingen. Tel ook meldingen zonder gevonden defect. Een voorspelling van resterende draaiuren vraagt bovendien historische trajecten met een gekend eindpunt.

### 8. Gedraagt deze materiaalbatch zich anders?

**Doel.** Een afwijkende batch selecteren voor materiaalonderzoek. Vergelijk alleen dezelfde snede, hetzelfde gereedschap en vergelijkbare slijtage.

| Indicator | Wat is nodig? | Betekenis voor de gebruiker |
| --- | --- | --- |
| Krachtafwijking | Gemeten kracht (dynamometer) of gevalideerde kracht uit netto vermogen en snijsnelheid. Verwachte kracht uit referentiesnede en slijtagecorrectie. | Relatief verschil tussen waargenomen en verwachte belasting. De bron noemt dit een hardheidsafwijking. De berekening levert geen rechtstreeks gemeten verschil in Vickers-hardheid. |
| Akoestische-emissieverhouding | AE-sensor met passende hoogfrequente acquisitie en reproduceerbare koppeling. Deel AE-RMS door de AE-referentie van het materiaal onder gelijke omstandigheden. | Vergelijk twee batchverdelingen. Een gewone microfoon vraagt een andere meetmethode en kalibratie. |
| Ongewone pieken | AE-pieken en/of krachtgeschiedenis volgens het beschikbare detectiepad, baseline, stuk- en batch-ID. | Markeer het tijdstip en zoom in op de snede. Een inspectie moet uitwijzen of er een insluiting aanwezig was. |

**Weergave en proef.** Toon eerst de afzonderlijke indicatoren en welke daadwerkelijk zijn gevoed. Het prototype neemt de hoogste deelscore. Zonder kracht- en AE-invoer hoort de pagina “onvoldoende meetgegevens” te tonen. Vraag voor toetsing een batchcertificaat, hardheidsproef of materiaalinspectie op. [Python-bron](../Resources/Formules/coock/src/models/model_material.py)

#### Wat voegt meten op je eigen machine toe?

Een referentiebatch helpt materiaalverschillen onderscheiden van slijtage of gewijzigde snijcondities. Stel dat dezelfde snede bij batch A gemiddeld 200 N vraagt en bij batch B 230 N. De gemeten kracht ligt **15% hoger**. Dat is een verschil in snijgedrag; de oorzaak moet nog worden vastgesteld.

#### Hoe aanpakken in de praktijk?

1. Registreer batch, gereedschapstoestand, programma, snijcondities en koeling. Meet de kracht met een dynamometer of gebruik een getoetste krachtschatting.
2. Meet meerdere stukken per batch en wissel waar praktisch de meetvolgorde af. Vergelijk het verschil tussen batchgemiddelden met de spreiding binnen elke batch. Controleer of slijtage mee is veranderd.
3. Toets het patroon op apart gehouden stukken. Vergelijk de uitkomst met een onafhankelijke hardheidsmeting of materiaalinspectie als hardheid of insluitingen de hypothese zijn. Zonder die bevestiging rapporteer je alleen de waargenomen afwijking.

### 9. Welke cyclus wijkt af van normaal?

**Doel.** Verdachte intervallen selecteren om gericht terug te kijken. De gebruiker moet kunnen zien *welk kanaal*, *wanneer* en *ten opzichte van welke referentie* afweek.

**Invoer.** Eén tijdreeks met geldige waarden en een referentie uit vergelijkbare cycli volstaan voor een eerste kanaal. Geschikt zijn bijvoorbeeld actief vermogen in W, acceleratie-RMS in m/s² of AE-RMS met vastgelegde schaal. De Python-module kan ook modeluitkomsten bewaken. Leg machine, programma, gereedschap, materiaal, tijdstap en sensorpositie vast. Laat de operator normale overgangen, geplande wissels en bekende incidenten labelen.

**Weergave en proef.** Gebruik één signaal met drie gemarkeerde voorbeelden: een uitschieter (z-score), een geleidelijke verschuiving (EWMA) en een sprong (vergelijking van opeenvolgende vensters). Toon de referentieperiode en het opwarmen van de statistiek. Laat de gebruiker een alarm openen tot de betrokken kanalen. De Python-heuristiek voor mogelijke gereedschapsbreuk kan al reageren op een vermogensval. Controleer die melding tegen cyclusstop en echte breukmeldingen. Test op aparte normale en afwijkende runs en rapporteer gemiste gebeurtenissen en valse meldingen. [Python-bron](../Resources/Formules/coock/src/models/model_anomaly.py)

#### Wat voegt meten op je eigen machine toe?

Een referentie per bewerkingsfase voorkomt dat een normale gereedschapswissel als incident verschijnt. Stel dat het actieve vermogen in dezelfde snede gemiddeld 2,0 kW bedraagt met een standaardafwijking van 0,1 kW. Een waarde van 2,4 kW ligt **vier standaardafwijkingen** boven dat gemiddelde. De score wijst een tijdstip aan voor onderzoek.

#### Hoe aanpakken in de praktijk?

1. Selecteer normale cycli met dezelfde machine, programmafase en gereedschapscontext. Controleer tijdstempels, ontbrekende waarden en eenheden.
2. Bepaal de referentie en kies een meldregel op een eerste reeks. Noteer of die reageert op een piek, een sprong of een aanhoudende verschuiving.
3. Bevries de instellingen voor de toets. Gebruik apart gehouden cycli met normale overgangen én door de operator bevestigde incidenten. Rapporteer valse meldingen per bedrijfsuur en het aantal teruggevonden incidenten op het totale aantal bekende incidenten.

## Interne referentie voor de auteurs — PLC-bouwstenen

Dit register blijft in het werkplan, buiten de inhoud en navigatie van de HTML-gids. Gebruik het bij het schrijven om eenheden, formulevarianten en rekenvoorbeelden te vergelijken en bij een latere implementatie om bestaande code terug te vinden. Het dekt alle productiegerichte rekenfuncties en functieblokken van SirrisLib. Tests en gegevenstypen zijn terug te vinden via de [bibliotheekdocumentatie](../PLC/TestCoockMatur/TestCoockMaturiteit/SirrisLib/README.md). Functienamen hieronder behouden hun koppeling met de code. Toon geldigheid en eenheid bij elke uitkomst. Praktijkvalidatie blijft per machine en toepassing nodig.

| PLC-functie | Doel en berekening | Invoer verkrijgen en begrijpelijk weergeven |
| --- | --- | --- |
| `F_SirrisCalcCuttingSpeedMMin` | Omtreksnelheid Vc = π D n / 1000 in m/min. | Diameter D in mm van werkstuk bij draaien of frees bij frezen, toerental n in omw/min uit CNC/tachometer. Teken één omwenteling met de afgelegde omtrek. |
| `F_SirrisCalcMillingFeedRateMmMin` | Baanvoeding vf = n z fz in mm/min. | Toerental uit CNC, tanden z uit gereedschapsfiche, voeding per tand fz uit programma. Toon één tand → één omwenteling → één minuut. |
| `F_SirrisCalcTurningMrrMm3Min` | Materiaalafname bij draaien = π D n f ap in mm³/min. | Werkstukdiameter D, toerental, voeding f in mm/omw en radiale snedediepte ap in mm uit programma/instelblad. Arceer de afgenomen laag. |
| `F_SirrisCalcMillingMrrMm3Min` | Materiaalafname bij frezen = vf ap ae in mm³/min. | n, z, fz als voor baanvoeding, axiale diepte ap en radiale breedte ae uit CAM/instelling. Toon het verwijderde volume over één minuut bij constante ingreep. |
| `F_SirrisCalcTurningRaIdealUm` | Ideale draai-Ra = 1000 f²/(32 r) in µm. | CNC-voeding per omwenteling en neusradius r uit fiche. Teken het voedingsspoor; voorbeeld op modelpagina 1. |
| `F_SirrisCalcMillingRaFeedMarkUm` | Benadering freesvoedingsspoor = 1000 fz²/(32 r) in µm. | Tandvoeding en geschikte hoekradius. Geef op de tekening aan welke snijkant de sporen maakt. Benoem de beperkingen bij rondloopfout, wiper- en bolkopgeometrie. |
| `F_SirrisCalcNetCuttingPowerW` | Netto vermogen = actief vermogen − referentievermogen in W. | Zelfde meetpunt en vergelijkbare nullast uit meter/CNC. Teken nullastlijn onder de belastingcurve. Bij actief vermogen ≤ nullast meldt deze functie geen toepasbaar resultaat. |
| `F_SirrisCalcCuttingForceN` | Equivalente tangentiële kracht = netto W / (Vc/60) in N. | Vorige vermogens- en snelheidsfiche. Geef de krachtpijl de tangentiële richting; vergelijk met een dynamometer als de inschatting beslissend is. |
| `F_SirrisCalcSpecificEnergyJMm3` | Energie per verwijderd volume = 60 × netto W / MRR in J/mm³. | Zelfde snede voor vermogen en MRR. Toon twee sneden naast elkaar met hun volume, vermogen en SEC. Bij nuldebiet geen SEC. |
| `FB_SirrisEnergyIntegrator` | Accumuleert totaal, nullastcomponent en netto snijenergie in Wh over opeenvolgende geldige tijdstappen. | Actief en nullastvermogen, tijdstap in s, geldigheid, snijstatus en run/reset. Arceer de componenten en markeer elk overgeslagen tijdvak. |
| `F_SirrisCalcTaylorToolLifeMin` | Totale standtijd T = [C/(Vc f^m ap^p)]^(1/n) in min. | Snijcondities uit CNC/instelling; C,n,m,p uit één gekalibreerde tool-materiaalcombinatie met dezelfde voedingsconventie. Toon de standtijd voor twee snelheden, met dezelfde overige instellingen. |
| `F_SirrisCalcCantileverDeflectionUm` | Balkdoorbuiging = 1000 F L³/(3 E I) in µm met I = π d⁴/64 en E in N/mm². | Radiale kracht in N, uitsteek en kerndiameter in mm, materiaalmodulus ingevoerd in GPa en intern omgerekend. Teken aangrijpingspunt en uitsteek. |
| `F_SirrisCalcMachineDeflectionUm` | Machinebijdrage = 1000 F/k in µm. | Radiale kracht uit proef of model; stijfheid k in N/mm uit belasting-verplaatsingsproef. Teken de helling van die proef naast de berekende verplaatsing. |
| `FB_SirrisWelfordStatistics` | Houdt gemiddelde en variantie online bij; scoort de nieuwe waarde tegen de voorgaande referentie. | Elke herhaalbare meetgrootheid, geldigheidsvlag, minimumaantal, z-grens en reset bij nieuwe context. Toon eerst opwarming en daarna de uitschieter op de oude referentieband. |
| `FB_SirrisEwmaMonitor` | Volgt een gewogen gemiddelde en toetst het residu van een sample tegen de ingestelde grens. | Eén meetkanaal, geldigheid, gewicht α, residugrens in kanaaleenheid en reset. Toon ruwe lijn en gladde lijn met dezelfde eenheid. |
| `FB_SirrisScalarKalman` | Voorspelt een niet-negatieve scalaire toestand en corrigeert bij geldige meting. | Beginwaarde en covariantie, groeisnelheid per s, tijdstap, proces- en meetruisvariantie, meting en geldigheid. Toon bij VB de voorspelde curve en losse meetpunten; maak zichtbaar wanneer alleen voorspelling beschikbaar was. |

**Voor overdracht van de negen modelfiches naar HTML.** Gebruik per modelvariant de invoerrijen als bouwstenen voor de pagina. Bewaar de grootheid apart van de sensor: “actief vermogen in W” kan uit verschillende geschikte bronnen komen. Koppel aan elke bronvariant een eenheid, conversie, toepassingsvoorwaarde en eventuele referentieproef. Neem over grenzen, getrainde factoren en empirische scores pas een praktische conclusie op nadat Sirris of de betrokken proef die voor de getoonde bewerking heeft bevestigd.

## Uitvoering en toetsing

**Opdracht voor de volgende HTML-iteratie.** De twee eerste modelpagina’s zijn beschikbaar. Werk nu op de ruwheidspagina de stap van theorie naar eigen meetdata uit.

- Zet “Wat voegt meten op je eigen machine toe?” zichtbaar onder de calculator. Toon het illustratieve paar 1,56 µm berekend en 2,00 µm gemeten. Benoem de uitkomst als een eerste aanwijzing voor deze opstelling.
- Neem de vijf stappen uit de Ra-fiche op onder “Hoe pak je dit aan in de praktijk?”. Gebruik die vraag ook op volgende modelpagina’s, met een proef die past bij het model.
- Gebruik de technische verdieping voor de uitgebreide vergelijking en de geleidelijke bijstelling. Controleer vóór eventuele interactieve kalibratie dat 0,20 mm/omw en 0,80 mm radius geometrisch 1,5625 µm opleveren en dat de gemeten Ra in dezelfde eenheid binnenkomt.
- Laat bij de lezerstoets iemand uitleggen wat hij zou meten, welke factor daarmee wordt bijgesteld en hoe hij op nieuwe stukken controleert of de voorspelling verbetert.

1. **Bronnen naast elkaar leggen.** Maak per variant een fiche met bronpad en versie, bewerking, uitvoer en eenheden, verplichte en optionele invoer, herkomst, afgeleide tussenwaarden, terugvalgedrag, controlemeting en validatiestatus. Leg verschillen tussen document, Python en PLC vast als open beslispunten voor Sirris.
2. **Twee pagina’s uitwerken.** Begin met geometrische Ra bij draaien en energie per stuk. De eerste laat zien dat twee instelgegevens kunnen volstaan. De tweede vraagt een tijdreeks, een afgebakende cyclus en een juiste vermogensmeting. Een stroommeting in ampère alleen volstaat niet. Zo testen we twee wezenlijk verschillende pagina’s vóór we de rest bouwen.
3. **Met twee lezers doorlopen.** Laat een nieuwe collega zonder uitleg het passende model kiezen. Laat iemand met een eigen machine aanwijzen waar elk gegeven vandaan komt, welke meting nog ontbreekt en hoe die het resultaat controleert. Als een lezer een geschatte waarde als meting aanziet, moet de pagina worden aangepast.
4. **Uitbreiden en verhuizen.** Werk de overige zeven families en hun deelberekeningen uit met dezelfde opbouw. Bewaar inhoud, voorbeelden en bronverwijzingen los van de presentatie en genereer daaruit gewone HTML met relatieve links. Controleer voorbeeldberekeningen, eenheden, ontbrekende invoer en offline-navigatie. Voor een zelfstandig project blijven de fiches leesbaar zonder de interne bronmappen. Neem intern bronmateriaal alleen op in een externe uitgave als de deelbaarheid is bevestigd.
