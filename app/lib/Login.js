var user = {};
var main;
var fb = Ti.Facebook;
var login_screen;
var friendsCars;
var _openWin;
var _closeWin;
var pleaseWait = Alloy.createController("components/pleasewait");
var _bus;
var _team;
var _sessionid;
var _uid;

	fb.appid = '374335169286433';
	fb.permissions = ['email'];
	fb.forceDialogAuth = false;
	
	
exports.getUid = function(){
	return _uid;
};

exports.getSessionId = function(){
	return _sessionid;
};
	
exports.openWindow = function(win){
	_openWin(win);
};

exports.closeWindow = function(win){
	_closeWin(win);
};

exports.init = function(_callBack,openWin,closeWin){
	if(openWin){
		_openWin = openWin;
		_closeWin = closeWin;
	}
	
	if(loggedIn()){
		hide(_callBack);
	}else{
		authorize(null,null,_callBack);
	}
};

exports.go = function(_type,_data){
	var url = "";
	var _dataStr = "";
	try{
		_dataStr = JSON.stringify(_data);
	}catch(e){
		_dataStr = "";
	}
	
	url = "page=" + _type + "&data=" + _dataStr;
	window.location.hash = url;
};

exports.updateUrl = function(_type,_data){
	var url = "";
	var _dataStr = "";
	try{
		_dataStr = JSON.stringify(_data);
	}catch(e){
		_dataStr = "";
	}
	
	url = "page=" + _type + "&data=" + _dataStr;
	Ti.App.currentHash = url;
};


exports.url = function(){
	var hash = window.location.hash;
		hash = hash.replace("#","");
	var vars = hash.split("&");
	var output = {};
		for(var i=0;i<vars.length;i++){
			var splits = vars[i].split("=");
			if(splits.length>1){
				output[splits[0]] = splits[1]; 
			}
		}
	return output;
};


exports.isUser = function(obj){
	if(user.uid === obj.uid){
		return true;
	}else{
		return false;
	}
};

exports.isAdmin = function(pid){
	if(loggedIn() && user){
		var places = user.places;
			for(var i=0;i<places.length;i++){
				if(pid == places[i].pid){//} && places[i].role_id == 1){
					return true;
				}	
			}
	}
	return false;
};

exports.isLoggedIn = function(){
	return loggedIn();	
};

var _loginStatus = false;
function loggedIn(){
	return _loginStatus;
};

exports.getAccessToken = function(){
	return fb.getAccessToken();
};

exports.setTeam = function(data){
	_team = data;
};

exports.getTeam = function(){
	return _team || [];
};



exports.setBus = function(data){
	_bus = data;
};

exports.getBus = function(){
	return _bus || {};
};

function authorize(user,pass,_callBack){
	var url = Alloy.Globals.dom + "auth/login.php";	
	var _data;
	
	if(user && pass){
	  _data = {username:user,pass:pass};
	}else{
		_data = {uid:getCookie("uid"),sessionid:getCookie("sessionid")};
	}
		
	Ti.API.debug("User.load sending data - " + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("User.load recieved data " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.error){
      	 	show(_callBack);
      	 }else{
      	   _loginStatus = true;
      	   _uid = response.uid;
      	   _sessionid = response.sessionid;
      	   _bus = response.bus;
      	   _team  = response.team;
      	   	setCookie("uid",response.uid,1);
      	   	setCookie("sessionid",response.sessionid,1);
      	   _bus = response.bus;
      	   Ti.App.fireEvent("loggedin");
      	   hide(_callBack);
      	 }
 	 },
 	 onerror: function(e){
 		 	show();
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);
}

exports.ownsModel = function(moid){
	return _ownsModel(moid);
};

function _ownsModel(moid){
	var cars = _getCars();
	for(var i=0;i<cars.length;i++){
		if(cars[i].moid == moid){
			return true;
		}
	}
	return false;
};

function hasCars(){
	if(_getCars().length >0){
		return true;
	}else{
		return false;
	} 
}

exports.getCars = function(){
	return _getCars();
};

function _getCars(){
	return user.cars || [];
};

function onLogin(_callBack){
	if(fb.getAccessToken()){
		if(login_screen){
			login_screen.loading();
		}
		loadUser(_callBack);
	}else{
		login_screen.lock();
		fb.logout();
	}
}	

function hide(callBack){
	callBack();
	if(login_screen){
		login_screen.close();
		login_screen = null;
	}
}

function show(callBack){
	if(login_screen){
		login_screen.error();
	}else{
		login_screen =  Alloy.createController("login/login_screen",{_callBack:function(username,password){
			authorize(username,password,callBack);
		}});
	}
}

exports.setUser = function(_user){
	user = _user;
};

exports.getUser = function(){
	return user;
};

exports.setFeed = function(_flairs){
	Ti.API.info("login.setFeed");
	user.setFeed(_flairs);
};

exports.setCars = function(cars){
	user.cars = cars || [];
	Ti.App.fireEvent('cars_updated',cars);
};

exports.getPlate = function(){
	return user.plate;	
};

exports.setPlate = function(plate){
	user.plate = plate;
};

exports.getPlate = function(){
	return user.plate;	
};

function launchSignup(_callBack){
	var signup =  Alloy.createController("signup/signup",{_callBack:_callBack});
}

exports.getFriends = function(callBack,errBack){
	fb.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
    if (e.success) {
    	var friends = JSON.parse(e.result);
        callBack(friends.data);
    } else if (e.error) {
        errBack(e.error);
    } else {
        errBack('Unknown response');
    }
});

};

exports.getRequests = function(){
	return user.requests || [];
};

exports.setRequests = function(requests){
	user.requests = requests;
};

exports.getNotices = function(){
	return user.notices || [];
};

exports.setNotices = function(notices){
	user.notices = notices;
};

exports.setFriendsCars = function(cars){
	friendsCars = cars || [];
	Ti.App.fireEvent('friends_cars_updated',friendsCars);
};

exports.getFriendsCars = function() {
	return friendsCars || [];
};

exports.getFriendsWithModel = function(moid){
	var counts = [];
	for(var i=0;i<friendsCars.length;i++){
		if(moid == friendsCars[i].moid){
			counts.push(friendsCars[i]);
		}
	}
	
	return counts;
};

exports.canSeeModel = function(moid){
	if(_ownsModel(moid)){
		return true;
	}

	for(var i=0;i<friendsCars.length;i++){
		if(moid == friendsCars[i].moid){
			return true;
		}
	}
	
	return false;
};

exports.openPleaseWait = function(){
	pleaseWait.open();
};	

exports.closePleaseWait = function(){
	pleaseWait.close();
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
}