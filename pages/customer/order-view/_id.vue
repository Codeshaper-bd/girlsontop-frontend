<template>
  <div>
    <section style="padding-top: 30px;" class="noprint">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <ul class="account_bred">
              <li>
                <nuxt-link to="/"> <i class="fa fa-home"></i> </nuxt-link>
              </li>
              <li>/</li>
              <li>
                <nuxt-link to="/customer/account">Account</nuxt-link>
              </li>
              <li>/</li>
              <li>
                <nuxt-link to="/customer/order/all">Order</nuxt-link>
              </li>
              <li>/</li>
              <li>
                <a>{{ orderinfo.invoice_no }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!--custom breadcrumb end-->
    <section class="section-padding" style="padding-top: 0;">
      <div class="container">
        <div class="row">
          <div class="col-md-8 print-area">
            <div class="order-view" id="print">

              <div class="order-view-inner" v-if="orderinfo">
                <div style="text-align: center;margin-top: 10px;position: absolute;left: 10px;top: -8px;">
                  <button onclick="print()" class="btn btn-success noprint">Print</button>
                </div>
                <div class="p-3 text-center order-card-header">
                  <h3>Order Information</h3>
                  <strong class="badge badge-success">{{ orderinfo.payment_status }}</strong>
                  <p>Invoice No : {{ orderinfo.invoice_no }}</p>
                </div>
                <div class="bg-gray row">
                  <div class="col-md-6">
                    <div class="details-left">
                      <h4>Addres:</h4>
                      <table class=" pad-30">
                        <tr class=" float-left">
                          <p class="name" v-if="orderinfo && orderinfo.contact">{{
                            orderinfo.contact.name
                          }}
                          </p>
                          <p>
                            <strong>Address </strong>{{ orderinfo.shipping_details }}
                          </p>
                          <p v-if="orderinfo.contact">
                            <strong>Phone:</strong>
                            {{ orderinfo.contact.mobile }}
                          </p>
                          <p class="text-capitalize"><strong> Shipping Status : </strong>
                            {{ orderinfo.shipping_status }}</p>
                          <!-- <p class="text-capitalize">Payment Status : {{orderinfo.payment_status}}</p> -->
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="details-right">
                      <h4>Order Summary:</h4>
                      <table>
                        <tbody>
                          <tr>
                            <td>Subtotal</td>
                            <td>Tk {{ orderinfo.final_total - orderinfo.shipping_charges }}</td>
                          </tr>
                          <tr>
                            <td>Shipping Fee</td>
                            <td>Tk {{ Math.round(orderinfo.shipping_charges) }}</td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>Tk {{ Math.round(orderinfo.final_total) }}</td>
                          </tr>
                          <tr>
                            <td>Paid</td>
                            <td class="text-success">Tk {{ Math.round(totalpay) }}</td>
                          </tr>
                        </tbody>
                        <tfoot class="grandtotal border-top">
                          <tr>
                            <td><strong>Due</strong></td>
                            <td><strong>Tk {{
                              Math.round(orderinfo.final_total -
                                totalpay)
                            }}</strong></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <h4>Products:</h4>
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
                      <tr v-for="(value, index) in orderinfo.sell_lines" :key="index">
                        <td v-if="value.product">{{ value.product.name }} -Size-
                          {{ value.variations ? value.variations.name : '' }}
                        </td>
                        <td>Tk {{ Math.round(value.unit_price) }}</td>
                        <td>{{ value.quantity }}</td>
                        <td>Tk {{ Math.round(value.unit_price * value.quantity) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-3">
                  <h5>Payment Details:</h5>

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
                        <td>{{ invoice_payment.created_at }}</td>
                        <td><span v-if="invoice_payment.transaction_no">{{ Math.round(invoice_payment.amount)
                        }}</span><span v-else> N/A</span></td>
                        <td><span v-if="invoice_payment.transaction_no">Bkash</span><span v-else>
                            N/A</span>
                        </td>
                        <td><span v-if="invoice_payment.transaction_no">{{ invoice_payment.transaction_no }}</span><span
                            v-else> N/A</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-3">
                  <h4>Order Comments:</h4>
                  {{ orderinfo.additional_notes }}
                </div>
              </div>
            </div>
          </div>
          <!-- col end 8 -->
          <div class="col-md-4 noprint">
            <div class="order-view">
              <div class="order-view-inner" v-if="shipmentStatues">
                <div class="track-step">
                  <div class="track-rstep" v-for="(status, index) in shipmentStatues" :key="index">
                    <h6>{{ JSON.parse(status.properties).attributes.shipping_status }}</h6>
                    <p v-if="JSON.parse(status.properties).attributes.shipping_status == 'packed'">আপনার অর্ডারটি প্যাকিং
                      করা হচ্ছে।</p>
                    <p v-if="JSON.parse(status.properties).attributes.shipping_status == 'shipped'">আপনার অর্ডারটি
                      কুরিয়ারে দেয়া হয়েছে।</p>
                    <p v-if="JSON.parse(status.properties).attributes.shipping_status == 'delivered'">আপনার অর্ডারটি
                      ডেলিভারি সম্পুর্ন হয়েছে।</p>
                    <p v-if="JSON.parse(status.properties).attributes.shipping_status == 'cancelled'">আপনার অর্ডারটি
                      ক্যান্সেল করা হয়েছে।</p>
                    <div class="d-flex align-items-center">
                      <strong>Date:</strong>
                      <p>{{ status.created_at }}</p>
                    </div>
                    <div class="d-flex align-items-center" v-if="JSON.parse(status.properties).update_note">
                      <strong>Order Note:</strong>
                      <p>{{ JSON.parse(status.properties).update_note }}</p>
                    </div>
                  </div>
                </div>

                <div class="track-rstep">
                  <h6>Ordered</h6>
                  <p v-if="orderinfo && orderinfo.contact"> আপনার অর্ডারটি কনফার্ম করা হয়েছে।
                  </p>
                  <div class="d-flex align-items-center">
                    <strong>Date:</strong>
                    <p>{{ orderinfo.created_at }}</p>
                  </div>
                  <div class="d-flex align-items-center" v-if="orderinfo.additional_notes">
                    <strong>Order Note:</strong>
                    <p>{{ orderinfo.additional_notes }}</p>
                  </div>
                </div>
                <!-- track step end -->
              </div>
            </div>
          </div>
          <!-- col end 4 -->
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderinfo: {},
      details: [],
      totalpay: 0,
      invoice_payment: {},
      shipmentStatues: {}
    }
  },
  methods: {
    loadData() {
      let id = this.$route.params.id;
      // GET ITEM STATUS
      this.$axios.get('api/v1/customer/order-view/' + id).then(response => {
        this.orderinfo = response.data.orderinfo;
        this.totalpay = response.data.totalpay;
        this.invoice_payment = response.data.invoice_payment;
        this.shipmentStatues = response.data.shipmentStatuses

        console.log(this.orderinfo)
      });
    },

    print() {
      var printDiv = document.getElementById("print");
      var printWindow = window.open('', '', 'left=0, top=0, width=800, height=500, toolbar=0, scrollbars=0, status=0');
      printWindow.document.write(printDiv.innerHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }


  },
  created() {
    this.loadData();
    console.log("hELLO");
  }
};
</script>


<style>
.bg-gray {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0px 0px 5px #dddddd2e;
}

.details-right table {
  width: 100%;
}

.details-right table tr td:last-child {
  text-align: right;
  font-weight: 500;
}

.paid {
  color: green;
}

@media print {

  #myHeader,
  .cartnavigation,
  .breadcrumb,
  .noprint {
    display: none !important;
  }

  .print-area {
    width: 100% !important;
    flex: 0 0 100%;
    max-width: 100%;
  }
}</style>