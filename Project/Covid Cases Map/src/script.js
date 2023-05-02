let countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL =
  "../covid-19/Weekly_cum_covid_cases_json/2020011.json";

for (let i = 1; i <= 12; i++) {
    let dynamicvar="data_2020_"+i;
    
    window[dynamicvar]="../covid-19/Weekly_cum_covid_cases_json/2020011.json";

  }

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

function drawMap  (cData)  {
  canvas
    .selectAll("path")
    .html("")
    .data(countyData) 
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (item) => {

      
      let fips = Number(item["id"]);
      //console.log("cData -------------------")
      //console.log(cData)
      let county = cData.find((county) => {
        //console.log(Number(county["fips"]))
        return Number(county["fips"]) === fips;
      });
      //console.log("xyz--------------------------xyz")
      //ffffffffconsole.log(county["cases"])
      let percentage = county["cases"];
      if  (percentage == 0) {
        return "white";
      }
      else if (percentage <= 1500) {
        return "tomato";
      } else if (percentage <= 4500) {
        return "orange"; 
      } else if (percentage <= 10000) {
        return "#3cb371";
      } 
      else if (percentage <= 50000) {
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
      let county = cData.find((county) => {
        return county["fips"] === fips;
      });
      let percentage = county["cases"];
      return percentage;
    })
    .on("mouseover", (item) => {
      tooltip.transition().style("visibility", "visible");

      let fips = item["id"];
      let county = cData.find((county) => {
        return county["fips"] === fips;
      });

      tooltip.text(
        county["fips"] +
          " - " +
          county["area_name"] +
          ", " +
          county["state"] +
          " : " +
          county["cases"] 
      );

      tooltip.attr("data-education", county["cases"]);
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

    d3.json(data_2020_1).then((data, error) => {
      if (error) {
        console.log(error);
      } else {

        educationData = data;
        console.log("Jan data");
        console.log(educationData);
        drawMap(educationData);
      
      }
    });

  }
});

var select_month = document.getElementById("month_select");

var selectedMonth = select_month.value;

var select_year = document.getElementById("year_select");

var selectedYear = select_year.value;


var select_week = document.getElementById("week_select");

var selectedWeek = select_week.value;

// Add an event listener to the select element
select_month.addEventListener("change",  function() {
  // Do something when the selected option changes
  var newValue = select_month.value;

  var year = select_year.value;

  let dVar="data_2019_" + newValue;
  var week = select_week.value;

  

  window[dVar] = "../covid-19/Weekly_cum_covid_cases_json/" + year  + newValue + week +".json";
  console.log("hello" + window[dVar]);
  d3.json(window[dVar]).then((data, error) => {
    if (error) {
      
      console.log(error);

    } else {

      canvas.selectAll("path")
      .data([])
      .exit()
      .remove();
      
      console.log("data : " + dVar);
      console.log(data);
      drawMap(data);

    } 
  });
})

// Add an event listener to the select element
select_year.addEventListener("change",  function() {
  // Do something when the selected option changes
  var newValue = select_month.value;

  var year = select_year.value;

  let dVar="data_2019_" + newValue;
  var week = select_week.value;

  window[dVar] = "../covid-19/Weekly_cum_covid_cases_json/" + year  + newValue + week +".json";
  console.log("hello" + window[dVar]);
  d3.json(window[dVar]).then((data, error) => {
    if (error) {
      
      console.log(error);

    } else {

      canvas.selectAll("path")
      .data([])
      .exit()
      .remove();
      
      console.log("data : " + dVar);
      console.log(data);
      drawMap(data);

    } 
  });
})


// Add an event listener to the select element
select_week.addEventListener("change",  function() {
  // Do something when the selected option changes
  var newValue = select_month.value;

  var year = select_year.value;

  let dVar="data_2019_" + newValue;
  var week = select_week.value;

  window[dVar] = "../covid-19/Weekly_cum_covid_cases_json/" + year  + newValue + week +".json";
  console.log("hello" + window[dVar]);
  d3.json(window[dVar]).then((data, error) => {
    if (error) {
      
      console.log(error);

    } else {

      canvas.selectAll("path")
      .data([])
      .exit()
      .remove();
      
      console.log("data : " + dVar);
      console.log(data);
      drawMap(data);

    } 
  });
})
