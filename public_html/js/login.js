

function checkLogin() {


    var isLogin = isJpdbSessionTokenExists("90935802|-31948838741986566|90934273", "Employee", "user");


    if (isLogin === 200) {
        window.location.replace("dashboard.html");
    } else {
        return;
    }
}

function validateAndGetFormData() {

    var uEmailVar = $("#email").val();
    if (uEmailVar === "") {
         $("#pstatus").text("Email is Required Value");
        $("#dstatus").css('visibility', 'visible');
       
        $("#email").focus();
        return "";
    }
    var uPassVar = $("#password").val();
    if (uPassVar === "") {
        $("#pstatus").text("Password is Required Value");
        $("#dstatus").css('visibility', 'visible');
      
        $("#password").focus();
        return "";
    }

    var jsonStrObj = {
        uEmail: uEmailVar,
        uPass: uPassVar
    };
    return JSON.stringify(jsonStrObj);
}

function logIn() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var getReqStr = createGET_BY_KEYRequest("90935802|-31948838741986566|90934273"
            , "Employee", "user", jsonStr);
//            alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//   alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 200) {
        var email = $("#email").val();

        jQuery.ajaxSetup({async: false});
        var x = createJpdbSessionToken("90935802|-31948838741986566|90934273", 1, "Employee", "user", email);
        jQuery.ajaxSetup({async: true});

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;
//        alert(rec_no);

        localStorage.setItem("rec_no", rec_no);

        window.location.replace("dashboard.html");
        return;
    } else if (resultObj.status === 400) {
         $("#pstatus").text("Invalid email or password!!!");
        $("#dstatus").css('visibility', 'visible');
        return;
    } else {
       $("#pstatus").text("error!!!");
        $("#dstatus").css('visibility', 'visible');
        return;
    }

}

function sendPass() {
    var femail = $("#femail").val();
    if (femail === "") {
         $("#pstatus").text("Email is Required Value");
         $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#femail").focus();
        return;
    }
    var jsonStr = {
        uEmail: femail
    };
    jsonStr = JSON.stringify(jsonStr);

    var getReqStr = createGET_BY_KEYRequest("90935802|-31948838741986566|90934273"
            , "Employee", "user", jsonStr);
//            alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//   alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 200) {
        var temp = JSON.parse(resultObj.data);

        var record = temp.record;

        var re = temp.record;
        var pass = re.uPass;
        
        var jsonStr1={
          emailTo: femail,
        emailCc: "niharsmtp@gmail.com",
        emailBcc: "niharsmtp@gmail.com",
        emailSubject: "Your Password !!!!",
        emailContent: pass 
        };
         jsonStr1 = JSON.stringify(jsonStr1);
        var putReqStr = createEmailToSendReq("90935802|-31948838741986566|90934273", jsonStr1);
               alert(putReqStr);
        jQuery.ajaxSetup({async: false});
        var resultObj1 = executeCommandAtGivenBaseUrl(putReqStr,
                "http://api.login2explore.com:5577", "/serverless/send_email");
            
        jQuery.ajaxSetup({async: true});
        alert(JSON.stringify(resultObj1));
        if (resultObj1.status === 200) {
            $("#pstatus").text("Password send to email.");
         $("#pstatus").css('color', 'green');
        $("#dstatus").css('visibility', 'visible');
            $("#femail").val("");
            window.setTimeout(function(){
                    window.location.replace("login.html");
                },1000);
           
        } else  {
           $("#pstatus").text("error");
         $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
            $("#femail").val("");
           
        } 
    } else if (resultObj.status === 400) {
        $("#pstatus").text("Email not found");
         $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        return;
    } else {
        $("#pstatus").text("error");
         $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        return;
    }
}