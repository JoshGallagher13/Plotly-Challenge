
function Metadata(sample) {
    //Select data
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        
        //Populating Demographic Panel
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    
    
    });
}

function Charts(sample) {
    // Select data
    d3.json("samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        
        // Label data
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        //Bubble Chart
        var bubbleData = [
            {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Viridis"}
            }];
        var bubbleLayout = {
            title: "Bacteria Cultures",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        //Bar Chart
        var yticks = otu_ids.map(otuID => `OTU ${otuID}`)
        var graph = [{
            x: sample_values.slice(0,10),
            y: yticks,
            type: 'bar',
            orientation: 'h',
            text: otu_labels
            }];
        var layout = {
            title: "Top 10 Bacteria",
            yaxis:{autorange:'reversed'},
            
        };
    Plotly.newPlot('bar', graph,layout);
    })};

//Initialization
function init () {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then(data => {
        var subjectId = data.names
        
        //Populating Test Subject Selector list
        subjectId.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample)});
        
    var sampleOne = subjectId[0];
    Charts(sampleOne);
    Metadata(sampleOne);
    });
}

//Update on Test Subject change
function Change(sampleSelect) {
    Charts(sampleSelect);
    Metadata(sampleSelect);
}

init();



