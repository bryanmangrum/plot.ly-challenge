function buildMetadata(sample) {
    d3.json("../data/samples.json").then((data) => {
      var patientinfo = data.metadata;
      var resultsarray = patientinfo.filter(sampleobject => 
        sampleobject.id == sample);
      var results = resultsarray[0]
      var samples = d3.select("#sample-metadata");
      samples.html("");
      Object.entries(results).forEach(([key, value]) => {
        samples.append("h6").text(`${key}: ${value}`);
    });

    //buildGauge(result.wfreq)
  
  
  
    });
  }

  //function buildGauge(wfreq) {}

function buildCharts(sample) {

// Use `d3.json` to fetch the sample data for the plots
d3.json("../data/samples.json").then((data) => {
  var cultures = data.samples;
  var resultsarray = cultures.filter(sampleobject => 
      sampleobject.id == sample);
  var results = resultsarray[0]

  var ids = results.otu_ids;
  var labels = results.otu_labels;
  var values = results.sample_values;




//---------------------------------------------------------//
//---------------------------------------------------------//
              //  Build a BAR Chart
//---------------------------------------------------------//  
//---------------------------------------------------------// 
var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU: ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var barLayout = {
    title: "10 Most Observed Bacteria",
    margin: { t: 30, l: 100 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);


//------------------------------------------------------//
//------------------------------------------------------//
          // Build a BUBBLE Chart 
//------------------------------------------------------//
//------------------------------------------------------//

var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "OTU IDs" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];



  Plotly.newPlot("bubble", DataBubble, LayoutBubble);

});
}

  function init() {
    // Grab a reference to the dropdown select element
    var dropdown = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("../data/samples.json").then((data) => {
      var sample_names = data.names;
      sample_names.forEach((sample) => {
        dropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      });

  // Randomize the first sample displayed to build initial plots
  const initialSample = sample_names[0];
  buildCharts(initialSample);
  buildMetadata(initialSample);

});
}




function optionChanged(nextSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(nextSample);
    buildMetadata(nextSample);
    }
    
    
    
    // Initialize the dashboard
    init();