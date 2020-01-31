<template>  
  <div class="col-12">
    
    <nav>
      <ul class="pagination d-flex rounded-flat justify-content-center pagination-primary">
        <li class="page-item" :class="{disabled: current_page-1<= 0}"><a class="page-link" @click.prevent="$emit('fetchPaging', current_page-1)" href=""><i class="mdi mdi-chevron-left"></i></a></li>
        
        <li v-for="page in pagingArr" v-if="page>0 && page<=paging.pages" :class="{active: page==current_page}" class="page-item ">
          <a @click.prevent="$emit('fetchPaging', page)" class="page-link" href="" tabindex="-1"> {{ page }} <span v-if=" page==current_page" class="sr-only">(current)</span> </a>
        </li>

        <li class="page-item" :class="{ disabled: current_page >= paging.pages-1 }"><a class="page-link" @click.prevent="$emit('fetchPaging', current_page+1)" href=""><i class="mdi mdi-chevron-right"></i></a></li>
      </ul>
      <button v-if="showCreate" @click.prevent="$emit('create')" class="btn btn-danger justify-content-end">Create</button>
    </nav>
    
  </div>     
  
   
</template>

<script>
  export default {
    props: {       
      paging: Object,
      showCreate: Boolean
    },

    computed: {
      current_page() {
				return this.paging.current_page
			},
			pagingArr() {
				if (this.current_page == 1) return [this.current_page, this.current_page + 1, this.current_page + 2];
				if (this.paging.pages == 1) return [this.current_page]; // when  u hv only 1 page
				if (this.paging.pages == 2) return [this.current_page, this.current_page + 1]; // when  u hv only 2 pages
				if (this.current_page == this.paging.pages) return [this.current_page - 2, this.current_page - 1, this
					.current_page
				];
				else return [this.current_page - 1, this.current_page, this.current_page + 1]
			},
    },

    methods: {
      
    }
  }
</script>


<style>

</style>