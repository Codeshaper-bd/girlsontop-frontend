<template>
    <div>
        <section class="section-padding">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-8">
                        <div class="login-content">
                            <h2 class="login-title"><nuxt-link to="/"><i class="fa fa-arrow-left"></i></nuxt-link> Login/Sign up</h2>
                            <ul class="nav nav-pills mb-3" >
                                <li class="nav-item">
                                    <nuxt-link to="/customer/login" class="nav-link active">Login</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link to="/customer/register" class="nav-link">Sign up</nuxt-link>
                                </li>
                            </ul>
                             <form @submit.prevent="login">
                                <div class="form-group">
                                    <input type="text" placeholder="Phone Number" autocomplete="off" name="mobile" v-model="loginForm.mobile" class="form-control" />
                                    <div v-if="loginForm.errors.has('mobile')" v-html="loginForm.errors.get('mobile')" />
                                </div>
                                <!-- form group -->
                                <div class="form-group">
                                    <input placeholder="Password" v-model="loginForm.password" autocomplete="off" type="password" name="password" class="form-control" />
                                    <div v-if="loginForm.errors.has('password')" v-html="loginForm.errors.get('password')" />
                                </div>
                                <nuxt-link to="/customer/forgetpassword" class="fpassword">Forgot Password?</nuxt-link>
                                <div class="form-group">
                                    <input class="login-sub" type="submit" value="Login" />
                                </div>
                            </form>
                           
                            <div class="scustomer-register">
                                <p class="orlogin">Or</p>
                                <button><nuxt-link to="/customer/signin">Login With SMS</nuxt-link></button>
                                <!-- <button>Login With Social</button>
                                <ul>
                                    <li class="facebook"><a href=""><i class="fab fa-facebook"></i> Facebook</a></li>
                                    <li class="google"><a href=""><i class="fab fa-google"></i> Google</a></li>
                                </ul> -->
                            </div>
                        </div>
                        <!--login content end-->
                    </div>
                    <!-- col end -->
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Form from "vform";
    export default {
        data: () => ({
            loginForm: new Form({
                mobile: "",
                password: "",
            }),
            isVisible : true
        }),
        head() {
            return {
              title: 'Login - Girls On Top',
            }
          },
        methods: {
            async login() {
                const response = await this.$axios.post("/api/v1/customer/login", this.loginForm).then((response) => {
                    if (response.data.status == "success") {
                        let token = response.data.token;
                        localStorage.setItem("token", token);
                        token = localStorage.setItem("token", token);

                        this.$toast.success("You are logged in successfully.");
                        this.$store.dispatch("isLoggedIn");
                        if (this.cartItemCount > 0) {
                            this.$router.push({ path: "/customer/checkout" });
                        }else if(localStorage.getItem("review")=='yes'){
                           this.$router.back();
                        }else {
                            this.$router.push({ path: "/customer/account" });
                        }
                    } else if (response.data.status == "noaccount") {
                        this.$toast.error("Your have no account.");
                    } else {
                        this.$toast.error("You phone or password wrong.");
                    }
                });
            },
        },
        mounted() {
            this.$store.dispatch("isLoggedIn");
        },
        computed:{
             cartItemCount(){
                  return this.$store.getters.cartItemCount;
              }, 
          },
    };
</script>
