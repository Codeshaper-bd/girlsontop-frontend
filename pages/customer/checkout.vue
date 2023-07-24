<template>
    <div>
        <div class="customloader" v-if="customloader">
            <div class="dot-loading">
                <div class="dot-pulse"></div>
            </div>
        </div>

        <section class="breadcrumb-custom">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="account_bred">
                            <li>
                                <nuxt-link to="/"> <i class="fa fa-home"></i> </nuxt-link>
                            </li>
                            <li>/</li>
                            <li>
                                <nuxt-link to="/customer/cart">Cart</nuxt-link>
                            </li>
                            <li>/</li>
                            <li>
                                <nuxt-link to="/customer/checkout">Checkout</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class=" payment-form1">
                            <h2 class="login-title"><strong>Shipping Address</strong></h2>
                            <div class="accordion productdetails mobile-payment" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true">
                                        <span class="title">Cart Details</span>
                                        <span class="accicon"><i class="fas fa-angle-down rotate-icon"></i></span>
                                    </div>
                                    <div id="collapseOne" class="collapse" data-parent="#accordionExample">
                                        <div class="mobile-payment table-cart">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <td>SubTotal ({{ cartItemCount }}) items</td>
                                                    <td>{{ cartTotalPrice }} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount (-)</td>
                                                    <td>{{ discount ? discount : 0 }} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Delivery Charge (+)</td>
                                                    <td>{{ shippingfee ? shippingfee : 0 }} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Advance Payment</td>
                                                    <td>{{ partialpayment ? partialpayment : 0 }} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Due Bill</td>
                                                    <td>{{ Number(cartTotalPrice) + Number(shippingfee) - Number(
                                                        discount + partialpayment ? partialpayment : 0) }} Tk</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="showcart-item" v-for="item in cart" :key="item.product.id">
                                            <div class="row">
                                                <div class="col-sm-8 col-8">
                                                    <div class="cart-info">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-3">
                                                                <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image"
                                                                    alt="" />
                                                            </div>
                                                            <div class="col-sm-9 col-9">
                                                                <h6>{{ item.product.name }}</h6>
                                                                <p v-if="item.product_size">Size: {{ item.product_size }}
                                                                </p>
                                                                <p>Tk
                                                                    {{ Math.round(item.product.variation.default_sell_price)
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 col-4">
                                                    <div class="cart-action">
                                                        <div>
                                                            <h6>Tk
                                                                {{ item.product.variation.default_sell_price * item.quantity
                                                                }}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form @submit.prevent="checkout">
                                <div class="shipping-info">
                                    <div class="form-group">
                                        <input type="text" class="form-control" :class="nameinvalid ? 'invalidfield' : ''"
                                            v-on:keyup="validOrnot()" placeholder="Your Name*" name="fullName"
                                            v-model="checkoutForm.fullName = customer.name" id="fullName" required />
                                        <div v-if="checkoutForm.errors.has('fullName')"
                                            v-html="checkoutForm.errors.get('fullName')" />
                                    </div>
                                    <div class="form-group">
                                        <input type="number" class="form-control"
                                            :class="phoneinvalid ? 'invalidfield' : ''" v-on:keyup="validOrnot()"
                                            placeholder="Your 11 digit phone Number*"
                                            v-model="checkoutForm.phoneNumber = customer.mobile" name="phoneNumber"
                                            id="phoneNumber" required />
                                        <div v-if="checkoutForm.errors.has('phoneNumber')"
                                            v-html="checkoutForm.errors.get('phoneNumber')" />
                                    </div>
                                    <div class="form-group">
                                        <Select2 class="form-control district"
                                            :class="districtinvalid ? 'invalidfield' : ''" v-on:change="validOrnot()"
                                            :options="districts" @change="selectdist()" v-model="checkoutForm.district"
                                            placeholder="Select District *" required>
                                        </Select2>
                                        <div v-if="checkoutForm.errors.has('district')"
                                            v-html="checkoutForm.errors.get('district')" />
                                    </div>
                                    <div class="form-group">
                                        <Select2 class="form-control district" :class="areainvalid ? 'invalidfield' : ''"
                                            v-on:change="validOrnot()" v-model="checkoutForm.area" name="area" id="area"
                                            @change="selectarea()" :options="areas" placeholder="Select Area *" required>
                                        </Select2>
                                        <div v-if="checkoutForm.errors.has('area')"
                                            v-html="checkoutForm.errors.get('area')" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" :class="addressinvalid ? 'invalidfield' : ''"
                                            v-on:keyup="validOrnot()" class="form-control" name="address"
                                            v-model="checkoutForm.address = customer.address_line_1" id="address"
                                            placeholder="জেলা , থানা এবং উপজেলার নাম।  বাসা নং, রোড নং, এলাকার নাম *"
                                            required />
                                        <div v-if="checkoutForm.errors.has('address')"
                                            v-html="checkoutForm.errors.get('address')" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="checkoutForm.note" class="form-control" name="note"
                                            id="note" placeholder="Note" />
                                    </div>
                                    <div style="display: flex; justify-content: space-between;align-items: center;">
                                        <div>
                                            <input type="radio" checked>
                                            <svg style="height: 85px; width: 105px;" xmlns="http://www.w3.org/2000/svg"
                                                height="800" width="1200" version="1.1" id="Layer_1"
                                                viewBox="-37.0635 -39.1825 321.217 235.095">
                                                <defs id="defs157">
                                                    <style id="style155">
                                                        .cls-1 {
                                                            fill: #d12053
                                                        }

                                                        .cls-2 {
                                                            fill: #e2136e
                                                        }

                                                        .cls-3 {
                                                            fill: #9e1638
                                                        }

                                                        .cls-4 {
                                                            fill: #231f20
                                                        }

                                                        .cls-5 {
                                                            fill: #808285
                                                        }
                                                    </style>
                                                </defs>
                                                <path transform="translate(.01)" id="polygon161" class="cls-1"
                                                    d="M223.65 62.45l-53.03-8.31 7.03 31.6z" />
                                                <path transform="translate(.01)" id="polygon163" class="cls-2"
                                                    d="M223.65 62.45L183.69 6.93l-13.06 47.22z" />
                                                <path transform="translate(.01)" id="polygon165" class="cls-1"
                                                    d="M169.39 53.51L127.52 0l54.83 6.55z" />
                                                <path transform="translate(.01)" id="polygon167" class="cls-3"
                                                    d="M150.32 31.15L127.07 9.24h6.12z" />
                                                <path transform="translate(.01)" id="polygon169" class="cls-1"
                                                    d="M234.96 35.46l-9.84 26.69-15.95-22.06z" />
                                                <path transform="translate(.01)" id="polygon171" class="cls-2"
                                                    d="M183.84 84.14l38.61-15.51 1.62-4.93z" />
                                                <path transform="translate(.01)" id="polygon173" class="cls-3"
                                                    d="M152.96 113.41l16.54-58.02 8.39 37.75z" />
                                                <path transform="translate(.01)" id="polygon175" class="cls-2"
                                                    d="M236.5 35.67l-4.06 11.02 14.64-.24z" />
                                                <path id="path177"
                                                    d="M.01 40.09c.71.06 1.43.19 2.19.19s1.38-.13 2.19-.19v23.47c2.31-3.93 5.22-6.52 9.5-6.52 7.74 0 11.06 7.66 11.06 14.7 0 8.43-4.5 16.5-12.39 16.5a8.66 8.66 0 01-7.77-4.47c-1.32 1.16-2.49 2.55-3.74 3.81h-1zm4.28 34.52c0 6.84 2.9 11.61 7.67 11.61 6.19 0 8.18-8.32 8.18-14.22 0-6.85-2.26-12.24-7.62-12.3-6.26-.05-8.23 7.36-8.23 14.92"
                                                    class="cls-2" />
                                                <path id="path179"
                                                    d="M45.14 55.27l-4.66 6c4.38 6.4 8.92 12.67 13.32 19.15l4.44 7v.35c-1.09-.07-2.08-.21-3-.21-.92 0-2.08.14-3.06.21-1.21-2.24-2.41-4.31-3.78-6.34l-12-17.75c-.27-.28-.92-.5-.92-.21v24.3c-.88-.07-1.65-.21-2.41-.21-.76 0-1.64.14-2.41.21V40.09c.77.06 1.6.21 2.41.21s1.53-.15 2.41-.21v21.52c0 .42.82.14 1.36-.42a37.1 37.1 0 002.92-3.42l13.49-17.7c.71.06 1.42.21 2.19.21s1.36-.15 2.14-.21z"
                                                    class="cls-4" />
                                                <path id="path181"
                                                    d="M81.43 82.4c0 2.48-.16 3.74 3.07 2.92v1.39a8.87 8.87 0 01-1.65.63c-2.85.57-5.21.06-5.65-3.67l-.49.55a10.17 10.17 0 01-8.12 4c-3.88 0-7.28-3.06-7.28-7.75 0-7.23 5-8.18 10.13-9.13 4.34-.82 5.82-1.2 5.82-4.25 0-4.7-2.3-7.42-6.41-7.42a6.85 6.85 0 00-6.52 4.37h-.6v-3.52a14.2 14.2 0 018.87-3.48c5.75 0 8.88 3.48 8.88 10.65zm-4.38-10.47l-1.93.44c-3.73.82-9.32 1.45-9.32 7.24 0 4 2 6 5.36 6a6.83 6.83 0 004.44-2.44c.4-.46 1.5-1.54 1.5-2z"
                                                    class="cls-4" />
                                                <path id="path183"
                                                    d="M91.2 81.56c1.3 2.49 3.72 4.72 6.3 4.72a5.67 5.67 0 005.38-5.78c0-8.56-12.95-3-12.95-14.08 0-6.08 4-9.37 8.93-9.37a11.57 11.57 0 016.2 1.64 32.79 32.79 0 00-1.3 4.5h-.5c-.72-2.09-2.63-4.19-4.66-4.19-2.74 0-5 1.85-5 5.28 0 8.11 12.95 3.79 12.95 13.94 0 6.79-5.26 10-10.1 10a12.73 12.73 0 01-6.84-2 34.42 34.42 0 001.15-4.65z"
                                                    class="cls-4" />
                                                <path id="path185"
                                                    d="M113.93 40.09c.73.06 1.44.19 2.2.19.76 0 1.38-.13 2.2-.19v23.09c1.92-3.87 4.93-6.14 8.83-6.14 6.36 0 8.83 4.36 8.83 12.36v18.37c-.83-.07-1.47-.19-2.2-.19-.73 0-1.48.13-2.2.19V70.85c0-7-1.41-10.53-6.08-10.53-4.94 0-7.18 3.56-7.18 10.15v17.3c-.82-.07-1.47-.19-2.2-.19-.73 0-1.46.13-2.2.19z"
                                                    class="cls-4" />
                                                <path id="path187"
                                                    d="M7.98 150.96l-.19-1.59h-.08a4.7 4.7 0 01-3.85 1.87A3.59 3.59 0 010 147.62c0-3 2.71-4.71 7.58-4.69v-.26a2.59 2.59 0 00-2.85-2.9 6.28 6.28 0 00-3.28.94l-.52-1.52a7.87 7.87 0 014.14-1.12c3.86 0 4.8 2.63 4.8 5.15v4.72a17.38 17.38 0 00.21 3zm-.38-6.43c-2.5-.05-5.34.39-5.34 2.84a2 2 0 002.16 2.19 3.14 3.14 0 003-2.11 2.46 2.46 0 00.13-.73z"
                                                    class="cls-5" />
                                                <path id="path189"
                                                    d="M19.15 133.64a22 22 0 014.14-.36c2.26 0 3.73.39 4.82 1.28a3.68 3.68 0 011.46 3.1 4.17 4.17 0 01-3 3.86v.05a4.53 4.53 0 013.62 4.4 4.73 4.73 0 01-1.48 3.52c-1.23 1.12-3.21 1.64-6.07 1.64a26.28 26.28 0 01-3.52-.21zm2.27 7.19h2.05c2.4 0 3.81-1.25 3.81-2.94 0-2.06-1.56-2.87-3.86-2.87a9.44 9.44 0 00-2 .16zm0 8.42a12.47 12.47 0 001.9.1c2.34 0 4.51-.86 4.51-3.41 0-2.4-2.06-3.39-4.54-3.39h-1.87z"
                                                    class="cls-5" />
                                                <path id="path191"
                                                    d="M33.27 133.64a23.68 23.68 0 014.33-.37c2.42 0 4 .44 5.08 1.44a4.36 4.36 0 011.38 3.33 4.61 4.61 0 01-3.31 4.48v.08c1.35.47 2.16 1.72 2.57 3.55a27.8 27.8 0 001.36 4.82h-2.32a22.92 22.92 0 01-1.17-4.2c-.52-2.42-1.46-3.33-3.51-3.41h-2.15v7.61h-2.26zm2.26 8h2.32c2.42 0 4-1.33 4-3.33 0-2.27-1.64-3.26-4-3.29a9.21 9.21 0 00-2.24.21z"
                                                    class="cls-5" />
                                                <path id="path193"
                                                    d="M50.25 145.44l-1.82 5.52h-2.35l6-17.56h2.73l6 17.56h-2.45l-1.88-5.52zm5.76-1.77l-1.72-5.06c-.4-1.14-.65-2.18-.91-3.2h-.05c-.26 1-.55 2.11-.89 3.18l-1.72 5.08z"
                                                    class="cls-5" />
                                                <path id="path195"
                                                    d="M75.23 150.39a11.32 11.32 0 01-4.64.83c-5 0-8.67-3.12-8.67-8.88 0-5.5 3.72-9.22 9.17-9.22a9.42 9.42 0 014.16.78l-.54 1.87a8.33 8.33 0 00-3.54-.73c-4.12 0-6.85 2.63-6.85 7.24 0 4.3 2.47 7.06 6.75 7.06a9 9 0 003.69-.73z"
                                                    class="cls-5" />
                                                <path id="path197"
                                                    d="M83.6 133.64a22 22 0 014.14-.36c2.26 0 3.73.39 4.82 1.28a3.68 3.68 0 011.46 3.1 4.17 4.17 0 01-3 3.86v.05a4.53 4.53 0 013.62 4.4 4.73 4.73 0 01-1.48 3.52c-1.23 1.12-3.21 1.64-6.07 1.64a26.29 26.29 0 01-3.52-.21zm2.27 7.19h2.05c2.4 0 3.81-1.25 3.81-2.94 0-2.06-1.56-2.87-3.86-2.87a9.44 9.44 0 00-2 .16zm0 8.42a12.47 12.47 0 001.9.1c2.34 0 4.51-.86 4.51-3.41 0-2.4-2.06-3.39-4.54-3.39h-1.89z"
                                                    class="cls-5" />
                                                <path id="path199"
                                                    d="M104.6 150.96l-.18-1.59h-.08a4.71 4.71 0 01-3.86 1.87 3.59 3.59 0 01-3.85-3.62c0-3 2.71-4.71 7.58-4.69v-.26a2.6 2.6 0 00-2.86-2.92 6.3 6.3 0 00-3.29.94l-.52-1.52a7.85 7.85 0 014.14-1.12c3.86 0 4.8 2.63 4.8 5.15v4.72a17.39 17.39 0 00.21 3zm-.34-6.44c-2.5-.05-5.34.39-5.34 2.84a2 2 0 002.16 2.19 3.13 3.13 0 003-2.11 2.33 2.33 0 00.13-.73z"
                                                    class="cls-5" />
                                                <path id="path201"
                                                    d="M110.18 141.77c0-1.3 0-2.37-.1-3.41h2l.13 2.08a4.64 4.64 0 014.17-2.37c1.75 0 4.45 1 4.45 5.37v7.53h-2.23v-7.27c0-2-.75-3.73-2.92-3.73a3.27 3.27 0 00-3.08 2.34 3.48 3.48 0 00-.15 1.07v7.58h-2.29z"
                                                    class="cls-5" />
                                                <path id="path203"
                                                    d="M126.89 144.14h.06c.31-.44.75-1 1.12-1.43l3.7-4.35h2.76l-4.87 5.19 5.54 7.42h-2.78l-4.35-6-1.17 1.3v4.74h-2.3v-18.54h2.26z"
                                                    class="cls-5" />
                                                <path id="path205"
                                                    d="M156.87 150.5a8.5 8.5 0 01-3.62.73c-3.8 0-6.27-2.58-6.27-6.44a6.4 6.4 0 016.77-6.7 7.66 7.66 0 013.18.65l-.52 1.78a5.27 5.27 0 00-2.66-.6c-2.89 0-4.45 2.14-4.45 4.77 0 2.92 1.88 4.71 4.38 4.71a6.52 6.52 0 002.81-.63z"
                                                    class="cls-5" />
                                                <path id="path207"
                                                    d="M170.81 144.55c0 4.66-3.23 6.7-6.28 6.7-3.41 0-6-2.5-6-6.49 0-4.22 2.76-6.69 6.25-6.69s6.03 2.63 6.03 6.48zm-10 .13c0 2.76 1.59 4.84 3.83 4.84s3.83-2.06 3.83-4.9c0-2.14-1.07-4.84-3.78-4.84s-3.89 2.51-3.89 4.91z"
                                                    class="cls-5" />
                                                <path id="path209"
                                                    d="M173.7 141.77c0-1.3 0-2.37-.1-3.41h2l.11 2h.08a4.34 4.34 0 014-2.32 3.74 3.74 0 013.57 2.53 5.34 5.34 0 011.41-1.64 4.3 4.3 0 012.79-.88c1.66 0 4.14 1.09 4.14 5.47v7.42h-2.24v-7.14c0-2.43-.89-3.89-2.73-3.89a3 3 0 00-2.71 2.08 4 4 0 00-.18 1.15v7.79h-2.24v-7.55c0-2-.89-3.47-2.63-3.47a3.14 3.14 0 00-2.84 2.3 3.23 3.23 0 00-.18 1.12v7.61h-2.25z"
                                                    class="cls-5" />
                                                <path id="path211"
                                                    d="M195.41 142.47c0-1.62-.05-2.92-.1-4.11h2.06l.1 2.16h.05a5 5 0 014.48-2.45c3.05 0 5.34 2.58 5.34 6.41 0 4.54-2.76 6.77-5.73 6.77a4.41 4.41 0 01-3.88-2h-.06v6.85h-2.26zm2.26 3.36a5.67 5.67 0 00.1.94 3.55 3.55 0 003.44 2.69c2.42 0 3.83-2 3.83-4.87 0-2.53-1.33-4.69-3.76-4.69a4 4 0 00-3.62 3.77z"
                                                    class="cls-5" />
                                                <path id="path213"
                                                    d="M217.22 150.96l-.19-1.59h-.07a4.7 4.7 0 01-3.85 1.87 3.59 3.59 0 01-3.86-3.62c0-3 2.71-4.71 7.58-4.69v-.26a2.6 2.6 0 00-2.87-2.92 6.27 6.27 0 00-3.28.94l-.52-1.52a7.83 7.83 0 014.14-1.12c3.85 0 4.79 2.63 4.79 5.15v4.72a17.86 17.86 0 00.21 3zm-.34-6.44c-2.5-.05-5.35.39-5.35 2.84a2 2 0 002.17 2.19 3.14 3.14 0 003-2.11 2.48 2.48 0 00.13-.73z"
                                                    class="cls-5" />
                                                <path id="path215"
                                                    d="M222.78 141.77c0-1.3 0-2.37-.1-3.41h2l.13 2.08a4.64 4.64 0 014.17-2.37c1.74 0 4.45 1 4.45 5.37v7.53h-2.29v-7.27c0-2-.76-3.73-2.92-3.73a3.26 3.26 0 00-3.07 2.34 3.34 3.34 0 00-.15 1.07v7.58h-2.3z"
                                                    class="cls-5" />
                                                <path id="path217"
                                                    d="M237.74 138.36l2.76 7.45c.29.83.6 1.82.81 2.58h.06c.23-.76.49-1.72.8-2.63l2.5-7.4h2.42l-3.44 9c-1.64 4.32-2.76 6.54-4.32 7.89a6.27 6.27 0 01-2.81 1.48l-.57-1.93a6.07 6.07 0 002-1.12 7 7 0 001.93-2.55 1.82 1.82 0 00.18-.55 2.15 2.15 0 00-.16-.6l-4.67-11.62z"
                                                    class="cls-5" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="text-right">{{ partialpayment ? bkashPay(partialpayment) : 0 }} Tk
                                            </h4>
                                        </div>
                                    </div>
                                    <div style="width: 100%; display: block;">
                                        <p>অর্ডার কনফার্মের জন্য ঢাকা সিটির মধ্যে ২০০৳ এবং ঢাকার বাইরে ৫০০৳  অগ্রীম প্রদান করতে হবে।</p>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" :disabled="btndisabled == true" class="btn checkout-btn">
                                            Pay with Bkash
                                        </button>
                                    </div>
                                </div>
                            </form>


                        </div>
                        <!--login content end-->
                    </div>
                    <!-- col end -->
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="cart-checkout desktop-payment">
                            <h2>Cart Summary</h2>
                            <div class="cart-summary payment_details">
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Sub Total Cost (Qty {{ cartItemCount }} Items)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{ cartTotalPrice }} Tk</p>
                                    </div>
                                </div>
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Discount (-)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{ discount ? discount : 0 }} Tk</p>
                                    </div>
                                </div>
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Delivery Charge (+)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{ shippingfee ? shippingfee : 0 }} Tk</p>
                                    </div>
                                </div>
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Advance Payment (-)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{ partialpayment ? partialpayment : 0 }} Tk</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-7">
                                        <p>Due Bill</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{ Number(cartTotalPrice) + Number(shippingfee) -
                                            Number(discount + partialpayment ? partialpayment : 0) }} Tk</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart-checkout my-4 desktop-payment">
                            <h2>Cart Details</h2>
                            <div class="show-cart-body">
                                <div class="showcart-item" v-for="item in cart" :key="item.product.id">
                                    <div class="row">
                                        <div class="col-sm-8 col-8">
                                            <div class="cart-info">
                                                <div class="row">
                                                    <div class="col-sm-3 col-3">
                                                        <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image"
                                                            alt="" />
                                                    </div>
                                                    <div class="col-sm-9 col-9">
                                                        <h6>{{ item.product.name }}</h6>
                                                        <p v-if="item.product_size">Size: {{ item.product_size }}</p>
                                                        <p>Tk {{ Math.round(item.price) }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-4">
                                            <div class="cart-action">
                                                <div>
                                                    <h6>Tk {{ item.product.variation.default_sell_price * item.quantity }}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Form from "vform";
import Select2 from 'v-select2-component';

export default {
    middleware: 'authenticated',
    components: { Select2 },
    head() {
        return {
            bodyAttrs: {
                class: this.isOverflow ? 'overflow-hidden' : ''
            }
        }
    },
    data: () => ({
        couponForm: new Form({
            couponcode: "",
        }),
        checkoutForm: new Form({
            fullName: "",
            phoneNumber: "",
            district: "",
            area: "",
            courier: "",
            address: "",
            note: "",
            transaction_id: "",
            sender_number: "",
        }),
        districts: {},
        areas: {},
        alertcontent: {},
        customer: {},
        nameinvalid: "",
        phoneinvalid: "",
        addressinvalid: "",
        districtinvalid: "",
        areainvalid: "",
        btndisabled: false,
        isOverflow: '',
        customloader: false,
        paywarning: false,
    }),
    methods: {
        validOrnot() {
            this.checkoutForm.fullName != "" ? (this.nameinvalid = false) : (this.nameinvalid = true);
            this.checkoutForm.phoneNumber != "" ? (this.phoneinvalid = false) : (this.phoneinvalid = true);
            this.checkoutForm.district != "" ? (this.districtinvalid = false) : (this.districtinvalid = true);
            this.checkoutForm.area != "" ? (this.areainvalid = false) : (this.areainvalid = true);
            this.checkoutForm.address != "" ? (this.addressinvalid = false) : (this.addressinvalid = true);
        },
        loadData() {
            let area_id = "checkout";
            this.$axios.get("api/v1/customer/alert/" + area_id).then((response) => {
                this.alertcontent = response.data.alertcontent;
            });
            this.$axios.get("api/v1/districts").then((response) => {
                this.districts = response.data.districts;
            });
            this.$axios.get("/api/v1/customer/account", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then((response) => {
                    this.customer = response.data.customer;
                });
        },
        selectdist(event) {
            this.$axios.get("/api/v1/areas/" + this.checkoutForm.district).then((response) => {
                this.areas = response.data.areas;
            });
        },
        selectarea() {
            this.$axios.get("/api/v1/shipping/" + this.checkoutForm.area).then((response) => {
                if (this.cartItemCount > 0) {
                    let shippingfee = response.data.shipping.shippingfee;
                    let partialpay = response.data.shipping.partialpayment;

                    localStorage.setItem("shippingfee", shippingfee);
                    this.$store.dispatch("shippingfee");

                    const totalQuantity = this.$store.getters.cartItem.reduce((sum, item) => parseInt(sum) + parseInt(item.quantity), 0);
                    let partialpayment = partialpay * totalQuantity;

                    localStorage.setItem("partialpayment", partialpayment);
                    this.$store.dispatch("partialpayment");
                    $(".sundarban").addClass("hide");
                    this.checkoutForm.courier = "";

                    let paymentcharge = (this.partialpayment * 15) / 1000;
                    localStorage.setItem("paymentcharge", paymentcharge);
                    this.$store.dispatch("paymentcharge");


                } else {
                    this.$router.push({ path: "/" });
                    localStorage.removeItem("shippingfee");
                    localStorage.removeItem("discount");
                    localStorage.removeItem("partialpayment");
                    localStorage.removeItem("paymentcharge");
                    this.$store.dispatch("discount");
                    this.$store.dispatch("shippingfee");
                    this.$store.dispatch("getCartitems");
                    this.$store.dispatch("partialpayment");
                    this.$toast.error("Your shopping cart empty");
                }
            });
        },
        btnwarning() {
            if (this.checkoutForm.fullName && this.checkoutForm.phoneNumber && this.checkoutForm.district && this.checkoutForm.area && this.checkoutForm.address) {
                this.paywarning = true;
                this.isOverflow = true;
            } else {
                this.$toast.error('Opps!! Please fillup all required (*) field');
            }

        },
        closewarning() {
            this.paywarning = false;
            this.isOverflow = false;
        },
        async checkout() {
            if (this.$store.state.token && this.cartItemCount > 0) {
                this.customloader = true;
                this.isOverflow = true;
                this.btndisabled = true;
                const response = await this.$axios
                    .post("/api/v1/customer/order/save", this.checkoutForm, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            shippingfee: this.$store.state.shippingfee,
                            discount: this.$store.state.discount,
                            partialpayment: this.$store.state.partialpayment,
                            paymentcharge: this.$store.state.paymentcharge,
                        },
                    })
                    .then((response) => {
                        this.customloader = false;
                        this.isOverflow = false;
                        this.btndisabled = false;
                        if (response.data.status == true) {
                            this.$toast.success(
                                'Thanks!! Your order send success',
                            );
                            this.spinner = false;
                            localStorage.removeItem("shippingfee");
                            localStorage.removeItem("discount");
                            localStorage.removeItem("partialpayment");
                            localStorage.removeItem("paymentcharge");

                            this.$store.dispatch("discount");
                            this.$store.dispatch("shippingfee");
                            this.$store.dispatch("getCartitems");
                            this.$store.dispatch("partialpayment");
                            if (response.data.payment_url != '') {
                                window.location.href = response.data.payment_url;
                            }

                        } else if (response.data.status == "invalid") {
                            this.btndisabled = false;
                            this.$toast.error("Please check input field");
                        } else if (response.data.status == "stockfail") {
                            this.btndisabled = false;
                            this.paywarning = false;
                            this.isOverflow = false;
                            this.$toast.error("Order Faild, Product stock sold out");
                            this.$store.dispatch("RemoveToCart", { product: response.data.product, id: response.data.product.id });
                            localStorage.removeItem("shippingfee");
                            localStorage.removeItem("discount");
                            localStorage.removeItem("partialpayment");
                            localStorage.removeItem("paymentcharge");

                            this.$store.dispatch("discount");
                            this.$store.dispatch("shippingfee");
                            this.$store.dispatch("getCartitems");
                            this.$store.dispatch("partialpayment");
                            this.$router.push({ path: "/" });
                        } else {
                            this.$toast.error("Order place failed");
                        }
                    });
            } else {
                this.$router.push({ path: "/customer/login" });
            }
        },
        async coupon() {
            const response = await this.couponForm
                .post("/api/v1/customer/coupon-apply", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        cartamount: this.cartTotalPrice,
                    },
                })
                .then((response) => {
                    if (response.data.status == "success") {
                        let discount = response.data.amount;
                        localStorage.setItem("discount", discount);
                        this.$store.dispatch("discount");
                        this.$toast.success("Your coupon code accept");
                    } else if (response.data.status == "expaire") {
                        this.$toast.error("Your coupon code expaire");
                    } else if (response.data.status == "lowamount") {
                        this.$toast.error("Your purchase amount is low");
                    } else {
                        this.$toast.error("Your coupon code is invalid");
                    }
                });
        },

        bkashPay(partialpayment) {
            return parseFloat(parseFloat(partialpayment) + (partialpayment * .018)).toFixed(2);
        }

    },
    mounted() {
        localStorage.removeItem("shippingfee");
        localStorage.removeItem("partialpayment");
        this.$store.dispatch("shippingfee");
        this.$store.dispatch("discount");
        this.$store.dispatch("getCartitems");
        this.$store.dispatch("partialpayment");
        this.validOrnot();
        this.loadData();
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        cartItemCount() {
            return this.$store.getters.cartItemCount;
        },
        cartTotalPrice() {
            return this.$store.getters.cartTotalPrice;
        },
        shippingfee() {
            return this.$store.state.shippingfee;
        },
        discount() {
            return this.$store.state.discount;
        },
        partialpayment() {
            return this.$store.state.partialpayment;
        },
        paymentcharge() {
            return this.$store.state.paymentcharge;
        },
    },
};
</script>
