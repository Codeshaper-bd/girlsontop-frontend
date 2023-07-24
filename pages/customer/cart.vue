<template>
    <div>
        <section class="productarea section-padding">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <div class="cart-header">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="cart-header-left">
                                        <p>Shopping cart ({{cartItemCount}}) items</p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="cart-header-right">
                                        <nuxt-link :to="{path:'/'}">More Shopping</nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="show-cart-body">
                            <div class="showcart-item" v-for="(item,index) in cart">
                                <div class="row">
                                    <div class="col-sm-8 col-8">
                                        <div class="cart-info">
                                            <div class="row">
                                                <div class="col-sm-3 col-3">
                                                    <img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image"  alt="">
                                                </div>
                                                <div class="col-sm-9 col-9">
                                                    <h6>{{item.product.name}}</h6>
                                                    <p v-if="item.product_size">Size: {{item.product_size}}</p>
                                                    <p>Tk {{item.product.variation.default_sell_price}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-4">
                                        <div class="cart-action">
                                            <div><button class="text-success" @click="RemoveToCart(item.product,item.id)"><i class="fa fa-times"></i></button></div>
                                            <div>
                                                <h6>Tk {{item.product.variation.default_sell_price*item.quantity}}</h6>
                                            </div>
                                             <div class="quantity-part">
                                              <div class="from-group">
                                                  <div class="quantity-part-input">
                                                  <div class="input-group">
                                                      <span class="input-group-btn">
                                                          <button type="button" v-bind:disabled="item.quantity < 2" class="quantity-left-minus decrement decrementqty" @click="DecrementToCart(item.product,item.product_size)">
                                                              <i class="fa fa-minus"></i>
                                                          </button>
                                                      </span>
                                                          <input type="text" name="qty"id="quantity" class="input-number" :value="item.quantity">
                                                        <span class="input-group-btn">
                                                          <button type="button" @click="IncrementToCart(item.product,item.product_size)" class="quantity-right-plus increment incrementqty" >
                                                              <i class="fa fa-plus"></i>
                                                          </button>
                                                      </span>
                                                   </div>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="proceed-payment my-4">
                            <div class="row">
                                <div class="col-sm-6">
                                     <div class="clear_btn cartcheckout-btn">
                                       <a @click="ClearBag()">
                                        Clear Bag 
                                      </a>
                                     </div>
                                </div>
                                <div class="col-sm-6">
                                   <div class="payment_btn cartcheckout-btn">
                                        <nuxt-link to="/customer/checkout">
                                        Proceed to Checkout
                                         </nuxt-link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- col-8 end -->
                </div>
                <!--row end-->
            </div>
        </section>
        <!--productarea end-->
    </div>
</template>
<script>
   import {RemoveToCart,IncrementToCart,DecrementToCart} from '~/mixins.js/global'
   import Form from 'vform'
    export default {

        methods:{

            ClearBag(){
                this.$axios.delete('/api/v1/cart/clear',{
                        headers:{
                            'customer-id' : localStorage.getItem('customer_id')
                        }
                      }).then(response=>{
                    if(response.data.status=='success'){
                        localStorage.setItem('shippingfee',0);
                        localStorage.setItem('discount',0);
                        localStorage.setItem('partialpayment',0);
                        localStorage.removeItem('paymentcharge',0);
                        this.$store.dispatch('discount');
                        this.$store.dispatch('shippingfee');
                        this.$store.dispatch('partialpayment');
                        this.$toast.success('Your cart clear successfully.');
                        this.$store.dispatch('getCartitems');
                         this.$router.push({ path: "/"});
                    }
                  })
            },
        },
        mounted(){
            this.$store.dispatch('getCartitems');
            this.$store.dispatch('shippingfee');
        },
        computed:{
            cart(){
                return this.$store.state.cart;
            },
            discount(){
                return this.$store.state.discount;
            },
            shippingfee(){
                return this.$store.state.shippingfee;
            },
            cartItemCount(){
                return this.$store.getters.cartItemCount;
            },
            cartTotalPrice(){
                return this.$store.getters.cartTotalPrice;
            },

        },
        mixins : [RemoveToCart,IncrementToCart,DecrementToCart],

    };
</script>