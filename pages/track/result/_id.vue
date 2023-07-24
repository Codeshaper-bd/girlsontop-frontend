<template>
	<div>
        <section class="breadcrumb">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="breadcrumb-text">
                        <h5>Track Result</h5>
                        <ul>
                            <li><router-link :to="{name:'home'}">Home </router-link></li>
                            <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                            <li><a >Track Result</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding">
           <div class="container">
             <div class="row justify-content-center">
               <div class="col-lg-6 col-md-6 col-sm-6">
                   <div class="card">
                       <div class="card-header">
                            <h6>Order Track Result #{{orderinfo.invoice_no}}  </h6>
                       </div>
                       <div class="card-body">
                            <table class="table table-bordered">
                        <tbody>

                            <tr>
                                <td>Invoice No</td>
                                <td>{{orderinfo.invoice_no}}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td v-if="orderinfo.contact">{{orderinfo.contact.name}}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{{orderinfo.shipping_details}}</td>
                            </tr>
                            <tr>
                                <td>Last Update</td>
                                <td>{{orderinfo.updated_at}}</td>
                            </tr>
                            <tr>
                                <td>Payment Status</td>
                                <td class="text-capitalize">{{orderinfo.payment_status}}</td>
                            </tr>
                            <tr>
                                <td>Delivery Status</td>
                                <td class="text-capitalize">{{orderinfo.shipping_status}}</td>
                            </tr>
                            <tr>
                                <td>Delivered To</td>
                                <td class="text-capitalize">{{orderinfo.delivered_to}}</td>
                            </tr>
                            <tr  v-if="shippinginfo != null ">
                                <td>Shipping Note </td>
                                <td class="text-capitalize"><span>{{shippinginfo.update_note}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                       </div>
                   </div>
                </div>
                <!-- col end -->
             </div>
           </div>
        </section>
	</div>
</template>
<script>
    export default {
        data(){
            return {
                orderinfo: {},
                shippinginfo: {},
            }
        },
        methods:{
            loadData(){
                
                let id = this.$route.params.id;
                this.$axios.get('api/v1/track/order/result/'+id).then(response => {
                     this.orderinfo = response.data.orderinfo;
                });
                this.$axios.get('api/v1/track/order/shipping-track/'+id).then(response => {
                     this.shippinginfo = JSON.parse(response.data.shippinginfo.properties);
                });
            }
        },
        mounted(){
            this.loadData();
        }
    };
</script>