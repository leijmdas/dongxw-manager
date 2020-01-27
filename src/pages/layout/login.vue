<template>
    <div class="loginPanel">
        <div class="login" v-show="show==='account'" v-loading="loading" element-loading-text="loading ..."
             element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="login_logo">
                <img src="../../assets/logo.png" height="60" width="60" alt="">
                <span>东兴旺ERP系统</span>
            </div>
            <div class="login_container">
                <div class="login_container--png">
                    <img src="../../assets/images/login/bom.png" alt="" style="left: 0px; top: 180px;">
                    <img src="../../assets/images/login/customer-order.png" alt="" style="left: 130px; top: 60px;">
                    <img src="../../assets/images/login/make-plan.png" alt="" style="left: 130px; top: 300px;">
                    <img src="../../assets/images/login/purchase.png" alt="" style="left: 260px; top: 180px;">
                    <img src="../../assets/images/login/store.png" alt="" style="left: 390px; top: 60px;">
                    <img src="../../assets/images/login/pay.png" alt="" style="left: 390px; top: 300px;">
                </div>
                <div class="login_container--box" @keydown.enter.stop="login">
                    <p>请输入您的身份信息</p>

                    <el-input placeholder="请输入用户名" autocomplete="off"
                              v-model="account.account" maxlength="32">
                        <i slot="prefix" class="el-input__icon ele-icon el-icon-ipuser"></i>
                    </el-input>

                    <el-input placeholder="请输入密码" type="password" autocomplete="off" v-model="account.password"
                              maxlength="32">
                        <i slot="prefix" class="el-input__icon ele-icon el-icon-iplock"></i>
                    </el-input>
                    <el-input class="newinput" placeholder="图形验证码" v-model="account.verifyCode"
                              name="inputPicCode" id="inputPicCode" maxlength="6"/>

                    <img id=imgCode @click="clickImgCode" height="45" width="130" class="col-md-6"
                    src='/api/rest/context/getPicCode' alt="" style="margin-left:25px"/>

                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    import {auth, bus} from '../../utils';

    export default {
        name: 'login',
        props: {
            skin: {
                type: String,
                default() {
                    return 'erp';
                }
            }
        },
        data() {
            return {
                loading: false,
                account: {
                    show: true,
                    account: '',
                    password: '',
                    verifyCode: ''
                },
                factoryBrand: {
                    show: false,
                    keepChoice: true,
                    list: []
                }
            };
        },
        computed: {
            show() {
                console.log(this.$parent.isLogged);
                if (!this.$parent.isLogged || this.account.show) {
                    return 'account';
                }
                if (this.account.show) {
                    return 'account';
                }
                return '';
            }
        },
        watch: {
            $route(val) {
                this.$emit('change-skin');
                if (val.name !== 'login') {
                    document.removeEventListener('keydown', this.keysEvent);
                    this.account.show = true;
                    this.factoryBrand.show = false;
                } else {
                    document.addEventListener('keydown', this.keysEvent);
                }
            }
        },
        methods: {
            clickImgCode() {
                var img = document.getElementById("imgCode")
                img.src = "/api/rest/context/getPicCode"
            },
            // 登录，登录成功后获取厂牌
            login() {
                const {account: loginName, password,verifyCode} = this.account;

                window.localStorage.setItem('isadmin',loginName==='admin')
                this.loading = true;
                //this.$api.AppService.login({username: this.$md5(loginName),pwd})
                let pwd = this.$md5(password)
                this.$api.AppService.login({username: loginName, password, verifyCode})
                    .then(rsp => {
                        this.$msgJsonResult(rsp)
                        if(rsp.code== 0 ) {
                            let data = rsp.data
                            this.loading = false
                            auth.setToken({access_token: data.token, expires_in: data.expiresIn});
                            bus.$emit('app:logged');
                        }else{
                            this.loading = false;
                            this.$message({message: `用户登录错`, type: 'error'});

                        }
                    })
                    .catch(err => {

                        this.loading = false;
                        if (err.code === 'account_unvalid') {
                             this.$message({message: `用户名或密码错`, type: 'error'});
                        } else {
                             this.$message({message: '登录异常:' + err.msg, type: 'error'});
                        }
                    });
            },
            // 重置
            reset() {
                this.account.account = '';
                this.account.password = '';
                $('#account').focus();
            }
        },
        mounted() {
            bus.$emit('app:reset');
        },
        beforeDestroy() {
        }
    };
</script>
<style rel="stylesheet/less" lang='less'>
    @import "../../variables";

    .loginPanel {
        height: 100%;
        background-image: url("../../assets/images/main_login.png");
        //background-repeat: repeat;
        background-size: 100% 100%;
    }

    .title {
        color: white;
        font-size: 14px;
        font-weight: 200;
    }

    .login {
        width: 100%;
        height: 100%;

        &_logo {
            padding-top: 210px;
            padding-left: 30%;
            display: flex;
            align-items: center;

            img {
                margin-right: 20px;
            }

            span {
                font-size: 36px;
                color: whitesmoke;
                letter-spacing: 0;
            }
        }

        &_container {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;

            &--png {
                position: relative;
                margin-left: 23%;

                img {
                    position: absolute;

                }
            }

            &--box {
                margin-left: 37%;
                width: 340px;
                height: 360px;
                background: #fff;
                border-radius: 4px;

                p {
                    height: 90px;
                    font-size: 18px;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 90px;
                    font-weight: bolder;
                }


                input {
                    height: 42px !important;
                    padding-left: 30px !important;
                }

                .el-input {
                    margin-left: 30px;
                    margin-bottom: 20px;
                    width: 280px;
                    height: 42px;
                }
                input {
                    height: 42px !important;
                    padding-left: 30px !important;
                }

                .newinput {
                    margin-left: 30px;
                    margin-bottom: 20px;
                    width: 120px;
                    height: 42px;
                }
                button {
                    width: 280px;
                    height: 42px;
                    margin-top: 12px;
                    margin-left: 30px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
