		var args = arguments[0] || {};
		var _data = args._data || {};
		var _callBack = args._callBack;

 $.color.setBackgroundColor(_data.color);
 
 var _label = _data.label;
 $.label.setText(_label.toUpperCase());
