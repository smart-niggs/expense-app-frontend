<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div class="row w-100 mx-auto">
              <div class="col-lg-4 mx-auto">
                <div class="auto-form-wrapper">
                  <form action="#">
                    <div class="form-group">
                      <label class="label">Email</label>
                      <div class="input-group">
                        <input type="text" style="height:44px" v-model="email" class="form-control" placeholder="Email">
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-check-circle-outline"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="label">Password</label>
                      <div class="input-group">
                        <input type="password" style="height:44px" v-model="password" class="form-control" placeholder="*********">
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-check-circle-outline"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary submit-btn btn-block" :disabled="$v.$invalid || submitDisabled" @click.prevent="login">Login</button>
                      <!-- <router-link to="/dashboard"><button class="btn btn-primary submit-btn btn-block">Login</button></router-link> -->
                    </div>
                    
                    <div class="text-block text-center my-3">
                      <span>New User ?</span><router-link :to="'/signup'"><a class="" > SignUp</a></router-link>
                      <!-- <a href="javascript:void(0)" class="text-black text-small">Create new account</a> -->
                    </div>
                  </form>
                </div>
                <ul class="auth-footer">
                  <li>
                    <a href="#">Conditions</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                </ul>
                <p class="footer-text text-center">copyright Â© 2020 Expense App. All rights reserved.</p>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
      </div>
</template>


<script>
  import { toast } from '@/scripts/functions/'
  import { email, required, numeric, alpha, minValue, minLength, maxLength, sameAs, requiredUnless } from 'vuelidate/lib/validators';

   export default {

    data() {
      return {
        email: 'me@gg.com',
        password: 'password',
        // rememberMe: '',
        submitDisabled: false
      }
    },

    computed: {
            
    },

    methods: {
      login() {
        this.submitDisabled = true
        this.$store.dispatch('auth/login', { email: this.email, password: this.password })
          .then(res => {
						if (res && res.status==='success') {
							
							toast(this, res.message, 'success')
							toast(this, 'Redirecting to Homepage', 'primary')
							this.$router.push('dashboard');
						}		
						else {
							// toast(this, `User Not ${this.userEdit ? 'Modified': 'Created'}`, 'danger');
							toast(this, 'Error on Login!', 'danger');
						}				
					})
					.catch(err => {
						toast(this, err, 'danger');
						console.log('err: ' + err);
          })
          .finally(() => {
            this.submitDisabled = false
          });
      }
    },

    created() {
    },

    components: {
      // top_right_toast
    },
    validations: {
			email: { email, required },
			password: 	  { required },
    }
   }

</script>
<!--  -->

<style>

</style>
