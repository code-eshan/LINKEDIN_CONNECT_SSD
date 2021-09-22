var request = require('request');

var FIRSTNAME,LASTNAME,EMAIL,ACCESSTOKEN,PROFILEID,DISPLAYPICTURE_LINK;

function callMeAPI(accessToken, done){
	request.get({url:"https://api.linkedin.com/v2/me",headers:{"Authorization": "Bearer "+accessToken}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}

function callEmailAPI(accessToken, done){
	request.get({url:"https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",headers:{"Authorization": "Bearer "+accessToken}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}

function getDisplayPicture(accessToken, done){
	request.get({url:"https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))",headers:{"Authorization": "Bearer "+accessToken}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}


function main(authCode, done){
	getAccessToken(authCode,function(err, res){
		if (err) {done(err)}
		else{
			var access_token = res.access_token;
			callMeAPI(access_token,function(err, res){
				if (err) {done(err)}
				else{
					FIRSTNAME = res.localizedFirstName;
					LASTNAME = res.localizedLastName;
					PROFILEID = res.id;
					ACCESSTOKEN = access_token;
					callEmailAPI(access_token,function(err, res){
						if (err) {done(err)}
						else{
							EMAIL = res.elements[0]["handle~"].emailAddress;
							
							getDisplayPicture(access_token,function(err,res) {
								if(err) {done(err)}
								else {
									DISPLAYPICTURE_LINK = res.profilePicture["displayImage~"].elements[3].identifiers[0].identifier;
									done(null,"success");
								}
							});
						}
					});
				}
			});
		}
	});
}

function getAccessToken(authCode, done){
	request.post({url:"https://www.linkedin.com/oauth/v2/accessToken",form:{
		grant_type:'authorization_code',
		code:authCode,
		redirect_uri:"https://gtn8uomt6i.execute-api.us-east-2.amazonaws.com/default/linkedin-connect",
		client_id:"78xsv6k3u0sqcr",
		client_secret:"ITpEniGVXDenk8z3",
	}}, function(err,res,responseBody){
		if (err) {
			console.log(err);
			done(err,null); 
		}
		else {
			console.log(responseBody);
			done(null,JSON.parse(responseBody)); 
		}
	});
}

exports.handler = (event, context, callback) => {
	const done = (err, res) => callback(null, {
		statusCode: err ? '400' : '302',
		body: err ? err.message : JSON.stringify({"name":"eeshan"}),
		headers: {
			'Location': 'https://linkedin-connect-post.herokuapp.com?ACCESSTOKEN='+ACCESSTOKEN+'&FIRSTNAME='+FIRSTNAME+'&LASTNAME='+LASTNAME+'&PROFILEID='+PROFILEID+'&EMAIL='+EMAIL+"&LINK&DISPLAYPICTURE="+DISPLAYPICTURE_LINK,
			'Content-Type': 'text/html',
			'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
			'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
			'Access-Control-Allow-Origin': '*'
		},
	});
	if (event){
		switch (event.httpMethod) {
			case 'GET':
				if (event && event.queryStringParameters && event.queryStringParameters.code && event.queryStringParameters.state){ 
					var state = decodeURIComponent(event.queryStringParameters.state);
					var code = decodeURIComponent(event.queryStringParameters.code);
					main(code, done);
				} else {
					console.log("ERROR:  Malformed query parameters. Expected code and state.");
					done(new Error('<h1>Something went wrong. Please go back and use the email signup instead.</h1>'));  
				}
        	break;
		}
	}
}
