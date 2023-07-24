<template>
	<div>
		 <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Order Success</h5>
                            <ul>
                                <li><nuxt-link to="/">Home </nuxt-link></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>Order Success</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="order-note-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-sm-4">
                        <div class="order-success-note">
                            <p v-if="orderInfo.contact"><strong>{{orderInfo.contact.name}}</strong></p>
                            <p>আপনার অর্ডারটি গ্রহণ করা হয়েছে।</p>          
                            <p>আপনার অর্ডার নম্বর - {{orderInfo.invoice_no}} </p>
                            <p>এবং পণ্যের মূল্য ৳ {{Math.round(orderInfo.final_total)}}</p>
                            <p>আপনার ডিউ বিল ৳ {{Math.round(orderInfo.final_total-totalpay)}}</p>
                            <p>ধন্যবাদান্তে - Girls On Top</p>
                            <ul>
                                <li><nuxt-link to="/" class="btn btn-success">Order More</nuxt-link></li>
                                <li><nuxt-link to="/customer/order" class="btn btn-primary">My Order</nuxt-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	</div>
</template>
<script>
    export default {
       data(){
       	return{
       		 logo:{},
       		 orderInfo:[],
             totalpay:{},
       	}
       },
        methods:{
            loadData(){
            	let id = this.$route.params.id;
                this.$axios.get('/api/v1/customer/order-success/'+id).then(response => {
                	 this.orderInfo = response.data.orderInfo;
                     this.totalpay = response.data.totalpay;
                	 this.loading = false;
                });
            },
        },
        mounted(){
            this.loadData();

        }
    };
</script>
