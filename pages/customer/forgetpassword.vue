<template>
	<div>
        <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Forget Password</h5>
                            <ul>
                                <li><router-link :to="{name:'home'}">Home </router-link></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a >Forget Password</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding">
           <div class="container-fluid">
             <div class="row justify-content-center">
               <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="login-content">
                        <h2 class="login-title">Forget Password </h2>
                        <form @submit.prevent="forget">
                            <div class="form-group">
                                <label for="mobile">Phone Number</label>
                                <input type="text" name="mobile" v-model="forgetForm.mobile" class="form-control">
                                <div v-if="forgetForm.errors.has('mobile')" v-html="forgetForm.errors.get('mobile')" />
                            </div>
                            <!-- form group -->
                            <input class="login-sub mb-4" type="submit" value="Submit">
                        </form>
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
    forgetForm: new Form({
      mobile: '',
    }),
  }),
  methods: {
    async forget () {
      const response = await this.$axios.post('/api/v1/customer/forget-password',this.forgetForm).then(response=>{
        if(response.data.status=='success'){
            let customerphone = response.data.customerphone;
            localStorage.setItem('customerphone',customerphone);
            this.$toast.success('Please check your phone number');
            this.$router.push({ path: "/customer/forgetpassverify" });
        }else{
            this.$toast.error('Your phone number has not found.');
        }
      })
    }
  }
}
</script>