<template>
    <div>
        <section class="section-padding my-4">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-8">
                        <div class="login-content">
                            <h2 class="login-title"><nuxt-link to="/customer/signin"><i class="fa fa-arrow-left"></i></nuxt-link>OTP Verify</h2>
                             <form @submit.prevent="verify">
                                <div class="form-group">
                                    <input type="text" name="verifyPin" placeholder="Enter Here OTP" v-model="verifyForm.verifyPin" class="form-control">
                                    <div v-if="verifyForm.errors.has('verifyPin')" v-html="verifyForm.errors.get('verifyPin')" />
                                </div>
                                <!-- form group -->
                                <div class="form-group">
                                    <input class="login-sub form-control" type="submit" value="Submit">
                                </div>
                            </form>
                            <div class="resend">
                                <form @submit.prevent="resendverify">
                                <div class="form-group">
                                    <button type="submit" class="text-danger"><i class="fas fa-sync-alt"></i> Resend OTP</button>
                                </div>
                            </form>
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
import Form from 'vform'
export default {
  data: () => ({
    verifyForm: new Form({
      verifyPin: '',
    }),
    token:''
  }),
  methods: {
    async verify () {
      const response = await this.$axios.post('/api/v1/customer/verified',this.verifyForm,{
        headers:{
            verifyphone: localStorage.getItem('verifyphone'),
            initpass: localStorage.getItem('initpass')
        }
       }).then(response=>{
       if(response.data.status=='success'){
            let token = response.data.token;
            localStorage.setItem('token',token)
            token = localStorage.setItem('token',token);
            localStorage.removeItem('initpass');
            localStorage.removeItem('verifyphone');
            localStorage.removeItem('newnumber');
            this.$toast.success('You are logged in successfully.');
            this.$store.dispatch("isLoggedIn");
            if(this.cartItemCount > 0){
               this.$router.push({path:'/customer/checkout'});
            }else{
                this.$router.push({path:'/customer/account'});
            }
        }else{
            this.$toast.error('You are entered Invalid OTP');
        }
      })
    },
    async resendverify () {
      const response = await this.$axios.post('/api/v1/customer/resend/verify',this.verifyForm,{
        headers:{
            verifyphone: localStorage.getItem('verifyphone')
        }
       }).then(response=>{
       if(response.data.status=='success'){
            this.$toast.success('Send OTP in your phone.');
        }else{
            this.$toast.error('You have no valid account.');
        }
      })
    }
  },
  computed:{
       cartItemCount(){
            return this.$store.getters.cartItemCount;
        }, 
    },
};
</script>
