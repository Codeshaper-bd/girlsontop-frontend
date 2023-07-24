<template>
    <div>
     <section class="breadcrumb" >
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Offer</h5>
                            <ul>
                                <li><router-link to="/">Home </router-link></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a >Search </a></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a >Offer</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding home-product">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3 col-sm-12">
                        <div class="main-scategory sticky">
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
                    </div>
                    <div class="col-md-9 col-sm-12">
                        <div class="category-bar">
                            <div class="row">
                              <div class="col-sm-8">
                                <div  v-if="loading">
                                    <Skeleton height="35" class="width30" />
                                </div>
                                <h4 v-else> Offers</h4>
                              </div>
                              <div class="col-sm-4">
                                <div  v-if="loading">
                                    <Skeleton height="35"  />
                               </div>
                                <div class="sort-form" v-else>
                                  <select  class="form-control"  @change="productSort()" v-model="sort">
                                      <option value="">Sorting</option>
                                      <option value="1" >Newest</option>
                                      <option value="2" >Oldest</option>
                                      <option value="3" >High Price</option>
                                      <option value="4" >Low Price</option>
                                      <option value="5">Z-A</option>
                                      <option value="6">A-Z</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row" v-if="loading">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-6 sk-product" v-for="(skelation,index) in 8 " :key="index" >
                                <Skeleton height="250"/>
                                <Skeleton height="50" class="my-1"/>
                                <Skeleton height="40"/>
                            </div>
                          </div>
                        <div class="row hproduct-area" v-else>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6" v-for="(product,index) in products.data">
                            <div class="hproduct-item">
                                <div class="hproduct-img">
                                 <div v-if="product.variation.discountitem">
                                     <p v-if="product.variation.discountitem.discount" class="discount">{{Math.round(product.variation.discountitem.discount?.discount_amount)}} <strong v-if="product.variation.discountitem.discount.discount_type=='percentage'"> %</strong> <strong v-else>Tk</strong> Off</p>
                                 </div>
                                 <router-link :to="'/product/details/'+product.id">
                                    <img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + product.image"  alt="">
                                 </router-link>
                                 <div class="prosizes"  v-if="sizechart==true && sizes.length > 0 && sproid==product.id">
                                    <div class="vsizes">
                                          <p><strong>Available Size</strong></p>
                                          <label class="vradio-label" v-for="(size,index) in sizes">
                                           <input type="radio" @click="AddToCart(product)" v-model="select_size" :value="size.size.name" />
                                          <div class="vcustom-radio">{{size.size.name}}</div>
                                         </label>
                                         <button @click="Sizeclose()" class="sizeclose"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                 <div class="prosizes"  v-if="bsizechart==true && sizes.length > 0 && sproid==product.id">
                                    <div class="vsizes">
                                          <p>Available Size</p>
                                          <label class="vradio-label" v-for="(size,index) in sizes">
                                           <input type="radio" @click="BuyNow(product);" v-model="select_size" :value="size.size.name" />
                                          <div class="vcustom-radio">{{size.size.name}}</div>
                                         </label>
                                         <button @click="Bsizeclose()" class="sizeclose"><i class="fa fa-times"></i></button>
                                    </div>

                                </div>
                                </div>
                                <div class="hproduct-info">
                                    <p class="hproduct-name"><router-link :to="'/product/details/'+product.id">{{product.name.substring(0,30)+".."}} </router-link></p>
                                   <ul>
                                     <li v-if="product.variation.discountitem "> <p class="hproduct-price"  v-if="product.variation.discountitem.discount ">৳ <span v-if="product.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(product.variation.default_sell_price))-(Math.round(product.variation.default_sell_price*product.variation.discountitem.discount?.discount_amount)/100)}}</span><span v-else>{{Math.round(product.variation.default_sell_price-product.variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(product.variation.default_sell_price)}} </del></p><p v-else class="hproduct-price">৳ {{Math.round(product.variation?product.variation.default_sell_price:0)}}</p>
                                     </li>
                                     <li v-else> <p class="hproduct-price">৳ {{Math.round(product.variation?product.variation.default_sell_price:0)}}</p>
                                     </li>
                                   </ul>
                                </div>
                                <div class="product-cart">
                                      <ul v-if="product.stock.length > 0">
                                        <li>
                                          <a @click="AddToCart(product)">
                                              add to cart
                                            </a>
                                        </li>
                                        <li class="buynow">
                                            <button @click="viewdetails(product.id)">
                                              View Details
                                            </button>
                                        </li>
                                      </ul>
                                      <ul class="psoldout" v-else>
                                          <button>sold out</button>
                                      </ul>
                                </div>
                            </div>
                            <!-- product item end -->
                            </div>
                             <div class="col-sm-12">
                              <div class="custom-paginate" v-if="products.last_page > 1">
                                <vs-pagination :total-pages="products.last_page" @change="loadProducts"></vs-pagination>
                              </div>
                           </div>
                        </div>
                        <!-- tranding product -->
                    </div>
                </div>
            </div>
       </section>
        <!--productarea end-->
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
                                        Price : <span v-if="details.variation.discountitem ">
                                            <span class="hproduct-price"  v-if="details.variation.discountitem.discount ">৳ <span v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price))-(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.default_sell_price-details.variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(details.variation.default_sell_price)}} </del></span>
                                            <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}</span>
                                        </span> <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}</span>
                                    </div>
                                    <p v-if="details.variation.discountitem">
                                        <span v-if="details.variation.discountitem.discount">
                                            Save ৳ <span  v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.discountitem.discount?.discount_amount)}}</span>
                                        </span>
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
    </div>
</template>

<script>
    import {AddToCart,BuyNow,AddToWishlist} from '~/mixins.js/global'
    import Form from "vform"
    export default {
         data: () => ({
            productForm: new Form({
                quantity: "",
                product_id: "",
                product_color: "",
                product_size: "",
                buynow: "",
            }),

            sidecategories:[],
            products:{},
            keyword:{},
            sort: "",
            loading: true,

            details: {},
            stock: {},
            sizes: [],
            stocklocation: {},
            quantity: 1,
            gocart: "",
            activeImage: {},
            activeIndex: 0,
            isModalopen: false,
        }),
        methods:{
            loadProducts(page = 1){
                this.$axios.get('/api/v1/offer?page='+page).then(response => {
                     this.products = response.data.products;
                     this.keyword = response.data.keyword;
                     this.loading = false;
                });
            },
            productSort(page=1){
             let keyword = this.$route.params.keyword;
             let sort = this.sort;
              this.$axios.get('/api/v1/offer?sort='+sort).then(response => {
                     this.products = response.data.products;
                });
            },
            loadCategories(){
                this.$axios.get('/api/v1/side-category').then(response => {
                      this.sidecategories = response.data.sidecategories;
                })
            },
            loadBrands(){
                this.$axios.get('/api/v1/brands').then(response => {
                    this.brands = response.data.brands;
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
                   this.isModalopen = true;
                   const bodyElement = document.querySelector('body')
                   bodyElement.classList.add('overflow-none');
                });
            },
            modalClose(){
                this.isModalopen = false;
                const bodyElement = document.querySelector('body')
                bodyElement.classList.remove('overflow-none');
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
            }

        },
        mixins: [AddToCart,BuyNow,AddToWishlist],
        mounted(){
            this.loadProducts();
            this.loadCategories();
            this.loadBrands();
        },
        watch:{
            $route(){
                this.loadProducts();
            }
        },
    }
</script>
