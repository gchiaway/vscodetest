addModal()

function addModal() {
    var text = "";
    text += "<div class=\"modal fade bs-example-modal-sm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" id=\"myModal\">";
    text += "        <div class=\"modal-dialog\" role=\"document\">";
    text += "            <div class=\"modal-content\">";
    text += "                <div class=\"modal-header\">";
    text += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    text += "                    <span class=\"active\" >登录</span>";
    text += "                    <span>注册</span>";
    text += "                </div>";
    text += "                <div>";
    text += "                    <div class=\"modal-body \">";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"text\" class=\"form-control zhanghao\" placeholder=\"请输入账号\">";
    text += "                        </div>";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"password\" class=\"form-control mima\" placeholder=\"请输入账号密码\">";
    text += "                        </div>";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"checkbox\"> 记住密码";
    text += "                            <a href=\"#\" style=\"float:right;\">忘记密码</a>";
    text += "                        </div>";
    text += "                    </div>";
    text += "                    <div class=\"modal-body none\">";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"text\" class=\"form-control suser\" placeholder=\"请输入账号\">";
    text += "                        </div>";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"password\" class=\"form-control spwd\" placeholder=\"请输入密码\">";
    text += "                        </div>";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"password\" class=\"form-control spwd1\" placeholder=\"请输入邮箱\">";
    text += "                         <button type=\"button\" class=\"btn btn-danger mybtn\" id=\"huoqu\">获取</button>"
    text += "                        </div>";
    text += "                        <div class=\"form-group\">";
    text += "                            <input type=\"password\" class=\"form-control spwd1\" placeholder=\"请输入验证码\">";
    text += "                        </div>";
    text += "                    </div>";
    text += "                </div>";
    text += "";
    text += "                <div class=\"modal-footer\">";
    text += "                    <button type=\"button\" class=\"btn btn-danger mybtn\" id=\"zhuce\">注册</button>";
    text += "                    <button type=\"button\" class=\"btn btn-danger mybtn\" id=\"denglu\">登录</button>";
    text += "                </div>";
    text += "            </div><!-- /.modal-content -->";
    text += "        </div>";
    text += "    </div>";

    $('body').append(text)

    $('#myModal span').on('click', function () {
        var i = $(this).index()
        $(this).addClass('active').siblings().removeClass('active')

        $('#myModal .modal-body').eq(i - 1).removeClass('none').siblings().addClass('none')
    })
    //登录
    $('#denglu').click(function () {
        var user = $('.zhanghao').val()
        var pwd = $('.mima').val()
        if (user && pwd) {
            $.ajax({
                url: url + '/loginController/checkuser',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                // dataType: 'json',
                data: JSON.stringify({
                    "userName": "1352777955@qq.com",
                    "password": "123456",
                    "randCode ":"<img id=\"randCodeImage\" src=\"randCodeImage\">"
                }),
                success: function (data) {
                    console.log(data);

                },
                error: function (jqXHR, text, errorThrown, data) {
                    console.log(jqXHR + " " + text + " " + errorThrown);
                }
            });
        } else {
            alert('请输入帐号密码')
        }


    })
    //注册
    $('#zhuce').click(function () {
        var user = $('.suser').val()
        var pwd = $('.spwd').val()
        var pwd1 = $('.spwd1').val()
        alert(250775)
        if (user && pwd) {
            $.ajax({
                url: url + 'userApiController/register',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                // dataType: 'json',
                data: JSON.stringify({
                    "username": "1352777955@qq.com",
                    "password": "123456",
                    "verifyCode": "451196",
                    "toEmailAddress": "1352777955@qq.com"
                }),
                success: function (data) {
                    console.log(data);

                },
                error: function (jqXHR, text, errorThrown, data) {
                    console.log(jqXHR + " " + text + " " + errorThrown);
                }
            });
        } else {
            alert('请输入帐号密码')
        }
    })

    $('#huoqu').click(function () {
        $.ajax({
            url: url + 'userApiController/sendEmailCode',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
                "toEmailAddress": "1352777955@qq.com"
            }),
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, text, errorThrown, data) {
                console.log(jqXHR + " " + text + " " + errorThrown);
            }
        });
    })

}

function setCookie() { //设置cookie  
    var loginCode = $("#login_code").val(); //获取用户名信息  
    var pwd = $("#login_password").val(); //获取登陆密码信息  
    var checked = $("[name='checkbox']:checked"); //获取“是否记住密码”复选框  
    if (checked && checked.length > 0) { //判断是否选中了“记住密码”复选框  
        $.cookie("login_code", loginCode); //调用jquery.cookie.js中的方法设置cookie中的用户名  
        $.cookie("pwd", $.base64.encode(pwd)); //调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密  
    } else {
        $.cookie("pwd", null);
    }
}

function getCookie() { //获取cookie  
    var loginCode = $.cookie("login_code"); //获取cookie中的用户名  
    var pwd = $.cookie("pwd"); //获取cookie中的登陆密码  
    if (pwd) { //密码存在的话把“记住用户名和密码”复选框勾选住  
        $("[name='checkbox']").attr("checked", "true");
    }
    if (loginCode) { //用户名存在的话把用户名填充到用户名文本框  
        $("#login_code").val(loginCode);
    }
    if (pwd) { //密码存在的话把密码填充到密码文本框  
        $("#login_password").val($.base64.decode(pwd));
    }
}