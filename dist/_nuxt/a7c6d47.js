(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{369:function(t,e,r){"use strict";r.r(e);r(229),r(28);var o=r(14),c=(r(71),r(13),r(352),r(349)),l={middleware:"authenticated",components:{Select2:r(356).a},head:function(){return{bodyAttrs:{class:this.isOverflow?"overflow-hidden":""}}},data:function(){return{couponForm:new c.a({couponcode:""}),checkoutForm:new c.a({fullName:"",phoneNumber:"",district:"",area:"",courier:"",address:"",note:"",transaction_id:"",sender_number:""}),districts:{},areas:{},alertcontent:{},customer:{},nameinvalid:"",phoneinvalid:"",addressinvalid:"",districtinvalid:"",areainvalid:"",btndisabled:!1,isOverflow:"",customloader:!1,paywarning:!1}},methods:{validOrnot:function(){""!=this.checkoutForm.fullName?this.nameinvalid=!1:this.nameinvalid=!0,""!=this.checkoutForm.phoneNumber?this.phoneinvalid=!1:this.phoneinvalid=!0,""!=this.checkoutForm.district?this.districtinvalid=!1:this.districtinvalid=!0,""!=this.checkoutForm.area?this.areainvalid=!1:this.areainvalid=!0,""!=this.checkoutForm.address?this.addressinvalid=!1:this.addressinvalid=!0},loadData:function(){var t=this;this.$axios.get("api/v1/customer/alert/checkout").then((function(e){t.alertcontent=e.data.alertcontent})),this.$axios.get("api/v1/districts").then((function(e){t.districts=e.data.districts})),this.$axios.get("/api/v1/customer/account",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.customer=e.data.customer}))},selectdist:function(t){var e=this;this.$axios.get("/api/v1/areas/"+this.checkoutForm.district).then((function(t){e.areas=t.data.areas}))},selectarea:function(){var t=this;this.$axios.get("/api/v1/shipping/"+this.checkoutForm.area).then((function(e){if(t.cartItemCount>0){var r=e.data.shipping.shippingfee,o=e.data.shipping.partialpayment;localStorage.setItem("shippingfee",r),t.$store.dispatch("shippingfee");var c=o*t.$store.getters.cartItem.reduce((function(t,e){return parseInt(t)+parseInt(e.quantity)}),0);localStorage.setItem("partialpayment",c),t.$store.dispatch("partialpayment"),$(".sundarban").addClass("hide"),t.checkoutForm.courier="";var l=15*t.partialpayment/1e3;localStorage.setItem("paymentcharge",l),t.$store.dispatch("paymentcharge")}else t.$router.push({path:"/"}),localStorage.removeItem("shippingfee"),localStorage.removeItem("discount"),localStorage.removeItem("partialpayment"),localStorage.removeItem("paymentcharge"),t.$store.dispatch("discount"),t.$store.dispatch("shippingfee"),t.$store.dispatch("getCartitems"),t.$store.dispatch("partialpayment"),t.$toast.error("Your shopping cart empty")}))},btnwarning:function(){this.checkoutForm.fullName&&this.checkoutForm.phoneNumber&&this.checkoutForm.district&&this.checkoutForm.area&&this.checkoutForm.address?(this.paywarning=!0,this.isOverflow=!0):this.$toast.error("Opps!! Please fillup all required (*) field")},closewarning:function(){this.paywarning=!1,this.isOverflow=!1},checkout:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.$store.state.token&&t.cartItemCount>0)){e.next=9;break}return t.customloader=!0,t.isOverflow=!0,t.btndisabled=!0,e.next=6,t.$axios.post("/api/v1/customer/order/save",t.checkoutForm,{headers:{Authorization:"Bearer "+localStorage.getItem("token"),shippingfee:t.$store.state.shippingfee,discount:t.$store.state.discount,partialpayment:t.$store.state.partialpayment,paymentcharge:t.$store.state.paymentcharge}}).then((function(e){t.customloader=!1,t.isOverflow=!1,t.btndisabled=!1,1==e.data.status?(t.$toast.success("Thanks!! Your order send success"),t.spinner=!1,localStorage.removeItem("shippingfee"),localStorage.removeItem("discount"),localStorage.removeItem("partialpayment"),localStorage.removeItem("paymentcharge"),t.$store.dispatch("discount"),t.$store.dispatch("shippingfee"),t.$store.dispatch("getCartitems"),t.$store.dispatch("partialpayment"),""!=e.data.payment_url&&(window.location.href=e.data.payment_url)):"invalid"==e.data.status?(t.btndisabled=!1,t.$toast.error("Please check input field")):"stockfail"==e.data.status?(t.btndisabled=!1,t.paywarning=!1,t.isOverflow=!1,t.$toast.error("Order Faild, Product stock sold out"),t.$store.dispatch("RemoveToCart",{product:e.data.product,id:e.data.product.id}),localStorage.removeItem("shippingfee"),localStorage.removeItem("discount"),localStorage.removeItem("partialpayment"),localStorage.removeItem("paymentcharge"),t.$store.dispatch("discount"),t.$store.dispatch("shippingfee"),t.$store.dispatch("getCartitems"),t.$store.dispatch("partialpayment"),t.$router.push({path:"/"})):t.$toast.error("Order place failed")}));case 6:e.sent,e.next=10;break;case 9:t.$router.push({path:"/customer/login"});case 10:case"end":return e.stop()}}),e)})))()},coupon:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.couponForm.post("/api/v1/customer/coupon-apply",{headers:{Authorization:"Bearer "+localStorage.getItem("token"),cartamount:t.cartTotalPrice}}).then((function(e){if("success"==e.data.status){var r=e.data.amount;localStorage.setItem("discount",r),t.$store.dispatch("discount"),t.$toast.success("Your coupon code accept")}else"expaire"==e.data.status?t.$toast.error("Your coupon code expaire"):"lowamount"==e.data.status?t.$toast.error("Your purchase amount is low"):t.$toast.error("Your coupon code is invalid")}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()},bkashPay:function(t){return parseFloat(parseFloat(t)+.018*t).toFixed(2)}},mounted:function(){localStorage.removeItem("shippingfee"),localStorage.removeItem("partialpayment"),this.$store.dispatch("shippingfee"),this.$store.dispatch("discount"),this.$store.dispatch("getCartitems"),this.$store.dispatch("partialpayment"),this.validOrnot(),this.loadData()},computed:{cart:function(){return this.$store.state.cart},cartItemCount:function(){return this.$store.getters.cartItemCount},cartTotalPrice:function(){return this.$store.getters.cartTotalPrice},shippingfee:function(){return this.$store.state.shippingfee},discount:function(){return this.$store.state.discount},partialpayment:function(){return this.$store.state.partialpayment},paymentcharge:function(){return this.$store.state.paymentcharge}}},n=r(49),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("div",[t.customloader?e("div",{staticClass:"customloader"},[t._m(0)]):t._e(),t._v(" "),e("section",{staticClass:"breadcrumb-custom"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-12"},[e("ul",{staticClass:"account_bred"},[e("li",[e("nuxt-link",{attrs:{to:"/"}},[e("i",{staticClass:"fa fa-home"})])],1),t._v(" "),e("li",[t._v("/")]),t._v(" "),e("li",[e("nuxt-link",{attrs:{to:"/customer/cart"}},[t._v("Cart")])],1),t._v(" "),e("li",[t._v("/")]),t._v(" "),e("li",[e("nuxt-link",{attrs:{to:"/customer/checkout"}},[t._v("Checkout")])],1)])])])])]),t._v(" "),e("section",{staticClass:"section-padding"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-lg-6 col-md-6 col-sm-6"},[e("div",{staticClass:"payment-form1"},[t._m(1),t._v(" "),e("div",{staticClass:"accordion productdetails mobile-payment",attrs:{id:"accordionExample"}},[e("div",{staticClass:"card"},[t._m(2),t._v(" "),e("div",{staticClass:"collapse",attrs:{id:"collapseOne","data-parent":"#accordionExample"}},[e("div",{staticClass:"mobile-payment table-cart"},[e("table",{staticClass:"table table-bordered"},[e("tr",[e("td",[t._v("SubTotal ("+t._s(t.cartItemCount)+") items")]),t._v(" "),e("td",[t._v(t._s(t.cartTotalPrice)+" Tk")])]),t._v(" "),e("tr",[e("td",[t._v("Discount (-)")]),t._v(" "),e("td",[t._v(t._s(t.discount?t.discount:0)+" Tk")])]),t._v(" "),e("tr",[e("td",[t._v("Delivery Charge (+)")]),t._v(" "),e("td",[t._v(t._s(t.shippingfee?t.shippingfee:0)+" Tk")])]),t._v(" "),e("tr",[e("td",[t._v("Advance Payment")]),t._v(" "),e("td",[t._v(t._s(t.partialpayment?t.partialpayment:0)+" Tk")])]),t._v(" "),e("tr",[e("td",[t._v("Due Bill")]),t._v(" "),e("td",[t._v(t._s(Number(t.cartTotalPrice)+Number(t.shippingfee)-Number(t.discount+t.partialpayment?t.partialpayment:0))+" Tk")])])])]),t._v(" "),t._l(t.cart,(function(r){return e("div",{key:r.product.id,staticClass:"showcart-item"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-8 col-8"},[e("div",{staticClass:"cart-info"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-3 col-3"},[e("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/img/"+r.product.image,alt:""}})]),t._v(" "),e("div",{staticClass:"col-sm-9 col-9"},[e("h6",[t._v(t._s(r.product.name))]),t._v(" "),r.product_size?e("p",[t._v("Size: "+t._s(r.product_size)+"\n                                                            ")]):t._e(),t._v(" "),e("p",[t._v("Tk\n                                                                "+t._s(Math.round(r.product.variation.default_sell_price))+"\n                                                            ")])])])])]),t._v(" "),e("div",{staticClass:"col-sm-4 col-4"},[e("div",{staticClass:"cart-action"},[e("div",[e("h6",[t._v("Tk\n                                                            "+t._s(r.product.variation.default_sell_price*r.quantity)+"\n                                                        ")])])])])])])}))],2)])]),t._v(" "),e("form",{on:{submit:function(e){return e.preventDefault(),t.checkout.apply(null,arguments)}}},[e("div",{staticClass:"shipping-info"},[e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutForm.fullName=t.customer.name,expression:"checkoutForm.fullName = customer.name"}],staticClass:"form-control",class:t.nameinvalid?"invalidfield":"",attrs:{type:"text",placeholder:"Your Name*",name:"fullName",id:"fullName",required:""},domProps:{value:t.checkoutForm.fullName=t.customer.name},on:{keyup:function(e){return t.validOrnot()},input:function(e){e.target.composing||t.$set(t.checkoutForm.fullName=t.customer,"name",e.target.value)}}}),t._v(" "),t.checkoutForm.errors.has("fullName")?e("div",{domProps:{innerHTML:t._s(t.checkoutForm.errors.get("fullName"))}}):t._e()]),t._v(" "),e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutForm.phoneNumber=t.customer.mobile,expression:"checkoutForm.phoneNumber = customer.mobile"}],staticClass:"form-control",class:t.phoneinvalid?"invalidfield":"",attrs:{type:"number",placeholder:"Your 11 digit phone Number*",name:"phoneNumber",id:"phoneNumber",required:""},domProps:{value:t.checkoutForm.phoneNumber=t.customer.mobile},on:{keyup:function(e){return t.validOrnot()},input:function(e){e.target.composing||t.$set(t.checkoutForm.phoneNumber=t.customer,"mobile",e.target.value)}}}),t._v(" "),t.checkoutForm.errors.has("phoneNumber")?e("div",{domProps:{innerHTML:t._s(t.checkoutForm.errors.get("phoneNumber"))}}):t._e()]),t._v(" "),e("div",{staticClass:"form-group"},[e("Select2",{staticClass:"form-control district",class:t.districtinvalid?"invalidfield":"",attrs:{options:t.districts,placeholder:"Select District *",required:""},on:{change:[function(e){return t.validOrnot()},function(e){return t.selectdist()}]},model:{value:t.checkoutForm.district,callback:function(e){t.$set(t.checkoutForm,"district",e)},expression:"checkoutForm.district"}}),t._v(" "),t.checkoutForm.errors.has("district")?e("div",{domProps:{innerHTML:t._s(t.checkoutForm.errors.get("district"))}}):t._e()],1),t._v(" "),e("div",{staticClass:"form-group"},[e("Select2",{staticClass:"form-control district",class:t.areainvalid?"invalidfield":"",attrs:{name:"area",id:"area",options:t.areas,placeholder:"Select Area *",required:""},on:{change:[function(e){return t.validOrnot()},function(e){return t.selectarea()}]},model:{value:t.checkoutForm.area,callback:function(e){t.$set(t.checkoutForm,"area",e)},expression:"checkoutForm.area"}}),t._v(" "),t.checkoutForm.errors.has("area")?e("div",{domProps:{innerHTML:t._s(t.checkoutForm.errors.get("area"))}}):t._e()],1),t._v(" "),e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutForm.address=t.customer.address_line_1,expression:"checkoutForm.address = customer.address_line_1"}],staticClass:"form-control",class:t.addressinvalid?"invalidfield":"",attrs:{type:"text",name:"address",id:"address",placeholder:"জেলা , থানা এবং উপজেলার নাম।  বাসা নং, রোড নং, এলাকার নাম *",required:""},domProps:{value:t.checkoutForm.address=t.customer.address_line_1},on:{keyup:function(e){return t.validOrnot()},input:function(e){e.target.composing||t.$set(t.checkoutForm.address=t.customer,"address_line_1",e.target.value)}}}),t._v(" "),t.checkoutForm.errors.has("address")?e("div",{domProps:{innerHTML:t._s(t.checkoutForm.errors.get("address"))}}):t._e()]),t._v(" "),e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutForm.note,expression:"checkoutForm.note"}],staticClass:"form-control",attrs:{type:"text",name:"note",id:"note",placeholder:"Note"},domProps:{value:t.checkoutForm.note},on:{input:function(e){e.target.composing||t.$set(t.checkoutForm,"note",e.target.value)}}})]),t._v(" "),e("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[e("div",[e("input",{attrs:{type:"radio",checked:""}}),t._v(" "),e("svg",{staticStyle:{height:"85px",width:"105px"},attrs:{xmlns:"http://www.w3.org/2000/svg",height:"800",width:"1200",version:"1.1",id:"Layer_1",viewBox:"-37.0635 -39.1825 321.217 235.095"}},[e("defs",{attrs:{id:"defs157"}},[e("style",{attrs:{id:"style155"}},[t._v("\n                                                    .cls-1 {\n                                                        fill: #d12053\n                                                    }\n\n                                                    .cls-2 {\n                                                        fill: #e2136e\n                                                    }\n\n                                                    .cls-3 {\n                                                        fill: #9e1638\n                                                    }\n\n                                                    .cls-4 {\n                                                        fill: #231f20\n                                                    }\n\n                                                    .cls-5 {\n                                                        fill: #808285\n                                                    }\n                                                ")])]),t._v(" "),e("path",{staticClass:"cls-1",attrs:{transform:"translate(.01)",id:"polygon161",d:"M223.65 62.45l-53.03-8.31 7.03 31.6z"}}),t._v(" "),e("path",{staticClass:"cls-2",attrs:{transform:"translate(.01)",id:"polygon163",d:"M223.65 62.45L183.69 6.93l-13.06 47.22z"}}),t._v(" "),e("path",{staticClass:"cls-1",attrs:{transform:"translate(.01)",id:"polygon165",d:"M169.39 53.51L127.52 0l54.83 6.55z"}}),t._v(" "),e("path",{staticClass:"cls-3",attrs:{transform:"translate(.01)",id:"polygon167",d:"M150.32 31.15L127.07 9.24h6.12z"}}),t._v(" "),e("path",{staticClass:"cls-1",attrs:{transform:"translate(.01)",id:"polygon169",d:"M234.96 35.46l-9.84 26.69-15.95-22.06z"}}),t._v(" "),e("path",{staticClass:"cls-2",attrs:{transform:"translate(.01)",id:"polygon171",d:"M183.84 84.14l38.61-15.51 1.62-4.93z"}}),t._v(" "),e("path",{staticClass:"cls-3",attrs:{transform:"translate(.01)",id:"polygon173",d:"M152.96 113.41l16.54-58.02 8.39 37.75z"}}),t._v(" "),e("path",{staticClass:"cls-2",attrs:{transform:"translate(.01)",id:"polygon175",d:"M236.5 35.67l-4.06 11.02 14.64-.24z"}}),t._v(" "),e("path",{staticClass:"cls-2",attrs:{id:"path177",d:"M.01 40.09c.71.06 1.43.19 2.19.19s1.38-.13 2.19-.19v23.47c2.31-3.93 5.22-6.52 9.5-6.52 7.74 0 11.06 7.66 11.06 14.7 0 8.43-4.5 16.5-12.39 16.5a8.66 8.66 0 01-7.77-4.47c-1.32 1.16-2.49 2.55-3.74 3.81h-1zm4.28 34.52c0 6.84 2.9 11.61 7.67 11.61 6.19 0 8.18-8.32 8.18-14.22 0-6.85-2.26-12.24-7.62-12.3-6.26-.05-8.23 7.36-8.23 14.92"}}),t._v(" "),e("path",{staticClass:"cls-4",attrs:{id:"path179",d:"M45.14 55.27l-4.66 6c4.38 6.4 8.92 12.67 13.32 19.15l4.44 7v.35c-1.09-.07-2.08-.21-3-.21-.92 0-2.08.14-3.06.21-1.21-2.24-2.41-4.31-3.78-6.34l-12-17.75c-.27-.28-.92-.5-.92-.21v24.3c-.88-.07-1.65-.21-2.41-.21-.76 0-1.64.14-2.41.21V40.09c.77.06 1.6.21 2.41.21s1.53-.15 2.41-.21v21.52c0 .42.82.14 1.36-.42a37.1 37.1 0 002.92-3.42l13.49-17.7c.71.06 1.42.21 2.19.21s1.36-.15 2.14-.21z"}}),t._v(" "),e("path",{staticClass:"cls-4",attrs:{id:"path181",d:"M81.43 82.4c0 2.48-.16 3.74 3.07 2.92v1.39a8.87 8.87 0 01-1.65.63c-2.85.57-5.21.06-5.65-3.67l-.49.55a10.17 10.17 0 01-8.12 4c-3.88 0-7.28-3.06-7.28-7.75 0-7.23 5-8.18 10.13-9.13 4.34-.82 5.82-1.2 5.82-4.25 0-4.7-2.3-7.42-6.41-7.42a6.85 6.85 0 00-6.52 4.37h-.6v-3.52a14.2 14.2 0 018.87-3.48c5.75 0 8.88 3.48 8.88 10.65zm-4.38-10.47l-1.93.44c-3.73.82-9.32 1.45-9.32 7.24 0 4 2 6 5.36 6a6.83 6.83 0 004.44-2.44c.4-.46 1.5-1.54 1.5-2z"}}),t._v(" "),e("path",{staticClass:"cls-4",attrs:{id:"path183",d:"M91.2 81.56c1.3 2.49 3.72 4.72 6.3 4.72a5.67 5.67 0 005.38-5.78c0-8.56-12.95-3-12.95-14.08 0-6.08 4-9.37 8.93-9.37a11.57 11.57 0 016.2 1.64 32.79 32.79 0 00-1.3 4.5h-.5c-.72-2.09-2.63-4.19-4.66-4.19-2.74 0-5 1.85-5 5.28 0 8.11 12.95 3.79 12.95 13.94 0 6.79-5.26 10-10.1 10a12.73 12.73 0 01-6.84-2 34.42 34.42 0 001.15-4.65z"}}),t._v(" "),e("path",{staticClass:"cls-4",attrs:{id:"path185",d:"M113.93 40.09c.73.06 1.44.19 2.2.19.76 0 1.38-.13 2.2-.19v23.09c1.92-3.87 4.93-6.14 8.83-6.14 6.36 0 8.83 4.36 8.83 12.36v18.37c-.83-.07-1.47-.19-2.2-.19-.73 0-1.48.13-2.2.19V70.85c0-7-1.41-10.53-6.08-10.53-4.94 0-7.18 3.56-7.18 10.15v17.3c-.82-.07-1.47-.19-2.2-.19-.73 0-1.46.13-2.2.19z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path187",d:"M7.98 150.96l-.19-1.59h-.08a4.7 4.7 0 01-3.85 1.87A3.59 3.59 0 010 147.62c0-3 2.71-4.71 7.58-4.69v-.26a2.59 2.59 0 00-2.85-2.9 6.28 6.28 0 00-3.28.94l-.52-1.52a7.87 7.87 0 014.14-1.12c3.86 0 4.8 2.63 4.8 5.15v4.72a17.38 17.38 0 00.21 3zm-.38-6.43c-2.5-.05-5.34.39-5.34 2.84a2 2 0 002.16 2.19 3.14 3.14 0 003-2.11 2.46 2.46 0 00.13-.73z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path189",d:"M19.15 133.64a22 22 0 014.14-.36c2.26 0 3.73.39 4.82 1.28a3.68 3.68 0 011.46 3.1 4.17 4.17 0 01-3 3.86v.05a4.53 4.53 0 013.62 4.4 4.73 4.73 0 01-1.48 3.52c-1.23 1.12-3.21 1.64-6.07 1.64a26.28 26.28 0 01-3.52-.21zm2.27 7.19h2.05c2.4 0 3.81-1.25 3.81-2.94 0-2.06-1.56-2.87-3.86-2.87a9.44 9.44 0 00-2 .16zm0 8.42a12.47 12.47 0 001.9.1c2.34 0 4.51-.86 4.51-3.41 0-2.4-2.06-3.39-4.54-3.39h-1.87z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path191",d:"M33.27 133.64a23.68 23.68 0 014.33-.37c2.42 0 4 .44 5.08 1.44a4.36 4.36 0 011.38 3.33 4.61 4.61 0 01-3.31 4.48v.08c1.35.47 2.16 1.72 2.57 3.55a27.8 27.8 0 001.36 4.82h-2.32a22.92 22.92 0 01-1.17-4.2c-.52-2.42-1.46-3.33-3.51-3.41h-2.15v7.61h-2.26zm2.26 8h2.32c2.42 0 4-1.33 4-3.33 0-2.27-1.64-3.26-4-3.29a9.21 9.21 0 00-2.24.21z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path193",d:"M50.25 145.44l-1.82 5.52h-2.35l6-17.56h2.73l6 17.56h-2.45l-1.88-5.52zm5.76-1.77l-1.72-5.06c-.4-1.14-.65-2.18-.91-3.2h-.05c-.26 1-.55 2.11-.89 3.18l-1.72 5.08z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path195",d:"M75.23 150.39a11.32 11.32 0 01-4.64.83c-5 0-8.67-3.12-8.67-8.88 0-5.5 3.72-9.22 9.17-9.22a9.42 9.42 0 014.16.78l-.54 1.87a8.33 8.33 0 00-3.54-.73c-4.12 0-6.85 2.63-6.85 7.24 0 4.3 2.47 7.06 6.75 7.06a9 9 0 003.69-.73z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path197",d:"M83.6 133.64a22 22 0 014.14-.36c2.26 0 3.73.39 4.82 1.28a3.68 3.68 0 011.46 3.1 4.17 4.17 0 01-3 3.86v.05a4.53 4.53 0 013.62 4.4 4.73 4.73 0 01-1.48 3.52c-1.23 1.12-3.21 1.64-6.07 1.64a26.29 26.29 0 01-3.52-.21zm2.27 7.19h2.05c2.4 0 3.81-1.25 3.81-2.94 0-2.06-1.56-2.87-3.86-2.87a9.44 9.44 0 00-2 .16zm0 8.42a12.47 12.47 0 001.9.1c2.34 0 4.51-.86 4.51-3.41 0-2.4-2.06-3.39-4.54-3.39h-1.89z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path199",d:"M104.6 150.96l-.18-1.59h-.08a4.71 4.71 0 01-3.86 1.87 3.59 3.59 0 01-3.85-3.62c0-3 2.71-4.71 7.58-4.69v-.26a2.6 2.6 0 00-2.86-2.92 6.3 6.3 0 00-3.29.94l-.52-1.52a7.85 7.85 0 014.14-1.12c3.86 0 4.8 2.63 4.8 5.15v4.72a17.39 17.39 0 00.21 3zm-.34-6.44c-2.5-.05-5.34.39-5.34 2.84a2 2 0 002.16 2.19 3.13 3.13 0 003-2.11 2.33 2.33 0 00.13-.73z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path201",d:"M110.18 141.77c0-1.3 0-2.37-.1-3.41h2l.13 2.08a4.64 4.64 0 014.17-2.37c1.75 0 4.45 1 4.45 5.37v7.53h-2.23v-7.27c0-2-.75-3.73-2.92-3.73a3.27 3.27 0 00-3.08 2.34 3.48 3.48 0 00-.15 1.07v7.58h-2.29z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path203",d:"M126.89 144.14h.06c.31-.44.75-1 1.12-1.43l3.7-4.35h2.76l-4.87 5.19 5.54 7.42h-2.78l-4.35-6-1.17 1.3v4.74h-2.3v-18.54h2.26z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path205",d:"M156.87 150.5a8.5 8.5 0 01-3.62.73c-3.8 0-6.27-2.58-6.27-6.44a6.4 6.4 0 016.77-6.7 7.66 7.66 0 013.18.65l-.52 1.78a5.27 5.27 0 00-2.66-.6c-2.89 0-4.45 2.14-4.45 4.77 0 2.92 1.88 4.71 4.38 4.71a6.52 6.52 0 002.81-.63z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path207",d:"M170.81 144.55c0 4.66-3.23 6.7-6.28 6.7-3.41 0-6-2.5-6-6.49 0-4.22 2.76-6.69 6.25-6.69s6.03 2.63 6.03 6.48zm-10 .13c0 2.76 1.59 4.84 3.83 4.84s3.83-2.06 3.83-4.9c0-2.14-1.07-4.84-3.78-4.84s-3.89 2.51-3.89 4.91z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path209",d:"M173.7 141.77c0-1.3 0-2.37-.1-3.41h2l.11 2h.08a4.34 4.34 0 014-2.32 3.74 3.74 0 013.57 2.53 5.34 5.34 0 011.41-1.64 4.3 4.3 0 012.79-.88c1.66 0 4.14 1.09 4.14 5.47v7.42h-2.24v-7.14c0-2.43-.89-3.89-2.73-3.89a3 3 0 00-2.71 2.08 4 4 0 00-.18 1.15v7.79h-2.24v-7.55c0-2-.89-3.47-2.63-3.47a3.14 3.14 0 00-2.84 2.3 3.23 3.23 0 00-.18 1.12v7.61h-2.25z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path211",d:"M195.41 142.47c0-1.62-.05-2.92-.1-4.11h2.06l.1 2.16h.05a5 5 0 014.48-2.45c3.05 0 5.34 2.58 5.34 6.41 0 4.54-2.76 6.77-5.73 6.77a4.41 4.41 0 01-3.88-2h-.06v6.85h-2.26zm2.26 3.36a5.67 5.67 0 00.1.94 3.55 3.55 0 003.44 2.69c2.42 0 3.83-2 3.83-4.87 0-2.53-1.33-4.69-3.76-4.69a4 4 0 00-3.62 3.77z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path213",d:"M217.22 150.96l-.19-1.59h-.07a4.7 4.7 0 01-3.85 1.87 3.59 3.59 0 01-3.86-3.62c0-3 2.71-4.71 7.58-4.69v-.26a2.6 2.6 0 00-2.87-2.92 6.27 6.27 0 00-3.28.94l-.52-1.52a7.83 7.83 0 014.14-1.12c3.85 0 4.79 2.63 4.79 5.15v4.72a17.86 17.86 0 00.21 3zm-.34-6.44c-2.5-.05-5.35.39-5.35 2.84a2 2 0 002.17 2.19 3.14 3.14 0 003-2.11 2.48 2.48 0 00.13-.73z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path215",d:"M222.78 141.77c0-1.3 0-2.37-.1-3.41h2l.13 2.08a4.64 4.64 0 014.17-2.37c1.74 0 4.45 1 4.45 5.37v7.53h-2.29v-7.27c0-2-.76-3.73-2.92-3.73a3.26 3.26 0 00-3.07 2.34 3.34 3.34 0 00-.15 1.07v7.58h-2.3z"}}),t._v(" "),e("path",{staticClass:"cls-5",attrs:{id:"path217",d:"M237.74 138.36l2.76 7.45c.29.83.6 1.82.81 2.58h.06c.23-.76.49-1.72.8-2.63l2.5-7.4h2.42l-3.44 9c-1.64 4.32-2.76 6.54-4.32 7.89a6.27 6.27 0 01-2.81 1.48l-.57-1.93a6.07 6.07 0 002-1.12 7 7 0 001.93-2.55 1.82 1.82 0 00.18-.55 2.15 2.15 0 00-.16-.6l-4.67-11.62z"}})])]),t._v(" "),e("div",[e("h4",{staticClass:"text-right"},[t._v(t._s(t.partialpayment?t.bkashPay(t.partialpayment):0)+" Tk\n                                        ")])])]),t._v(" "),t._m(3),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn checkout-btn",attrs:{type:"submit",disabled:1==t.btndisabled}},[t._v("\n                                        Pay with Bkash\n                                    ")])])])])])]),t._v(" "),e("div",{staticClass:"col-lg-6 col-md-6 col-sm-6"},[e("div",{staticClass:"cart-checkout desktop-payment"},[e("h2",[t._v("Cart Summary")]),t._v(" "),e("div",{staticClass:"cart-summary payment_details"},[e("div",{staticClass:"row row-border-bottom"},[e("div",{staticClass:"col-sm-7"},[e("p",[t._v("Sub Total Cost (Qty "+t._s(t.cartItemCount)+" Items)")])]),t._v(" "),e("div",{staticClass:"col-sm-5"},[e("p",{staticClass:"text-right"},[t._v(t._s(t.cartTotalPrice)+" Tk")])])]),t._v(" "),e("div",{staticClass:"row row-border-bottom"},[t._m(4),t._v(" "),e("div",{staticClass:"col-sm-5"},[e("p",{staticClass:"text-right"},[t._v(t._s(t.discount?t.discount:0)+" Tk")])])]),t._v(" "),e("div",{staticClass:"row row-border-bottom"},[t._m(5),t._v(" "),e("div",{staticClass:"col-sm-5"},[e("p",{staticClass:"text-right"},[t._v(t._s(t.shippingfee?t.shippingfee:0)+" Tk")])])]),t._v(" "),e("div",{staticClass:"row row-border-bottom"},[t._m(6),t._v(" "),e("div",{staticClass:"col-sm-5"},[e("p",{staticClass:"text-right"},[t._v(t._s(t.partialpayment?t.partialpayment:0)+" Tk")])])]),t._v(" "),e("div",{staticClass:"row"},[t._m(7),t._v(" "),e("div",{staticClass:"col-sm-5"},[e("p",{staticClass:"text-right"},[t._v(t._s(Number(t.cartTotalPrice)+Number(t.shippingfee)-Number(t.discount+t.partialpayment?t.partialpayment:0))+" Tk")])])])])]),t._v(" "),e("div",{staticClass:"cart-checkout my-4 desktop-payment"},[e("h2",[t._v("Cart Details")]),t._v(" "),e("div",{staticClass:"show-cart-body"},t._l(t.cart,(function(r){return e("div",{key:r.product.id,staticClass:"showcart-item"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-8 col-8"},[e("div",{staticClass:"cart-info"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-3 col-3"},[e("img",{attrs:{src:"https://pos.girlsontop.com.bd/public/uploads/img/"+r.product.image,alt:""}})]),t._v(" "),e("div",{staticClass:"col-sm-9 col-9"},[e("h6",[t._v(t._s(r.product.name))]),t._v(" "),r.product_size?e("p",[t._v("Size: "+t._s(r.product_size))]):t._e(),t._v(" "),e("p",[t._v("Tk "+t._s(Math.round(r.price)))])])])])]),t._v(" "),e("div",{staticClass:"col-sm-4 col-4"},[e("div",{staticClass:"cart-action"},[e("div",[e("h6",[t._v("Tk "+t._s(r.product.variation.default_sell_price*r.quantity)+"\n                                                ")])])])])])])})),0)])])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"dot-loading"},[t("div",{staticClass:"dot-pulse"})])},function(){var t=this._self._c;return t("h2",{staticClass:"login-title"},[t("strong",[this._v("Shipping Address")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"card-header",attrs:{"data-toggle":"collapse","data-target":"#collapseOne","aria-expanded":"true"}},[e("span",{staticClass:"title"},[t._v("Cart Details")]),t._v(" "),e("span",{staticClass:"accicon"},[e("i",{staticClass:"fas fa-angle-down rotate-icon"})])])},function(){var t=this._self._c;return t("div",{staticStyle:{width:"100%",display:"block"}},[t("p",[this._v("অর্ডার কনফার্মের জন্য ঢাকা সিটির মধ্যে ২০০৳ এবং ঢাকার বাইরে ৫০০৳  অগ্রীম প্রদান করতে হবে।")])])},function(){var t=this._self._c;return t("div",{staticClass:"col-sm-7"},[t("p",[this._v("Discount (-)")])])},function(){var t=this._self._c;return t("div",{staticClass:"col-sm-7"},[t("p",[this._v("Delivery Charge (+)")])])},function(){var t=this._self._c;return t("div",{staticClass:"col-sm-7"},[t("p",[this._v("Advance Payment (-)")])])},function(){var t=this._self._c;return t("div",{staticClass:"col-sm-7"},[t("p",[this._v("Due Bill")])])}],!1,null,null,null);e.default=component.exports}}]);