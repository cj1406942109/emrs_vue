<template>
  <div class="login">
      <div class="logo">
        <a href="javascript:;"><img src="./logo-big.png"></a>
      </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
            <form class="login-form" method="post">
                <h3 class="form-title">登录到我的账户</h3>
                <div class="alert alert-danger" :class="{'display-hide':!alert.show}" style="padding: 10px;">
                    <button class="close" type="button" @click="hideAlert"></button>
                    <span>{{alert.text}}</span>
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>                    
                    <div class="input-icon" :class="{ 'control': true }">
                        <i class="fa fa-user"></i>
                        <input v-validate="'required|email'" :class="{'input': true, 'border-red': errors.has('username') }" name="username" class="form-control" type="text" placeholder="用户名" v-model="user.name">
                        <span v-show="errors.has('username')" class="help-block font-red">{{ errors.first('username') }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <div class="input-icon" :class="{ 'control': true }">
                        <i class="fa fa-lock"></i>
                        <input v-validate="'required|alpha_dash|min:6|max:16'" :class="{'input': true, 'border-red': errors.has('password') }" name="password" class="form-control" type="password" placeholder="密码" v-model="user.password" @keyup.13="login">
                        <span v-show="errors.has('password')" class="help-block font-red">{{ errors.first('password') }}</span>
                    </div>
                </div>                
                <div class="form-actions">
                    <!-- <label class="rememberme mt-checkbox mt-checkbox-outline">
                        <input type="checkbox" name="remember" value="1">记住密码
                        <span></span>
                    </label> -->
                    <label for=""></label>
                    <button type="button" class="btn green pull-right" @click="login" :disabled="logining">{{buttonText}}</button>
                </div>                
            </form>
            
            <!-- END LOGIN FORM -->            
        </div>
        <!-- END LOGIN -->
        <!-- BEGIN COPYRIGHT -->
        <div class="copyright">
            2017 &copy; Intelligent Medical By
            <a target="_blank" href="http://www.iss.whu.edu.cn">ISS, WHU</a> &nbsp;|&nbsp;
            <a href="http://libingteam.com" title="" target="_blank">李兵Team</a>
        </div>
  </div>

</template>

<script>
    import '@/../static/plugins/backstretch/jquery.backstretch.min';
    import bg1 from './bg/1.jpg';
    import bg2 from './bg/2.jpg';
    import bg3 from './bg/3.jpg';
    import bg4 from './bg/4.jpg';
    import loginApi from '@/api/login';
    export default {
        data () {
            return {
                user: {
                    name: '',
                    password: ''
                },
                formValid: false,
                alert: {
                    show: false,
                    text: ''
                },
                logining: false,
                dict: {
                    zh_CN: {
                        attributes: {
                            username: '用户名',
                            password: '密码'
                        }
                    }
                },
            }
        },
        created () {
            $.backstretch([bg1, bg2, bg3, bg4], {
                    fade: 1000,
                    duration: 8000
                }
            );
            this.$validator.updateDictionary(this.dict);
        },
        computed: {
            buttonText: function(){
                return this.logining?'正在登录……':'登录';
            }
        },
        methods: {
            login () {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.logining = true;
                        loginApi.checkLogin({phoneOrEmail: this.user.name, password: this.user.password}).then(res=>{
                            this.logining = false;
                            if(res.status){
                                let user = res.data;                    
                                // this.$set(user, 'expireTime', new Date().getTime()+30*60*1000);     //设置会话过期时间
                                sessionStorage.setItem('user', JSON.stringify(user));
                                this.$router.push('/home');
                            }else{
                                console.log(res);
                                this.alert.show = true;
                                this.alert.text = '用户名或密码错误';
                            }
                        }, res=>{
                            this.logining = false;
                            this.alert.show = true;
                            this.alert.text = '登录出错，请重试';
                        })                        
                    } else {
                        return;
                    }
                });           
            },
            hideAlert () {
                this.alert.show = false;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .login 
        .logo
            margin 60px auto 20px
            padding 15px
            text-align center
        .content
            background url(./bg-white-lock.png) repeat
            width 360px
            margin 0 auto
            padding 20px 30px 15px 30px
            border-radius 7px
            h3
            h4
                color #eee
            p
            label
                color #fff
            .login-form                
            .forget-form
                padding 0
                margin 0
            .forget-form
                display none
                .form-actions
                    border 0
                    margin-bottom 0
                    padding-bottom 20px
            .forget-form
            .register-form
                display none
                .form-actions
                    border 0
                    margin-bottom 0
                    padding-bottom 0
            .form-control
                background-color #fff
            .form-title
                font-weight 300
                margin-bottom 25px
            .forget-form
                display none
            .form-actions
                background-color transparent
                clear both
                border 0
                padding 0 30px 25px 30px
                margin 0 -30px
                .rememberme
                    margin-top 8px
                    display inline-block
                .btn
                    margin-top 1px
            .forget-password
                margin-top 25px
            .create-account
                border-top 1px dotted #eee
                padding-top 10px
                margin-top 15px
                a
                    display inline-block
                    margin-top 5px
            
        .mt-checkbox
            span
            &:after
                border-color #eee
        .copyright
            text-align center
            margin 0 auto
            padding 10px
            color #eee
            font-size 13px

    @media (max-width: 480px)
        .login
            .logo
                margin-top 10px        
            .content
                padding 30px
                width 222px
                h3
                    font-size 22px
            .checkbox
                font-size 13px
</style>
