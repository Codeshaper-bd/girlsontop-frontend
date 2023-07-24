<template>
    <div>
        <div class="breadcrumb" >
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>{{details.name}}</h5>
                            <ul>
                                <li><nuxt-link to="/">Home</nuxt-link></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>Details</a></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>{{details.name}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--custom breadcrumb end-->
        <div class="product-details section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                        <div class="productdetails-slider">
                            <div  v-if="loading">
                               <Skeleton height="450" class="sk-dslider" />
                            </div>
                            <div class="card-carousel" v-else>
                                <div class="dslider-big">
                                    <div class="image">
                                        <div class="dslider-image" v-if="activeImage != 'null' && activeImage != undefined && activeImage.mediaimage != undefined">
                                            <img :src="'https://pos.girlsontop.com.bd/public/uploads/media/' + activeImage.mediaimage.file_name" alt="" />
                                            <div class="actions">
                                                <span @click="prevImage" class="prev">
                                                    <i class="fas fa-chevron-left"></i>
                                                </span>
                                                <span @click="nextImage" class="next">
                                                    <i class="fas fa-chevron-right"></i>
                                                </span>
                                            </div>
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
                                <div class="dproduct-header-left">
                                    <p class="dproduct-name">{{details.name}}</p>
                                    <div class="details-pro-price">
                                        Price : 
                                        <span v-if="details.variation.discountitem ">
                                            <span class="hproduct-price"  v-if="details.variation.discountitem.discount ">৳ <span v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price))-(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.default_sell_price-details.variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(details.variation.default_sell_price)}} </del></span>
                                            <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}
                                        </span>
                                        </span> 
                                        <span class="hproduct-price"  v-else>৳ {{Math.round(details.variation.default_sell_price)}}
                                        </span>
                                    </div>
                                    <p v-if="details.variation.discountitem"><span v-if="details.variation.discountitem.discount">
                                        Save ৳ <span  v-if="details.variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(details.variation.default_sell_price*details.variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(details.variation.discountitem.discount?.discount_amount)}}</span>
                                    </span></p>
                                </div>
                                <div class="dproduct-header-right">
                                    <div class="add-to-favorite">
                                        <a  @click="AddToWishlist(details)"><i class="fa fa-heart"></i>Add To Favorite</a>
                                    </div>
                                    <ul class="social">
                                       <p> Share On</p>
                                        <li ><a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a></li>
                                        <li ><a href="#" class="twitter"><i class="fab fa-twitter"></i></a></li>
                                        <li ><a href="#" class="instagram"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="pro-highlight">
                                <div class="pro-highlight-left" v-if="loading">
                                   <Skeleton height="30" class="width40" />
                                   <Skeleton height="30" class="width50 my-2" />
                                   <Skeleton height="30" class="width60" />
                                </div>
                                <div class="pro-highlight-left" v-else>
                                    <p><strong>SKU:</strong>{{details.variation?details.variation.sub_sku:''}}</p>
                                    <p><strong>Brand:</strong><span v-if="details.brand_id" class="main-color font-700">{{details.brand.name}}</span></p>
                                    <p><strong>Category:</strong>{{details.category?details.category.name:''}}</p>
                                    <p v-if="details.unit"><strong>Unit:</strong>{{details.unit}}</p>
                                </div>
                                <div class="pro-highlight-right" v-if="loading">
                                   <Skeleton height="30" class="width60" />
                                   <Skeleton height="80" class=" my-2" />
                                </div>
                                <div class="pro-highlight-right" v-else>
                                    <p><strong>Available:</strong><span v-if="stock >= 1"> In Stock</span> <span v-else> Out Of Stock</span></p>
                                </div>
                            </div>
                            <div class="details-quantity-area">
                                <form @submit.prevent="addtocart" class="dbform form-row">
                                    <input type="hidden" name="product_id" :value="productForm.product_id=details.id" />
                                   <div class="col-sm-12"  v-if="loading">
                                        <Skeleton height="40" class="width60 my-2" />
                                        <Skeleton height="40" class="width40 my-2" />
                                   </div>
                                    <div  class="col-sm-6 vsizes" v-else-if="sizes.length > 0">
                                        <p class="cstitle">
                                            <strong>Sizes :</strong> {{productForm.product_size}} <span v-if="sizestock > 0">({{Math.round(sizestock)}} pcs)</span>
                                            <a class="btnsize" @click="showChart()">VIEW SIZE CHART <i class="fas fa-angle-right" aria-hidden="true"></i></a>
                                        </p>
                                        <div class="size-container">
                                            <label class="vradio-label" v-for="(size,index) in sizes">
                                                <input type="radio" @change="sizeOnstock($event)" :id="size.id" v-model="productForm.product_size" :value="size.size.name" />
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
                                            <button class="dbutton buynow" @click="dbuynow()">BUY NOW</button>
                                             <a class="store-check-btn" @click="storeCheck()">Store Availability Check</a>
                                        </div>
                                    </div>
                                </form>
                                <div class="form-group" v-if="stock < 1">
                                    <button class="dbutton addcart">Sold Out</button>
                                </div>
                                <div class="col-sm-12">
                                    <div class="shareit">
                                        <p>SHARE ON :<ShareNetwork
                                            network="facebook"
                                            :url="'http://girlsontop.websolutionit.com/product/details/'+ details.id"
                                            title="details.name"
                                            description="details.product_description">
                                            <i class="fab fa-facebook"></i> Facebook
                                        </ShareNetwork></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12">
                        <div class="cart-summary" style="margin-top: 0;">
                            <div class="row">
                                <div class="col-sm-12 my-2" v-if="loading">
                                    <Skeleton height="30"/>
                                    <Skeleton height="30" class="my-1"/>
                                    <Skeleton height="30"/>
                                    <Skeleton height="30" class="my-1"/>
                                    <Skeleton height="30"/>
                                    <Skeleton height="30" class="my-1"/>
                               </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- row end -->
               <div class="tab-section">
                    <div class="row" v-if="loading">
                        <div class="col-sm-2">
                            <Skeleton height="50"/>
                        </div>
                        <div class="col-sm-2">
                            <Skeleton height="50"/>
                        </div>
                        <div class="col-sm-1">
                            <Skeleton height="50"/>
                        </div>
                        <div class="col-sm-12 my-2">
                            <Skeleton height="20" class="width40"/>
                            <Skeleton height="30" class="my-1 width40"/>
                            <Skeleton height="20" class="width40"/>
                            <Skeleton height="25" class="my-2 width40"/>
                            <Skeleton height="20" class="width40"/>
                            <Skeleton height="25" class="my-1 width40"/>
                            <Skeleton height="15" class="width40"/>
                            <Skeleton height="20" class="my-1 width40"/>
                            <Skeleton height="30" class="width40"/>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-12 col-sm-12">
                            <div class="tab-container">
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="pills-desc-tab" data-toggle="pill" href="#pills-desc" role="tab" aria-controls="pills-desc" aria-selected="true">Description</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="pills-delivery-tab" data-toggle="pill" href="#pills-delivery" role="tab" aria-controls="pills-delivery" aria-selected="false">Delivery System</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="pills-review-tab" data-toggle="pill" href="#pills-review" role="tab" aria-controls="pills-review" aria-selected="false">Review</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-desc" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div class="card-body">
                                            <div v-html="details.product_description"></div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-delivery" role="tabpanel" aria-labelledby="pills-delivery-tab">
                                        <div class="card-body">
                                            <div v-html="alertcontent.text"></div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-review" role="tabpanel" aria-labelledby="pills-review-tab">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="review-count">
                                                    <h5>Review This Product ({{reviews.length}})</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="person-review" v-if="reviews.length > 0">
                                                    <div class="review" v-for="(review, index) in reviews">
                                                       <div class="row">
                                                           <div class="col-sm-2">
                                                               <div class="review_image" v-if="review.rcustomer">
                                                                   <img v-if="review.rcustomer.image" :src="'https://girlsontop.com.bd/backup/'+review.rcustomer.image" alt="">
                                                                   <img v-else src="~/assets/images/review-user.png" alt="">
                                                               </div>
                                                           </div>
                                                           <div class="col-sm-7">
                                                               <div class="review_text">
                                                                   <p v-if="review.rcustomer"><strong>{{review.rcustomer?review.rcustomer.name:''}}</strong> <span>{{review.created_at}}</span></p>
                                                                   <ul>
                                                                       <li v-for="(start,index) in review.ratting" :key="index"><i class="fa fa-star"></i></li>
                                                                   </ul>
                                                                   <p>{{review.review}}</p>
                                                               </div>
                                                           </div>
                                                            <div class="col-sm-3"></div>
                                                       </div>
                                                    </div>
                                                </div>
                                                <div class="empty-content" v-else>
                                                    <p class="empty-text">This product has no reviews yet. Be the first one to write a review.</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-5">
                                                <div class="review-form-area">
                                                    <form @submit.prevent="review" enctype="multipart/form-data" class="review-form" v-if="isLoggedIn">
                                                    <input type="hidden" name="product_id" v-model="reviewForm.product_id=details.id" />
                                                    <div class="form-control-file">
                                                        <label for="ratting">Your Ratting</label>
                                                        <select v-model="reviewForm.ratting" class="form-control">
                                                            <option>Select Ratting</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="review">Your Review Message</label>
                                                        <textarea class="form-control" v-model="reviewForm.review" name="review" id="" rows="5"></textarea>
                                                    </div>
                                                    <div class="form-check-inline">
                                                        <button type="submit" class="btn btn-primary">Submit Review</button>
                                                    </div>
                                                </form>
                                                <p v-else><strong><button  @click="reviewlogin()"  class="btn btn-primary btn-sm text-white anchor">Login</button></strong> for give your feedback</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- row -->
               </div>
            </div>
        </div>
        <div class="related-product">
            <div class="row">
                <div class="col-sm-12">
                    <div class="related-title">
                        <h5>Related Products</h5>
                    </div>
                </div>
                <div class="col-sm-12" v-if="loading">
                  <div class="custom-col" v-for="(skelation,index) in 5 " :key="index">
                    <div class="hproduct-item" >
                        <Skeleton height="250"/>
                        <Skeleton height="50" class="my-1"/>
                        <Skeleton height="40"/>
                    </div>
                  </div>
               </div>
                <div class="col-sm-12" v-else>
                     <carousel :autoplay="true" :dots="false" :loop="true" :nav="false"  :items="1" :responsive="{0:{items:2,margin:5},786:{items:5,margin:10},767:{items:3,margin:10}}" v-if="relatedproducts.length > 0">
                        <div class="hproduct-item" v-for="(product,index) in relatedproducts" :key="index">
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
                                        <nuxt-link :to="'/product/details/'+product.id">
                                     view details
                                    </nuxt-link>
                                </li>
                                    </li>
                                  </ul>
                                  <ul class="psoldout" v-else>
                                      <button>sold out</button>
                                  </ul>
                            </div>
                        </div>
                        <!-- product item end -->
                    </carousel>
                    <div class="mobile-related-product">
                       <div class="row">
                           <div class="col-sm-12">
                                <div class="related-title">
                                    <h5>Similer Products</h5>
                                </div>
                            </div>
                           <div class="custom-col5"  v-for="(product,index) in similerproducts" :key="index">
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
                                            <nuxt-link :to="'/product/details/'+product.id">
                                         view details
                                        </nuxt-link>
                                    </li>
                                        </li>
                                      </ul>
                                      <ul class="psoldout" v-else>
                                          <button>sold out</button>
                                      </ul>
                                </div>
                            </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="size-chart" :class="{'showchart': isOpenchart}" >
            <div class="chart-head">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <strong>Size Chart</strong>
                    </div>
                    <div class="col-sm-6 col-6 text-right">
                        <a class="anchor" @click="removeChart()">Close <i class="fa fa-times"></i></a>
                    </div>
                </div>
            </div>
            <div class="chart-product">
                <div class="row">
                    <div class="col-4">
                        <div class="image">
                            <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + details.image" alt="" />
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="text">
                            <h5>{{details.name}}</h5>
                            <p>Price : ৳ {{Math.round(details.variation?details.variation.default_sell_price:0)}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-tab">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li>
                        <a class="active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Size Chart</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">How To Measure</a>
                    </li>
                </ul>
                <div class="size-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel">
                        <div class="size-chart-img" v-for="(value,index) in sizechart">
                            <img :src="'https://girlsontop.com.bd/product/details/324'+value.image" alt="" />
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel">
                        <div class="size-chart-img" v-for="(value,index) in sizemeasure">
                            <img :src="'https://girlsontop.com.bd/backup/'+value.image" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{'details-overlay': isOpenchart || openStore}" @click="removeChart()"></div>
        <div class="store-availibility" :class="{'show': openStore}" v-show="openStore">
            <div class="close-store">
                <a @click="storeClose()"><i class="fa fa-times"></i></a>
            </div>
            <div class="store-product">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="store-product-img">
                            <img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + store_product.image"  alt="">
                            
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="store-product-content">
                            <p class="store_pname">{{store_product.name}}</p>
                            <p class="store_pprice"  v-if="variation.discountitem "><span v-if="variation.discountitem.discount">
                                ৳ <span v-if="variation.discountitem.discount.discount_type=='percentage'">{{(Math.round(variation.default_sell_price))-(Math.round(variation.default_sell_price*variation.discountitem.discount?.discount_amount)/100)}}</span> <span v-else>{{Math.round(variation.default_sell_price-variation.discountitem.discount?.discount_amount)}}</span> <del>{{Math.round(variation.default_sell_price)}} </del>
                            </span>
                             <span v-else>৳ {{Math.round(variation.default_sell_price)}}</span>
                            </p> 
                            <p class="store_pprice"  v-else>৳ {{Math.round(variation.default_sell_price)}}</p>
                            <p class="store_psize">Size : <span>{{variationvalue.name}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="store-stock-available">

                    <div class="row">
                        <!-- <div class="col-sm-12">
                            <p class="store_text"><strong>নিচে থেকে দেখে নিন আমাদের যে আউটলেটে গেলে এই ড্রেস টি আপনি সরাসরি দেখে ক্রয় করতে পারবেন।</strong></p>
                        </div> -->
                        <div class="col-sm-6 col-6">
                            <strong>Store Name</strong>
                        </div>
                        <div class="col-sm-6 col-6 text-right">
                            <strong>Availability</strong>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <strong>Girls On Top</strong>
                        </div>
                        <div class="col-sm-6 col-6 text-right">
                            <strong class="text-success" v-if="girlsontopstock > 0">Available</strong>
                            <strong class="text-danger" v-else>Stock Out</strong>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <strong>Bashundhara City</strong>
                        </div>
                        <div class="col-sm-6 col-6 text-right">
                            <strong class="text-success" v-if="girlsontopstock > 0">Available</strong>
                            <strong class="text-danger" v-else>Stock Out</strong>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <strong>Online Stock</strong>
                        </div>
                        <div class="col-sm-6 col-6 text-right">
                            <strong class="text-success" v-if="girlsontopstock > 0">Available</strong>
                            <strong class="text-danger" v-else>Stock Out</strong>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-sm-6 col-6">
                            <strong>Got One</strong>
                        </div>
                        <div class="col-sm-6 col-6 text-right">
                            <strong class="text-success" v-if="gotstock > 0">Available</strong>
                            <strong class="text-danger" v-else>Stock Out</strong>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "vform";
import { AddToCart, BuyNow, AddToWishlist } from "~/mixins.js/global";
export default {
  name: "Details",
  data: () => ({
    productForm: new Form({
      quantity: "",
      product_id: "",
      product_color: "",
      product_size: "",
      buynow: "",
    }),
    reviewForm: new Form({
      product_id: "",
      ratting: "",
      review: "",
    }),
    details: {},
    stock: {},
    sizes: [],
    quantity: 1,
    alertcontent2: {},
    alertcontent: {},
    stocklocation: {},
    sizechart: {},
    sizemeasure: {},
    relatedproducts: {},
    reviews: [],
    gocart: "",
    activeImage: {},
    activeIndex: 0,
    images: [],
    loading: true,
    sizestock: 0,
    isOpenchart: false,
    post: {},

    girlsontopstock: {},
    gotstock: {},
    variationvalue: {},
    store_product: {},
    variation: {},
    openStore: false,
    searchShow: false,
  }),

  async asyncData({ params }) {
    let id = params.id;
    const res = await fetch(
      "https://girlsontop.com.bd/backup/api/v1/product/details/" + id
    );
    const data = await res.json();
    return {
      headData: data?.productdetails,

      allData: data,
    };
  },

  head() {
    let post = this.headData;
    // let imageUrl = encodeURI(
    //   this.allData.sizes[0].mediaimage.file_name
    // ).toString();

    return {
      title: post.name,
      meta: [
          {
          hid: `og:type`,
          property: "og:type",
          content: "og:product",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://pos.girlsontop.com.bd/public/uploads/img/" + post.image,
        },
        {
          hid: "og-image-height",
          property: "og:image:height",
          content: "50px",
        },
        {
          hid: "og-image-width",
          property: "og:image:width",
          content: "50px",
        },
        {
          hid: "image_type",
          property: "og:image:type",
          content: "image/jpeg",
        },


        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content:
            "https://pos.girlsontop.com.bd/public/uploads/img/" + post.image,
        },
        {
          hid: "og:image:url",
          property: "og:image:url",
          content:
            "https://pos.girlsontop.com.bd/public/uploads/img/" + post.image,
        },
         {
          hid: "product:retailer_item_id",
          property: "product:retailer_item_id",
          content: post?.sku,
        },

          {
          hid: "product:price:currency",
          property: "product:price:currency",
          content: "BDT",
        },
          {
          hid: "product:price:amount",
          property: "product:price:amount",
          content: parseFloat(post.variation?post.variation.default_sell_price:0),
        },
         {
          hid: "product:availability",
          property: "product:availability",
          content: "available for order",
        },

        {
          hid: `og:site_name`,
          property: "og:site_name",
          content: "Girls On Top",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content: post.name,
        },

        {
          hid: "og:url",
          property: "og:url",
          content: "https://girlsontop.com.bd" + this.$route.fullPath,
        },


        {
          hid: `og:description`,
          property: "og:description",
          content: post.product_description.replace(/<[^>]*>?/gm, ""),
        },
        {
          hid: `twitter:card`,
          name: "twitter:card",
          content: "summary_large_image",
        },

        {
          hid: `twitter:url`,
          name: "twitter:url",
          content: "https://girlsontop.com.bd" + this.$route.fullPath,
        },

        {
          hid: `twitter:image`,
          name: "twitter:image",
          content:
            "https://pos.girlsontop.com.bd/public/uploads/img/" + post.image,
        },

        {
          hid: `twitter:title`,
          name: "twitter:title",
          content: post.name,
        },
        {
          hid: `keywords`,
          property: "keywords",
          content: post.name,
        },
        {
          hid: `author`,
          property: "author",
          content: "girlsontop",
        },
        {
          hid: `brand_name`,
          property: "brand_name",
          content: "girlsontop",
        },

        {
          hid: `twitter:description`,
          name: "twitter:description",
          content: post.product_description.replace(/<[^>]*>?/gm, ""),
        },
        {
          hid: `keywords`,
          property: "keywords",
          content: post.name,
        },
      ],
    };
  },
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    reviewlogin() {
      localStorage.setItem("review", "yes");
      this.$router.push({ path: "/customer/login" });
    },
    nextImage() {
      var active = this.activeIndex + 1;
      if (active >= this.sizes.length) {
        console.log("high");
        active = 0;
      }
      this.activeImage = this.sizes[active];
      this.activeIndex = active;
    },
    prevImage() {
      var active = this.activeIndex - 1;
      if (active < 0) {
        active = this.sizes.length - 1;
      }
      this.activeImage = this.sizes[active];
      this.activeIndex = active;
    },
    activateImage(index) {
      this.activeIndex = index;
      this.activeImage = this.sizes[index];
    },
    loadProducts(params) {
      let id = this.$route.params.id;
      this.$axios.get("/api/v1/product/details/" + id).then((response) => {
        this.details = response.data.productdetails;
        this.stock = response.data.stock;
        this.sizestock = 0;
        this.productForm.product_size = "";
        this.alertcontent = response.data.alertcontent;
        this.alertcontent2 = response.data.alertcontent2;
        this.stocklocation = response.data.stocklocation;
        this.sizechart = response.data.sizechart;
        this.sizemeasure = response.data.sizemeasure;
        this.relatedproducts = response.data.relatedproducts;
        this.similerproducts = response.data.similerproducts;
        this.sizes = response.data.sizes;
        this.activeImage = response.data.sizes[0];
        this.loading = false;
      });
      this.$axios.get("/api/v1/product-reviews/" + id).then((response) => {
        this.reviews = response.data.reviews;
      });
    },
    loadShare() {
      this.$axios
        .get("/api/v1/product-share/details/" + this.$route.params.id)
        .then((response) => {
          this.post = response.data.productdetails;
        });
    },
    sizeOnstock() {
      let id = event.target.id;
      this.$axios.get("/api/v1/product-size/stock/" + id).then((response) => {
        this.sizestock = response.data.sizestock.qty_available;
      });
    },
    showChart() {
      this.isOpenchart = true;
    },
    removeChart() {
      this.isOpenchart = false;
    },
    storeClose() {
      this.openStore = false;
    },
    async addtocart() {
      const response = await this.$axios
        .post("/api/v1/add-to-cart", this.productForm)
        .then((response) => {
          if (response.data.status == "success") {
            this.$store.dispatch("getCartitems");
            this.$toast.success("Add to cart successfully.");
            if (this.gocart == 1) {
              this.$router.push({ path: "/customer/checkout" });
            }
            this.gocart = "";
          } else if (response.data.status == "stockover") {
            this.$toast.error("Product stock limit over");
          } else {
            this.$toast.error("Please choose your body size first.");
          }
        });
    },
    async storeCheck() {
      const response = await this.$axios
        .post("/api/v1/product/store-availability", this.productForm)
        .then((response) => {
          if (response.data.status == "success") {
            this.girlsontopstock = response.data.girlsontopstock;
            this.gotstock = response.data.gotstock;
            this.gotstock = response.data.gotstock;
            this.variationvalue = response.data.variationvalue;
            this.store_product = response.data.store_product;
            this.variation = response.data.variation;
            this.openStore = true;
          } else if (response.data.status == "sizeempty") {
            this.$toast.error("Please select product size");
          }
        });
    },
    async review() {
      const response = await this.$axios
        .post("/api/v1/customer/product/review", this.reviewForm, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.reviews.push(response.data.review);

            this.reviewForm.reset();
          } else {
            this.$toast.error("Not added something wrong.");
          }
        });
    },
    dbuynow() {
      this.gocart = 1;
    },
  },
  mounted() {
    this.loadProducts();
    this.loadShare();
    this.$store.dispatch("isLoggedIn");
  },
  watch: {
    $route() {
      this.loadProducts();
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token;
    },
  },
  mixins: [AddToCart, BuyNow, AddToWishlist],
};
</script>
