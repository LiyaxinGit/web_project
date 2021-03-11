$(function(){
    //获取用户基本信息
    getUserInfo();
    //退出功能
    $('#call-go').on('click',function(){
        layer.confirm('确定退出?', function(index){
            localStorage.removeItem('token')
            location.href ='/login.html'
            layer.close(index);
          });       
    })
})
//定义获取用户信息
function getUserInfo(){
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg("获取用户信息失败!");
            }
            //调用renderAvata渲染用户头像
            renderAvatar(res.data);
        }
    });
}
//渲染用户头像
function renderAvatar(user){
    //获取用户名字
   const name=user.nickname||user.username;
   //渲染欢迎文本
   $('#welcome').html('欢迎&nbsp;&nbsp;'+ name);
   //判断有没有设置用户头像
   if(user.user_pic){
       //渲染图片
      $('.layui-nav-img').attr('src',user.user_pic).show();
      $('.text-avatar').hide();
   }else{
       //渲染文本
      $('.text-avatar').html(name[0].toUpperCase()).show();
      $('.layui-nav-img').hide();
   }
}