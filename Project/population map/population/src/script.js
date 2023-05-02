let countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL =
  "../population2020.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (item) => {
      let fips = item["id"];
      let county = educationData.find((county) => {
        return county["fips"] === fips;
      });
      let percentage = county["population"];
      if (percentage <= 10000) {
        return "#e9ffdb";
      } else if (percentage <= 20000) {
        return "#98fb98";
      } else if (percentage <= 30000) {
        return "#32cd32";
      }
        else if (percentage <= 40000) {
          return "#3cb371";
          
      } else if (percentage <= 50000) {
        return "lightgreen";
      }   
      else {
        return "green";
      }
    })
    .attr("data-fips", (item) => {
      return item["id"];
    })
    .attr("data-education", (item) => {
      let fips = item["id"];
      let county = educationData.find((county) => {
        return county["fips"] === fips;
      });
      let percentage = county["population"];
      return percentage;
    })
    .on("mouseover", (item) => {
      tooltip.transition().style("visibility", "visible");

      let fips = item["id"];
      let county = educationData.find((county) => {
        return county["fips"] === fips;
      });

      tooltip.text(
        county["fips"] +
          " - " +
          county["area_name"] +
          ", " +
          county["state"] +
          " : " +
          county["population"] 
      );

      tooltip.attr("data-education", county["population"]);
    })
    .on("mouseout", (item) => {
      tooltip.transition().style("visibility", "hidden");
    });
};

d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = data;
    countyData = topojson.feature(countyData, countyData.objects.counties)
      .features;
    console.log("County Data");
    console.log(countyData);

    d3.json(educationURL).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        console.log("Education Data");
        console.log(educationData);
        drawMap();
      }
    });
  }
});
