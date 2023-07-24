<template>
   <div>
    <section class="home-banner">
          <div  v-if="loading">
            <Skeleton height="450" class="sk-slider" />
          </div>
        <carousel   :autoplay="true" :dots="false" :margin="0" :loop="true" :nav="false" :items="1" v-else-if="sliders.length > 0">
        <div class="slide-item"  v-for="(slider,index) in sliders" :key="index">
            <img :src="$config.baseURL+slider.image" alt="">
        </div>
       </carousel>
    </section>
        <!-- mobile header end -->
    <section class="category-section desktop-show">
        <div class="container">
            <div class="col-sm-12" v-if="loading">
              <div class="row">
                 <div  class="col-sm-12">
                    <carousel :autoplay="true" :dots="false" :loop="true" :nav="false"  :items="1" :responsive="{0:{items:3},786:{items:6,margin:10},767:{items:5,margin:10}}">
                    <div   v-for="(skelation,index) in 6 " :key="index" >
                        <Skeleton height="150"/>
                   </div>
                   </carousel>
                </div>
              </div>
           </div>
            <div class="row justify-content-center" v-else>
                <div  class="col-sm-12">
                    <carousel :autoplay="true" :dots="false" :loop="true" :nav="false"  :items="1" :responsive="{0:{items:3},786:{items:6,margin:10},767:{items:5,margin:10}}" v-if="categories.length > 0">
                    <div  class="category-item"  v-for="(value,index) in categories" :key="index">
                        <nuxt-link :to="'/category/'+value.id">
                            <img :src="value.description" alt="">
                            <p>{{value.name}}</p>
                        </nuxt-link>
                   </div>
                   </carousel>
                </div>
            </div>
        </div>
    </section>
    <section class="category-section mobile-show">
        <div class="container">
            <div class="col-sm-12" v-if="loading">
              <div class="category-area">
                <div class="category-item" v-for="(skelation,index) in 8 " :key="index" >
                    <div class="my-1">
                      <Skeleton height="60"/>
                    </div>
                </div>
              </div>
           </div>
            <div class="row justify-content-center" v-else>
                <div  class="col-sm-12">
                    <div class="category-area">
                        <div  class="category-item" v-for="(value,index) in sidecategories" :key="index">
                            <nuxt-link :to="'/category/'+value.id">
                                <img :src="value.description" alt="">
                                <p>{{value.name}}</p>
                            </nuxt-link>
                       </div>
                   </div>
                </div>
            </div>
        </div>
        <div class="video-section">
            <div class="container">
            <div class="col-sm-12">
                <div class="homevideo">
                    <button @click="videoOpen()"><i class="fa fa-play"></i> how to order from Girls On Top?</button>
                </div>
            </div>
        </div>
        </div>
    </section>
    <!-- home-section end -->
    <section class="section-padding home-product">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <fixed-header :threshold="800">
                        <div class="main-scategory sticky" >
                            <p><i class="fa fa-list"></i> Categories</p>
                             <ul v-if="loading">
                                <li  v-for="(skelation,index) in 8 " :key="index" >
                                    <div class="my-1">
                                      <Skeleton height="50"/>
                                    </div>
                                </li>
                           </ul>
                            <ul id="accordion" v-else>
                              <li v-for="(scategory,index) in sidecategories" :key="index">
                                <nuxt-link :to="'/category/' + scategory.id" class="main-catname">
                                  {{scategory.name}}
                                </nuxt-link>
                                <button v-if="scategory.sub_categories.length > 0" class="collapsed" data-toggle="collapse" :data-target="`#menu-${index}`"><i class="fa fa-caret-down"></i></button>
                                <ul :id="`menu-${index}`" class="subcategory collapse" data-parent="#accordion">
                                    <li v-for="(subcategory,index) in scategory.sub_categories">
                                        <nuxt-link :to="'/category/' + subcategory.id" class="subcat-name">- {{subcategory.name}}</nuxt-link>
                                    </li>
                                </ul>
                              </li>
                            </ul>
                        </div>
                    </fixed-header>
                </div>
                <div class="col-md-9 col-sm-12">
                    <div class="row hproduct-area pb-30">
                       <div class="col-sm-9 col-6">
                            <div class="psection-title">
                                <h4>New Arrival</h4>
                            </div>
                       </div>
                       <div class="col-sm-3 col-6">
                           <div  v-if="loading">
                            <Skeleton height="35"  />
                           </div>
                            <div class="sort-form" v-else>
                              <select  class="form-control"  @change="productSort()" v-model="sort">
                                  <option value="" >Default</option>
                                  <option value="1" >Newest</option>
                                  <option value="2" >Oldest</option>
                                  <option value="3" >High Price</option>
                                  <option value="4" >Low Price</option>
                                  <option value="5">Z-A</option>
                                  <option value="6">A-Z</option>
                              </select>
                            </div>
                       </div>
                       <div class="col-sm-12" v-if="loading || loadspine">
                          <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-6 sk-product" v-for="(skelation,index) in 8 " :key="index" >
                                <Skeleton height="250"/>
                                <Skeleton height="50" class="my-1"/>
                                <Skeleton height="40"/>
                            </div>
                          </div>
                       </div>
                       <div class="col-lg-3 col-md-4 col-sm-6 col-6"  v-else-if="index < newarrivals.length" v-for="(productindex,index) in productShow">
                       <div class="hproduct-item">
                            <div class="hproduct-img">
                                <div v-if="newarrivals[index].variation.discountitem">
                                 <p v-if="newarrivals[index].variation.discountitem.discount" class="discount">{{Math.round(newarrivals[index].variation.discountitem.discount?.discount_amount)}} <strong v-if="newarrivals[index].variation.discountitem.discount.discount_type=='percentage'"> %</strong> <strong v-else>Tk</strong> Off</p>
                                </div>
                                 <nuxt-link :to="'/product/details/'+newarrivals[index].id">
                                    <img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + newarrivals[index].image"  alt="">
                                    .
                                 </nuxt-link>
                                 <div class="prosizes"  v-if="sizechart==true && sizes.length > 0 && sproid==newarrivals[index].id">
                                    <div class="vsizes">
                                          <p><strong>Available Size</strong></p>
                                          <label class="vradio-label" v-for="size in sizes" :key="size.id">
                                           <input type="radio" @click="AddToCart(newarrivals[index])" v-model="select_size" :value="size.size.name" />
                                          <div class="vcustom-radio">{{size.size.name}}</div>
                                         </label>
                                         <button @click="Sizeclose()" class="sizeclose"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="hproduct-info">
                                <p class="hproduct-name"><router-link :to="'/product/details/'+newarrivals[index].id">{{newarrivals[index].name.substring(0,30)+".."}} </router-link></p>
                              <ul>
                                <li v-if="newarrivals[index].variation.discountitem "> <p class="hproduct-price" v-if="newarrivals[index].variation.discountitem.discount ">৳ <span v-if="newarrivals[index].variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(newarrivals[index].variation.default_sell_price))-(Math.round(newarrivals[index].variation.default_sell_price*newarrivals[index].variation.discountitem.discount?.discount_amount)/100)}}</span><span v-else>{{Math.round(newarrivals[index].variation.default_sell_price-newarrivals[index].variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(newarrivals[index].variation.default_sell_price)}} </del></p>
                                <p class="hproduct-price" v-else>৳ {{Math.round(newarrivals[index].variation?newarrivals[index].variation.default_sell_price:0)}}</p>
                                </li>
                                <li v-else>    
                                    <p class="hproduct-price">৳ {{Math.round(newarrivals[index].variation?newarrivals[index].variation.default_sell_price:0)}}</p>
                                </li>
                               </ul>
                            </div>
                            <div class="product-cart">
                                  <ul v-if="newarrivals[index].stock.length > 0">
                                    <li>
                                      <a @click="AddToCart(newarrivals[index])">
                                          add to cart
                                        </a>
                                    </li>
                                    <li class="buynow">
                                      <button @click="viewdetails(newarrivals[index].id)">
                                          View Details
                                        </button>
                                    </li>
                                  </ul>
                                  <ul class="psoldout" v-else>
                                      <button>sold out</button>
                                  </ul>
                            </div>
                          </div>
                        </div>
                    </div>
                    <!-- new arrival product -->
                   <div class="row">
                       <div class="col-sm-12">
                           <div class="load-more" v-if="productShow < newarrivals.length || newarrivals.length > productShow">
                            <button @click="productShow += 16">load more...</button>
                          </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </section>
    <section class="modal-section" v-show="isModalopen">
        <div class="product-details modal-product" :class="{'show': isModalopen}">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="productdetails-slider">
                            <div  v-if="loading">
                               <Skeleton height="450" class="sk-dslider" />
                            </div>
                            <div class="card-carousel" v-else>
                                <div class="dslider-big">
                                    <div class="image">
                                        <div class="dslider-image" v-if="activeImage != 'null' && activeImage != undefined && activeImage.mediaimage != undefined">
                                            
                                            <img :src="'https://pos.girlsontop.com.bd/public/uploads/media/' + activeImage.mediaimage.file_name" alt="" />

                                        </div>
                                        <div class="dslider-image" v-else>
                                            <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + details.image" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Swiper -->
                            <div class="dslider-thumb">
                                <div v-for="(proimage, index) in  sizes" :key="proimage.id">
                                    <img v-if="proimage.mediaimage != null " :src="'https://pos.girlsontop.com.bd/public/uploads/media/' + proimage.mediaimage.file_name" class="active" @click="activateImage(index)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="productdetails-info">
                            <div class="row" v-if="loading">
                                <div class="col-sm-9">
                                    <Skeleton height="40" class="width70"/>
                                    <Skeleton height="20" class="my-1 width40"/>
                                </div>
                                <div class="col-sm-3">
                                    <Skeleton height="40"  />
                                </div>
                            </div>
                            <div class="dproduct-header" v-else>
                                <div class="dproduct-header-left" v-if="details.variation">
                                    <p class="dproduct-name">{{details.name}}</p>
                                    <div class="details-pro-price">
                                        Price : <span class="hproduct-price"  v-if="details.variation.discountitem "><span v-if="details.variation.discountitem.discount">
                                            ৳ <span v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price))-(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.default_sell_price-details.variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(details.variation.default_sell_price)}} </del></span>
                                            <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}</span>
                                        </span> 
                                        <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}</span>
                                    </div>
                                    <p v-if="details.variation.discountitem">
                                        <span v-if="details.variation.discountitem.discount">Save ৳ <span  v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.discountitem.discount?.discount_amount)}}</span></span>
                                    </p>
                                </div>
                                <div class="dproduct-header-left" v-else>
                                    <div class="details-pro-price">
                                        Price : <span class="hproduct-price">৳ {{Math.round(details.variation?details.variation.default_sell_price:0)}} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-product-description">
                                <p v-html="details.product_description"></p>
                            </div>
                            <div class="details-quantity-area">
                                <form @submit.prevent="addtocart" class="dbform form-row">
                                    <input type="hidden" name="product_id" :value="productForm.product_id=details.id" />
                                   <div class="col-sm-12"  v-if="loading">
                                        <Skeleton height="40" class="width60 my-2" />
                                        <Skeleton height="40" class="width40 my-2" />
                                   </div>
                                    <div  class="col-sm-6 vsizes" v-else-if="sizes.length > 0">
                                        <div class="size-container">
                                            <label class="vradio-label" v-for="(size,index) in sizes">
                                                <input type="radio"  :id="size.id" v-model="productForm.product_size" :value="size.size.name" />
                                                <div class="vcustom-radio">{{size.size.name}}</div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 my-2" v-if="loading">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <Skeleton height="50"/>
                                            </div>
                                            <div class="col-sm-3">
                                                <Skeleton height="50" />
                                            </div>
                                        </div>
                                   </div>
                                    <div class="quantity-part col-sm-12" v-else>
                                        <div class="from-group">
                                            <div class="quantity-part-input">
                                                <div class="input-group">
                                                    <span class="input-group-btn">
                                                        <a v-bind:disabled="quantity < 1" id="quantity-left" v-on:click="decrement">
                                                            <i class="fa fa-minus"></i>
                                                        </a>
                                                    </span>
                                                    <input name="qty" class="input-number" v-model="productForm.quantity=quantity" min="1" />
                                                    <span class="input-group-btn">
                                                        <a v-on:click="increment" id="quantity-right">
                                                            <i class="fa fa-plus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="details-cart-part col-sm-12">
                                        <div class="form-group" v-if="stock >= 1">
                                            <button class="dbutton addcart">Add To Cart</button>
                                             <a class="dbutton wishlist" @click="AddToWishlist(details)"><i class="fa fa-heart"></i> Wishlist</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- row end -->
                 <div class="modal-close">
                    <button @click="modalClose()">x</button>
                </div>
            </div>
        </div>
         <div :class="{'modal-overlay': isModalopen}" @click="modalClose()"></div>
    </section>
    <div class="video-modal-section" v-show="isVideoopen">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="vide-play">
                        <button @click="videoClose()"><i class="fa fa-arrow-left"></i></button>
                        <iframe width="auto" height="auto" src="https://www.youtube.com/embed/9GvezPD-nQc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{'modal-overlay': isVideoopen}" @click="videoClose()"></div>
    </div>
 </div>
</template>

<script>
    import {AddToCart,BuyNow,AddToWishlist} from '~/mixins.js/global'
    import FixedHeader from 'vue-fixed-header'
    import Form from "vform"
    export default {
        components: {
            FixedHeader
          },
          data: () => ({
            productForm: new Form({
                quantity: "",
                product_id: "",
                product_color: "",
                product_size: "",
                buynow: "",
            }),
            sliders:[],
            newarrivals:[],
            categories:[],
            sidecategories:[],
            loading : true,
            searchShow : false,
            productShow: 16,
            totalProducts: 0,
            index: 0,
            keyword: '',
            sort: "",

            details: {},
            stock: {},
            sizes: [],
            stocklocation: {},
            quantity: 1,
            gocart: "",
            activeImage: {},
            activeIndex: 0,
            isModalopen: false,
            isVideoopen: false,

            loading: true,
            loadspine: false,
            headerfooter : true
        }),

        methods:{
            loadData(){
                this.$axios.get('/api/v1').then(response => {

                    this.sliders = response.data.sliders;
                    this.categories = response.data.categories;
                    this.newarrivals = response.data.newarrivals;
                    this.loading = false
                });
                this.$axios.get('/api/v1/side-category').then(response => {
                    this.sidecategories = response.data.sidecategories;
                });
            },
            productSort(){
             let sort = this.sort;
             this.loadspine = true;
              this.$axios.get('/api/v1/newarrival-product?sort='+sort).then(response => {
                    this.newarrivals = response.data.newarrivals;
                    this.loadspine = false
                });
            },
            increment() {
                this.quantity++;
            },
            decrement() {
                if (this.quantity > 1) {
                    this.quantity--;
                }
            },
            activateImage(index) {
                this.activeIndex = index;
                this.activeImage = this.sizes[index];
            },
            viewdetails(id){

                   this.$axios.get('/api/v1/popup/details/'+id).then(response => {
                   this.details = response.data.productdetails;
                   this.sizes = response.data.sizes;
                   this.stock = response.data.stock;
                   this.activeImage = response.data.sizes[0];
                   this.isModalopen = true
                   const bodyElement = document.querySelector('body')
                   bodyElement.classList.add('overflow-none');

                });
            },
            modalClose(){
                this.isModalopen = false;
                const bodyElement = document.querySelector('body')
                bodyElement.classList.remove('overflow-none');
            },
            videoOpen(){
                this.isVideoopen = true
            },
            videoClose(){
                this.isVideoopen = false
            },
            searchData(){
                this.$router.push({ path: "/search/" +this.keyword});
            },
            async addtocart() {
                const response = await this.$axios.post("/api/v1/add-to-cart", this.productForm).then((response) => {
                    if(response.data.status == "success") {
                        this.$store.dispatch("getCartitems");
                        this.$toast.success( "Add to cart successfully.");
                        this.isModalopen = false;
                    }else if(response.data.status == "stockover") {
                        this.$toast.error("Product stock limit over",);
                    }else{
                        this.$toast.error( "Please choose your body size first.");
                    }
                });
            },
        },
        head() {
            return {
              title: 'Home - Girls On Top',
            }
        },
        watch: {
            $route() {
                this.searchShow = false;
            },
        },
        mounted(){
            this.loadData();
            this.productSort();
        },
        mixins: [AddToCart,BuyNow,AddToWishlist],
    };
</script>
