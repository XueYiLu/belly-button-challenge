d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    Data = data.names;
    console.log(data.samples[0]);
    Metadata = data.metadata;
    Samples = data.samples;
            
    var select = document.getElementById("selDataset");
    var sample = document.getElementById("sample-metadata");
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#bubble")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 
    select.onchange = function(){
      metadata = "id: "+ Metadata[select.value-941]["id"] + "\n"+"ethnicity: "+Metadata[select.value-941]["ethnicity"]+ "\n"+"gender: "+Metadata[select.value-941]["gender"]+ "\n"+"age: "+Metadata[select.value-941]["age"]+ "\n"+"location: "+Metadata[select.value-941]["location"]+ "\n"+"wfreq: "+Metadata[select.value-941]["wfreq"];
      sample.innerHTML = metadata;
      meta = Samples[select.value-941]
      values = meta["sample_values"].slice(0,10);
      labels = meta["otu_ids"].slice(0,10);
      var data = values.map(function(e, i) {
      return [e, labels[i]];
    });

      hover = meta["otu_labels"].slice(0,10);
      // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 3000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d[0]; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))
    var x = d3.scaleLinear()
    .domain([0, 3000])
    .range([ 0, width]);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d[0]; }))
    .padding(.1);
  svg2.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d[0]);  })
    .attr("width", function(d) { return x(d[1]); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")

    svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[1]); } )
      .attr("cy", function (d) { return y(d[0]); } )
      .attr("r", function (d) { return 0.01*d[1]; } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")

    };
    for (var i = 0; i < Data.length; i++) { 
      var option = document.createElement("option");
      option.text = Data[i];
      select.add(option);

    }
  })
  .catch(function(error) {
    console.error("Error fetching data:", error);
  });