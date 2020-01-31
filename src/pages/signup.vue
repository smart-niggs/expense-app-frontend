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
                        <input type="email" style="height:44px" v-model="email" class="form-control" :class="{invalid: $v.email.$error}" placeholder="" @blur="$v.email.$touch()">
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-check-circle-outline"></i>
                          </span>
                        </div>
                      </div>
                      <p v-if="$v.email.$error" class="validatorMsg">Enter a valid email address</p>
                    </div>

                    <div class="form-group">
                      <label class="label">Password</label>
                      <div class="input-group">
                        <input type="password" style="height:44px" v-model="password" class="form-control" placeholder="" @blur="$v.password.$touch()">
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-check-circle-outline"></i>
                          </span>
                        </div>
                      </div>
                      <p v-if="!$v.password.minLen" class="validatorMsg">Password must not be less than
                      {{ $v.password.$params.minLen.min }} xters</p>
                    </div>

                    <div class="form-group">
                      <label class="label">Confirm Password</label>
                      <div class="input-group">
                        <input type="password" style="height:44px" v-model="confirmPassword" class="form-control" placeholder="" @blur="$v.confirmPassword.$touch()">
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="mdi mdi-check-circle-outline"></i>
                          </span>
                        </div>
                      </div>
                      <p v-if="$v.confirmPassword.$error" class="validatorMsg">Passwords must be equal</p>
                    </div>

                    <div class="form-group">
                      <button type="button" class="btn btn-primary btn-sm" :disabled="$v.$invalid || submitDisabled" @click="createUser">SignUp</button>
                      <!-- <router-link to="/dashboard"><button class="btn btn-primary submit-btn btn-block">Login</button></router-link> -->
                    </div>
<<<<<<< HEAD
                    
=======
                    <div class="form-group d-flex justify-content-between">
                      <!-- <div class="form-check form-check-flat mt-0">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" checked> Keep me signed in
                        </label>
                      </div> -->
                      <!-- <a href="javascript:void(0)" class="text-small forgot-password text-black">Forgot Password</a> -->
                    </div>
                    <!-- <div class="form-group">
                      <button class="btn btn-block g-login" hr>
                        <img class="mr-3" src="@/assets/images/file-icons/icon-google.svg" alt="">Log in with Google</button>
                    </div> -->
>>>>>>> staging
                    <div class="text-block text-center my-3">
                      <span>Already a User ?</span><router-link :to="'/'"><a class="" > Login</a></router-link>
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
        // firstname: '',
				// lastname: '',
				email: '',
        password: '',
        confirmPassword: '',

        submitDisabled: false
      }
    },

    computed: {       
    },

    methods: {
      createUser() {
        this.submitDisabled = true
				const { email, password, confirmPassword } = this;
				const formData = { email, password, confirmPassword };
				// if (!formData.dob) console.log('date!!')
				
				this.$store.dispatch('auth/register', formData ) // intentionally using 1 as current page to load the 1st page and see the creaeted user
					.then(res => {
            console.log('res: ' + JSON.stringify(res));
						if (res && res.status==='success') {
							
							toast(this, res.message, 'success')
							toast(this, 'Redirecting to Login', 'primary')
							// this.$router.push('login');
						}		
						else {
              
							toast(this, 'Registration Error, enter a valid unique email', 'danger');
						}				
					})
					.catch(err => {
						toast(this, err, 'danger');
						console.log('err: ' + err);
          })
          .finally(() => {
            this.submitDisabled = false
          });
			},
      
    },

    created() {
    },

   
    
    components: {
      // top_right_toast
    },
    validations: {
			email: { email, required },
			// firstname: 	  { alpha, required, minLen: minLength(2)},
			// lastname: 	  { alpha, required, minLen: minLength(2) },
      password: 	  { required, minLen: minLength(6) },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
		},
  }

</script>
<!--  -->

<style>
  .validatorMsg {
    color: red;
    font-size: 11px
  }
  .invalid {
    /* /* border-color: red/ */
  }
  button:disabled, button[disabled] {
    cursor: not-allowed
  }
</style>
