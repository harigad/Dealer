var login = require('Login');

$.header.setTitle("Dashboard");
$.header.setHome();

Ti.App.addEventListener("loggedin",function(){
	$.header.setTitle(login.getBus().name);
});

exports.init = function(){
	load();
};

function load(){
	var url = Alloy.Globals.dom + "index.php";
	var _data = {page:"home",uid:login.getUid(),sessionid:login.getSessionId()};
		
	Ti.API.debug("home data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("home data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response){
      	 	draw(response);
      	 }
 	 },
 	 onerror: function(e){
 		 	
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);
}	
	
function draw(_data){
	var data;
		
			data = [
				{
					value: parseInt(_data.sent),
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "SMS SENT"
				},
				{
					value: parseInt(_data.clicked),
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "CLICKED ON SMS"
				},
				{
					value: parseInt(_data.posted),
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "POSTED TO FB"
				},
				{
					value: parseInt(_data.viewed),
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "CLICKED POST ON FB"
				}
			];
			
			if(!_data.sent || _data.sent == 0 || _data.sent == "0"){
				data.unshift({
					value: 1,
					color:"#aaa",
					highlight: "#FF5A5E",
					label: "NO DATA YET"
					}
				);
			}
			
			$.all.setData(data);
}

function launchProfile(){
	var pleaseWait = Alloy.createController("profile/profile");
}

function launchTeam(){
	var pleaseWait = Alloy.createController("team/team");
}