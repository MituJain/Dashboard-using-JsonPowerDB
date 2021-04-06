

var lastId;

function resetForm() {
    $("#empId").prop("disabled", false);
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#next").prop("disabled", false);
    $("#last").prop("disabled", false);

    var rec_no = localStorage.getItem(lastId);
//                alert(rec_no);
    var getReqStr = createGET_BY_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel", rec_no);
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;


        var record = temp.record;


        var re = temp.record;
        var n = re.empName;
        var e = re.empEmail;
        var id = re.empId;
        $("#empId").val(id);
        $("#empName").val(n);
        $("#empEmail").val(e);

        localStorage.setItem(id, rec_no);
        $("#empNew").prop("disabled", false);
        $("#empChange").prop("disabled", true);
        $("#empEdit").prop("disabled", false);
        $("#empSave").prop("disabled", true);
        $("#empReset").prop("disabled", true);
        $("#empId").prop("disabled", true);
        $("#empName").prop("disabled", true);
        $("#empEmail").prop("disabled", true);




        return;
    } else if (resultObj.message === "EOF") {
//                    alert("data not found");
        $("#first").prop("disabled", false);
        $("#prev").prop("disabled", false);
        $("#next").prop("disabled", true);
        $("#last").prop("disabled", true);
        return;
    } else {
        alert("error");
        return;
    }

}

function validateAndGetFormData() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
        alert("Employee ID Required Value");
        $("#empId").focus();
        return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
        alert("Employee Name is Required Value");
        $("#empName").focus();
        return "";
    }
    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") {
        alert("Employee Email is Required Value");
        $("#empEmail").focus();
        return "";
    }
    var jsonStrObj = {
        empId: empIdVar,
        empName: empNameVar,
        empEmail: empEmailVar
    };
    return JSON.stringify(jsonStrObj);
}

function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90935802|-31948838741986566|90934273",
            jsonStr, "Employee", "Emp-Rel");
//                alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});


    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#empId").prop("disabled", true);
    $("#empName").prop("disabled", true);
    $("#empEmail").prop("disabled", true);
    getLast();
}

function updateEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var id = $("#empId").val();
    var rec_no = localStorage.getItem(id);
    var putReqStr = createUPDATERecordRequest("90935802|-31948838741986566|90934273",
            jsonStr, "Employee", "Emp-Rel", rec_no);
//                alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#empId").prop("disabled", false);
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#next").prop("disabled", false);
    $("#last").prop("disabled", false);
    $("#empId").prop("disabled", true);
    $("#empName").prop("disabled", true);
    $("#empEmail").prop("disabled", true);
    lastid = id;
}

function newEmployee() {
    $("#first").prop("disabled", true);
    $("#prev").prop("disabled", true);
    $("#next").prop("disabled", true);
    $("#last").prop("disabled", true);
    $("#empNew").prop("disabled", true);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", true);
    $("#empSave").prop("disabled", false);
    $("#empReset").prop("disabled", false);

    $("#empId").val("");
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").prop("disabled", false);
    $("#empName").prop("disabled", false);
    $("#empEmail").prop("disabled", false);
    $("#empId").focus();


}

function editEmployee() {
    $("#first").prop("disabled", true);
    $("#prev").prop("disabled", true);
    $("#next").prop("disabled", true);
    $("#last").prop("disabled", true);
    $("#empNew").prop("disabled", true);
    $("#empChange").prop("disabled", false);
    $("#empEdit").prop("disabled", true);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", false);

    $("#empId").prop("disabled", true);
    $("#empName").prop("disabled", false);
    $("#empEmail").prop("disabled", false);
    $("#empName").focus();



}

function getFirst() {
    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#first").prop("disabled", true);
    $("#prev").prop("disabled", true);
    $("#next").prop("disabled", false);
    $("#last").prop("disabled", false);
    var getReqStr = createFIRST_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel");
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;


        var record = temp.record;


        var re = temp.record;
        var n = re.empName;
        var e = re.empEmail;
        var id = re.empId;
        $("#empId").val(id);
        $("#empName").val(n);
        $("#empEmail").val(e);

        localStorage.setItem(id, rec_no);
        lastId = id;



        return;
    } else if (resultObject.status === 400) {
        alert("data not found");
        return;
    } else {
        alert("error");
        return;
    }
}

function getLast() {
    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#next").prop("disabled", true);
    $("#last").prop("disabled", true);
    var getReqStr = createLAST_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel");
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;


        var record = temp.record;


        var re = temp.record;
        var n = re.empName;
        var e = re.empEmail;
        var id = re.empId;
        $("#empId").val(id);
        $("#empName").val(n);
        $("#empEmail").val(e);

        localStorage.setItem(id, rec_no);
        lastId = id;



        return;
    } else if (resultObject.status === 400) {
        alert("data not found");
        return;
    } else {
        alert("error");
        return;
    }
}

function getPrev() {
    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#next").prop("disabled", false);
    $("#last").prop("disabled", false);
    var empId = $("#empId").val();
    var rec_no = localStorage.getItem(empId);
    var getReqStr = createPREV_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel", rec_no);
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;


        var record = temp.record;


        var re = temp.record;
        var n = re.empName;
        var e = re.empEmail;
        var id = re.empId;
        $("#empId").val(id);
        $("#empName").val(n);
        $("#empEmail").val(e);

        localStorage.setItem(id, rec_no);
        lastId = id;



        return;
    } else if (resultObj.message === "BOF") {
//                    alert("data not found");
        $("#first").prop("disabled", true);
        $("#prev").prop("disabled", true);
        $("#next").prop("disabled", false);
        $("#last").prop("disabled", false);
        return;
    } else {
        alert("error");
        return;
    }


}
function getNext() {
    $("#empNew").prop("disabled", false);
    $("#empChange").prop("disabled", true);
    $("#empEdit").prop("disabled", false);
    $("#empSave").prop("disabled", true);
    $("#empReset").prop("disabled", true);
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#next").prop("disabled", false);
    $("#last").prop("disabled", false);
    var empId = $("#empId").val();
    var rec_no = localStorage.getItem(empId);
    var getReqStr = createNEXT_RECORDRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel", rec_no);
//                alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//                alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200) {

        var temp = JSON.parse(resultObj.data);

        var rec_no = temp.rec_no;


        var record = temp.record;


        var re = temp.record;
        var n = re.empName;
        var e = re.empEmail;
        var id = re.empId;
        $("#empId").val(id);
        $("#empName").val(n);
        $("#empEmail").val(e);

        localStorage.setItem(id, rec_no);
        lastId = id;



        return;
    } else if (resultObj.message === "EOF") {
//                    alert("data not found");
        $("#first").prop("disabled", false);
        $("#prev").prop("disabled", false);
        $("#next").prop("disabled", true);
        $("#last").prop("disabled", true);
        return;
    } else {
        alert("error");
        return;
    }


}
function getRecord(id) {
    var jsonStr = JSON.stringify({empId: id});
    var getReqStr = createGET_BY_KEYRequest("90935802|-31948838741986566|90934273"
            , "Employee", "Emp-Rel", jsonStr);
    //alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    return resultObj;

}

$("document").ready(getLast());


