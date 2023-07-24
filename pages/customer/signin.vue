<template>
    <div>
        <section class="section-padding my-4">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-8">
                        <div class="login-content my-5">
                            <h2 class="login-title"><nuxt-link to="/"><i class="fa fa-arrow-left"></i></nuxt-link>Signin</h2>
                             <form @submit.prevent="signin"> 
                                <p class="my-3"><strong>Enter your phone number to login or create new account and hit “Continue” to get an OTP.</strong></p>
                                <div class="form-group">
                                    <input type="text" placeholder="Phone Number" autocomplete="off" name="mobile" v-model="signForm.mobile" class="form-control" />
                                    <div v-if="signForm.errors.has('mobile')" v-html="signForm.errors.get('mobile')" />
                                </div>
                                <!-- form group -->
                                <div class="form-group">
                                    <input class="login-sub" type="submit" value="Continue" />
                                </div>
                            </form>
                            <div class="scustomer-register">
                                <p class="orlogin">Or</p>
                                <button><nuxt-link to="/customer/login">Login With Password</nuxt-link></button>
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
            signForm: new Form({
              mobile: '',
            }),
        }),
        head() {
            return {
              title: 'Signin - Girls On Top',
            }
          },
        methods: {
            async signin(){
                const response = await this.$axios.post("/api/v1/customer/signin", this.signForm).then((response) => {
                    if(response.data.status=='success'){
                        let verifyphone = response.data.verifyphone;
                        let initpass = response.data.initpass;
                        localStorage.setItem('verifyphone',verifyphone);
                        localStorage.setItem('initpass',initpass);
                        this.$router.push({path:'/customer/verify'});
                    }else if(response.data.status=='noaccount'){
                        this.$toast.error("You have no account please register.");
                        let newnumber = response.data.newnumber;
                        localStorage.setItem('newnumber',newnumber);
                        this.$router.push({path:'/customer/register'});
                    }else{
                        this.$toast.error("Phone number field required");
                    } 
                });
            },
        },
        mounted() {
            
            this.$store.dispatch("isLoggedIn");
        },
    };
</script>
