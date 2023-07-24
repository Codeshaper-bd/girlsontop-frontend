<template>
	<div>
		<ul>
		    <li class="active"><nuxt-link to="/customer/account"><i class="fa fa-user"></i>My Account</nuxt-link></li>
		    <li><nuxt-link to="/customer/editprofile"><i class="fa fa-shopping-bag"></i> Profile Edit</nuxt-link></li>
		    <li><nuxt-link to="/customer/order/all"><i class="fa fa-shopping-bag"></i> My Order</nuxt-link></li>
		    <li><a class="anchor" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
    	</ul>
	</div>
</template>
<script>
    export default {  
        methods:{
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
    }
</script>