<template>
    <div>
      <section class="details-page2">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-sm-6">
                <div class="card my-4">
                  <div class="card-header bg-primary">
                    <p class="text-capitalize" v-if="post"><strong>{{post.name}}</strong></p>
                  </div>
                  <div class="card-body" v-if="post">
                   <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + post.image" alt="">
                   <div v-html="post.product_description" class="my-2"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
</template>
<script>
export default {
  name: "Details",
   data() {
    return {
      post: {},
    }
  },
  async fetch(){
    const response = await this.$axios.get('/api/v1/product-share/details/'+this.$route.params.id)
      this.post = response.data.productdetails;
  },
  async asyncData({$axios, params}) {
    let response = await $axios.get(`/api/v1/product-share/details/${params.id}`)
    let post = response.data.productdetails;
    return {
      post
    }
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    }
  },
  head() {
    return {
      title: this.post.name,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.name,
        },
        
        
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://girlsontop.websolutionit.com'+this.$route.fullPath,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.product_description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://pos.girlsontop.com.bd/public/uploads/img/'+this.post.image,
        },
         {
          hid: "og-image-height",
          property: "og:image:height",
          content: "300",
        },
        {
          hid: "og-image-width",
          property: "og:image:width",
          content: "400",
        },
        {
          hid: "og-image-alt",
          property: "og:image:alt",
          content: this.post.name ,
        },
        {
          hid: "og-image-type",
          property: "og:image:type",
          content: "image/jpeg",
        },
         {
          hid: "og-image-secure_url",
          property: "og:image:secure_url",
          content: 'https://pos.girlsontop.com.bd/public/uploads/img/'+this.post.image,
        },
      ],
    }
  },
};
</script>