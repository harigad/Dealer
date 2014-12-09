var login = require('Login');
var args = arguments[0] || {};
var isHome = false;


if(login.isLoggedIn()){
	$.right_buttons.show();
}

Ti.App.addEventListener("loggedin",function(){
	$.right_buttons.show();
});

function logout(){
	document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	location.reload();
}

exports.setHome = function(){
	$.logo.setBackgroundImage("common/logo_40_115.png");
	isHome = true;
};

exports.setTitle = function(title){
	$.title.setText(title);
};

exports.setMenu = function(arr){
	for(var i=0;i<arr.length;i++){
		var row =  Alloy.createController("components/ui/header_menu_item",{_data:arr[i],_i:i});
		$.menu.add(row.getView());
	}
};

// add children if there are any
_.each(args.children || [], function(child) {
    $.home.add(child);
});

$.home.height = Ti.UI.SIZE; 
if(login.isLoggedIn()){
	//$.right_buttons.setVisible(true);
}


//-----------------------------------------------------
var login = require('Login');
var parentWindow;

Ti.App.addEventListener("goHome",function(e){
	if(!isHome){
		parentWindow.close();
	}
});

exports.open = function(win,callBack){
	parentWindow = win;
	if(callBack){
		_callBack = callBack;
	}
	//Ti.App.fireEvent("openWindow",win);
	parentWindow.open();
};

exports.back = function(){
	goBack();
};

function goBack(){
    //Ti.App.fireEvent("closeWindow",parentWindow);
    if(!isHome){
    	parentWindow.close();
    }
}

function goHome(){
	if(!isHome){
		if(!_callBack){
			Ti.App.fireEvent("goHome");
		}else{
			_callBack();
		}
	}
}
