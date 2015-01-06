var args = arguments[0] || {};
var _data = args._data || {};
		
$.title.setText(_data.name);
$.address.setText(_data.formatted_address);

function onClick(){
	args._callBack(_data);
}
