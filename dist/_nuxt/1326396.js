(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{386:function(t,e,o){"use strict";o.r(e);o(28);var r=o(14),n=(o(71),{name:"Details",data:function(){return{post:{}}},fetch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/api/v1/product-share/details/"+t.$route.params.id);case 2:o=e.sent,t.post=o.data.productdetails;case 4:case"end":return e.stop()}}),e)})))()},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,n,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$axios,r=t.params,e.next=3,o.get("/api/v1/product-share/details/".concat(r.id));case 3:return n=e.sent,c=n.data.productdetails,e.abrupt("return",{post:c});case 6:case"end":return e.stop()}}),e)})))()},methods:{refresh:function(){this.$nuxt.refresh()}},head:function(){return{title:this.post.name,meta:[{hid:"og:title",name:"og:title",content:this.post.name},{hid:"og:url",name:"og:url",content:"https://girlsontop.websolutionit.com"+this.$route.fullPath},{hid:"og:type",name:"og:type",content:"article"},{hid:"og:description",name:"og:description",content:this.post.product_description},{hid:"og:image",name:"og:image",content:"https://pos.girlsontop.com.bd/public/uploads/img/"+this.post.image},{hid:"og-image-height",property:"og:image:height",content:"300"},{hid:"og-image-width",property:"og:image:width",content:"400"},{hid:"og-image-alt",property:"og:image:alt",content:this.post.name},{hid:"og-image-type",property:"og:image:type",content:"image/jpeg"},{hid:"og-image-secure_url",property:"og:image:secure_url",content:"https://pos.girlsontop.com.bd/public/uploads/img/"+this.post.image}]}}}),c=o(49),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("section",{staticClass:"details-page2"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-sm-6"},[e("div",{staticClass:"card my-4"},[e("div",{staticClass:"card-header bg-primary"},[t.post?e("p",{staticClass:"text-capitalize"},[e("strong",[t._v(t._s(t.post.name))])]):t._e()]),t._v(" "),t.post?e("div",{staticClass:"card-body"},[e("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/img/"+t.post.image,alt:""}}),t._v(" "),e("div",{staticClass:"my-2",domProps:{innerHTML:t._s(t.post.product_description)}})]):t._e()])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);