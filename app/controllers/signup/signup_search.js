var args = arguments[0] || {};

$.header.setTitle("Find Dealership");
$.header.open($.signup_search);
var _searchTimer = null;
var _rows = [];

function search(val){
	if(_rows.length < 2){
		$.results.setData({title:"searching..."});
	}
	askGoogle(val);
}

function askGoogle(val){
	var url = Alloy.Globals.dom + "signup/signup_search.php";	
	var _data;
	
	_data = {search:val};
		
	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("User.load recieved data " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.results.length > 0){
      	 	printResults(response.results);
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

function printResults(data){
   var rows = [];
   var len = 10;
   
   if(data.length<10){
   	len = data.length;
   }
   
   for(var i=0;i<data.length;i++){
   		var row = Alloy.createController("signup/signup_search_row",{_data:data[i],_callBack:function(obj){
   			openCreate(obj);
   		}});
   		rows.push(row.getView());
   }
   _rows = rows;
   $.results.setData(rows);
}

function openCreate(data){
	Alloy.createController("signup/signup_create",{_data:data,_callBack:function(username,password){
		$.header.back();
		args._callBack(username,password);
	}
	});
}

function onSubmit(){
	if(_searchTimer){
		clearTimeout(_searchTimer);
		_searchTimer = null;
	}
	search($.search.getValue());
}

function onChange(e){
	Ti.API.info("val changed = " + e.value);
	if(_searchTimer){
		clearTimeout(_searchTimer);
		_searchTimer = null;
	}
	
	if(e.value.length > 4){
		_searchTimer = setTimeout(function(){
		 search(e.value);
		},50);
	}
}
