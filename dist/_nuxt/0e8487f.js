(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{353:function(t,n,o){var content=o(361);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(51).default)("3e1b21ee",content,!0,{sourceMap:!1})},360:function(t,n,o){"use strict";o(353)},361:function(t,n,o){var e=o(50)(!1);e.push([t.i,'\n@media print\n        {\nfooter,header,.whychoose,.toggle-wrapper,.noprint\n            {\n                display: none !important;\n}\n.invoice,.invoice-section{\n         \tpadding: 0 !important;\n         \tbackground: #fff !important;\n}\n}\nsection.invoice-section {\n\t    background: #f9f9f9;\n}\ntable{\n\t\toverflow: hidden;\n}\n.brt-0 {\n\t    border: 0 !important;\n}\n.brl-1 {\n\t    border-left: 1px solid #eee !important;\n}\n.pad-30{\n\t\tpadding: 30px;\n}\n.invoice-logo img {\n\t    width: 80px;\n\t    height: auto;\n}\n.float-left{\n\t\tfloat: left;\n}\n.float-right{\n\t\tfloat: right;\n}\n.w-33{\n\t\twidth: 33.00%;\n}\n.w-47{\n\t\twidth: 47%;\n}\n.mt-50{\n\t\tmargin-top: 50px;\n}\n.mt-30{\n\t\tmargin-top: 30px;\n\t\tmargin-bottom: 0 !important;\n}\np.invoice-title {\n\t    font-size: 24px;\n\t    font-weight: 800;\n\t    color: #FF1593;\n\t    letter-spacing: 3px;\n}\n.invoice .name {\n\t    color: #FF1593;\n\t    font-weight: 600;\n}\n.invoice {\n        max-width: 950px;\n        margin: 0px auto;\n        overflow: hidden;\n        margin-top: 25px;\n        margin-bottom: 50px;\n}\nbutton.btn.btn-success.noprint {\n\t    margin-top: 25px;\n}\n.invoice-box {\n\t    padding: 30px;\n\t    background: #fff;\n\t    font-size: 16px;\n\t    line-height: 24px;\n\t    color: #555;\n\t    position: relative;\n\t    overflow: hidden;\n\t    padding-bottom: 70px;\n\t    border-top: 15px solid #FF1593;\n\t    position: relative;\n    \tz-index: 1;\n}\n.invoice-box:after {\n\t    height: 60px;\n\t    width: 60px;\n\t    position: absolute;\n\t    left: 0;\n\t    top: 0;\n\t    content: "";\n\t    background: #FF1593;\n}\n.invoice-box:before {\n\t    height: 60px;\n\t    width: 60px;\n\t    position: absolute;\n\t    left: 8px;\n\t    top: 8px;\n\t    content: "";\n\t    background: #FF1593;\n\t    opacity: 0.8;\n}\n.invoice-box table thead{\n    \tbackground :#FF1593;\n    \tcolor :#fff\n}\n.invoice-box table {\n        width: 100%;\n        line-height: inherit;\n        text-align: left;\n}\n.table td, .table th {\n        padding: 8px 10px;\n}\n.grandtotal {\n\t    background: #FF1593;\n\t    color: #fff;\n}\n.grandtotal td {\n\t    padding: 8px 10px;\n}\n.invoice-footer {\n\t    background: #FF1593;\n\t    color: #fff;\n\t    padding: 30px 30px;\n\t    position: relative;\n\t    z-index: 1;\n}\n.invoice-footer:after {\n\t    position: absolute;\n\t    right: -23px;\n\t    top: -38px;\n\t    height: 150px;\n\t    width: 150px;\n\t    content: "";\n\t    background: #FF1593;\n\t    border-radius: 73px;\n\t    z-index: -1;\n}\n.icon {\n\t    float: left;\n\t    width: 30px;\n\t    background: #fff;\n\t    height: 30px;\n\t    border-radius: 50%;\n\t    margin-right: 15px;\n\t    margin-top: 10px;\n\t    text-align: center;\n}\n.contact-info {\n\t    float: left;\n\t    width: 83%;\n\t    text-align: left;\n}\n.icon i {\n\t    color: #FF1593;\n\t    line-height: 30px;\n}\n.paytable thead {\n\t    background: #f9f9f9!important;\n\t    color: #222 !important;\n}\n@media only screen and (min-width:320px) and (max-width:767px) {\n.w-33 {\n\t\t    width: 100% !important;\n\t\t    margin: 10px 0;\n\t\t    text-align: left !important;\n\t\t    display: block;\n\t\t    overflow: hidden;\n}\n.w-50 {\n\t\t    width: 100%!important;\n\t\t    text-align: left !important;\n\t\t    overflow: hidden;\n\t\t    display: block;\n}\n.w-47 {\n\t\t    width: 68%;\n\t\t    text-align: right !important;\n\t\t    margin-right: -4px;\n}\n}\n',""]),t.exports=e},379:function(t,n,o){"use strict";o.r(n);o(28);var e={middleware:"authenticated",data:function(){return{logo:{},orderInfo:[],invoice_payment:{},totalpay:{}}},methods:{loadData:function(){var t=this,n=this.$route.params.id;this.$axios.get("/api/v1/customer/order/invoice/"+n,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(n){t.orderInfo=n.data.orderInfo,t.totalpay=n.data.totalpay,t.invoice_payment=n.data.invoice_payment,t.loading=!1})),this.$axios.get("/api/v1/logo").then((function(n){t.logo=n.data.logo}))},printInvoice1:function(){var t=document.getElementById("printInvoice1"),n=window.open("","","left=0, top=0, width=800, height=500, toolbar=0, scrollbars=0, status=0");n.document.write(t.innerHTML),n.document.close(),n.focus(),n.print()}},mounted:function(){this.loadData()}},r=(o(360),o(49)),component=Object(r.a)(e,(function(){var t=this,n=t._self._c;return n("div",[n("div",{staticClass:"mobile-breadcrumb"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("div",{staticClass:"bread-link"},[n("nuxt-link",{attrs:{to:"/customer/account"}},[n("i",{staticClass:"fa fa-arrow-left"}),t._v(" Order Invoice ")])],1)])])])]),t._v(" "),n("section",{staticClass:"invoice-section"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"paddleft-120 col-lg-12 col-md-12 col-sm-4"},[n("div",{staticClass:"customer-profile"},[n("div",{staticClass:"col-lg-12 col-md-12 col-sm-12"},[t._m(0),t._v(" "),n("div",{staticClass:"invoice"},[n("div",{staticClass:"invoice-box",attrs:{id:"printInvoice1"}},[n("table",{staticClass:"pad-30"},[n("tr",[n("td",{staticClass:"invoice-logo text-right"},[n("img",{attrs:{src:t.logo.image,alt:""}})])])]),t._v(" "),n("table",{staticClass:"mt-50 pad-30"},[n("tr",{staticClass:"w-33 float-left"},[t.orderInfo.contact?n("p",{staticClass:"name"},[t._v(t._s(t.orderInfo.contact.name))]):t._e(),t._v(" "),n("p",[n("strong",[t._v("Address ")]),t._v(t._s(t.orderInfo.shipping_details))]),t._v(" "),t.orderInfo.contact?n("p",[n("strong",[t._v("Phone:")]),t._v(" "+t._s(t.orderInfo.contact.mobile))]):t._e(),t._v(" "),n("p",{staticClass:"text-capitalize"},[n("strong",[t._v("\tShipping Status : ")]),t._v(" "+t._s(t.orderInfo.shipping_status))]),t._v(" "),n("p",{staticClass:"text-capitalize"},[n("strong",[t._v("\tShipping Note : ")]),t._v(" "+t._s(t.orderInfo.shipping_note))])]),t._v(" "),n("tr",{staticClass:"w-33 float-left"},[n("p",{staticClass:"invoice-title"},[t._v("INVOICE")]),t._v(" "),n("p",[t._v("Invoice No : "+t._s(t.orderInfo.invoice_no))]),t._v(" "),n("p",{staticClass:"text-capitalize"},[t._v("Payment Status : "+t._s(t.orderInfo.payment_status))])]),t._v(" "),n("tr",{staticClass:"w-33 float-left text-right"},[n("p",[t._v("Total Price")]),t._v(" "),n("p",[n("strong",[t._v("Tk : "+t._s(Math.round(t.orderInfo.final_total)))])]),t._v(" "),n("p",[t._v("Date : "+t._s(t.orderInfo.transaction_date))]),t._v(" "),t.orderInfo.delivered_to?n("p",[t._v("Delivered To : "+t._s(t.orderInfo.delivered_to))]):t._e(),t._v(" "),t.orderInfo.additional_notes?n("p",[t._v("Note : "+t._s(t.orderInfo.additional_notes))]):t._e()])]),t._v(" "),n("table",{staticClass:"table table-bordered mt-30"},[t._m(1),t._v(" "),n("tbody",[t.invoice_payment?n("tr",[n("td",[t._v(t._s(t.invoice_payment.created_at))]),t._v(" "),n("td",[t.invoice_payment.transaction_no?n("span",[t._v(t._s(Math.round(t.invoice_payment.amount)))]):n("span",[t._v(" N/A")])]),t._v(" "),n("td",[t.invoice_payment.transaction_no?n("span",[t._v("Bkash")]):n("span",[t._v(" N/A")])]),t._v(" "),n("td",[t.invoice_payment.transaction_no?n("span",[t._v(t._s(t.invoice_payment.transaction_no))]):n("span",[t._v(" N/A")])])]):t._e()])]),t._v(" "),n("table",{staticClass:"table table-bordered mt-30"},[t._m(2),t._v(" "),n("tbody",t._l(t.orderInfo.sell_lines,(function(o,e){return n("tr",[o.product?n("td",[t._v(t._s(o.product.name)+" -Size- "+t._s(o.variations?o.variations.name:""))]):t._e(),t._v(" "),n("td",[t._v("Tk "+t._s(Math.round(o.unit_price)))]),t._v(" "),n("td",[t._v(t._s(o.quantity))]),t._v(" "),n("td",[t._v("Tk "+t._s(Math.round(o.unit_price*o.quantity)))])])})),0)]),t._v(" "),n("table",[n("tr",[n("td",{staticClass:"w-50 float-left mt-30 mnomargin"}),t._v(" "),n("td",{staticClass:"w-47 float-right"},[n("table",{staticClass:"table",staticStyle:{"border-right":"2px solid #eee","margin-top":"-1px !important"}},[n("tbody",[n("tr",[t._m(3),t._v(" "),n("td",{staticClass:"brt-0 brl-1"},[n("strong",[t._v("Tk "+t._s(t.orderInfo.final_total-t.orderInfo.shipping_charges))])])]),t._v(" "),n("tr",[t._m(4),t._v(" "),n("td",{staticClass:"brt-0 brl-1"},[n("strong",[t._v("Tk "+t._s(Math.round(t.orderInfo.shipping_charges)))])])]),t._v(" "),n("tr",[t._m(5),t._v(" "),n("td",{staticClass:"brt-0 brl-1"},[n("strong",[t._v("Tk "+t._s(Math.round(t.orderInfo.final_total)))])])]),t._v(" "),n("tr",[t._m(6),t._v(" "),n("td",{staticClass:"brt-0 brl-1"},[n("strong",[t._v("Tk "+t._s(Math.round(t.totalpay)))])])])]),t._v(" "),n("tfoot",{staticClass:"grandtotal"},[n("tr",[t._m(7),t._v(" "),n("td",[n("strong",[t._v("Tk "+t._s(Math.round(t.orderInfo.final_total-t.totalpay)))])])])])])])])]),t._v(" "),t._m(8)]),t._v(" "),t._m(9)])])])])])])])])}),[function(){var t=this._self._c;return t("div",{staticStyle:{"text-align":"center"}},[t("button",{staticClass:"btn btn-success noprint",attrs:{onclick:"printInvoice1()"}},[this._v("Print")])])},function(){var t=this,n=t._self._c;return n("thead",[n("tr",[n("td",[t._v("Date")]),t._v(" "),n("td",[t._v("Advance Amount")]),t._v(" "),n("td",[t._v("Payment Method")]),t._v(" "),n("td",[t._v("TrxID")])])])},function(){var t=this,n=t._self._c;return n("thead",[n("tr",[n("td",[t._v("ITEM DESCRIPTION")]),t._v(" "),n("td",[t._v("PRICE")]),t._v(" "),n("td",[t._v("QTY")]),t._v(" "),n("td",[t._v("TOTAL")])])])},function(){var t=this._self._c;return t("td",{staticClass:"brt-0"},[t("strong",[this._v("Sub Total")])])},function(){var t=this._self._c;return t("td",{staticClass:"brt-0"},[t("strong",[this._v("Shipping Fee")])])},function(){var t=this._self._c;return t("td",{staticClass:"brt-0"},[t("strong",[this._v("Total")])])},function(){var t=this._self._c;return t("td",{staticClass:"brt-0"},[t("strong",[this._v("Paid")])])},function(){var t=this._self._c;return t("td",[t("strong",[this._v("Due")])])},function(){var t=this,n=t._self._c;return n("table",{staticClass:"mt-30"},[n("tr",[n("td",{staticClass:"w-50 float-left"},[n("p",{staticStyle:{"border-bottom":"2px solid #ddd","margin-bottom":"5px"}},[n("strong",[t._v("Thank you for your shopping!")])]),t._v(" "),n("p",[t._v("We are dedicated for you. if any query feel free contact with us.")])]),t._v(" "),n("td",{staticClass:"w-50 float-left text-right",staticStyle:{"margin-top":"15px"}},[n("p",[t._v(".................................")]),t._v(" "),n("p",[t._v("Account Manager")])])])])},function(){var t=this,n=t._self._c;return n("div",{staticClass:"invoice-footer"},[n("table",[n("tr",[n("td",{staticClass:"w-33 padr-20"},[n("div",{staticClass:"icon"},[n("i",{staticClass:"fa fa-phone"})]),t._v(" "),n("div",{staticClass:"contact-info"},[n("p",[t._v("Hotline :")]),t._v(" "),n("p",[t._v("+88 01600217373")])])]),t._v(" "),n("td",{staticClass:"w-33 padr-20"},[n("div",{staticClass:"icon"},[n("i",{staticClass:"fa fa-envelope"})]),t._v(" "),n("div",{staticClass:"contact-info"},[n("p",[t._v("info@girlsontop.com.bd")]),t._v(" "),n("p",[t._v("www.girlsontop.com.bd")])])]),t._v(" "),n("td",{staticClass:"w-33 padr-20"},[n("div",{staticClass:"icon"},[n("i",{staticClass:"fa fa-map-marker"})]),t._v(" "),n("div",{staticClass:"contact-info"},[n("p",[t._v("Shop No-56, Block-C, Level-2, Bashundhara City Shopping Mall Panthapath, Tejgaon. Dhaka-1215, Bangladesh")])])])])])])}],!1,null,null,null);n.default=component.exports}}]);