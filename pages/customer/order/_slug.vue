<template>
    <div>
        <section class="customer-profile">
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
                                <a>Order</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="paddleft-120 col-lg-12 col-md-12 col-sm-12">
                        <div class="customer-profile">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="cprofile-details">
                                        <div class="order-nav">
                                            <ul>
                                                <li><nuxt-link to="/customer/order/all">All</nuxt-link></li>
                                                <li><nuxt-link to="/customer/order/ordered">Ordered</nuxt-link></li>
                                                <li><nuxt-link to="/customer/order/packed">Packed</nuxt-link></li>
                                                <li><nuxt-link to="/customer/order/shipped">Shipped</nuxt-link></li>
                                                <li><nuxt-link to="/customer/order/delivered">Delivered</nuxt-link></li>
                                                <li><nuxt-link to="/customer/order/cancelled">Cancelled</nuxt-link></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12" v-for="(order, index) in orders" :key="index">
                                                <div class="order-item">
                                                    <div class="row justify-content-between p-2 px-3 mb-0">
                                                        <div>
                                                            <nuxt-link :to="'/customer/order-view/'+ order.invoice_no">
                                                                <h5 class="font-weight-bold mb-0">Order # {{ order.invoice_no }}</h5>
                                                            </nuxt-link>
                                                            <p class="text-muted">Date added: {{ order.created_at }}</p>
                                                        </div>
                                                        <div class="text-right mt-2">
                                                            <h6 class="status-icon">
                                                                <svg v-if="order.shipping_status == 'cancelled'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>

                                                                {{ order.shipping_status }}
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div v-if="order.sell_lines.length" class="d-flex align-items-center justify-content-between order-item-box">
                                                        <div class="d-flex align-items-center">
                                                            <img height="50px"
                                                            width="50px"
                                                            class="pr-2"
                                                            :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + order.sell_lines[0].product.image"
                                                            alt="product-image">
                                                            <nuxt-link :to="'/customer/order-view/'+ order.invoice_no">
                                                                <h5>{{ order.sell_lines[0].product.name }}</h5>
                                                            </nuxt-link>
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mt-3">
                                                            <div class="d-flex align-items-center pr-2 font-weight-bold">
                                                                <h5>Tk. {{ parseFloat(order.final_total).toFixed(2) }}</h5>
                                                            </div>
                                                            <div class="d-flex align-items-center">
                                                                <nuxt-link :to="'/customer/order-view/'+ order.invoice_no"
                                                                        class="order-details-btn order-invoice-btn px-2 mx-1 mt-0">Order Details
                                                                </nuxt-link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
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
<script>
import sidebar from "../sidebar";
export default {
    middleware: 'authenticated',
    components: {
        sidebar,
    },
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        loadData() {

            let slug = this.$route.params.slug;
            this.$axios.get("/api/v1/customer/order/" + slug + "?token= " + localStorage.getItem("token"))
                .then((response) => {
                    this.orders = response.data.orders;
                    console.log(response);
                });
        },
    },
    mounted() {
        this.loadData();
    },
    deactivated() {
        this.$destroy();
    },
};
</script>


<style scoped>

.status-icon svg {
    width: 19px;
    stock: red;
    margin-right: 4px;
    stroke: green;
}

</style>