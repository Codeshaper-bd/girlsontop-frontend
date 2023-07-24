<template>
	<div>
        <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Track Order</h5>
                            <ul>
                                <li><router-link :to="{name:'home'}">Home </router-link></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a >Track Order</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding">
           <div class="container">
             <div class="row">
              <div class="col-sm-4"></div>
               <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="trackform">
                        <h4 class="text-center">Order Track Form </h4>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="mobile">Phone Number</label>
                                <input type="text" name="mobile" v-model="trackForm.mobile" class="form-control">
                                <div v-if="trackForm.errors.has('mobile')" v-html="trackForm.errors.get('mobile')" />
                            </div>
                            <div class="form-group">
                                <label for="trackId">Invoice No</label>
                                <input type="text" name="trackId" v-model="trackForm.trackId" class="form-control">
                                <div v-if="trackForm.errors.has('trackId')" v-html="trackForm.errors.get('trackId')" />
                            </div>
                            <button  type="submit" >Submit</button>
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
import $ from 'jquery'
import Form from 'vform'
export default {
  data: () => ({
    trackForm: new Form({
      trackId: '',
      mobile: '',
    }),
  }),
  methods: {
    async login () {
      const response = await this.$axios.post('/api/v1/track/order',this.trackForm).then(response=>{
        if(response.data.status=='success'){
            this.$router.push({ path: "/track/result/"+response.data.orderinfo.invoice_no });
        }else{
           this.$toast.error({
            title:'Opps!',
            message:'Your order track ID does"t match.'
          });
        }
      })
    }
  }
}
</script>