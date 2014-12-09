var args = arguments[0] || {};

$.main.setPasswordMask(args.passwordMask || false);
$.main.setHintText(args._hintText);
if(args._value){
	$.main.setValue(args._value);
}

exports.getValue = function(){
	return $.main.getValue();
};

exports.setValue = function(val){
	$.main.setValue(val);
};

function onChange(e){
	$.trigger('change', e);
}

function onBlur(){
	if($.main.value === "" && args._value){
	  $.main.setValue(args._value);
	}
}