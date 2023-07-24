<template>
	<div>
		<!--common html-->
		<div class="mobile-breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="bread-link">
                            <nuxt-link to="/customer/account"><i class="fa fa-arrow-left"></i> Order Invoice </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<section class="invoice-section">
		    <div class="container">
		        <div class="row">
		            <div class="paddleft-120 col-lg-12 col-md-12 col-sm-4">
		                <div class="customer-profile">
	                        <!-- col end -->
	                        <div class="col-lg-12 col-md-12 col-sm-12">
	                        	<div style="text-align: center;">
	                        		<button onclick="printInvoice1()" class="btn btn-success noprint">Print</button>
			                     </div>
	                            <div class="invoice">
	                                <div class="invoice-box" id="printInvoice1">
	                                    <table class="pad-30">
	                                        <tr>
	                                            <td class="invoice-logo text-right">
	                                            	<img :src="logo.image" alt="">
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <table class="mt-50 pad-30">
	                                        <tr class="w-33 float-left">
	                                            <p class="name" v-if="orderInfo.contact">{{orderInfo.contact.name}}</p>
	                                            <p><strong>Address </strong>{{orderInfo.shipping_details}}</p>
	                                            <p v-if="orderInfo.contact"><strong>Phone:</strong> {{orderInfo.contact.mobile}}</p>
	                                            <p class="text-capitalize"><strong>	Shipping Status : </strong> {{orderInfo.shipping_status}}</p>
	                                             <p class="text-capitalize"><strong>	Shipping Note : </strong> {{orderInfo.shipping_note}}</p>
	                                        </tr>
	                                        <tr class="w-33 float-left ">
	                                            <p class="invoice-title">INVOICE</p>
	                                            <p>Invoice No : {{orderInfo.invoice_no}}</p>
	                                            <p class="text-capitalize">Payment Status : {{orderInfo.payment_status}}</p>
	                                        </tr>
	                                        <tr class="w-33 float-left text-right">
	                                            <p>Total Price</p>
	                                            <p><strong>Tk : {{Math.round(orderInfo.final_total)}}</strong></p>
	                                            <p>Date : {{orderInfo.transaction_date}}</p>
	                                            <p v-if="orderInfo.delivered_to">Delivered To : {{orderInfo.delivered_to}}</p>
	                                             <p v-if="orderInfo.additional_notes">Note : {{orderInfo.additional_notes}}</p>
	                                        </tr>
	                                    </table>
	                                    <table class="table table-bordered  mt-30">
                                				<thead>
                                					<tr>
                                						<td>Date</td>
                                						<td>Advance Amount</td>
                                						<td>Payment Method</td>
                                						<td>TrxID</td>
                                					</tr>
                                				</thead>
                                				<tbody>
                                					<tr v-if="invoice_payment">
                                						<td>{{invoice_payment.created_at}}</td>
                                						<td><span v-if="invoice_payment.transaction_no">{{Math.round(invoice_payment.amount)}}</span><span v-else> N/A</span></td>
                                						<td><span v-if="invoice_payment.transaction_no">Bkash</span><span v-else> N/A</span>
                                						</td>
                                						<td><span v-if="invoice_payment.transaction_no">{{invoice_payment.transaction_no}}</span><span v-else> N/A</span>
                                						</td>
                                					</tr>
                                				</tbody>
                                			</table>
	                                    <table class="table table-bordered mt-30">
	                                    	<thead>
	                                    		<tr>
	                                    			<td>ITEM DESCRIPTION</td>
	                                    			<td>PRICE</td>
	                                    			<td>QTY</td>
	                                    			<td>TOTAL</td>
	                                    		</tr>
	                                    	</thead>
	                                    	<tbody>
	                                    		<tr v-for="(value,index) in orderInfo.sell_lines">
	                                    			<td v-if="value.product">{{value.product.name}} -Size- {{value.variations?value.variations.name:''}}</td>
	                                    			<td>Tk {{Math.round(value.unit_price)}}</td>
	                                    			<td>{{value.quantity}}</td>
	                                    			<td>Tk {{Math.round(value.unit_price*value.quantity)}}</td>
	                                    		</tr>
	                                    	</tbody>
	                                    </table>
	                                    <table>
	                                    	<tr>
	                                    		<td class="w-50 float-left mt-30 mnomargin"></td>
	                                    		<td class="w-47 float-right">
	                                    			<table class="table" style="border-right: 2px solid #eee;margin-top: -1px !important;">
	                                    				<tbody>
	                                    					<tr>
		                                    					<td class="brt-0"><strong>Sub Total</strong></td>
		                                    					<td class="brt-0 brl-1"><strong>Tk {{orderInfo.final_total - orderInfo.shipping_charges}}</strong></td>
	                                    					</tr>
	                                    					<tr>
		                                    					<td class="brt-0"><strong>Shipping Fee</strong></td>
		                                    					<td class="brt-0 brl-1"><strong>Tk {{Math.round(orderInfo.shipping_charges)}}</strong></td>
	                                    					</tr>
	                                    					<tr>
		                                    					<td class="brt-0"><strong>Total</strong></td>
		                                    					<td class="brt-0 brl-1"><strong>Tk {{Math.round(orderInfo.final_total)}}</strong></td>
	                                    					</tr>
	                                    					<tr>
		                                    					<td class="brt-0"><strong>Paid</strong></td>
		                                    					<td class="brt-0 brl-1"><strong>Tk {{Math.round(totalpay)}}</strong></td>
	                                    					</tr>
	                                    				</tbody>
	                                    				<tfoot class="grandtotal">
	                                    					<tr>
	                                    						<td><strong>Due</strong></td>
	                                    						<td><strong>Tk {{Math.round(orderInfo.final_total-totalpay)}}</strong></td>
	                                    					</tr>
	                                    				</tfoot>
	                                    			</table>
	                                    		</td>
	                                    	</tr>
	                                    </table>
	                                    <table class="mt-30">
	                                    	<tr>
	                                    		<td class="w-50 float-left">
	                                    			<p style="border-bottom:2px solid #ddd;margin-bottom:5px"><strong>Thank you for your shopping!</strong></p>
	                                    			<p>We are dedicated for you. if any query feel free contact with us.</p>
	                                    		</td>
	                                    		<td class="w-50 float-left text-right" style="margin-top:15px">
	                                    			<p>.................................</p>
	                                    			<p>Account Manager</p>
	                                    		</td>
	                                    	</tr>
	                                    </table>
	                                </div>
	                                <div class="invoice-footer">
	                                	 <table>
	                                    	<tr>
	                                    		<td class="w-33 padr-20">
	                                    			<div class="icon"><i class="fa fa-phone"></i></div>
	                                    			<div class="contact-info">
	                                    			    <p>Hotline :</p>
	                                    				<p>+88 01600217373</p>
	                                    			</div>
	                                    		</td>
	                                    		<td class="w-33 padr-20">
	                                    			<div class="icon"><i class="fa fa-envelope"></i></div>
	                                    			<div class="contact-info">
	                                    				<p>info@girlsontop.com.bd</p>
	                                    				<p>www.girlsontop.com.bd</p>
	                                    			</div>
	                                    		</td>
	                                    		<td class="w-33 padr-20">
	                                    			<div class="icon"><i class="fa fa-map-marker"></i></div>
	                                    			<div class="contact-info">
	                                    				<p>Shop No-56, Block-C, Level-2, Bashundhara City Shopping Mall Panthapath, Tejgaon. Dhaka-1215, Bangladesh</p>
	                                    			</div>
	                                    		</td>
	                                    	</tr>
	                                    </table>
	                                </div>
	                             </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
		    </div>
		</section>
	</div>
</template>
<style>
      @media print
        {
        footer,header,.whychoose,.toggle-wrapper,.noprint
            {
                display: none !important;
            }

         .invoice,.invoice-section{
         	padding: 0 !important;
         	background: #fff !important;
         }
        }
	section.invoice-section {
	    background: #f9f9f9;
	}
	table{
		overflow: hidden;
	}
	.brt-0 {
	    border: 0 !important;
	}
	.brl-1 {
	    border-left: 1px solid #eee !important;
	}
	.pad-30{
		padding: 30px;
	}
	.invoice-logo img {
	    width: 80px;
	    height: auto;
	}
	.float-left{
		float: left;
	}
	.float-right{
		float: right;
	}
	.w-33{
		width: 33.00%;
	}
	.w-47{
		width: 47%;
	}
	.mt-50{
		margin-top: 50px;
	}
	.mt-30{
		margin-top: 30px;
		margin-bottom: 0 !important;
	}
	p.invoice-title {
	    font-size: 24px;
	    font-weight: 800;
	    color: #FF1593;
	    letter-spacing: 3px;
	}
	.invoice .name {
	    color: #FF1593;
	    font-weight: 600;
	}
	.invoice {
        max-width: 950px;
        margin: 0px auto;
        overflow: hidden;
        margin-top: 25px;
        margin-bottom: 50px;
    }
    button.btn.btn-success.noprint {
	    margin-top: 25px;
	}
	.invoice-box {
	    padding: 30px;
	    background: #fff;
	    font-size: 16px;
	    line-height: 24px;
	    color: #555;
	    position: relative;
	    overflow: hidden;
	    padding-bottom: 70px;
	    border-top: 15px solid #FF1593;
	    position: relative;
    	z-index: 1;
	}
	.invoice-box:after {
	    height: 60px;
	    width: 60px;
	    position: absolute;
	    left: 0;
	    top: 0;
	    content: "";
	    background: #FF1593;
	}
	.invoice-box:before {
	    height: 60px;
	    width: 60px;
	    position: absolute;
	    left: 8px;
	    top: 8px;
	    content: "";
	    background: #FF1593;
	    opacity: 0.8;
	}
    .invoice-box table thead{
    	background :#FF1593;
    	color :#fff
    }
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    .table td, .table th {
        padding: 8px 10px;
    }
    .grandtotal {
	    background: #FF1593;
	    color: #fff;
	}
    .grandtotal td {
	    padding: 8px 10px;
	}
	.invoice-footer {
	    background: #FF1593;
	    color: #fff;
	    padding: 30px 30px;
	    position: relative;
	    z-index: 1;
	}
	.invoice-footer:after {
	    position: absolute;
	    right: -23px;
	    top: -38px;
	    height: 150px;
	    width: 150px;
	    content: "";
	    background: #FF1593;
	    border-radius: 73px;
	    z-index: -1;
	}
	.icon {
	    float: left;
	    width: 30px;
	    background: #fff;
	    height: 30px;
	    border-radius: 50%;
	    margin-right: 15px;
	    margin-top: 10px;
	    text-align: center;
	}
	.contact-info {
	    float: left;
	    width: 83%;
	    text-align: left;
	}
	.icon i {
	    color: #FF1593;
	    line-height: 30px;
	}
	.paytable thead {
	    background: #f9f9f9!important;
	    color: #222 !important;
	}
	@media only screen and (min-width:320px) and (max-width:767px) {
		.w-33 {
		    width: 100% !important;
		    margin: 10px 0;
		    text-align: left !important;
		    display: block;
		    overflow: hidden;
		}
		.w-50 {
		    width: 100%!important;
		    text-align: left !important;
		    overflow: hidden;
		    display: block;
		}
		.w-47 {
		    width: 68%;
		    text-align: right !important;
		    margin-right: -4px;
		}
	}
</style>
<script>
    export default {
       middleware: 'authenticated',
       data(){
       	return{
       		 logo:{},
       		 orderInfo:[],
       		 invoice_payment:{},
       		 totalpay:{},
       	}
       },
        methods:{
            loadData(){
            	let id = this.$route.params.id;
                this.$axios.get('/api/v1/customer/order/invoice/'+id,{
                	headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
                }).then(response => {
                	 this.orderInfo = response.data.orderInfo;
                	 this.totalpay = response.data.totalpay;
                	 this.invoice_payment = response.data.invoice_payment;
                	 this.loading = false;
                });
                this.$axios.get('/api/v1/logo').then(response => {
                	 this.logo = response.data.logo;
                });
            },
             printInvoice1()
			 {
				var printDiv = document.getElementById("printInvoice1");
				var printWindow = window.open('', '', 'left=0, top=0, width=800, height=500, toolbar=0, scrollbars=0, status=0');
				printWindow.document.write(printDiv.innerHTML);
				printWindow.document.close();
				printWindow.focus();
				printWindow.print();
			 }  
        },
        mounted(){
            this.loadData();

        }
    };
</script>
