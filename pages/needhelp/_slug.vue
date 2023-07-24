<template>
	<div>
        <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Need Help</h5>
                            <ul>
                                <li><nuxt-link to="/">Home </nuxt-link></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a >Need Help</a></li>
                                <li><a ><i class="fas fa-angle-double-right"></i> </a></li>
                                <li><a v-if="content != null">{{content.title}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="productarea about-area section-padding">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3">
                    <div class="nsidebar">
                        <ul>
                            <p>Need help</p>
                            <div v-if="loading">
                                <li  v-for="(skelation,index) in 8 " :key="index" >
                                    <Skeleton height="30" class="my-1"/>
                                </li>
                            </div>
                            <li v-for="(pcategory,index) in pagecategories" :key="index">
                                <nuxt-link :to="'/needhelp/'+ pcategory.slug">{{pcategory.pagename}}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9">
                    <div v-if="loading">
                        <Skeleton height="30" class="width40 my-1"/>
                        <Skeleton height="350" class="my-1"/>
                    </div>
                    <div v-else class="content-page" v-if="content != null">
                        <div class="single-page">
                            <h5 style="margin-bottom: 20px;">{{content.title}}</h5>
                           <p v-html="content.text"></p>
                        </div>
                    </div>
                </div>
                <!--row end-->
            </div>
        </div>
    </section>
	</div>
</template>
<script>
    export default {
        data(){
            return {
                content: {},
                pagecategories: {},
                loading : true,
            }
        },
        methods:{
            loadData(){
                let slug = this.$route.params.slug;
                this.$axios.get('api/v1/more/'+slug).then(response => {
                  this.content = response.data.content;
                  this.loading = false;
                });
                this.$axios.get('api/v1/page-categories').then(response => {
                  this.pagecategories = response.data.pagecategories;
                });
            }
        },
        watch:{
            $route(){
                this.loadData();
            }
        },
        mounted(){
            this.loadData();
        }
    };
</script>