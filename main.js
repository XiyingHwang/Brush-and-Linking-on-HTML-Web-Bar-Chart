var width =500;
var height= 500;

//handle the data processing and drawing
d3.csv("calvinCollegeSeniorScores.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
    //convert all string to number in csv
		csv[i].GPA = Number(csv[i].GPA);
		csv[i].SATM = Number(csv[i].SATM);
		csv[i].SATV = Number(csv[i].SATV);
		csv[i].ACT = Number(csv[i].ACT);
    }
    // this is formating the data into rows so that the csv looks like the example.csv
    var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
    var satvExtent = d3.extent(csv, function(row) { return row.SATV; });
    var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
    var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });


    var satExtents = {
	"SATM": satmExtent,
	"SATV": satvExtent
    };


    // Axis setup
    var xScale = d3.scaleLinear()
        .domain(satmExtent)
        .range([50, 470]);

    var yScale = d3.scaleLinear()
        .domain(satvExtent)
        .range([470, 30]);

    var xScale2 = d3.scaleLinear()
        .domain(actExtent)
        .range([50, 470]);

    var yScale2 = d3.scaleLinear()
        .domain(gpaExtent)
        .range([470, 30]);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    var xAxis2 = d3.axisBottom()
        .scale(xScale2);

    var yAxis2 = d3.axisLeft()
        .scale(yScale2);

    //Create SVGs for charts there are three div in the body two of them are the chart the
    //the third one is the one for accumulated Score
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


    var chart2 = d3.select("#chart2")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


	 /******************************************

		ADD BRUSHING CODE HERE

	 ******************************************/
    var brush1 = d3.brush() .extent([[0, 0], [width, height]]);
    var brush2 = d3.brush() .extent([[0, 0], [width, height]]);
    var brushArea1 = chart1.append('g').attr('id', 'brushArea1');
    var brushArea2 = chart2.append('g').attr('id', 'brushArea2');
    brush1.on('start', clean)
                .on('brush', updateChart)
                .on('end',  end)
    brush2.on('start', clean2)
                .on('brush', updateChart2)
                .on('end', end2)
    brushArea1.call(brush1);
    brushArea2.call(brush2);
    function clean() {
        brush2.move(brushArea2, null);
        temp2.classed("selected", null)
        d3.select("#chart3")
             .select("#satm")
             .text(' ');
        d3.select("#chart3")
             .select("#satv")
             .text(' ');
        d3.select("#chart3")
             .select("#act")
             .text(' ');
        d3.select("#chart3")
             .select("#gpa")
             .text(' ');
    }
    function clean2 () {
        brush1.move(brushArea1, null);
        temp1.classed("selected", null)
        d3.select("#chart3")
             .select("#satm")
             .text(' ');
        d3.select("#chart3")
             .select("#satv")
             .text(' ');
        d3.select("#chart3")
             .select("#act")
             .text(' ');
        d3.select("#chart3")
             .select("#gpa")
             .text(' ');
    }

    function updateChart() {
        var extent = d3.event.selection
        if (!extent) {
            return;
        }
        temp1.classed("selected2", null)
        temp2.classed("selected2", null)
        // temp1.classed("selected", function(d) {return isBrushed(extent, xScale(d.SATM), yScale(d.SATV))})
        temp2.classed("selected2", function(d) {return isBrushed(extent, xScale(d.SATM), yScale(d.SATV))});

    }

    function updateChart2() {
        var extent = d3.event.selection
        if (!extent) {
            return;
        }
        temp1.classed("selected", null)
        temp2.classed("selected", null)
        temp1.classed("selected", function(d) {return isBrushed2(extent, xScale2(d.ACT), yScale2(d.GPA))})
        // temp2.classed("selected2", function(d) {return isBrushed2(extent, xScale2(d.ACT), yScale2(d.GPA))});
        d3.select("#chart3")
             .select("#satm")
             .text(' ');
        d3.select("#chart3")
             .select("#satv")
             .text(' ');
        d3.select("#chart3")
             .select("#act")
             .text(' ');
        d3.select("#chart3")
             .select("#gpa")
             .text(' ');
    }

    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
                x1 = brush_coords[1][0],
                y0 = brush_coords[0][1],
                y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

    function isBrushed2(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
                x1 = brush_coords[1][0],
                y0 = brush_coords[0][1],
                y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
    function end() {
        var extent = d3.event.selection
        if (!extent) {
            chart1.selectAll("circle").classed("selectedBrush", false);
            chart2.selectAll("circle").classed("selected2", false);
        }
    }
    function end2() {
        var extent = d3.event.selection
        if (!extent) {
            chart2.selectAll("circle").classed("selectedBrush", false);
            chart1.selectAll("circle").classed("selected", false);
        }
    }

	 //add scatterplot points
     var temp1= chart1.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale(d.SATM); })
	   .attr("cy", function(d) { return yScale(d.SATV); })
	   .attr("r", 5)
       .attr("fill", 'black')
	   .on("click", function(d,i){
           temp1.classed("selected", null);
           // temp2.classed("selected", null);
           temp2.classed("selected", function(a) {
            return d.SATM == a.SATM && d.SATV == a.SATV && d.ACT == a.ACT && d.GPA == a.GPA;
            });
            d3.select("#chart3")
                .select("#satm")
                .text(d.SATM);
            d3.select("#chart3")
                .select("#satv")
                .text(d.SATV);
            d3.select("#chart3")
                .select("#act")
                .text(d.ACT);
            d3.select("#chart3")
                .select("#gpa")
                .text(d.GPA);
       });

    var temp2= chart2.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale2(d.ACT); })
	   .attr("cy", function(d) { return yScale2(d.GPA); })
	   .attr("r", 5)
       .attr("fill", 'black')
	   .on("click", function(d,i){
           // temp1.classed("selected", null);
           temp2.classed("selected", null);
           temp1.classed("selected", function(a) {
             return d.SATM == a.SATM && a.SATV == a.SATV && d.ACT == a.ACT && d.GPA == a.GPA;
           });
           d3.select("#chart3")
                .select("#satm")
                .text(d.SATM);
           d3.select("#chart3")
                .select("#satv")
                .text(d.SATV);
           d3.select("#chart3")
                .select("#act")
                .text(d.ACT);
           d3.select("#chart3")
                .select("#gpa")
                .text(d.GPA);
       });



    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("SATM");

    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("SATV");

    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis2)
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("ACT");

    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis2)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("GPA");
	});
