		var args = arguments[0] || {};
		var _callBack = args._callBack || {};
		var _loading = false;
		
$.header.setHome();
$.header.setTitle("Login");
$.header.open($.login_screen);

function getAccess(){
	$.login_btn.setText("logging in...");
	_callBack($.username.getValue(),$.password.getValue());
}

function goToSignup(){
	Alloy.createController("signup/signup_search",{_callBack:function(username,password){
		$.username.setValue(username);
		$.password.setValue(password);
		getAccess();
	}});	
}

exports.close = function(){
	$.login_screen.close();
};

exports.error = function(){
	$.login_btn.setText("login");
	
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