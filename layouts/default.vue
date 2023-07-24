 <template>
    <div class="app-body">
        <fixed-header :threshold="0">
        <div class="mobile-header-top sticky"  v-if="$route.name != 'customer-login' && $route.name != 'customer-register' && $route.name != 'customer-signin' && $route.name != 'customer-verify' && $route.name !='customer-order-invoice-id'">
            <div class="mobile-top-contact">
                <div class="container">
                    <div class="row">
                        <div class="col-5">
                           <div class="mobile-cell">
                                <a href="tel:01600217373"><i class="fa fa-phone"></i> 01600217373</a>
                           </div>
                        </div>
                        <div class="col-2">
                           <div class="msearch-icon">
                              <a @click="searchClose()" v-if="searchShow"><i class="fa fa-times"></i></a>
                              <a @click="searchOpen()" v-else><i class="fa fa-search"></i></a>
                           </div>
                        </div>
                        <div class="col-5">
                          <div class="header-top-right">
                               <div class="social">
                                    <li  ><a href="https://www.facebook.com/GirlsonTop.com.bd" target="_blank" class="facebook"><i class="fab fa-facebook-f"></i></a></li>
                                    <li  ><a href="https://www.instagram.com/accounts/login/?next=/girlsontopbd/" target="_blank" class="instagram"><i class="fab fa-instagram"></i></a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <div class="container">
             <div class="row">
                <div class="col-4">
                    <button class="mopen_toggle" v-on:click="showMenu"><i class="fa fa-bars"></i></button>
                    <div class="mobile-menu" :class="{'open': isOpenmenu}">
                        <div class="menu-title"> <nuxt-link to="/" >Home</nuxt-link>
                            <button class="copen_toggle" v-on:click="closeMenu"><i class="fa fa-times"></i></button>
                        </div>
                         <ul>
                             <li v-on:click="closeMenu"><nuxt-link to="/track/order" class="copen_toggle"><i class="fa fa-truck"></i> Track Order</nuxt-link></li>
                             <li v-on:click="closeMenu"><nuxt-link to="/offers"><i class="fa fa-percent"></i> Offers</nuxt-link></li>
                             <li v-on:click="closeMenu"><nuxt-link to="/needhelp/faqs" ><i class="fa fa-question"></i> Need Help</nuxt-link></li>
                             <li v-on:click="closeMenu"><nuxt-link to="/customer/signin" ><i class="fa fa-user"></i> Signin</nuxt-link></li>
                             <li v-on:click="closeMenu"><nuxt-link to="/customer/register"><i class="fa fa-registered"></i> Register</nuxt-link></li>
                         </ul>
                     </div>
                    <div class="mobile-menu main-scategory" :class="{'open': isOpencat}">
                        <div class="menu-title"> <nuxt-link to="/">Home</nuxt-link>
                            <button class="copen_toggle" v-on:click="closeCat"><i class="fa fa-times"></i></button>
                        </div>
                         <ul id="accordion">
                              <li  v-for="(scategory,index) in sidecategories" :key="index">
                                <span v-on:click="closeCat">
                                <nuxt-link :to="'/category/' + scategory.id" class="main-catname">
                                  {{scategory.name}}
                                </nuxt-link>
                                </span>
                                <button v-if="scategory.sub_categories.length > 0" class="collapsed" data-toggle="collapse" :data-target="`#menu-${index}`"><i class="fa fa-caret-down"></i></button>
                                <ul :id="`menu-${index}`" class="subcategory collapse" data-parent="#accordion">
                                    <li v-for="(subcategory,index) in scategory.sub_categories" v-on:click="closeCat">
                                        <nuxt-link :to="'/category/' + subcategory.id" class="subcat-name">- {{subcategory.name}}</nuxt-link>
                                    </li>
                                </ul>
                              </li>
                         </ul>
                     </div>
                </div>
                <div class="col-4">
                    <div class="mlogo">
                        <nuxt-link to="/"><img :src="$config.baseURL+logo.image" alt=""></nuxt-link>
                    </div>
                </div>
                <div class="col-4">
                    <div class="mobile-head-icon">
                        <ul>
                            <li><nuxt-link to="/customer/wishlist" class="itemcount"><i class="fa fa-heart"></i><span>{{wishlistCount}}</span></nuxt-link></li>
                            <li v-if="isLoggedIn">
                                <nuxt-link to="/customer/account">
                                   <i class="far fa-user"></i>
                                </nuxt-link>
                            </li>
                            <li v-else><nuxt-link to="/customer/signin"><i class="far fa-user"></i></nuxt-link></li>
                        </ul>
                    </div>
                </div>
            </div>
         </div>
        </div>
        </fixed-header>
       <!-- Mobile header top End -->
        <section class="mlogo-cart"  v-if="$route.name != 'customer-login' && $route.name != 'customer-register' && $route.name != 'customer-signin' && $route.name != 'customer-verify' && $route.name !='customer-order-invoice-id'">
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <div class="m-menu">
                           <nuxt-link to="/">
                                <p><i class="fa fa-home"></i></p>
                                <p>Home</p>
                           </nuxt-link>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="m-menu show">
                            <a v-on:click="showCat">
                                <p><i class="fa fa-list"></i></p>
                                <p>Categories</span></p>
                            </a>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="m-menu show">
                            <a v-on:click="showCart">
                                <p><i class="fa fa-shopping-basket"></i></p>
                                <p>Cart <span>{{cartItemCount}}</span></p>
                            </a>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="m-menu">
                            <div v-if="isLoggedIn">
                                <nuxt-link to="/customer/account">
                                    <p><i class="far fa-user"></i></p>
                                    <p>Account</p>
                                </nuxt-link>
                            </div>
                            <div v-else>
                                <nuxt-link to="/customer/signin">
                                    <p><i class="far fa-user"></i></p>
                                    <p>Account</p>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <fixed-header :threshold="0">
        <header class="header-section" id="myHeader"  v-if="$route.name != 'customer-login' && $route.name != 'customer-register' && $route.name != 'customer-signin' && $route.name != 'customer-verify' && $route.name !='customer-order-invoice-id'" >
            <div class="header-top">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-top-left">
                                <a href="tel:8801600217373"><i class="fa fa-phone"></i> 8801600217373</a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="header-top-right">
                               <div class="social">
                                    <li  v-for="(value,index) in socialicons" target="_blank" ><a :href="value.link" :class="value.name"><i :class="value.icon"></i></a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-header">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                            <div class="logo">
                                <nuxt-link to="/"><img :src="$config.baseURL+logo.image" alt=""></nuxt-link>
                            </div>
                        </div>
                        <!--col end-->
                        <div class="col-lg-6 col-md-6 col-sm-6 ">
                           <div class="main-search">
                                <form id="searchForm">
                                    <button type="submit"  @click.stop.prevent="submit()"><i class="fa fa-search"></i></button>
                                    <input type="text"  name="keyword" @keyup="searchData()" v-model="keyword" class="search_data"  placeholder="Search">
                                </form>
                           </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                           <div class="header-right">
                               <ul class="header-cart">
                                   <li><a  v-on:click="showCart" class="itemcount anchor"><i class="fa fa-cart-arrow-down"></i><span>{{cartItemCount}}</span></a></li>
                                   <li><nuxt-link to="/customer/wishlist" class="itemcount"><i class="fa fa-heart"></i><span>{{wishlistCount}}</span></nuxt-link></li>
                               </ul>
                               <ul class="auth-button" v-if="isLoggedIn">
                                   <li class="active"><nuxt-link to="/customer/account">Account</nuxt-link></li>
                               </ul>
                               <ul class="auth-button"  v-else>
                                    <li><nuxt-link to="/customer/signin">Signin</nuxt-link></li>
                                    <li class="active"><nuxt-link to="/customer/register">Register</nuxt-link></li>
                               </ul>
                           </div>
                        </div>
                    </div>
                 </div>
            </div>
            <!-- main header end -->
        </header>
        </fixed-header>
        <div class="mobile-search" :class="{'active': searchShow}" >
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                       <div class="main-search">
                            <form id="searchForm">
                                <button type="submit"  @click.stop.prevent="submit()"><i class="fa fa-search"></i></button>
                                <input type="text"  name="keyword" @keyup="searchData()" v-model="keyword" class="search_data"  placeholder="Search">
                            </form>
                       </div>
                    </div>
                </div>
            </div>
        </div>
         <!--main header area end-->
         <div class="header-gap"></div>
         <Nuxt keep-alive  />
        <footer  v-if="$route.name != 'customer-login' && $route.name != 'customer-register'&& $route.name != 'customer-signin' && $route.name != 'customer-verify' && $route.name !='customer-order-slug' && $route.name !='customer-editprofile' && $route.name !='customer-order-view-id' && $route.name !='customer-order-invoice-id' && $route.name !='customer-checkout' && $route.name !='customer-cart'&& $route.name !='customer-account'">
            <div class="footer-top-area">
                <div class="mobile-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="accordion footeraccordion" id="faccordionExample">
                                    <div class="card">
                                        <div class="card-header" data-toggle="collapse" data-target="#footerOne" aria-expanded="true">
                                            <span class="title">Contact </span>
                                            <span class="accicon"><i class="fas fa-angle-down rotate-icon"></i></span>
                                        </div>
                                        <div id="footerOne" class="collapse" data-parent="#faccordionExample">
                                            <div class="card-body">
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                                                    <div class="footer-widget">
                                                        <div class="flogo">
                                                            <nuxt-link to="/"><img src="~/assets/images/logo.png" alt=""></nuxt-link>
                                                        </div>
                                                          <ul class="footer-contact" v-for="(value,index) in contact">
                                                                <li>
                                                                    <p>{{value.address}}</p>
                                                                </li>
                                                                <li>
                                                                    <strong>Email : </strong>
                                                                    <a href="">{{value.email}}</a>
                                                                </li>
                                                                <li>
                                                                   <strong>Phone : </strong>
                                                                     <a href="">{{value.phone}}</a>
                                                                </li>
                                                            </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header collapsed" data-toggle="collapse" data-target="#footerTwo" aria-expanded="false" aria-controls="footerTwo">
                                            <span class="title">Importants</span>
                                            <span class="accicon"><i class="fas fa-angle-down rotate-icon"></i></span>
                                        </div>
                                        <div id="footerTwo" class="collapse" data-parent="#faccordionExample">
                                            <div class="card-body">
                                               <div class="footer-widget">
                                                    <ul class="footer-contact">
                                                        <li v-for="(value,index) in footermenuleft">
                                                            <nuxt-link :to="'/needhelp/'+value.slug">{{value.pagename}}</nuxt-link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header collapsed" data-toggle="collapse" data-target="#footerThree" aria-expanded="false" aria-controls="footerThree">
                                            <span class="title">Help Link</span>
                                            <span class="accicon"><i class="fas fa-angle-down rotate-icon"></i></span>
                                        </div>
                                        <div id="footerThree" class="collapse" data-parent="#faccordionExample">
                                            <div class="card-body">
                                               <div class="footer-widget">
                                                    <ul class="footer-contact">
                                                        <li v-for="(value,index) in footermenuright">
                                                            <nuxt-link :to="'/needhelp/'+value.slug">{{value.pagename}}</nuxt-link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-5 col-12 my-4">
                                <div class="footer-widget">
                                    <div class="widget">
                                        <h3>Follow Us</h3>
                                        <div class="social">
                                            <li  v-for="(value,index) in socialicons" target="_blank" >
                                                <a :href="value.link" :class="value.name"><i :class="value.icon"></i></a>
                                            </li>
                                        </div>
                                        <div class="payment-accept">
                                            <p class="p2">Accept payment</p>
                                            <img src="~/assets/images/payment.webp" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="desktop-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div class="footer-widget">
                                    <div class="flogo">
                                        <nuxt-link to="/"><img src="~/assets/images/logo.png" alt=""></nuxt-link>
                                    </div>
                                      <ul class="footer-contact" v-for="(value,index) in contact">
                                            <li>
                                                <p>{{value.address}}</p>
                                            </li>
                                            <li>
                                                <strong>Email : </strong>
                                                <a href="mailto:contact@girlsontop.com.bd">{{value.email}}</a>
                                            </li>
                                            <li>
                                               <strong>Phone : </strong>
                                                 <a href="tel:+88 01600217373">{{value.phone}}</a>
                                            </li>
                                        </ul>
                                </div>
                            </div>

                            <!-- footer-widget start -->
                            <div class="col-lg-2 col-md-2 col-sm-5 col-12 offset-sm-1 mr-auto">
                                <div class="footer-widget">
                                    <h3>Importants</h3>
                                    <ul class="footer-contact">
                                        <li v-for="(value,index) in footermenuleft">
                                            <nuxt-link :to="'/needhelp/'+value.slug">{{value.pagename}}</nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- footer-widget start -->
                            <div class="col-lg-2 col-md-2 col-sm-5 col-12 offset-sm-1 mr-auto">
                                <div class="footer-widget">
                                    <h3>Help Link</h3>
                                    <ul class="footer-contact">
                                        <li v-for="(value,index) in footermenuright">
                                            <nuxt-link :to="'/needhelp/'+value.slug">{{value.pagename}}</nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- footer-widget start -->
                             <div class="col-lg-3 col-md-3 col-sm-5 col-12">
                                <div class="footer-widget">
                                    <div class="widget">
                                        <h3>Follow Us</h3>
                                        <div class="social">
                                            <li  v-for="(value,index) in socialicons" target="_blank" ><a :href="value.link" :class="value.name"><i :class="value.icon"></i></a></li>
                                        </div>
                                        <div class="payment-accept">
                                            <p class="p2">Accept payment</p>
                                            <img src="~/assets/images/payment.webp" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom-area">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="copyright">
                                <p>Copyright by girlsontop.com.bd all right reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="cartnavigation ">
            <div class="toggle-wrapper">
              <span class="show" v-on:click="showCart">
                 <i class="fas fa-cart-arrow-down"></i>
                <p>{{cartItemCount}} ITEM </p>
                <p class="toggle-price"> ৳ {{Number(cartTotalPrice)}}</p>
              </span>
            </div>
            <div class="navigation cartTable" :class="{'open': isOpencart}">
            <div class="cart-product">
              <div class="shopping-cart-head">
               <div class="cart-item-count">
                  <i class="fas fa-cart-arrow-down"></i>
                  <p>({{cartItemCount}}) ITEM</p>
               </div>
                <div class="close-cart-icon">
                    <a class="mycatclose" v-on:click="closeCart">Close</a>
                </div>
              </div>
              <div class="cart-product-item-area" v-if="cartItemCount > 0">
                  <div class="cart-product-item" v-for="(item,index) in cart" >
                     <div class="posimage">
                       <img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image"  alt="">
                     </div>
                     <div class="cart-text">
                          <div class="cart-title">
                              <p>{{item.product.name.substring(0,50)+".."}}</p>
                              <p v-if="item.product_size">Size: {{item.product_size}}</p>
                              <span class="hproduct-price"  v-if="item.product.variation.discountitem ">৳ <span v-if="item.product.variation.discountitem.discount?.discount_type=='percentage'">{{(Math.round(item.product.variation.default_sell_price))-(Math.round(item.product.variation.default_sell_price*item.product.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(item.product.variation.default_sell_price-item.product.variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(item.product.variation.default_sell_price)}} </del></span> <span class="hproduct-price"  v-else>৳ {{Math.round(item.product.variation.default_sell_price)}}</span>
                          </div>
                          <div class="quantity-part toggle_quantity_part">
                          <div class="from-group">
                              <div class="quantity-part-input">
                              <div class="input-group">
                                  <span class="input-group-btn">
                                      <button type="button" class="quantity-left-minus decrement decrementqty toggle_decrement"  v-bind:disabled="item.quantity < 2"  @click="DecrementToCart(item.product,item.product_size)">
                                          <i class="fa fa-minus"></i>
                                      </button>
                                  </span>
                                      <input type="text" name="qty"id="quantity" class="input-number quantity_count" :value="item.quantity">
                                    <span class="input-group-btn">
                                      <button type="button"  @click="IncrementToCart(item.product,item.product_size)" class="quantity-right-plus increment incrementqty toggle_increment">
                                          <i class="fa fa-plus"></i>
                                      </button>
                                  </span>
                               </div>
                            </div>
                          </div>
                        </div>
                     </div>
                     <div class="cart-price">
                        <p>৳ {{item.product.variation.default_sell_price*item.quantity}}</p>
                     </div>
                     <div class="cart-remove">
                         <button class="text-danger" @click="RemoveToCart(item.product,item.id)"><i class="fa fa-times"></i></button>
                     </div>
                  </div>
                </div>
                <div class="cart-product-item-area" v-else>
                  <div class="cart-empty">
                     <img :src="$config.baseURL+'public/frontEnd/images/empty-cart.png'" alt="">
                  </div>
                </div>

               <div class="proCheckout">
                  <ul>
                      <li v-if="cartItemCount > 0" v-on:click="closeCart">
                         <nuxt-link to="/customer/cart" class="checkout">Go To Cart <span>৳ {{Number(cartTotalPrice)+Number(shippingfee) - discount}}</span></nuxt-link>
                      </li>
                      <li v-else>
                        <nuxt-link to="/">Continue Shopping <span><i class="fa fa-long-arrow-right"></i></span></nuxt-link>
                      </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
    import {RemoveToCart,IncrementToCart,DecrementToCart} from '~/mixins.js/global'
    import FixedHeader from 'vue-fixed-header'
    export default {
        components: {
            FixedHeader
        },
        data(){
            return {
               logo : {},
               contact : [],
               footermenuleft : [],
               footermenuright : [],
               sidecategories : [],
               socialicons : [],
               keyword : '',
               searchShow: false,
               pageslug: '',
               isOpencart: false,
               isOpenmenu: false,
               isOpencat: false,
            }
        },
        methods:{
            loadData(){
                let pageslug = this.$route.params.slug;
                this.$axios.get('/api/v1/logo').then(response => {
                    this.logo = response.data.logo;
                });
                this.$axios.get('/api/v1/side-category').then(response => {
                    this.sidecategories = response.data.sidecategories;
                });
                this.$axios.get('/api/v1/contact-us').then(response => {
                   this.contact = response.data.contact;
                   this.socialicons = response.data.socialicons;
                });
                this.$axios.get('/api/v1/about-company').then(response => {
                   this.footermenuleft  = response.data.footermenuleft;
                   this.footermenuright  = response.data.footermenuright;
               });

            },
            searchData(){
                this.$router.push({ path: "/search/" +this.keyword});
            },
            searchOpen: function() {
                this.searchShow = true;
            },
            searchClose: function() {
                this.searchShow = false;
            },
            showCart: function() {
                this.isOpencart = true;
            },
            closeCart: function() {
                this.isOpencart = false;
            },
            showMenu: function() {
                this.isOpenmenu = true;
            },
            closeMenu: function() {
                this.isOpenmenu = false;
            },
            showCat: function() {
                this.isOpencat = true;
            },
            closeCat: function() {
                this.isOpencat = false;
            },
        },
        computed:{
            cart(){
                return this.$store.state.cart;
            },
            discount(){
                return this.$store.state.discount;
            },
             wishlist() {
                return this.$store.state.wishlist;
              },
              wishlistCount() {
                return this.$store.getters.wishlistCount;
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
            isLoggedIn(){
                return this.$store.state.token;
            }
        },
        mounted(){
            this.$store.dispatch('getCartitems');
            this.$store.dispatch('discount');
            this.$store.dispatch('shippingfee');
            this.$store.dispatch('isLoggedIn');
            this.loadData();
            // intial customer detect
              if (localStorage.getItem("customer_id") === null) {
                let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
                localStorage.setItem("customer_id", uniqueId);
                this.$axios.defaults.headers.common["customerid"] = uniqueId;
              } else {
                this.$axios.defaults.headers.common["customerid"] = localStorage.getItem("customer_id");
              }
        },
        mixins : [RemoveToCart,IncrementToCart,DecrementToCart],

    };
</script>
