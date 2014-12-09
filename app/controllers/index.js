var login = require("Login");
var _url = login.url();
var nav;

login.init(function(){
    $.index.open();
    $.home.init();
},

function(win){
	win.open();
	//$.nav.open(win);
},
function(win){
	win.close();
	//$.nav.close(win);
}
);

Ti.App.addEventListener("launchWindow",function(evt){
	//var win = Alloy.createController(evt.target,{_data:evt.data});
	//window.location = "/index.html#" + evt.target;	
});

