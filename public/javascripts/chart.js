
	var dpsOk =[
		{ label: "Posten", y: 18 },
					{ label: "Fedex", y: 29 },
					{ label: "Schenker", y: 40 },                                    
					{ label: "Test", y: 34 } ];
	var dpsNotOk =[
				{ label: "Posten", y: 23 },
				{ label: "Fedex", y: 33 },
				{ label: "Schenker", y: 48 },                                    
				{ label: "Test", y: 37 }];
	var dpsDelay =[
				{ label: "Posten", y: 3 },
				{ label: "Fedex", y: 3 },
				{ label: "Schenker", y: 8 },                                    
				{ label: "Test", y: 7 }];

	var chart;
	
	window.onload = function () {
		chart = new CanvasJS.Chart("chartContainer", {            
			title:{
				text: "Requests processed"              
			},
			toolTip: {
		        shared: true,
		        content: function(e){
		          return toolTip(e);
		        }
		      },
			data: [{
				type: "stackedColumn",
				showInLegend:true,
				color: "rgba(40,175,101,0.6)",
				name: "OK",
				dataPoints: dpsOk
				},
			{ 
				type: "stackedColumn",
				showInLegend:true,
				color: "rgba(0,75,141,0.7)",
				name: "Not OK",                
				dataPoints: dpsNotOk
			}, 												{ 
				type: "stackedColumn",
				showInLegend:true,
				name: "Delay",                
				dataPoints: dpsDelay
			}]
		});
		chart.render();
	}


function toolTip(e) {
	var str = '';
	var total = 0 ;
	for (var i = 0; i < e.entries.length; i++){
		var  str1 = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong>  st<br/>" ; 
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	var header = "<span style='color:DodgerBlue;'><strong>"+ (e.entries[0].dataPoint.label) + "</strong></span><br/>";
	var totalElem = "<span style='color:Tomato'>Total: </span><strong>" + total + "</strong> st<br/>";		          
	return header.concat(str).concat(totalElem);
}

function updateChart(data) {
	var tData = chart.options.data;
	for (var i = 0; i < tData.length; i++) {
		var aData = tData[i];
		if (data.type.toUpperCase() === aData.name.toUpperCase()) {
			for (var j = 0; j < aData.dataPoints.length; j++) {
				var point = aData.dataPoints[j];
				if (data.id.toUpperCase() === point.label.toUpperCase()) {
					point.y = point.y + 1;
				}
			}
		}
		
	}
}