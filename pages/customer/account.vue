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
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="customer_bio">
                            <div class="customer_image">
                                <img src="~/assets/images/review-user.png" alt="">
                            </div>
                            <div class="customer_info">
                                <h6>Hello</h6>
                                <h5>{{customer.name}}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="cprofile-details my_account">
                            <div class="row">
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <nuxt-link to="/customer/account">
                                            <i class="fa fa-user"></i>
                                            <p>My Account</p>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <nuxt-link to="/customer/editprofile">
                                            <i class="fa fa-edit"></i>
                                            <p>Profile Edit</p>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <nuxt-link to="/customer/order/all">
                                            <i class="fa fa-shopping-bag"></i>
                                            <p>My Order</p>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <nuxt-link to="/customer/editprofile">
                                            <i class="fa fa-map"></i>
                                            <p>Address</p>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <nuxt-link to="/customer/wishlist">
                                            <i class="fa fa-heart"></i>
                                            <p>Wishlist</p>
                                        </nuxt-link>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-4">
                                    <div class="account_item">
                                        <a class="anchor" @click.prevent="logout">
                                            <i class="fas fa-sign-out-alt"></i>
                                            <p>Logout</p>
                                        </a>
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
    import sidebar from "./sidebar";
    export default {
        middleware: 'authenticated',
        components: {
            sidebar,
        },
        data() {
            return {
                customer: {},
            };
        },
        methods: {
            loadData() {
                console.log('route',this.$route);
                this.$axios.get("/api/v1/customer/account", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    this.customer = response.data.customer;
                });
            },
            logout(){
                this.$axios.post('/api/v1/customer/logout?token='+localStorage.getItem('token')).then(response=>{
                    if(response.data.status=='success'){
                        this.$toast.success('You are logout successfully.');
                        localStorage.removeItem('token');
                        this.$store.dispatch("Logout");
                        this.$router.push({ path:'/customer/signin' });
                    }else{
                        this.$toast.error('Your token does not match.');
                    }
                })
            }
        },

        mounted() {
            this.loadData();
           
        },
    };
</script>
