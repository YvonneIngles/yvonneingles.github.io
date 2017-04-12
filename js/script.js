// Wait for DOM to finish loading
$(function () {
    // Load in csv file (in data directory) using Plotly's csv function (refer to USA Bubble Map example)
    Plotly.d3.csv('data/antibiotics-data.csv', function (err, rows) {
        // Plotly.d3.csv('https://github.com/info474-s17/tp1-plotly-YvonneIngles/blob/master/data/tb_prev_2010.csv', function (err, rows) {

        // Parse your loaded data for your graph:
        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }

        var bacteriaName = unpack(rows, 'Bacteria'),
            penicilinVal = unpack(rows, 'Penicilin'),
            streptomycinVal = unpack(rows, 'Streptomycin'),
            neomycinVal = unpack(rows, 'Neomycin'),
            gramStaining = unpack(rows, 'Gram.Staining'),

            bacteria = [], // hold bacteria name
            penicilin = [], // hold penicilin value
            streptomycin = [], // hold streptomycin value
            neomycin = [], // hold neomycin value
            stain = [], // hold positive or negative
            antibioticNames = ['Penicilin', 'Streptomycin', 'Neomycin'];

        for (var i = 0; i < bacteriaName.length; i++) {
            bacteria.push(bacteriaName[i]);
            penicilin.push(Math.log10(penicilinVal[i]) + 3);
            streptomycin.push(Math.log10(streptomycinVal[i]) + 3);
            neomycin.push(Math.log10(neomycinVal[i]) + 3);
            stain.push(gramStaining[i]);
        }

        // Grouped bar chart: each bacteria will have three bars showing how much of each antibiotic's MIC is required
        var grouped1 = {
            x: bacteria,
            y: penicilin,
            name: 'Penicilin',
            type: 'bar',

            mode: 'lines+markers+text',
            text: bacteria,
            textposition: 'bottom',
        };

        var grouped2 = {
            x: bacteria,
            y: streptomycin,
            name: 'Streptomycin',
            type: 'bar',
        };

        var grouped3 = {
            x: bacteria,
            y: neomycin,
            name: 'Neomycin',
            type: 'bar',
        };

        var dataOne = [grouped1, grouped2, grouped3];

        var layoutOne = {
            title: 'MIC of Antibiotics for Bacteria with scale of (log10(x)+3)',
            barmode: 'group',
            // annotations: [{
            //     x: ["Aerobacter aerogenes", "Brucella abortus"],
            //     y: 0,
            //     // xref: 'x',
            //     // yref: 'y',
            //     text: ['positive','positive'],
            //     showarrow: true,
            //     font: {
            //         family: 'Courier New, monospace',
            //         size: 16,
            //         color: '#000'
            //     }
            // }],
            margin: {
                b: 120,
            }
        };

        // Scatter plot:
        var scatter1 = { // negative
            x: bacteria,
            y: ["negative", "negative", , , "negative", "negative", "negative", "negative",
                "negative", "negative", "negative", , , , ,],
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 10,
                sizeref: 0.01,
                sizemode: 'area',
                color: 'red',
            }
        };

        var scatter2 = { // positive
            x: bacteria,
            y: [, , "positive", "positive", , , , ,
                , , , "positive", "positive", "positive", "positive", "positive"],
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 10,
                sizeref: 0.01,
                sizemode: 'area',
                color: 'blue',
            }
        };

        var dataTwo = [scatter1, scatter2];
        var layoutTwo = {
            //autosize: true,
            height: 300,
            boxmode: 'group',
            showlegend: false,
            margin: {
                b: 120,
            },
            title: 'Identifying the Bacteria that are Gram-positive or Gram-negative',
        };

        // Bubble map chart:
        var bubble1 = {
            x: bacteria,
            y: penicilin,
            mode: 'markers',
            type: 'scatter',
            name: 'Penicilin',
            marker: {
                size: penicilin,
                //size: 10,
                sizeref: 0.01,
                sizemode: 'area',
            }
        };

        var bubble2 = {
            x: bacteria,
            y: streptomycin,
            mode: 'markers',
            type: 'scatter',
            name: 'Streptomycin',
            marker: {
                size: streptomycin,
                //size: 10,
                sizeref: 0.01,
                sizemode: 'area',
            }
        };

        var bubble3 = {
            x: bacteria,
            y: neomycin,
            mode: 'markers',
            type: 'scatter',
            name: 'Neomycin',
            marker: {
                size: neomycin,
                //size: 10,
                sizeref: 0.01,
                sizemode: 'area',
            }
        };

        var dataThree = [bubble1, bubble2, bubble3];

        var layoutThree = {
            title: 'Identifying the effective antibiotic with scale of (log10(x)+3)',
            margin: {
                b: 120,
            },
        };

        // Call Plotly's newPlot function to draw the graphs
        Plotly.newPlot('firstViz', dataOne, layoutOne, { staticPlot: true });
        Plotly.newPlot('secondViz', dataTwo, layoutTwo, { staticPlot: true });
        Plotly.newPlot('thirdViz', dataThree, layoutThree, { staticPlot: true });
    });
});
