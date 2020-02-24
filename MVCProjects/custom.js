var WaitUI = function () {
    var divWaitMessage = $('<div id="WaitMessage" style="display:none"><button class="btn"><i class="icon-refresh icon-spin icon-2x"></i> Please wait...</button></div>');
    $("body").append(divWaitMessage);
    

    var obj = {
        message: $('#WaitMessage'),
        css: {
            border: 'none',
            backgroundColor: 'none',
            top: ($(window).height() - 100) / 2 + 'px',
            left: ($(window).width() - 100) / 2 + 'px',
            width: '100px'
        }
    };
    $.blockUI(obj);
    //return obj;
};

//This DisplayError function is used to display error.
var DisplayError = function(xhr) {
    try {
        if (xhr.responseText != '') {
            var msg = JSON.parse(xhr.responseText);
            CASH_Alert.error({ title: 'Error', text: msg.Message });
        }
    }
    catch (exception) {
        CASH_Alert.error({ title: 'Error', text: xhr.responseText });
    }
};


//This function is used to check for strong password with regex expression.
var IsStrongPassword = function(txtPassword) {
    var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@@$!%*?&#^])[A-Za-z\d$@@$!%*?&#^]{8,}/);
    return pattern.test(txtPassword);
};

//This function is used to confirm the password.
var IsPasswordMatchConfirmPassword = function(txtPassword, txtConfirmPassword) {
    if (txtPassword == txtConfirmPassword)
        return true;
    else {
        return false;
    }
};

var IsValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
    return pattern.test(emailAddress);
};

var jAjaxCall = function (method, url, querystring, returnType, header, callBackFunction) {
    WaitUI();
    var headerObject = header;
    headerObject["AuthorizationToken"] = localStorage.getItem('auth-token');
    var contenttype = IsEmptyOrNull(returnType) ? 'application/x-www-form-urlencoded; charset=UTF-8' : returnType;
    $.ajax({
        url: url,
        type: method,
        data: querystring,
        datatype: 'json',
        headers: headerObject,
        cache: false,
        contentType: contenttype,
        success: function (response, textStatus, jqXHR) {
           setTimeout($.unblockUI(), 2000);
            if (jqXHR.status >= 200 && jqXHR.status < 400) {
                var newToken = jqXHR.getResponseHeader('Set-Authorization');
                if (IsEmptyOrNull(newToken)) {
                    window.location.href = "/Account/Login";
                } else {
                    localStorage.setItem('auth-token', newToken);
                }
            } else {
                window.location.href = "/Account/Login";
            }
            if (response.OK != undefined && response.OK == false) {
                CASH_Alert.error({ title: 'Error', text: response.Message });
            } else {
                if (callBackFunction != undefined) {
                    eval(callBackFunction)(response);
                } else {
                    return response;
                }
            }
        }
    });
};

var jAjaxCallWithoutTokenRefresh = function (method, url, querystring, returnType, header, callBackFunction) {
    WaitUI();
    var headerObject = header;
    headerObject["AuthorizationToken"] = localStorage.getItem('auth-token');
    var contenttype = IsEmptyOrNull(returnType) ? 'application/x-www-form-urlencoded; charset=UTF-8' : returnType;
    $.ajax({
        url: url,
        type: method,
        data: querystring,
        datatype: 'json',
        headers: headerObject,
        cache: false,
        contentType: contenttype,
        success: function (response) {
            if (response.OK != undefined && response.OK == false) {
                CASH_Alert.error({ title: 'Error', text: response.Message });
            } else {
                if (callBackFunction != undefined) {
                    eval(callBackFunction)(response);
                } else {
                    return response;
                }
            }
            $.unblockUI();
        }
    });
};

var IsEmptyOrNull = function(textValue) {
    if (textValue == null || textValue == 'undefined' || textValue.length <= 0)
        return true;
    else {
        return false;
    }
};

String.prototype.format = String.prototype.f = function () {
    var s = this,
    i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};