var domain_name = "http://172.31.10.117:7780";
var myAccount;
var myPass;
var mySess;
	$(document).ready(function () {

		// $(function(){
		// 	$('#center').find('form').each(function(){
		// 		var srcpath = $(this).attr('action');
		// 		srcpath = srcpath.replace('domain_name',domain_name);
		// 		$(this).attr('action',srcpath);
		// 	});
		// });

		// $(function(){
		// 	$('#center').find('a').each(function(){
		// 		var srcpath = $(this).attr('href');
		// 		srcpath = srcpath.replace('domain_name',domain_name);
		// 		$(this).attr('href',srcpath);
		// 	});
		// });

		// checkCookie();
	});

	$(function createLink() {
		var $dynLink = $("#dynLink");
		var cdk = $dynLink.attr("href");
		var linkTemplate = domain_name.concat(cdk);
		$(".jsCustomField").on("change", function() {
			var customLink = linkTemplate.replace("{0}", $("#var1").val())
											.replace("{1}", $("#var2").val())
											.replace("{2}", $("#var3").val());
			$dynLink.attr("href", customLink);
		});
		// $dynLink.on("click", function() {
		//     alert();
		//     return false;
		// });
	});

	// $(function createLinkPar(inputClass, linkId, inp, num) {
	// 	var inpParam = new Array();
	// 	for(var i = 0; i < num; i++) {
	// 		var $inpParam[i] = $("#" + inp + (i+1));
	// 		}
	// 	var $dynLink = $("#" + linkId);
	// 	var cdk = $dynLink.attr("href");
	// 	var linkTemplate = domain_name.concat(cdk);
	// 	$(".jsCustomField2").on("change", function() {
	// 		var customLink = linkTemplate.replace("{0}", $inpParam[0].val())
	// 										.replace("{1}", $inpParam[1].val())
	// 										.replace("{2}", $inpParam[2].val());
	// 		$dynLink.attr("href", customLink);
	// 	});
	// });

	$(function create_service_package() {
		var $input1 = $("#cspVar1"),
			$input2 = $("#cspVar2"),
			$input3 = $("#cspVar3"),
			$input4 = $("#cspVar4"),
			$dynLink = $("#cspDynLink");
		var cdk = $dynLink.attr("href");
		var linkTemplate = domain_name.concat(cdk);
		$(".cspCustomField").on("change", function() {
			var customLink = linkTemplate.replace("{0}", mySess)
											.replace("{1}", $input1.val())
											.replace("{2}", $input2.val())
											.replace("{3}", $input3.val())
											.replace("{4}", $input4.val());
			$dynLink.attr("href", customLink);
		});
	});

	$(function myLogin() {
		var $dynLink = $("#loginLink");
		var cdk = $dynLink.attr("href");
		var linkTemplate = domain_name.concat(cdk);
		$(".loginField").on("change", function() {
			var customLink = linkTemplate.replace("{0}", myAccount)
											.replace("{1}", myPass)
											.replace("{2}", mySess);
			$dynLink.attr("href", customLink);
		});
	});

	$(function myLogoff() {
		var $dynLink = $("#logoffLink");
		var cdk = $dynLink.attr("href");
		var linkTemplate = domain_name.concat(cdk);
		$(".loginField").on("change", function() {
			var customLink = linkTemplate.replace("{0}", mySess);
			$dynLink.attr("href", customLink);
		});
	});

	$(function cookieLogin() {
		var $dynLink = $("#cookieLogin");
		var cdk = "/dataservices/cdk?SP=md_adm.login_with_session({0},{1},{2},?int status)";
		var d_name = 'http://' + getCookie("username") + ':7780';
		var linkTemplate = d_name.concat(cdk);
		var customLink = linkTemplate.replace("{0}", getCookie("username"))
										.replace("{1}", getCookie("password"))
										.replace("{2}", getCookie("session"));
		$dynLink.attr("href", customLink);
	});

	$(function cookieLogoff() {
		var $dynLink = $("#cookieLogoff");
		var cdk = "/dataservices/cdk?SP=md_adm.log_off ({0}, ?, ?int status)";
		var linkTemplate = domain_name.concat(cdk);
		var customLink = linkTemplate.replace("{0}", getCookie("session"));
		$dynLink.attr("href", customLink);
	});

	function myFunction(p1, p2) {
		var temp = document.getElementById(p1).value;
		if (p1 == "myAccount") {myAccount = temp};
		if (p1 == "myPass") {myPass = temp};
		if (p1 == "mySess") {mySess = temp};
		if (p1 == "myDomain") {domain_name='http://' + temp + ':7780'};
		document.getElementById(p2).innerHTML = temp;
	};

	// cookies
	function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*60*60*1000));
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

	function checkCookie() {
	    var user=getCookie("username");
	    if (user != "") {
	        alert("Welcome again " + user);
	    } else {
	       user = prompt("Please enter your username:","");
	       if (user != "" && user != null) {
	           setCookie("username", user, 1);
	       }
	    }
	    var domain=getCookie("domain");
	    if (domain == "") {
	       domain = prompt("Please enter domain:","");
	       if (domain != "" && domain != null) {
	           setCookie("domain", domain, 1);
	       }
	    }
	    var password=getCookie("password");
	    if (password == "") {
	       password = prompt("Please enter password:","");
	       if (password != "" && password != null) {
	           setCookie("password", password, 1);
	       }
	    }
	    var session=getCookie("session");
	    if (session == "") {
	       session = prompt("Please enter session:","");
	       if (session != "" && session != null) {
	           setCookie("session", session, 1);
	       }
	    }
	}

	function deleteCookies() {
	    var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	        var cookie = cookies[i];
	        var eqPos = cookie.indexOf("=");
	        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}

