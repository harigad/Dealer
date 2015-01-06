	var args = arguments[0] || {};
	var _remove = args._remove || {};

$.name.setText(args._data.name);
$.mobile.setText(format_phone(args._data.mobile));

if(args.hideRemove){
	$.remove.hide();
}

function remove(){
	var dialog = Ti.UI.createAlertDialog({
    	buttonNames: ["Yes","Cancel"],
    	title: 'Remove ' + args._data.name + "?"
  	});
  	
  	dialog.addEventListener('click', function(e){
    if (e.index === 0){
      _remove(args._data);
    }else{
     dialog.close();	
    }
   });
  dialog.show();
}

function format_phone(phone){
 	return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
}