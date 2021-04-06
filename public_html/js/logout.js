function deleteSession() {
    var se = getJpdbSessionToken();
    jQuery.ajaxSetup({async: false});
    var x = removeSessionTokenFromJPDB("90935802|-31948838741986566|90934273", se, "Employee", "user");
    jQuery.ajaxSetup({async: true});


    if (x === 200) {
        localStorage.removeItem("rec_no");
        window.location.replace("login.html");

    } else {
        alert("error");
        return;
    }
}
function checkLogin() {
    jQuery.ajaxSetup({async: false});
    var isLogin = isJpdbSessionTokenExists("90935802|-31948838741986566|90934273", "Employee", "user");
    jQuery.ajaxSetup({async: true});

    if (isLogin === 200) {
        return;
    } else {
        window.location.replace("login.html");
    }
}


function changePass() {
    var oldpass = $("#oldpass").val();
    if (oldpass === "") {
        $("#pstatus").text("Old Password is Required Value");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#oldpass").focus();
        return;
    }
    var newpass = $("#newpass").val();
    if (newpass === "") {
        $("#pstatus").text("New Password is Required Value");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#newpass").focus();
        return;
    }
    var repass = $("#repass").val();
    if (repass !== newpass) {
        $("#pstatus").text("Password not matched ");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#repass").focus();
        return;
    }

    var rec_no = localStorage.getItem("rec_no");
//               alert(rec_no);
    var getReqStr = createGET_BY_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "user", rec_no);
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        var temp = JSON.parse(resultObj.data);



        var record = temp.record;


        var re = temp.record;
        var pass = re.uPass;
//        alert(pass);
        if (pass === oldpass) {
            var jsonStr = {
                uPass: newpass
            };
            jsonStr = JSON.stringify(jsonStr);
            var putReqStr = createUPDATERecordRequest("90935802|-31948838741986566|90934273",
                    jsonStr, "Employee", "user", rec_no);
//                alert(putReqStr);
            jQuery.ajaxSetup({async: false});
            var resultObj1 = executeCommandAtGivenBaseUrl(putReqStr,
                    "http://api.login2explore.com:5577", "/api/iml");
//            alert(JSON.stringify(resultObj));
            jQuery.ajaxSetup({async: true});
            if (resultObj1.status === 200) {
                $("#pstatus").text("Password change successfully.");
                $("#dstatus").css('visibility', 'visible');
                $("#pstatus").css('color', 'green');
                $("#newpass").val("");
                $("#oldpass").val("");
                $("#repass").val("");
                window.setTimeout(function(){
                    window.location.replace("dashboard.html");
                },1000);
            } else if (resultObj1.status === 400) {
                $("#pstatus").text("Wrong Password!!");
                $("#pstatus").css('color', 'red');
                $("#dstatus").css('visibility', 'visible');
                $("#newpass").val("");
                $("#oldpass").val("");
                $("#oldpass").focus();
                $("#repass").val("");
                return;
            } else {
                alert("error");
                return;
            }

        }



    } else if (resultObj.status === 400) {
        $("#pstatus").text("Data not Found ");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        return;
    } else {
        alert("error");
        return;
    }
}

function getUser() {
    var rec_no = localStorage.getItem("rec_no");
//               alert(rec_no);
    var getReqStr = createGET_BY_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "user", rec_no);
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {
        var temp = JSON.parse(resultObj.data);



        var record = temp.record;


        var re = temp.record;
        var email=re.uEmail;
        var name = re.uName;
        var mobile=re.uMobile;
        
        $("#uemail").val(email);
        $("#uname").val(name);
        $("#umobile").val(mobile);


    } else {
        alert("error");
        return;
    }

}


function updateUser() {
    var uname = $("#uname").val();
    if (uname === "") {
        $("#pstatus").text("Name is Required Value");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#uname").focus();
        return;
    }
    var umobile = $("#umobile").val();
    if (umobile === "") {
        $("#pstatus").text("Mobile is Required Value");
        $("#pstatus").css('color', 'red');
        $("#dstatus").css('visibility', 'visible');
        $("#umobile").focus();
        return;
    }
    var jsonStr={
        uName:uname,
        uMobile:umobile
    };
   jsonStr=JSON.stringify(jsonStr);
    var rec_no = localStorage.getItem("rec_no");
    var putReqStr = createUPDATERecordRequest("90935802|-31948838741986566|90934273",
            jsonStr, "Employee", "Emp-Rel", rec_no);
//                alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    //alert(JSON.stringify(resultObj));
    
}
