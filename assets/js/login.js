$(function () {
    var form = layui.form;
    //点击去注册跳转到注册页面
    $('#regId').on("click", function () {
        $('.login').hide();
        $('.reg').show();
    })
    //点击去登录跳转到登录页面
    $('#loginId').on("click", function () {
        $('.reg').hide();
        $('.login').show();
    })
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwds = $('.reg [name=password]').val();
            if (value !== pwds) {
                return '两次输入的密码不一致！'
            }
        }
    })

    //为注册表单绑定submit提交事件
    $('#form-reg').submit(function (e) {
        e.preventDefault();
        //发起ajax请求，完成注册功能
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("注册失败!" + res.message);
                }
                layui.layer.msg("注册成功!");
                $('.login [name=username]').val($('.reg [name=username]').val());
                $('.login [name=password]').val($('.reg [name=password]').val());
                $('#loginId').click();
            }
        });
    })

    //为登录表单绑定submit提交事件
    $('#form-login').on("submit", function (e) {
        e.preventDefault();
        //发送ajax请求登录页面
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("登录失败!");
                }
                layui.layer.msg("登录成功!");
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        });
    })
})