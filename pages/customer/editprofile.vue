<template>
    <div>
       
        <section class="customer-profile">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="account_bred">
                            <li>
                                <nuxt-link to="/"> <i class="fa fa-home"></i> </nuxt-link>
                            </li>
                            <li>/</li>
                            <li>
                                <nuxt-link to="/customer/account">Account</nuxt-link>
                            </li>
                            <li>/</li>
                            <li>
                                <nuxt-link to="/customer/editprofile">Profile Edit</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- breadcrumt -->
                <div class="row">
                    <div class="paddleft-120 col-lg-12 col-md-12 col-sm-4">
                        <div class="customer-profile bg_white">
                            <div class="row">
                                <div class="col-lg-9 col-md-9 col-sm-9">
                                    <div class="cprofile-details">
                                        <form @submit.prevent="profileUpdate" enctype="multipart/form-date">
                                            <div class="form-group">
                                                <label>Full Name</label>
                                                <input type="text" class="form-control" v-model="EditProfile.name=customer.name" name="name" />
                                                <div v-if="EditProfile.errors.has('name')" v-html="EditProfile.errors.get('name')" />
                                            </div>
                                            <div class="form-group">
                                                <label>Phone</label>
                                                <input type="text" class="form-control" name="mobile" v-model="EditProfile.mobile=customer.mobile" />
                                                <div v-if="EditProfile.errors.has('mobile')" v-html="EditProfile.errors.get('mobile')" />
                                            </div>
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input type="text" class="form-control" name="email" v-model="EditProfile.email=customer.email" />
                                                <div v-if="EditProfile.errors.has('email')" v-html="EditProfile.errors.get('email')" />
                                            </div>
                                            <div class="form-group">
                                                <label>Address</label>
                                                <textarea class="form-control" name="address" v-model="EditProfile.address=customer.address_line_1">{{customer.address_line_1}}</textarea>
                                            </div>
                                            <div class="form-group">
                                                <input type="submit" class="btn btn-success" value="Save Change" />
                                            </div>
                                        </form>
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
    import sidebar from "./sidebar";
    import Form from "vform";
    export default {
        middleware: 'authenticated',
        components: {
            sidebar,
        },
        data: () => ({
            customer: {},
            EditProfile: new Form({
                name: "",
                mobile: "",
                email: "",
                address: "",
            }),
            image: null,
        }),
        methods: {
            loadData() {
                
                this.$axios.get("/api/v1/customer/profile/edit?token=" + localStorage.getItem("token")).then((response) => {
                    this.customer = response.data.customer;
                });
            },
            onFileChange(e){
                this.image = e.target.files[0];
            },
            async profileUpdate () {
                 // file upload
                const fileConfig = {
                    headers: { 'Content-Type': 'multipart/form-data'
                  }
                }
                let formData = new FormData();
                 formData.append('image', this.image);
                 formData.append('name', this.EditProfile.name);
                 formData.append('mobile', this.EditProfile.mobile);
                 formData.append('address', this.EditProfile.address);
                 formData.append('image', this.EditProfile.image);
                 const response = await this.$axios.post('/api/v1/customer/profile/update',formData,{
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    fileConfig: fileConfig,
                  }
                }).then(response=>{
                if(response.data.status=='success'){
                     this.$toast.success("Your profile update successfully.");
                     this.$router.push({ path: "/customer/account" });
                }else{
                   this.$toast.error("Your data process something wrong");
                }
              })
            }
        },
        mounted() {
            this.loadData();
        },
        deactivated() {
            this.$destroy();
        },
    };
</script>
