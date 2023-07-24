(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{349:function(t,e,o){"use strict";var r=o(72),n=o.n(r),c=Object.defineProperty,l=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,d=Object.prototype.propertyIsEnumerable,v=(t,s,e)=>s in t?c(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,i=(t,i)=>{for(var a in i||(i={}))l.call(i,a)&&v(t,a,i[a]);if(s)for(var a of s(i))d.call(i,a)&&v(t,a,i[a]);return t};const m=t=>void 0===t,h=t=>Array.isArray(t),_=t=>t&&"number"==typeof t.size&&"string"==typeof t.type&&"function"==typeof t.slice,u=(t,e,s,o)=>((e=e||{}).indices=!m(e.indices)&&e.indices,e.nullsAsUndefineds=!m(e.nullsAsUndefineds)&&e.nullsAsUndefineds,e.booleansAsIntegers=!m(e.booleansAsIntegers)&&e.booleansAsIntegers,e.allowEmptyArrays=!m(e.allowEmptyArrays)&&e.allowEmptyArrays,s=s||new FormData,m(t)||(null===t?e.nullsAsUndefineds||s.append(o,""):(t=>"boolean"==typeof t)(t)?e.booleansAsIntegers?s.append(o,t?1:0):s.append(o,t):h(t)?t.length?t.forEach(((t,r)=>{const i=o+"["+(e.indices?r:"")+"]";u(t,e,s,i)})):e.allowEmptyArrays&&s.append(o+"[]",""):(t=>t instanceof Date)(t)?s.append(o,t.toISOString()):!(t=>t===Object(t))(t)||(t=>_(t)&&"string"==typeof t.name&&("object"==typeof t.lastModifiedDate||"number"==typeof t.lastModified))(t)||_(t)?s.append(o,t):Object.keys(t).forEach((r=>{const i=t[r];if(h(i))for(;r.length>2&&r.lastIndexOf("[]")===r.length-2;)r=r.substring(0,r.length-2);u(i,e,s,o?o+"["+r+"]":r)}))),s);var f={serialize:u};function y(t){if(null===t||"object"!=typeof t)return t;const e=Array.isArray(t)?[]:{};return Object.keys(t).forEach((s=>{e[s]=y(t[s])})),e}function C(t){return Array.isArray(t)?t:[t]}function p(t){return t instanceof File||t instanceof Blob||t instanceof FileList||"object"==typeof t&&null!==t&&void 0!==Object.values(t).find((t=>p(t)))}class w{constructor(){this.errors={},this.errors={}}set(t,e){"object"==typeof t?this.errors=t:this.set(i(i({},this.errors),{[t]:C(e)}))}all(){return this.errors}has(t){return Object.prototype.hasOwnProperty.call(this.errors,t)}hasAny(...t){return t.some((t=>this.has(t)))}any(){return Object.keys(this.errors).length>0}get(t){if(this.has(t))return this.getAll(t)[0]}getAll(t){return C(this.errors[t]||[])}only(...t){const e=[];return t.forEach((t=>{const s=this.get(t);s&&e.push(s)})),e}flatten(){return Object.values(this.errors).reduce(((t,e)=>t.concat(e)),[])}clear(t){const e={};t&&Object.keys(this.errors).forEach((s=>{s!==t&&(e[s]=this.errors[s])})),this.set(e)}}class g{constructor(t={}){this.originalData={},this.busy=!1,this.successful=!1,this.recentlySuccessful=!1,this.recentlySuccessfulTimeoutId=void 0,this.errors=new w,this.progress=void 0,this.update(t)}static make(t){return new this(t)}update(t){this.originalData=Object.assign({},this.originalData,y(t)),Object.assign(this,t)}fill(t={}){this.keys().forEach((e=>{this[e]=t[e]}))}data(){return this.keys().reduce(((t,e)=>i(i({},t),{[e]:this[e]})),{})}keys(){return Object.keys(this).filter((t=>!g.ignore.includes(t)))}startProcessing(){this.errors.clear(),this.busy=!0,this.successful=!1,this.progress=void 0,this.recentlySuccessful=!1,clearTimeout(this.recentlySuccessfulTimeoutId)}finishProcessing(){this.busy=!1,this.successful=!0,this.progress=void 0,this.recentlySuccessful=!0,this.recentlySuccessfulTimeoutId=setTimeout((()=>{this.recentlySuccessful=!1}),g.recentlySuccessfulTimeout)}clear(){this.errors.clear(),this.successful=!1,this.recentlySuccessful=!1,this.progress=void 0,clearTimeout(this.recentlySuccessfulTimeoutId)}reset(){Object.keys(this).filter((t=>!g.ignore.includes(t))).forEach((t=>{this[t]=y(this.originalData[t])}))}get(t,e={}){return this.submit("get",t,e)}post(t,e={}){return this.submit("post",t,e)}patch(t,e={}){return this.submit("patch",t,e)}put(t,e={}){return this.submit("put",t,e)}delete(t,e={}){return this.submit("delete",t,e)}submit(t,e,s={}){return this.startProcessing(),s=i({data:{},params:{},url:this.route(e),method:t,onUploadProgress:this.handleUploadProgress.bind(this)},s),"get"===t.toLowerCase()?s.params=i(i({},this.data()),s.params):(s.data=i(i({},this.data()),s.data),p(s.data)&&!s.transformRequest&&(s.transformRequest=[t=>f.serialize(t)])),new Promise(((t,e)=>{(g.axios||n.a).request(s).then((e=>{this.finishProcessing(),t(e)})).catch((t=>{this.handleErrors(t),e(t)}))}))}handleErrors(t){this.busy=!1,this.progress=void 0,t.response&&this.errors.set(this.extractErrors(t.response))}extractErrors(t){return t.data&&"object"==typeof t.data?t.data.errors?i({},t.data.errors):t.data.message?{error:t.data.message}:i({},t.data):{error:g.errorMessage}}handleUploadProgress(t){this.progress={total:t.total,loaded:t.loaded,percentage:Math.round(100*t.loaded/t.total)}}route(t,e={}){let s=t;return Object.prototype.hasOwnProperty.call(g.routes,t)&&(s=decodeURI(g.routes[t])),"object"!=typeof e&&(e={id:e}),Object.keys(e).forEach((t=>{s=s.replace(`{${t}}`,e[t])})),s}onKeydown(t){const e=t.target;e.name&&this.errors.clear(e.name)}}g.routes={},g.errorMessage="Something went wrong. Please try again.",g.recentlySuccessfulTimeout=2e3,g.ignore=["busy","successful","errors","progress","originalData","recentlySuccessful","recentlySuccessfulTimeoutId"],e.a=g},385:function(t,e,o){"use strict";o.r(e);o(28),o(226),o(37),o(31),o(13);var r=o(14),n=(o(71),o(32),o(53),o(88)),c=o(349),l={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.params,r=o.id,e.next=4,fetch("https://girlsontop.com.bd/backup/api/v1/category/"+r);case 4:return n=e.sent,e.next=7,n.json();case 7:return data=e.sent,e.abrupt("return",{category:null==data?void 0:data.category,allData:data});case 9:case"end":return e.stop()}}),e)})))()},head:function(){var t=this.category;return{title:t.name,meta:[{hid:"og:type",property:"og:type",content:"og:product"},{hid:"og:image",property:"og:image",content:t.description},{hid:"og-image-height",property:"og:image:height",content:"50px"},{hid:"og-image-width",property:"og:image:width",content:"50px"},{hid:"image_type",property:"og:image:type",content:"image/jpeg"},{hid:"og:image:secure_url",property:"og:image:secure_url",content:t.description},{hid:"og:image:url",property:"og:image:url",content:t.description},{hid:"og:site_name",property:"og:site_name",content:"Girls On Top"},{hid:"og:title",property:"og:title",content:t.name},{hid:"og:url",property:"og:url",content:"https://girlsontop.com.bd"+this.$route.fullPath},{hid:"og:description",property:"og:description",content:t.name},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"},{hid:"twitter:url",name:"twitter:url",content:"https://girlsontop.com.bd"+this.$route.fullPath},{hid:"twitter:image",name:"twitter:image",content:t.description},{hid:"twitter:title",name:"twitter:title",content:t.name},{hid:"keywords",property:"keywords",content:t.name},{hid:"author",property:"author",content:"girlsontop"},{hid:"brand_name",property:"brand_name",content:"girlsontop"},{hid:"twitter:description",name:"twitter:description",content:t.description},{hid:"keywords",property:"keywords",content:t.name}]}},data:function(){return{productForm:new c.a({quantity:"",product_id:"",product_color:"",product_size:"",buynow:""}),category:[],sidecategories:[],cart:[],products:{},sort:"",loading:!0,details:{},stock:{},sizes:[],stocklocation:{},quantity:1,gocart:"",activeImage:{},activeIndex:0,isModalopen:!1}},methods:{loadProducts:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=this.$route.params.id;this.$axios.get("/api/v1/category/"+o+"?page="+e).then((function(e){t.products=e.data.products,t.category=e.data.category,t.loading=!1})),this.$axios.get("/api/v1/side-category").then((function(e){t.sidecategories=e.data.sidecategories}))},productSort:function(){var t=this,e=this.$route.params.id,o=this.sort;this.$axios.get("/api/v1/category/"+e+"?sort="+o).then((function(e){t.products=e.data.products}))},increment:function(){this.quantity++},decrement:function(){this.quantity>1&&this.quantity--},activateImage:function(t){this.activeIndex=t,this.activeImage=this.sizes[t]},viewdetails:function(t){var e=this;this.$axios.get("/api/v1/popup/details/"+t).then((function(t){e.details=t.data.productdetails,e.sizes=t.data.sizes,e.stock=t.data.stock,e.activeImage=t.data.sizes[0],e.isModalopen=!0,document.querySelector("body").classList.add("overflow-none")}))},modalClose:function(){this.isModalopen=!1,document.querySelector("body").classList.remove("overflow-none")},addtocart:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/api/v1/add-to-cart",t.productForm).then((function(e){"success"==e.data.status?(t.$store.dispatch("getCartitems"),t.$toast.success("Add to cart successfully."),t.isModalopen=!1):"stockover"==e.data.status?t.$toast.error("Product stock limit over"):t.$toast.error("Please choose your body size first.")}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()}},mixins:[n.a,n.c,n.b],mounted:function(){this.loadProducts()},watch:{$route:function(){this.loadProducts()}}},d=l,v=o(49),component=Object(v.a)(d,(function(){var t,e,o,r,n=this,c=n._self._c;return c("div",[c("section",{staticClass:"breadcrumb"},[c("div",{staticClass:"container-fluid"},[c("div",{staticClass:"row"},[c("div",{staticClass:"col-sm-12"},[c("div",{staticClass:"breadcrumb-text"},[c("h5",[n._v(n._s(n.category.name))]),n._v(" "),c("ul",[c("li",[c("router-link",{attrs:{to:"/"}},[n._v("Home ")])],1),n._v(" "),n._m(0),n._v(" "),c("li",[c("a",[n._v(n._s(n.category.name))])])])])])])])]),n._v(" "),c("section",{staticClass:"section-padding home-product"},[c("div",{staticClass:"container-fluid"},[c("div",{staticClass:"row"},[c("div",{staticClass:"col-md-3 col-sm-12"},[c("div",{staticClass:"main-scategory sticky"},[n._m(1),n._v(" "),n.loading?c("ul",n._l(8,(function(t,e){return c("li",{key:e},[c("div",{staticClass:"my-1"},[c("Skeleton",{attrs:{height:"50"}})],1)])})),0):c("ul",{attrs:{id:"accordion"}},n._l(n.sidecategories,(function(t,e){return c("li",{key:e},[c("nuxt-link",{staticClass:"main-catname",attrs:{to:"/category/"+t.id}},[n._v("\n                              "+n._s(t.name)+"\n                            ")]),n._v(" "),t.sub_categories.length>0?c("button",{staticClass:"collapsed",attrs:{"data-toggle":"collapse","data-target":"#menu-".concat(e)}},[c("i",{staticClass:"fa fa-caret-down"})]):n._e(),n._v(" "),c("ul",{staticClass:"subcategory collapse",attrs:{id:"menu-".concat(e),"data-parent":"#accordion"}},n._l(t.sub_categories,(function(t,e){return c("li",[c("nuxt-link",{staticClass:"subcat-name",attrs:{to:"/category/"+t.id}},[n._v("- "+n._s(t.name))])],1)})),0)],1)})),0)])]),n._v(" "),c("div",{staticClass:"col-md-9 col-sm-12"},[c("div",{staticClass:"category-bar"},[c("div",{staticClass:"row"},[c("div",{staticClass:"col-sm-8"},[n.loading?c("div",[c("Skeleton",{staticClass:"width30",attrs:{height:"35"}})],1):c("h4",[n._v(" "+n._s(n.category.name))])]),n._v(" "),c("div",{staticClass:"col-sm-4"},[n.loading?c("div",[c("Skeleton",{attrs:{height:"35"}})],1):c("div",{staticClass:"sort-form"},[c("select",{directives:[{name:"model",rawName:"v-model",value:n.sort,expression:"sort"}],staticClass:"form-control",on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));n.sort=t.target.multiple?e:e[0]},function(t){return n.productSort()}]}},[c("option",{attrs:{value:""}},[n._v("Sorting")]),n._v(" "),c("option",{attrs:{value:"1"}},[n._v("Newest")]),n._v(" "),c("option",{attrs:{value:"2"}},[n._v("Oldest")]),n._v(" "),c("option",{attrs:{value:"3"}},[n._v("High Price")]),n._v(" "),c("option",{attrs:{value:"4"}},[n._v("Low Price")]),n._v(" "),c("option",{attrs:{value:"5"}},[n._v("Z-A")]),n._v(" "),c("option",{attrs:{value:"6"}},[n._v("A-Z")])])])])])]),n._v(" "),n.loading?c("div",{staticClass:"row"},n._l(8,(function(t,e){return c("div",{key:e,staticClass:"col-lg-3 col-md-3 col-sm-3 col-6 sk-product"},[c("Skeleton",{attrs:{height:"250"}}),n._v(" "),c("Skeleton",{staticClass:"my-1",attrs:{height:"50"}}),n._v(" "),c("Skeleton",{attrs:{height:"40"}})],1)})),0):c("div",{staticClass:"row hproduct-area"},[n._l(n.products.data,(function(t,e){var o,r,l;return c("div",{staticClass:"col-lg-3 col-md-4 col-sm-6 col-6"},[c("div",{staticClass:"hproduct-item"},[c("div",{staticClass:"hproduct-img"},[t.variation.discountitem?c("div",[t.variation.discountitem.discount?c("p",{staticClass:"discount"},[n._v(n._s(Math.round(null===(o=t.variation.discountitem.discount)||void 0===o?void 0:o.discount_amount))+" "),"percentage"==t.variation.discountitem.discount.discount_type?c("strong",[n._v(" %")]):c("strong",[n._v("Tk")]),n._v(" Off")]):n._e()]):n._e(),n._v(" "),c("router-link",{attrs:{to:"/product/details/"+t.id}},[c("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/img/"+t.image,alt:""}})]),n._v(" "),1==n.sizechart&&n.sizes.length>0&&n.sproid==t.id?c("div",{staticClass:"prosizes"},[c("div",{staticClass:"vsizes"},[n._m(2,!0),n._v(" "),n._l(n.sizes,(function(e,o){return c("label",{staticClass:"vradio-label"},[c("input",{directives:[{name:"model",rawName:"v-model",value:n.select_size,expression:"select_size"}],attrs:{type:"radio"},domProps:{value:e.size.name,checked:n._q(n.select_size,e.size.name)},on:{click:function(e){return n.AddToCart(t)},change:function(t){n.select_size=e.size.name}}}),n._v(" "),c("div",{staticClass:"vcustom-radio"},[n._v(n._s(e.size.name))])])})),n._v(" "),c("button",{staticClass:"sizeclose",on:{click:function(t){return n.Sizeclose()}}},[c("i",{staticClass:"fa fa-times"})])],2)]):n._e(),n._v(" "),1==n.bsizechart&&n.sizes.length>0&&n.sproid==t.id?c("div",{staticClass:"prosizes"},[c("div",{staticClass:"vsizes"},[c("p",[n._v("Available Size")]),n._v(" "),n._l(n.sizes,(function(e,o){return c("label",{staticClass:"vradio-label"},[c("input",{directives:[{name:"model",rawName:"v-model",value:n.select_size,expression:"select_size"}],attrs:{type:"radio"},domProps:{value:e.size.name,checked:n._q(n.select_size,e.size.name)},on:{click:function(e){return n.BuyNow(t)},change:function(t){n.select_size=e.size.name}}}),n._v(" "),c("div",{staticClass:"vcustom-radio"},[n._v(n._s(e.size.name))])])})),n._v(" "),c("button",{staticClass:"sizeclose",on:{click:function(t){return n.Bsizeclose()}}},[c("i",{staticClass:"fa fa-times"})])],2)]):n._e()],1),n._v(" "),c("div",{staticClass:"hproduct-info"},[c("p",{staticClass:"hproduct-name"},[c("router-link",{attrs:{to:"/product/details/"+t.id}},[n._v(n._s(t.name.substring(0,30)+"..")+" ")])],1),n._v(" "),c("ul",[t.variation.discountitem?c("li",[t.variation.discountitem.discount?c("p",{staticClass:"hproduct-price"},[n._v("৳ "),"percentage"==t.variation.discountitem.discount.discount_type?c("span",[n._v(n._s(Math.round(t.variation.default_sell_price)-Math.round(t.variation.default_sell_price*(null===(r=t.variation.discountitem.discount)||void 0===r?void 0:r.discount_amount))/100))]):c("span",[n._v(n._s(Math.round(t.variation.default_sell_price-(null===(l=t.variation.discountitem.discount)||void 0===l?void 0:l.discount_amount))))]),n._v(" "),c("del",[n._v(n._s(Math.round(t.variation.default_sell_price))+" ")])]):c("p",{staticClass:"hproduct-price"},[n._v("৳ "+n._s(Math.round(t.variation?t.variation.default_sell_price:0)))])]):c("li",[c("p",{staticClass:"hproduct-price"},[n._v("৳ "+n._s(Math.round(t.variation?t.variation.default_sell_price:0)))])])])]),n._v(" "),c("div",{staticClass:"product-cart"},[t.stock.length>0?c("ul",[c("li",[c("a",{on:{click:function(e){return n.AddToCart(t)}}},[n._v("\n                                              add to cart\n                                            ")])]),n._v(" "),c("li",{staticClass:"buynow"},[c("button",{on:{click:function(e){return n.viewdetails(t.id)}}},[n._v("\n                                              View Details\n                                            ")])])]):c("ul",{staticClass:"psoldout"},[c("button",[n._v("sold out")])])])])])})),n._v(" "),c("div",{staticClass:"col-sm-12"},[n.products.last_page>1?c("div",{staticClass:"custom-paginate"},[c("vs-pagination",{attrs:{"total-pages":n.products.last_page},on:{change:n.loadProducts}})],1):n._e()])],2)])])])]),n._v(" "),c("section",{directives:[{name:"show",rawName:"v-show",value:n.isModalopen,expression:"isModalopen"}],staticClass:"modal-section"},[c("div",{staticClass:"product-details modal-product",class:{show:n.isModalopen}},[c("div",{staticClass:"container"},[c("div",{staticClass:"row"},[c("div",{staticClass:"col-lg-6 col-md-6 col-sm-12"},[c("div",{staticClass:"productdetails-slider"},[n.loading?c("div",[c("Skeleton",{staticClass:"sk-dslider",attrs:{height:"450"}})],1):c("div",{staticClass:"card-carousel"},[c("div",{staticClass:"dslider-big"},[c("div",{staticClass:"image"},["null"!=n.activeImage&&null!=n.activeImage&&null!=n.activeImage.mediaimage?c("div",{staticClass:"dslider-image"},[c("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/media/"+n.activeImage.mediaimage.file_name,alt:""}})]):c("div",{staticClass:"dslider-image"},[c("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/img/"+n.details.image,alt:""}})])])])]),n._v(" "),c("div",{staticClass:"dslider-thumb"},n._l(n.sizes,(function(t,e){return c("div",{key:t.id},[null!=t.mediaimage?c("img",{staticClass:"active",attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/media/"+t.mediaimage.file_name},on:{click:function(t){return n.activateImage(e)}}}):n._e()])})),0)])]),n._v(" "),c("div",{staticClass:"col-lg-6 col-md-6 col-sm-12"},[c("div",{staticClass:"productdetails-info"},[n.loading?c("div",{staticClass:"row"},[c("div",{staticClass:"col-sm-9"},[c("Skeleton",{staticClass:"width70",attrs:{height:"40"}}),n._v(" "),c("Skeleton",{staticClass:"my-1 width40",attrs:{height:"20"}})],1),n._v(" "),c("div",{staticClass:"col-sm-3"},[c("Skeleton",{attrs:{height:"40"}})],1)]):c("div",{staticClass:"dproduct-header"},[n.details.variation?c("div",{staticClass:"dproduct-header-left"},[c("p",{staticClass:"dproduct-name"},[n._v(n._s(n.details.name))]),n._v(" "),c("div",{staticClass:"details-pro-price"},[n._v("\n                                    Price : "),n.details.variation.discountitem?c("span",[n.details.variation.discountitem.discount?c("span",{staticClass:"hproduct-price"},[n._v("৳ "),"percentage"==n.details.variation.discountitem.discount.discount_type?c("span",[n._v(n._s(Math.round(n.details.variation.default_sell_price)-Math.round(n.details.variation.default_sell_price*(null===(t=n.details.variation.discountitem.discount)||void 0===t?void 0:t.discount_amount))/100))]):c("span",[n._v(n._s(Math.round(n.details.variation.default_sell_price-(null===(e=n.details.variation.discountitem.discount)||void 0===e?void 0:e.discount_amount))))]),n._v(" "),c("del",[n._v(n._s(Math.round(n.details.variation.default_sell_price))+" ")])]):c("span",{staticClass:"hproduct-price"},[n._v("৳ "+n._s(Math.round(n.details.variation.default_sell_price)))])]):c("span",{staticClass:"hproduct-price"},[n._v("৳ "+n._s(Math.round(n.details.variation.default_sell_price)))])]),n._v(" "),n.details.variation.discountitem?c("p",[n.details.variation.discountitem.discount?c("span",[n._v("\n                                        Save ৳ "),"percentage"==n.details.variation.discountitem.discount.discount_type?c("span",[n._v(n._s(Math.round(n.details.variation.default_sell_price*(null===(o=n.details.variation.discountitem.discount)||void 0===o?void 0:o.discount_amount))/100))]):c("span",[n._v(n._s(Math.round(null===(r=n.details.variation.discountitem.discount)||void 0===r?void 0:r.discount_amount)))])]):n._e()]):n._e()]):c("div",{staticClass:"dproduct-header-left"},[c("div",{staticClass:"details-pro-price"},[n._v("\n                                    Price : "),c("span",{staticClass:"hproduct-price"},[n._v("৳ "+n._s(Math.round(n.details.variation?n.details.variation.default_sell_price:0))+" ")])])])]),n._v(" "),c("div",{staticClass:"modal-product-description"},[c("p",{domProps:{innerHTML:n._s(n.details.product_description)}})]),n._v(" "),c("div",{staticClass:"details-quantity-area"},[c("form",{staticClass:"dbform form-row",on:{submit:function(t){return t.preventDefault(),n.addtocart.apply(null,arguments)}}},[c("input",{attrs:{type:"hidden",name:"product_id"},domProps:{value:n.productForm.product_id=n.details.id}}),n._v(" "),n.loading?c("div",{staticClass:"col-sm-12"},[c("Skeleton",{staticClass:"width60 my-2",attrs:{height:"40"}}),n._v(" "),c("Skeleton",{staticClass:"width40 my-2",attrs:{height:"40"}})],1):n.sizes.length>0?c("div",{staticClass:"col-sm-6 vsizes"},[c("div",{staticClass:"size-container"},n._l(n.sizes,(function(t,e){return c("label",{staticClass:"vradio-label"},[c("input",{directives:[{name:"model",rawName:"v-model",value:n.productForm.product_size,expression:"productForm.product_size"}],attrs:{type:"radio",id:t.id},domProps:{value:t.size.name,checked:n._q(n.productForm.product_size,t.size.name)},on:{change:function(e){return n.$set(n.productForm,"product_size",t.size.name)}}}),n._v(" "),c("div",{staticClass:"vcustom-radio"},[n._v(n._s(t.size.name))])])})),0)]):n._e(),n._v(" "),n.loading?c("div",{staticClass:"col-sm-12 my-2"},[c("div",{staticClass:"row"},[c("div",{staticClass:"col-sm-3"},[c("Skeleton",{attrs:{height:"50"}})],1),n._v(" "),c("div",{staticClass:"col-sm-3"},[c("Skeleton",{attrs:{height:"50"}})],1)])]):c("div",{staticClass:"quantity-part col-sm-12"},[c("div",{staticClass:"from-group"},[c("div",{staticClass:"quantity-part-input"},[c("div",{staticClass:"input-group"},[c("span",{staticClass:"input-group-btn"},[c("a",{attrs:{disabled:n.quantity<1,id:"quantity-left"},on:{click:n.decrement}},[c("i",{staticClass:"fa fa-minus"})])]),n._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:n.productForm.quantity=n.quantity,expression:"productForm.quantity=quantity"}],staticClass:"input-number",attrs:{name:"qty",min:"1"},domProps:{value:n.productForm.quantity=n.quantity},on:{input:function(t){t.target.composing||n.$set(n.productForm,"quantity=quantity",t.target.value)}}}),n._v(" "),c("span",{staticClass:"input-group-btn"},[c("a",{attrs:{id:"quantity-right"},on:{click:n.increment}},[c("i",{staticClass:"fa fa-plus"})])])])])])]),n._v(" "),c("div",{staticClass:"details-cart-part col-sm-12"},[n.stock>=1?c("div",{staticClass:"form-group"},[c("button",{staticClass:"dbutton addcart"},[n._v("Add To Cart")]),n._v(" "),c("a",{staticClass:"dbutton wishlist",on:{click:function(t){return n.AddToWishlist(n.details)}}},[c("i",{staticClass:"fa fa-heart"}),n._v(" Wishlist")])]):n._e()])])])])])]),n._v(" "),c("div",{staticClass:"modal-close"},[c("button",{on:{click:function(t){return n.modalClose()}}},[n._v("x")])])])]),n._v(" "),c("div",{class:{"modal-overlay":n.isModalopen},on:{click:function(t){return n.modalClose()}}})])])}),[function(){var t=this._self._c;return t("li",[t("a",[t("i",{staticClass:"fas fa-angle-double-right"})])])},function(){var t=this._self._c;return t("p",[t("i",{staticClass:"fa fa-list"}),this._v(" Categories")])},function(){var t=this._self._c;return t("p",[t("strong",[this._v("Available Size")])])}],!1,null,null,null);e.default=component.exports}}]);