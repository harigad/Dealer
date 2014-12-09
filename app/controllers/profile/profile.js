		var login = require('Login');
		var args = arguments[0] || {};
		var _callBack = args._callBack || {};
		var _loading = false;
		
$.header.setTitle("Profile");
$.header.open($.profile);

draw();
function draw(){
  var bus = login.getBus();
  $.name.setValue(bus.name);	
  $.address.setValue(bus.address);
  $.phone.setValue(bus.phone);
  $.web.setValue(bus.web);
}

function update(){
	if($.name.getValue() !=="" && $.address.getValue() !=="" && $.phone.getValue() !=="" && $.web.getValue() !=="" ){
	    save();
	}else{
		error();
	}	
}	

function save(){
	$.btn.setText("saving...");
	
	var url = Alloy.Globals.dom + "index.php";
	var _data = {page:"profile",uid:login.getUid(),sessionid:login.getSessionId(),
		name:$.name.getValue(),
		address:$.address.getValue(),
		phone:$.phone.getValue(),
		web:$.web.getValue()
	};
		
	Ti.API.debug("profile data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("profile data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.status){
      	 	login.setBus(response.bus);
      	 	$.btn.setText("update");
      	 }else{
      	 	error();
      	 }
 	 },
 	 onerror: function(e){
 		 error();	
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);
}

exports.close = function(){
	$.profile.close();
};

function error(){
	$.btn.setText("update");
	
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0.3;
	animation.duration = 300;
	var animationHandler = function() {
  		animation.removeEventListener('complete',animationHandler);
  		animation.opacity = 1;
  		$.main.animate(animation);
	};
animation.addEventListener('complete',animationHandler);
$.main.animate(animation);
};
