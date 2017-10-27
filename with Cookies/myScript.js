// var domain_name = "http://172.31.10.117:7780/dataservices/cdk?SP=";
var domain_name;
var myAccount;
var myPass;
var mySess;
var cdkArray;

var texts = [];

	$(document).ready(function () {
		checkCookie();
		cookiesToVar();
		insertHistory();
	});

	$(function pasteGo() {
		$('#pasteGo').on('submit', function() {
			var temp = [];
			if (getCookie("history") != "") {
				temp = getCookie("history").split('\),');
				if (temp.length > 10){
					temp.shift();
				}
				for (var i = 0; (i < temp.length - 1); i++) {
					temp[i] = temp[i] + '\)';
				}
			};
			var newItem = $('#pasteCDK').val().replace(/\s+$/g, "");;
			if (temp.indexOf(newItem) === -1) {
				temp.push(newItem);
			};
			setCookie("history", temp);
		    // var formAction = $('#pasteGo').attr('action');
		    $('#pasteGo').attr('action', domain_name + '/dataservices/cdk?');
		});
	});

	$(function cookieLogin() {
		var $dynLink = $("#cookieLogin");
		var cdk = "md_adm.login_with_session({0},{1},{2},?int status)";
		var linkTemplate = domain_name.concat(cdk);
		var customLink = linkTemplate.replace("{0}", getCookie("username"))
										.replace("{1}", getCookie("password"))
										.replace("{2}", getCookie("session"));
		$dynLink.attr("href", customLink);
	});

	$(function cookieLogoff() {
		var $dynLink = $("#cookieLogoff");
		var cdk = "md_adm.log_off ({0}, ?, ?int status)";
		var linkTemplate = domain_name.concat(cdk);
		var customLink = linkTemplate.replace("{0}", getCookie("session"));
		$dynLink.attr("href", customLink);
	});

	// cookies
	function setCookie(cname,cvalue) {
		var exhours = 2;
		var d = new Date();
		d.setTime(d.getTime() + (exhours*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function promptCookie(cname, bool) {
		var tempCookie=getCookie(cname);
		if (bool && tempCookie != "") {
			alert("Welcome again " + tempCookie);
		}
		if (tempCookie == "") {
			tempText = prompt("Please enter " + cname + ":","");
			if (tempText != "" && tempText != null) {
				setCookie(cname, tempText);
			}
		}
	}

	function checkCookie() {
		promptCookie("username", true);
		promptCookie("password", false);
		promptCookie("session", false);
		promptCookie("domain", false);
	}

	function cdkCookies(cdkName, cdkPackage) {
		setCookie("cdkName", cdkName);
		setCookie("cdkPackage", cdkPackage);
	}

	function cookiesToVar() {
		domain_name = 'http://' + getCookie("domain") + ':7780/dataservices/cdk?SP=';
		myAccount = getCookie("username");
		myPass = getCookie("password");
		mySess = getCookie("session");
	}

	function deleteCookies() {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
	// end cookies
	
	function insertHistory(){
		if (getCookie("history") != "") {
			texts.push(getCookie("history").split('\),'));
		};
		var history = document.getElementById("history");
		if (history != null) {
			if (texts.length == 0) {
				var p = document.createElement("p");
				var pText = document.createTextNode("No History");
				p.appendChild(pText);
				history.appendChild(p);
			} else {
				for (var i = 0; i < texts[0].length -1; i++) {
					var linkName = texts[0][i] + '\)';

					var link = document.createElement("a");
					link.href = domain_name + linkName;
					link.innerHTML = linkName;

					var br = document.createElement("br");
			    	history.appendChild(br);
			    	history.appendChild(link);
				};
			};
		}
	}

	function createPopup(cdkName, cdkPackage) {
		var res = cdkName.toLowerCase();
		res = res.replace(/ /g, "_");
	        if (myObj.hasOwnProperty(cdkPackage)) {
	        	tempCdkArray = myObj[cdkPackage];
	        	if (tempCdkArray.hasOwnProperty(res)) {
	        		cdkArray = tempCdkArray[res];
	        	} else {
	        		alert("No such cdk: " + res + " in CDK Package: " + cdkPackage + " in cdks.js");
	        	return;
	        	}
	        } else {
	        	alert("No such CDK Package: " + res + " and cdk: " + cdkName + " in cdks.js");
	        	return;
	        }
	    // }
		// var popup = window.open('form.html', 'newtab');
		// popup.document.open();
		var doc = document;
		// var args = [].slice.call(arguments);
		// popup.onload = function(args) { 
			// var div = doc.createElement("div");
			var fieldset = document.getElementById("myFieldset");
			// var div = window.open("form.html", "CDK Form").document.getElementById("myDiv");
			// div.id = 'block';
			// div.className = 'block';

			var argSize = (cdkArray.length - 1);
			var legendLinkName = cdkName;

		    // var form = doc.createElement("form");
		    // var fieldset = doc.createElement("fieldset");
			var br = doc.createElement("br");
		    var table = doc.createElement("table");
		    var p = doc.createElement("p");

		    
		    var radio2 = doc.createElement("input"); 
		    // var r2Text = doc.createTextNode("Text2");
		    radio2.name="fillWith";
		    radio2.type="radio";
		    radio2.value="Quotation";
		    radio2.innerHTML = "Text2";

		    var legend = doc.createElement("legend");
		    var legendText = doc.createTextNode(legendLinkName);
		    var link = doc.createElement("a");
		    var linkText = doc.createTextNode(legendLinkName);
		    link.appendChild(linkText);
		    legend.appendChild(legendText);
		    fieldset.appendChild(legend);
		    // form.appendChild(fieldset);
		    var myBraces = "";
		    for (var i = 0; i < argSize; i++) {
		    	myBraces = myBraces + "{" + i + "},"
		    };
		    var tempCDKLink = domain_name +cdkArray[argSize] + "(" + myBraces +"?int status)";
		    link.href = tempCDKLink;
		    // md_cdk.create_service_package
		    // md_cdk.create_service_package({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},?int status)
		    link.setAttribute("onclick", "runCDK("+ argSize +");");
		    link.id = 'runCDKLink';
		    // form.method = "GET";
		    // form.action = "";   

		    for (var i = 0; i < argSize; i++) {
				createInput(doc, table, cdkArray[i], i);
			}
		    fieldset.appendChild(table);
		    fieldset.appendChild(br);
		    fieldset.appendChild(link);

		    // popup.document.body.appendChild(form);
		    // div.appendChild(form);
		    // window.open("form.html", "CDK Form").document.write('<div>Text</div>');
			// doc.body.appendChild(div);
			// doc.getElementsByTagName("body")[0].appendChild(div);
			// doc.close();
			// var filerefjs = popup.document.createElement("script");
			// // filerefjs.setAttribute("type", "text/javascript");
			// filerefjs.setAttribute("src", "/home/cvetan/Documents/Minerva/CDK_check/with Cookies/myScript.js");

			// var filerefjq = popup.document.createElement("script");
			// filerefjq.setAttribute("src", "http://code.jquery.com/jquery-1.11.0.min.js");

			// popup.document.head.append(filerefjs);
			// popup.document.head.append(filerefjq);

		// };
	}


	function createInput(doc, table, inputName, num) {
		var myInput = doc.createElement("input"); 
	    myInput.name=inputName;
	    myInput.type="text";
	    var tr = doc.createElement("tr");
	    var td1 = doc.createElement("td");
	    var td2 = doc.createElement("td");
		if (inputName == 'username') {
			myInput.value= myAccount;
		};
		if (inputName == 'password') {
			myInput.value= myPass;
		};
		if (inputName == 'sessionID') {
			myInput.value= mySess;
		};
		myInput.className = 'cdkTextInput';
		myInput.id = 'inVar' + num;
	    td1.innerHTML = inputName + ": ";
	    td1.className='lColumn';
	    td2.appendChild(myInput);
	    tr.appendChild(td1);
	    tr.appendChild(td2);
	    table.appendChild(tr);
	}

	// function createInput2(doc, form, fieldset, inputName, num) {
	// 	var myInput = doc.createElement("input"); 
	//     var myInputLabel = doc.createElement("label");
	//     var br = doc.createElement("br");
	// 	myInputLabel.innerHTML = inputName + ": ";
	//     myInput.name=inputName;
	// 	if (inputName == 'username') {
	// 		myInput.value= myAccount;
	// 	};
	// 	if (inputName == 'password') {
	// 		myInput.value= myPass;
	// 	};
	// 	if (inputName == 'sessionID') {
	// 		myInput.value= mySess;
	// 	};
	// 	myInput.className='cspCustomField';
	// 	myInput.id='cspVar' + num;
	//     myInputLabel.appendChild(myInput);  
	//     fieldset.appendChild(myInputLabel);
	//     fieldset.appendChild(br);
	//     form.appendChild(fieldset);
	// }
	// 
	

function createCDKFieldset() {
			var service_package;
			var cdk_name;
			var par = document.getElementById("cdkForms");

			for(var property in myObj) {
				service_package = property;
				
				var fieldset = document.createElement("fieldset");
				var legend = document.createElement("legend");
				var legendText = document.createTextNode(service_package);
				var br = document.createElement("br");
				legend.appendChild(legendText);
				fieldset.appendChild(legend);
			    
			    for(var prop in myObj[property]) {
			        cdk_name = prop;
					createCDKLinks(fieldset, service_package, cdk_name);
			    }
			par.appendChild(fieldset);
			par.appendChild(br);
			}
			
		}

		function createCDKLinks(fieldset, service_package, cdk_name) {
			cdk_name = toTitleCase(cdk_name);
			var br = document.createElement("br");
			var link = document.createElement("a");
			link.href = "form.html";
			link.target = "_blank";
			link.setAttribute("onclick", "cdkCookies(this.innerHTML, this.getAttribute('data-link'));");
			link.setAttribute("data-link", service_package);
			link.innerHTML = cdk_name;
			fieldset.appendChild(link);
			fieldset.appendChild(br);
		}

		function toTitleCase(str){
			str = str.replace(/_/g, " ");
		    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}