var login = require('Login');
var args = arguments[0] || {};
var _data = args._data || "";

$.header.setTitle(_data.label);
$.header.open($.chart_groups);
draw();

function draw(){
			var data = [
				{
					value: 70,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "INFINITI G37"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "INFINITI QX80"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "INFINITI M37"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "INFINITI FX35"
				}
			];

			$.cars.setData(data);
			
			
			var datas = [
				{
					value: 10,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "JAMES MATHER"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "MICHAEL BELL"
				},
				{
					value: 18,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "CARRIE PARTICK"
				},
				{
					value: 3,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "STEPHANIE PASTOR"
				}
			];
			$.team.setData(datas);
}


