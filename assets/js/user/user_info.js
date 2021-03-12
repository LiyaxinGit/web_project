$(function(){
    const form =layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })
    //初始化用户信息
    initUserInfo();
    //定义初始化用户信息的方法
    function initUserInfo() {
    //发起ajax请求获取用户信息
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg("获取用户信息失败!"+res.message);
            }
            //获取用户信息成功!
            form.val('userInfo',res.data);
        }
    });
    }

    //为重置按钮绑定点击事件
    $('#btnReset').on("click", function(e){
     //阻止重置按钮的默认重置行为
     e.preventDefault();
     initUserInfo();
    });
    //为form表单绑定提交submit事件
    $('#form-userInfo').on('submit',function(e){
    //阻止表单默认提交行为
    e.preventDefault();
    //发起ajax请求，更改用户信息
    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg("更新用户信息失败!"+ res.message);
            }
            //更新用户信息成功！
            layui.layer.msg("更新用户信息成功!");
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo();
        }
    });
    })
})