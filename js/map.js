(function () {
  const config = window.SITE_CONFIG;
  if (!config || !window.d3 || !window.topojson) return;

  const svg = d3.select("#world-map");
  const tooltip = document.getElementById("map-tooltip");
  const visitedCodes = new Set(config.visitedCountries.map((c) => c.code));
  const visitedNames = Object.fromEntries(
    config.visitedCountries.map((c) => [c.code, c.name])
  );

  const projection = d3
    .geoNaturalEarth1()
    .scale(155)
    .translate([480, 260]);

  const path = d3.geoPath(projection);

  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((world) => {
    const countries = topojson.feature(world, world.objects.countries).features;

    svg
      .selectAll("path")
      .data(countries)
      .join("path")
      .attr("class", (d) => {
        const code = countryCode(d);
        return visitedCodes.has(code) ? "country visited" : "country";
      })
      .attr("d", path)
      .attr("tabindex", (d) => (visitedCodes.has(countryCode(d)) ? 0 : -1))
      .attr("role", (d) => (visitedCodes.has(countryCode(d)) ? "button" : null))
      .attr("aria-label", (d) => {
        const code = countryCode(d);
        return visitedCodes.has(code) ? `Visited: ${visitedNames[code]}` : null;
      })
      .on("mouseenter focus", function (event, d) {
        const code = countryCode(d);
        if (!visitedCodes.has(code)) return;
        showTooltip(visitedNames[code]);
        d3.select(this).raise();
      })
      .on("mouseleave blur", function (_, d) {
        const code = countryCode(d);
        if (!visitedCodes.has(code)) return;
        hideTooltip();
      })
      .on("click", function (_, d) {
        const code = countryCode(d);
        if (!visitedCodes.has(code)) return;
        showTooltip(`${visitedNames[code]} ✓`);
      });
  });

  function countryCode(feature) {
    const numeric = String(feature.id).padStart(3, "0");
    return ISO_NUMERIC_TO_ALPHA3[numeric] || "";
  }

  function showTooltip(text) {
    if (!tooltip) return;
    tooltip.textContent = text;
    tooltip.classList.add("visible");
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove("visible");
  }

  // Natural Earth numeric id -> ISO alpha-3 (visited countries + common neighbors)
  const ISO_NUMERIC_TO_ALPHA3 = {
    "040": "AUT",
    "056": "BEL",
    "100": "BGR",
    "156": "CHN",
    "191": "HRV",
    "196": "CYP",
    "203": "CZE",
    "208": "DNK",
    "233": "EST",
    "246": "FIN",
    "250": "FRA",
    "276": "DEU",
    "300": "GRC",
    "348": "HUN",
    "352": "ISL",
    "372": "IRL",
    "380": "ITA",
    "428": "LVA",
    "440": "LTU",
    "442": "LUX",
    "470": "MLT",
    "492": "MCO",
    "498": "MDA",
    "528": "NLD",
    "578": "NOR",
    "616": "POL",
    "620": "PRT",
    "642": "ROU",
    "643": "RUS",
    "688": "SRB",
    "703": "SVK",
    "705": "SVN",
    "724": "ESP",
    "752": "SWE",
    "756": "CHE",
    "792": "TUR",
    "788": "TUN",
    "804": "UKR",
    "826": "GBR",
    "840": "USA",
  };
})();
