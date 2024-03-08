<template>
    <div>
        <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
                <label for="tab-1" class="tab">
                    Sign In
                </label>
                <input id="tab-2" type="radio" name="tab" class="sign-up">
                <label for="tab-2" class="tab">
                    Sign Up
                </label>
                <div class="login-form">
                    <form @submit.prevent="handleSignIn" method="post">
                        <div class="sign-in-htm">
                            <div class="group">
                                <label for="user" class="label">Tài Khoản</label>
                                <input id="user" type="text" class="input" v-model="this.User.username">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Mật Khẩu</label>
                                <input id="pass" type="password" class="input" data-type="password" v-model="User.password">
                                <!-- Hiển thị lỗi mật khẩu dưới 8 ký tự -->
                                <p v-if="this.passwordError">{{ passwordError }}</p>
                            </div>
                            <div class="group">
                                <input id="check" type="checkbox" class="check" checked>
                                <label for="check"><span class="icon"></span> Keep me Signed in</label>
                            </div>
                            <div class="group">
                                <button class="button" type="submit"> Đăng nhập </button>
                            </div>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </div>
                    </form>
                    <div class="sign-up-htm">
                        <form method="post" @submit.prevent="handleSignUp">
                            <div class="group">
                                <label for="user1" class="label">Tài Khoản</label>
                                <input id="user1" type="text" class="input" v-model="this.User.username">
                            </div>
                            <div class="group">
                                <label for="user2" class="label">Họ và tên</label>
                                <input id="user2" type="text" class="input" v-model="this.User.fullName">
                            </div>
                            <div class="group">
                                <label for="pass1" class="label">Mật Khẩu</label>
                                <input id="pass1" type="password" class="input" data-type="password"
                                    v-model="this.User.password">
                                <p class="error-message" v-if="this.passwordError">{{ passwordError }}</p>
                            </div>
                            <div class="group">
                                <label for="pass2" class="label">Xác Nhận Mật Khẩu</label>
                                <input id="pass2" type="password" class="input" data-type="password"
                                    v-model="this.confirmPassword">
                                <p class="error-message" v-if="this.confirmPasswordError">{{ confirmPasswordError }}</p>
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Email</label>
                                <input id="pass3" type="text" class="input" v-model="this.User.email">
                            </div>
                            <div class="group">
                                <button class="button" type="submit">Đăng ký</button>
                            </div>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                Bạn đã có tài khoản <label for="tab-1"><b>Đăng nhập</b></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '../../service/Auth'; // Điều chỉnh đường dẫn dựa trên cấu trúc dự án của bạn
import notification from '../../utils/notification.utils';
export default {
    data() {
        return {
            User: {
                username: '',
                password: '',
                email: '',
                fullName: '',
            },
            confirmPassword: '',
            passwordError: '',
            confirmPasswordError: '',
        };
    },
    methods: {
        async handleSignUp() {
            this.validatePassword();
            this.validateConfirmPassword();
            if (this.passwordError || this.confirmPasswordError) {
                notification.error('Đăng ký tài khoản thất bại', this);
                return;
            }

            Auth.SignUp(this.User)
                .then((res) => {
                    this.User = '';
                    notification.success('Đăng ký tài khoản thành công', this);
                })
                .catch((err) => {
                    console.log(err);
                    notification.error('Đăng ký tài khoản thất bại', this);
                });
        },
        async handleSignIn() {
            Auth.SignIn(this.User)
                .then(res => {
                    localStorage.setItem('Token', JSON.stringify(res.data.accessToken));
                    localStorage.setItem('cart', JSON.stringify(res.data.cart_id));
                    localStorage.setItem('order', JSON.stringify(res.data.order_id));
                    localStorage.setItem('FullName', JSON.stringify(res.data.fullName));
                    localStorage.setItem('idUser', JSON.stringify(res.data._id));

                    notification.success('Đăng nhập thành công', this);
                    if (res.data.role == 'user') {
                        this.$router.replace({ path: '/home' })
                    }
                    if (res.data.role == 'admin') {
                        this.$router.replace({ path: '/admin/home' })
                    }
                })
                .catch(err => {
                    console.log(err);
                    notification.error('Đăng nhập thất bại', this);
                });
        },
        validatePassword() {
            // Kiểm tra mật khẩu có ít nhất 8 ký tự
            if (this.User.password.length < 8) {
                this.passwordError = 'Mật khẩu phải có ít nhất 8 ký tự';
            } else {
                this.passwordError = '';
            }
        },
        validateConfirmPassword() {
            // Kiểm tra xác nhận mật khẩu khớp với mật khẩu
            if (this.confirmPassword !== this.User.password) {
                this.confirmPasswordError = 'Xác nhận mật khẩu không khớp';
            } else {
                this.confirmPasswordError = '';
            }
        },
    },
};
</script>

<style>
@import url('../Login/Login.css');
</style>