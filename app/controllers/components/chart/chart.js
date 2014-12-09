var args = arguments[0] || {};
var _title = args._title || "";
var _target = args._target || null;

var _loaded = false;
var _data = null;

$.title.setText(_title);

function _onLoad(){
	_loaded = true;
	if(_data){
		_draw();
	}
}

exports.setData = function(data){
	_data = data;
	if(_loaded){
		_draw();
	}
};

function _draw(){
	$.main.evalJS("_draw('" + _target + "'," + JSON.stringify(_data) + ")");
	for(var i=0;i<_data.length;i++){
		_legend(_data[i]);
	}
}

function _legend(data){
	var row =  Alloy.createController("chart/chart_legend_row",{_data:data});
	$.legend.appendRow(row.getView());
}
