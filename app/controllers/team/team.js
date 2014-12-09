var login = require("Login");	
		var args = arguments[0] || {};
		var _callBack = args._callBack || {};
		var _loading = false;
		
$.header.setTitle("Team");
$.header.open($.team);
drawteam();
function add(){
	var team = login.getTeam();
	var name = $.name.getValue();
	var mobile = $.mobile.getValue();
	
	if(isPhone(mobile) && name!==""){
		for(var i=0;i<team.length;i++){
			if(team[i].mobile == mobile){
				error();
				return;
			}		
		}
		
		team.unshift({name:name,mobile:mobile});
		drawteam();
		save({action:"add",name:name,mobile:mobile});
	}else{
		error();
	}
}

function save(data){
	var url = Alloy.Globals.dom + "index.php";
	var _data = {page:"team",uid:login.getUid(),sessionid:login.getSessionId(),
		action:data.action,
		name:data.name,
		mobile:data.mobile
	};
		
	Ti.API.debug("team save data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("team save data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.status){
      	 	//do nothing
      	 }else{
      	 	//show appropriate error
      	 }
 	 },
 	 onerror: function(e){
 		//show appropriate error
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);	
	
}

function drawteam(){
	var team = login.getTeam();
	
	while($.teammates.children.length>0){
		$.teammates.remove($.teammates.children[0]);
	}

	var hideRemove = false;
    if(team.length  < 2 ){
    	hideRemove = true;
    }
  	for(var i=0;i<team.length;i++){
  		var t =  Alloy.createController("team/teammate",{_data:team[i],hideRemove:hideRemove,
  		_remove: function(data){removeTeammate(data);}	
  		});
  		$.teammates.add(t.getView());
  	}
}

function removeTeammate(data){
	var team = login.getTeam();
		for(var i=0;i<team.length;i++){
  			if(team[i].mobile == data.mobile){
  				team.splice(i,1);
  			}
  		}
  		drawteam();
  		save(data);
}

exports.close = function(){
	$.profile.close();
};

function error(){
	$.btn.setText("add");
	
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

function isPhone(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}
