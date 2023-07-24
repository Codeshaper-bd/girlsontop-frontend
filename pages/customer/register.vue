<template>
    <div>
        <!--custom breadcrumb end-->
        <section class="section-padding">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-8">
                        <div class="login-content">
                            <h2 class="login-title"><nuxt-link to="/"><i class="fa fa-arrow-left"></i></nuxt-link> Login/Sign up</h2>
                            <ul class="nav nav-pills mb-3" >
                                <li class="nav-item">
                                    <nuxt-link to="/customer/login" class="nav-link">Login</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link to="/customer/register" class="nav-link active">Register</nuxt-link>
                                </li>
                            </ul>
                            <form @submit.prevent="register">
                                <div class="form-group">
                                    <input type="text" name="fullName" required :class="nameinvalid? 'invalidfield':'' " v-on:keyup="validOrnot()" placeholder="Full Name *" v-model="registerForm.fullName" class="form-control" />
                                    <div v-if="registerForm.errors.has('fullName')" v-html="registerForm.errors.get('fullName')" />
                                </div>

                                <!-- form group -->
                                <div class="form-group">
                                    <input type="number" placeholder="Phone Number *" autocomplete="off" required name="mobile" :class="phoneinvalid? 'invalidfield':'' " v-on:keyup="validOrnot()" v-model="registerForm.mobile" class="form-control" />
                                    <div v-if="registerForm.errors.has('mobile')" v-html="registerForm.errors.get('mobile')" />
                                </div>
                                <!-- form group -->
                                <div class="form-group">
                                    <input type="text" placeholder="Your Address *" name="address" required :class="addressinvalid? 'invalidfield':'' " v-on:keyup="validOrnot()" v-model="registerForm.address" class="form-control" />
                                    <div v-if="registerForm.errors.has('address')" v-html="registerForm.errors.get('address')" />
                                </div>
                                <!-- form group -->
                                <div class="form-group">
                                    <input v-model="registerForm.password" placeholder="Password" :class="password? 'invalidfield':'' " v-on:keyup="validOrnot()" type="password" name="password" required class="form-control" />
                                    <div v-if="registerForm.errors.has('password')" v-html="registerForm.errors.get('password')" />
                                </div>
                                <div class="form-group">
                                    <input class="login-sub" type="submit" value="Register" />
                                </div>
                            </form>
                            <div class="scustomer-register">
                                <p class="orlogin">Or</p>
                                <button>Login With Social</button>
                                <ul>
                                    <li class="facebook"><a href=""><i class="fab fa-facebook"></i> Facebook</a></li>
                                    <li class="google"><a href=""><i class="fab fa-google"></i> Google</a></li>
                                </ul>
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
        components: {},
        data: () => ({
            registerForm: new Form({
                fullName: "",
                mobile: "",
                address: "",
                password: "",
            }),
            nameinvalid: true,
            phoneinvalid: true,
            addressinvalid: true,
            password: true,
            // newnumber: localStorage.getItem("newnumber") ? localStorage.getItem("newnumber") : '', // newnumber put in mobile = model
        }),
        methods: {
            validOrnot() {
                this.registerForm.fullName != "" ? (this.nameinvalid = false) : (this.nameinvalid = true);
                this.registerForm.mobile != "" ? (this.phoneinvalid = false) : (this.phoneinvalid = true);
                this.registerForm.address != "" ? (this.addressinvalid = false) : (this.addressinvalid = true);
                this.registerForm.password != "" ? (this.password = false) : (this.password = true);
            },
            async register() {
                const response = await this.$axios.post("/api/v1/customer/register", this.registerForm).then((response) => {
                    if (response.data.status == "success") {
                        // for register
                        let token = response.data.token;
                        localStorage.setItem("token", token);
                        token = localStorage.setItem("token", token);
                        this.$store.dispatch("isLoggedIn");
                        if (this.cartItemCount > 0) {
                            this.$router.push({ path: "/customer/checkout" });
                        } else {
                            this.$router.push({ path: "/customer/account" });
                        }
                         this.$toast.success("Your account create successfully");
                        // for verify
                        // let verifyphone = response.data.verifyphone;
                        // localStorage.setItem('verifyphone',verifyphone);
                        // this.$router.push({name:'accountverify'});
                    } else if (response.data.status == "exists") {
                        this.$toast.error("Your Phone Number Already Taken.");
                    } else {
                        this.$toast.error("Please carefully fillup input.");
                    }
                });
            },
        },
        computed: {
            cartItemCount() {
                return this.$store.getters.cartItemCount;
            },
        },
    };
</script>
