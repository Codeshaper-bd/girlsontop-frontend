
// import { mapActions } from "vuex";
// const StoreIndex = require('../store/index');
// export default StoreIndex;

// Add To Cart Section
export const  AddToCart = {
    data(){
        return {
            select_size:'',
            sproid:'',
            sizes:[],
            sizechart:false,
        }
    },
    methods:{
        AddToCart(product){
            this.$axios.get('/api/v1/product-sizes/'+product.id).then(response=>{
                this.sproid = product.id;
                this.sizes = response.data.sizes;
                this.sizechart = true;
                let select_size = this.select_size;
                if(this.sizes.length > 0 && select_size != 0){
                    this.$store.dispatch("addProductToCart",{
                        product: product,
                        product_size: select_size,
                        quantity : 1
                    });
                    this.select_size = '';
                    this.sizechart = false;
                 }
                 if(this.sizes.length == 0){
                    this.select_size = '';
                 }
            })
        },
        Sizeclose:function(){
           this.sizechart = false;
        }
    },
    watch:{
        $router(){
            this.AddToCart();
        }
    }
}
export const  BuyNow = {
     data(){
        return {
            select_size:'',
            sproid:'',
            sizes:[],
            bsizechart:false,
        }
    },
    methods:{
        BuyNow(product){
            this.$axios.get('/api/v1/product-sizes/'+product.id).then(response=>{
                this.sproid = product.id;
                this.sizes = response.data.sizes;
                this.bsizechart = true;
                let select_size = this.select_size;
                if(response.data.sizes.length > 0 && this.select_size.length != 0){
                    this.$store.dispatch("addProductToBuy",{
                        product: product,
                        product_size: select_size,
                        quantity : 1
                    });
                    this.bsizechart = false;
                    this.$toast.success('Product is successfully add to cart');
                 }
                 if(this.sizes.length == 0){
                    this.select_size = '';
                    this.$toast.error('Product Sold Out');
                 }
            })
        },
         Bsizeclose:function(){
           this.bsizechart = false;
        }
    },
    watch:{
        $router(){
            this.BuyNow();
        }
    }

}

export const  RemoveToCart = {
    methods:{
        RemoveToCart(product,id){
          this.$store.dispatch("RemoveToCart",{product:product,id:id});
        },
    },

}
export const  IncrementToCart = {
    methods:{
        IncrementToCart(product,product_size){
          this.$store.dispatch("IncrementToCart",{product:product,product_size:product_size});
        },
    },

}
export const  DecrementToCart = {
    methods:{
        DecrementToCart(product,product_size){
          this.$store.dispatch("DecrementToCart",{product:product,product_size:product_size});
        },
    },

}


// Add To Wishlist Section
export const  AddToWishlist = {
    methods:{
        AddToWishlist(product){
          this.$store.dispatch("AddToWishlist",{
            product: product,
            quantity : 1
          });
          this.$toast.success('Product added in wishlist');
        },
    },

}

export const  RemoveToWishlist = {
    methods:{
        RemoveToWishlist(product){
          this.$store.dispatch("RemoveToWishlist",product);
        },
    },

}

// Add To Compare Section
export const  AddToCompare = {
    methods:{
        AddToCompare(product){
          this.$store.dispatch("AddToCompare",{
            product: product,
            quantity : 1
          });
        },
    },

}
export const  RemoveToCompare = {
    methods:{
        RemoveToCompare(product){
          this.$store.dispatch("RemoveToCompare",product);
        },
    },

}