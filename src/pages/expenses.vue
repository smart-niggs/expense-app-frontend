<template>
  <div>
      <div class="card">
        <div class="card-body">
						<h4 class="card-title">{{ "Expenses" | capitalize }} [ {{ paging.total }} ]</h4>
						
          <div class="row">
            <div class="col-12 table-responsive">
              <table id="order-listing" class="table">
                <thead>
                  <tr>
                    <th v-for="header in tableHeader" :key="header">{{ header }}</th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, expenseIndex) in expenses.expenseList" :key="expenseIndex">

                    <td v-for="(column, index) in tableColumns" :class="{'text-right': column==='value' || column==='vat'}" :key="index" v-if="hasValue(item, column, expenseIndex)">
										{{ item[column] }}										

										<span class="" v-if="column === 'Value'" >{{ item.value | currency(false) }} </span>
										<span class="" v-if="column === 'Vat'" >{{ item.vat | currency(false) }} </span>
										<span class="" v-if="column === 'Date'" >{{ item.date | date  }} </span>
										
                    </td>
                  </tr>                 
                </tbody>
              </table>
						</div>

						<pagination @fetchPaging="fetchPaging" :paging="paging" :showCreate="true" @create="create()"></pagination>
          </div>
        </div>
      </div>
		<!-- </div> -->
		
		<create_expense ></create_expense>

  </div>
</template>


<script>		
	import { create_expense, pagination } from '@/components/';
	
	export default {

		props: { 
			
		},

		computed: {	
			expenses() {
				return this.$store.getters["expenses/getExpenses"];
			},
			
			paging() {
				return this.expenses.paging
			},		
		},

		data() {
			return {
				userEdit: false,
				tableHeader: ["Sn", "Value", "Date", "VAT(%)", "Reason" ],
				tableColumns: ["sn", "Value", "Date", "Vat", "reason" ],
					
			}
		},

		methods: {
			
			create() {
				this.$bvModal.show('create_expense')
				this.$store.dispatch('fetchEuroRate');
			},
			fetchPaging(page) {
				console.log('page: ' + page);
				if (page == 0 || page == this.current_page || page > this.paging.pages) return;
				this.$store.dispatch('expenses/fetchExpenses', { page } );
			},
			
			// unsetEdit() { this.userEdit = false; },
			
			hasValue(item, column, index) {
				if (column === 'sn') {
					item['sn'] = index + 1;
					return true;
				}
				return item[column] !== "undefined";
			}
		},
		
		components: {
			create_expense, pagination
		},

		created() {
			this.$store.dispatch('expenses/fetchExpenses');
		}
	}
</script>


<style>

</style>