var width = 1000, height = 1000;
var x_axis_feature = 'petal length'   
var y_axis_feature = 'petal length'     
const sourceUrl = `http://vis.lab.djosix.com:2020/data/iris.csv`;
function main(){
	d3.csv(sourceUrl).then(data => {
		window.datas = JSON.parse(JSON.stringify(data));
		// datas = datas.slice(datas.length - 20);
		paint(datas);  
	})
	const paint = (dataset) => {
		dataset = dataset.slice(0, dataset.length - 1);
		let xMax = d3.max(dataset, data => data[x_axis_feature]);
		let yMax = d3.max(dataset, data => data[y_axis_feature]);

		console.log(xMax)
		console.log(yMax)
		// console.log(dataset[0]['class'])
		// var data = [10, 15, 20, 25, 30];
		window.svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
		// Scale
		window.xscale = d3.scaleLinear().domain([0,xMax]).range([0, width - 100]).nice();
		window.yscale = d3.scaleLinear().domain([0,yMax]).range([height/2, 0]).nice();
		var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
		// var formatPercent = d3.format('.2%')
		window.x_axis = d3.axisBottom()
				.scale(xscale)
				.tickSize(-500)
				.tickPadding(15);

		window.y_axis = d3.axisLeft()
				.scale(yscale)
				.tickSize(-900)
				.tickPadding(15);
		// Circles
		var circles = svg.selectAll('circle')
		.data(dataset)
		.enter()
	  .append('circle')
		.attr('cx',function (d) { return xscale(d[x_axis_feature]) })
		.attr('cy',function (d) { return yscale(d[y_axis_feature]) })
		.attr('r','10')
		.attr('stroke','black')
		.attr('stroke-width',1)
		.attr('fill',function (d,i) { return colorScale(i) })
	// 	.on('mouseover', function () {
	// 	  d3.select(this)
	// 		.transition()
	// 		.duration(500)
	// 		.attr('r',20)
	// 		.attr('stroke-width',3)
	// 	})
	// 	.on('mouseout', function () {
	// 	  d3.select(this)
	// 		.transition()
	// 		.duration(500)
	// 		.attr('r',10)
	// 		.attr('stroke-width',1)
	// 	})
	//   .append('title') // Tooltip
	// 	.text(function (d) { return d.variable +
	// 						 '\nReturn: ' + formatPercent(d[x_axis_feature]) +
	// 						 '\nStd. Dev.: ' + formatPercent(d[y_axis_feature]) })

		svg.append("g").attr('class','yaxis')
		.attr("transform", "translate(50, 10)")
		.call(y_axis)
		.append('text') // y-axis Label

		var xAxisTranslate = height/2 + 10;

		svg.append("g").attr('class','xaxis')
				.attr("transform", "translate(50, " + xAxisTranslate  +")")
				.call(x_axis)
				.append('text') // X-axis Label
				// .attr('class','label')
				// .attr('y',-10)
				// .attr('x',width - 100)
				// .attr('dy','.71em')
				// .style('text-anchor','end')
				// .text('Annualized Standard Deviation')
		// y_axis_g.selectAll('.domain').remove();
		// x_axis_g.select('.domain').remove();
	}
}

function select(){
	var mylist = document.getElementById("myList");  
	x_axis_feature = mylist.options[mylist.selectedIndex].text;
	xscale.domain([0,d3.max(datas, data => data[x_axis_feature])]).nice()
	svg.selectAll("g.xaxis")
	  .transition().duration(1000)
	  .call(d3.axisBottom(xscale).tickSize(-500).tickPadding(15));
}
function select2(){
	var mylist2 = document.getElementById("myList2");  
	y_axis_feature = mylist2.options[mylist2.selectedIndex].text; 
	yscale.domain([0,d3.max(datas, data => data[y_axis_feature])]).nice()
	svg.selectAll("g.yaxis")
	  .transition().duration(1000)
	  .call(d3.axisLeft(yscale).tickSize(-900).tickPadding(15));
}