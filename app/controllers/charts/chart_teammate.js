var login = require('Login');
var args = arguments[0] || {};
var _data = args._data || "";

$.header.setTitle(_data.label);
$.header.open($.chart_teammate);
draw();
function draw(){
				var data = [
				{
					value: 160,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "SMS SENT"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "CLICKED ON SMS"
				},
				{
					value: 125,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "POSTED TO FACEBOOK"
				},
				{
					value: 200,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "CLICKED ON FACEBOOK POSTS"
				}
			];


			$.chart.setData(data);
}