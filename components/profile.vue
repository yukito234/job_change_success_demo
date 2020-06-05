<template>  
	<div>
    <!-- eslint-disable --><!-- prettier-ignore -->
		<h2>{{ getProfile.nick_name }}さんのプロフィール</h2>    
      
      <b-card no-body  style="max-width: 540px;">
        <b-row >
          <b-col md="6">
            
            <b-img :src="getProfile.image_url" alt="" class="profileimage"></b-img>
          </b-col>
          <b-col md="6">
            
            <b-card-body :title="getProfile.nick_name">

              
              <b-card-text>
                {{getProfile.self_introduction}}
                
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */

export default { 

computed:{
	 getProfile(){
      return this.$store.getters['sessionStorageParameter/getClickedProfileData'];

    },


},


}



</script>

<style scoped>
/* prettier-ignore */
.profileimage{
  width: 250px;
}


</style>