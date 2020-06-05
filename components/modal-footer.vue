<template v-slot:modal-footer>
    <div class="w-100">              
      <b-button
        variant="primary"
        size="sm"
        class="float-right"
        @click="closeButtonClicked()"
      >
        閉じる
      </b-button>
    </div>
</template>
<!--

<template>
	<div>
		<template v-slot:modal-footer>
	        <div class="w-100">              
	          <b-button
	            variant="primary"
	            size="sm"
	            class="float-right"
	            @click="show=false"
	          >
	            閉じる
	          </b-button>
	        </div>
	    </template>
	</div>

</template>
-->

<script>

export default {  
// prettier-ignore
/* eslint-disable */


//props: ['show'], 

methods:{
	closeButtonClicked(){
		console.log("enter closeButtonClicked()");
		this.$emit('closeButtonClickedNotice');

	},


},


}


</script>


