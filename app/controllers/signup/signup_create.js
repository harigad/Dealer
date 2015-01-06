var args = arguments[0] || {};
$.header.setTitle(args._data.name);
$.header.open($.signup_create);

function create(){
	var name = $.name.getValue();
	var username = $.username.getValue();
	var pass = $.pass.getValue();
	var confirm_password = $.confirm_password.getValue();
	
	if(name !=="" && username !=="" && pass !=="" && (pass === confirm_password) && isPhone(username)){
		//do nothing
	}else{
		showError();return;
	}
	
	var url = Alloy.Globals.dom + "signup/signup_create.php";	
	var _data;
	_data = {place_id:args._data.place_id,ref:args._data.reference,name:name,username:username,pass:pass};
		
	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	showError();
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.status){
      	 	$.header.back();
      	 	args._callBack(username,pass);
      	 }
 	 },
 	 onerror: function(e){
 		 showError();
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);
 		$.login_btn.setText("creating new account...");
}

function showError(){
	$.login_btn.setText("JOIN");
	
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
}

function isPhone(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}
