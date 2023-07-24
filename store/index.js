export const state = () => ({
    cart : [],
	wishlist : [],
	compare : [],
	token  : '',
	shippingfee : '',
	discount : '',
	partialpayment : '',
	paymentcharge : '',
});

export const mutations = {
    ADD_TO_CART (state,{product,quantity,product_size,id,price}){
		let productInCart = state.cart.find(item =>{
			return item.product.id == product.id && item.id === id;
		});
		if(productInCart){
			productInCart.quantity++;
			return;
		}
		state.cart.push({
			product,quantity,product_size,id,price	
		});
	},
	SET_CART (state, cartItems){
		state.cart = cartItems;
	},
  	REMOVE_TO_CART  (state,{product,id}){
		state.cart = state.cart.filter(item => {
			return item.id != id
		})
	},
   INCREMENT_TO_CART (state,{product,product_size}){
		let productInCart = state.cart.find(item =>{
			return item.product_size === product_size;
		});
		if(productInCart){
			productInCart.quantity++;
			return;
		}
		state.cart.push({
			product,quantity	
		})
	},
	DECREMENT_TO_CART (state,{product,product_size}){
		let productInCart = state.cart.find(item =>{
			return item.product.id === product.id && item.product_size === product_size;
		});
		if(productInCart){
			productInCart.quantity--;
			return;
		}
		state.cart.push({
			product,quantity	
		})
	},

	//  Add To Wishlist Section
	ADD_TO_WISHLIST(state,{product,quantity}){
		console.log('product',product);
		let wishlistCart = state.wishlist.find(item =>{
			return item.product.id == product.id;
		});
		if(wishlistCart){
			wishlistCart.quantity++;
			return;
		}
		state.wishlist.push({
			product,quantity	
		})
	},
	SET_WISHLIST  (state, wishlistItems){
		state.wishlist = wishlistItems;
	},
	REMOVE_TO_WISHLIST  (state,product){
	state.wishlist = state.wishlist.filter(item => {
		return item.product.id !==product.id;
		})
	},

	//  Add To Compare Section
	 ADD_TO_COMPARE (state,{product,quantity}){
		let compareCart = state.compare.find(item =>{
			return item.product.id == product.id;
		});
		if(compareCart){
			compareCart.quantity++;
			return;
		}
		state.compare.push({
			product,quantity	
		})
	},
	SET_COMPARE(state, compareItems){
		state.compare = compareItems;
	},
	REMOVE_TO_COMPARE(state,product){
		state.compare = state.compare.filter(item => {
			return item.product.id !==product.id;
		})
	},
	SET_TOKEN(state,token){
		state.token = token;
	},
	CLEAR_TOKEN(state){
		state.token = '';
	},
	SET_DISCOUNT(state,discount){
		state.discount = discount;
	},
	SET_SHIPPING(state,shippingfee){
		state.shippingfee = shippingfee;
	},
	PARTIAL_PAYMENT(state,partialpayment){
		state.partialpayment = partialpayment;
	},
	PAYMENT_CHARGE(state,paymentcharge){
		state.paymentcharge = paymentcharge;
	}
}

export const actions = {
    
	// Add To Cart Section
	addProductToCart({commit},{product,quantity,product_size}){
		this.$axios.post('/api/v1/cart',{ 
			product_id: product.id,
			product_size: product_size,
			quantity
		}).then(response => {
			if(response.data.status=='success'){
				let id = response.data.id;
				let price = response.data.price;
				commit('ADD_TO_CART',{product,quantity,product_size,id,price});
				this.$toast.success('Product added in cart');
			}else{
				this.$toast.error('Product stock limit over');
		        console.log('stock limit over');
		    }
		});

	},
	addProductToBuy({commit},{product,quantity,product_size}){
		this.$axios.post('/api/v1/buynow',{
			product_id: product.id,
			product_size: product_size,
			quantity
		}).then(response=>{
			if(response.data.status=='success'){
				let id = response.data.id;
				let price = response.data.price;
				commit('ADD_TO_CART',{product,quantity,product_size,id,price});
			}else{
		        console.log('stock limit over');
		    }
			
			window.location.href = "checkout"
		})
	},
	getCartitems({commit}){
		this.$axios.get('/api/v1/cart')
		.then(response => {
			commit('SET_CART', response.data);
		})
	},
	RemoveToCart({commit},{product,id}){
		commit('REMOVE_TO_CART',{product,id});
		this.$axios.delete('/api/v1/cart/delete/'+product.id+'/'+id).then(response => {
			if(response.data.cartitem=='0'){
				localStorage.removeItem('shippingfee');
				localStorage.removeItem('paymentcharge');
				localStorage.removeItem('partialpayment');
				commit('PARTIAL_PAYMENT','0');
				commit('PAYMENT_CHARGE','0');
				commit('SET_SHIPPING','0');
			}
		});
	},
	IncrementToCart({commit},{product,product_size}){
		this.$axios.put('/api/v1/cart/increment/'+product.id+'/'+product_size).then(response => {
			if(response.data.status=='success'){
				commit('INCREMENT_TO_CART',{product,product_size});
			}else{
		       console.log('stock limit over');
		    }
		});
	},
	DecrementToCart({commit},{product,product_size}){
		commit('DECREMENT_TO_CART',{product,product_size});
		this.$axios.put('/api/v1/cart/decrement/'+product.id+'/'+product_size);
	},
	// Add To Wishlist Section
	AddToWishlist({commit},{product,quantity}){
		commit('ADD_TO_WISHLIST',{product,quantity});
		this.$axios.post('/api/v1/wishlist',{ 
			product_id: product.id,
			quantity
		});
	},
	getWishitems({commit}){
		this.$axios.get('/api/v1/wishlist')
		.then(response => {
			commit('SET_WISHLIST', response.data);
		})
	},
	RemoveToWishlist({commit},product){
		commit('REMOVE_TO_WISHLIST',product);
		this.$axios.delete('/api/v1/wishlist/delete/'+product.id);
	},
	// Add To Compare
	AddToCompare({commit},{product,quantity}){
		commit('ADD_TO_COMPARE',{product,quantity});
		this.$axios.post('/api/v1/compare',{ 
			product_id: product.id,
			quantity
		});
	},
	getCompareitems({commit}){
		this.$axios.get('/api/v1/compare')
		.then(response => {
			commit('SET_COMPARE', response.data);
		})
	},
	RemoveToCompare({commit},product){
		commit('REMOVE_TO_COMPARE',product);
		this.$axios.delete('/api/v1/compare/delete/'+product.id);
	},
	isLoggedIn({commit}){
		let token = (localStorage.getItem('token'));
		commit('SET_TOKEN',token);
	},
	Logout({commit}){
		commit('CLEAR_TOKEN');
	},
	discount({commit}){
		let discount = (localStorage.getItem('discount'));
		commit('SET_DISCOUNT',discount);
	},
	shippingfee({commit}){
		let shippingfee = (localStorage.getItem('shippingfee'));
		commit('SET_SHIPPING',shippingfee);
	},
	partialpayment({commit}){
		let partialpayment = (localStorage.getItem('partialpayment'));
		commit('PARTIAL_PAYMENT',partialpayment);
	},
	paymentcharge({commit}){
		let paymentcharge = (localStorage.getItem('paymentcharge'));
		commit('PAYMENT_CHARGE',paymentcharge);
	}

}

export const getters = {
	cartItem(state){
		return state.cart;
	},
	cartItemCount(state){
		return state.cart.length;
	},
	cartTotalPrice  (state){
		let total = 0;
		state.cart.forEach(item =>{
			total += item.price*item.quantity;
		})
		return total;
	},
	wishlistCount(state){
		return state.wishlist.length;
	},
	compareCount(state){
		return state.compare.length;
	},
	isLogged(state){
		return state.token;
	},
	discount(state){
		return state.discount;
	},
	shippingfee (state){
		return state.shippingfee;
	}

}