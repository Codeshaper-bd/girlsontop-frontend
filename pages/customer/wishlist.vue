<template>
	<div>
		 <section class="breadcrumb" >
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Wishlist</h5>
                            <ul>
                                <li><router-link :to="{name:'home'}">Home </router-link></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a>Wishlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
         <section class="productarea section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="show-cart-body">
                            <table class="table table-bordered">
                                  <thead>
                                    <tr  class="thead-light">
                                      <th scope="col">Delete</th>
                                      <th scope="col">Image</th>
                                      <th scope="col">Product</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Cart</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="item in wishlist" :key="item.id">
                                        <td><button class="text-danger" @click="RemoveToWishlist(item.product)"><i class="fa fa-times"></i></button></td>
                                      <td><img  :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image" style="width:40px"  alt=""></td>
                                      <td>{{item.product.name}}</td>
                                      <td>৳ {{Math.round(item.product.variation.default_sell_price)}}</td>
                                      <td class="text-left"><nuxt-link :to="'/product/details/'+item.product.id"  class="btn btn-primary anchor">Details</nuxt-link></td>
                                    </tr>
                                  </tbody>
                                </table>
                             </div>
                        </div>
                    </div>
                 <!--row end-->
            </div>
        </section>
        <!--productarea end-->
	</div>
</template>

<script>
    import { AddToCart,RemoveToWishlist } from "~/mixins.js/global";
    export default {
        data(){
            return {
                searchShow: false,
            }
        },
        computed:{
            wishlist(){
                return this.$store.state.wishlist;
            }
        },
        mixins : [RemoveToWishlist,AddToCart],
    }
</script>