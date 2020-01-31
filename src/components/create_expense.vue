<template>
  <b-modal id="create_expense" hide-backdrop content-class="shadow" hide-footer>
    <template v-slot:modal-title>Create Expense</template>
    <!-- <div> -->

    <div class="d-block">

      <form class="forms-sample" @submit.prevent="createExpense">
      
        <div class="form-row">
        
          <div class="form-group col-md-6">
            <label for="amt_string" :class="{invalid: $v.amt_string.$error}">Value/Amount </label>
            <input type="text" id="amt_string" class="form-control" :class="{invalid: $v.amt_string.$error}"  v-model="amt_string" @blur="$v.amt_string.$touch()">
            <p v-if="$v.amt_string.$error || $v.value.$error || showAmtError" class="validatorMsg">Please Enter a valid Amount</p>
            <!-- <p v-if="showAmtError" class="validatorMsg">Please Enter a valid Amount</p> -->
          </div>
          <div class="form-group col-md-4">
						<label>VAT(£) - 20%</label>
            <input type="text" id="vat" class="form-control" disabled :value="vat | text_truncate(25)">
						<!-- <span><i class="badge badge-pill badge-success">{{ vat }}</i></span> -->
          </div>
        </div>
        <div class="form-row" v-if="eur">
        
          <div class="form-group col-md-6">
						<label>Pounds(£) Equivalent</label>
            <input type="text" id="value" class="form-control" disabled :value="value">
						<!-- <span><i class="badge badge-pill badge-success">{{ vat }}</i></span> -->
          </div>
        </div>

        <div class="form-group col-md-10">
          <label for="reason">Reason</label>
					<textarea v-model="reason" rows="6" class="form-control" id="reason" ></textarea>
					<p v-if="$v.reason.$error" class="validatorMsg">This field is compulsory</p>
        </div>

      </form>

    </div>

    <!-- </div> -->
    <div class="float-left">
      <button class="btn btn-light" @click="$bvModal.hide('create_expense')">Cancel</button>
      <button type="submit" class="btn btn-success mr-2" :disabled="$v.$invalid || submitDisabled" @click="createExpense">Create Expense</button>
    </div>
  </b-modal>
</template>

<script>
	import { toast } from '@/scripts/functions/'
	import { required, numeric, min, minValue } from 'vuelidate/lib/validators';

	export default {
		props: {
		},

		methods: {
			createExpense() {
				this.submitDisabled = true
				
				const formData = (({ value, reason, vat, userId }) => ({ value, reason, vat, userId }))(this);
				
				this.$store.dispatch('expenses/createExpense', formData) // intentionally using 1 as current page to load the 1st page and see the creaeted expense
					.then(res => {
						if (res) {
							toast(this, res.message, 'success')
							this.$bvModal.hide('create_expense');
						}		
						else {
							toast(this, "Error processing request", 'danger');
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

		data() {
			return {
				submitDisabled: false,
				showAmtError: false,


				value: null,
				amt_string: '',
				eur: false,
				// vat: this.value/5,
				reason: '',
			}
		},

		computed: {
			userId() {
				return this.$store.state.userId;
			},
			rate() {
				return this.$store.state.rate
			},
			vat() {
				return this.value/5
			}
		},

		watch: {
			// 3,000 EUR
			amt_string: function (val) {
				this.showAmtError = false;	// not a mistake

				val = val.replace(/,/g, '')
				const eur = val.slice(-3).trim();
				// console.log('eur: ' + eur);
				let amt = 0;
				 
				
				if (eur.toUpperCase() === 'EUR') {	// converting both to UPPERcase makes a gud case 4 comparison, proven!
					this.eur = true;
					amt = parseInt(val.slice(0, -3).trim(), 10) // only trim by 3 when Euro sign is present!
					// console.log('amt:  --eur ' + amt);

					if(!isNaN(amt)) {
						// perform convertion via APIs
						this.value = this.value * this.rate
					}
					else this.showAmtError = true
					return
				}
				else {
					// amt = parseInt(10, val.trim());
					this.eur = false;
					amt = parseInt(val.trim(), 10);
					// console.log('val: ' + val);
					// console.log('amt -no-eur: ' + amt);
					console.log('typeof(amt): ' + typeof(amt));

					if(!isNaN(amt)) this.value = amt;
					else this.showAmtError = true

					return
				}
			}
		},

		created () {			
			this.$store.dispatch('fetchExRate');
		},

		validations: {
			amt_string: { required },
			value: 	  { required  },	//value is already numeric from parseInt conversion
			reason: 	{ required },
		},
	}


</script>


<style>
	.validatorMsg {
		color: red;
		font-size: 11px
	}
	.invalid {
		/* border-color: red */
	}
	button:disabled, button[disabled] {
		cursor: not-allowed
	}
</style>