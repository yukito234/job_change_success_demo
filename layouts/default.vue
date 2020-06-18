<template>
	<div>
		<header-area />
		<global-navi />
		<div id="main-contents-wrapper">
			<bread-crumb id="bread-crumb" />
			<nuxt />
		</div>
		<!--
		<bread-crumb id="bread-crumb" />
		<nuxt />
		-->
	</div>
</template>

<script>
import globalNavi from "~/components/global-navi.vue";
import headerArea from "~/components/header-area.vue";
import breaCrumb from "~/components/bread-crumb.vue";

export default {
	components: {
		"global-navi": globalNavi,
		"header-area": headerArea,
		"bread-crumb": breaCrumb,
	},
};
</script>

<style>
html {
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"Helvetica Neue", Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}

.button--green {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #3b8070;
	color: #3b8070;
	text-decoration: none;
	padding: 10px 30px;
}

.button--green:hover {
	color: #fff;
	background-color: #3b8070;
}

.button--grey {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #35495e;
	color: #35495e;
	text-decoration: none;
	padding: 10px 30px;
	margin-left: 15px;
}

.button--grey:hover {
	color: #fff;
	background-color: #35495e;
}

#bread-crumb {
}
/* 素材
margin-left: 5%;
margin-right: 5%;
width: 80%;
margin-top: 16px;
*/
#main-contents-wrapper {
	padding-top: 2%;
	padding-bottom: 5%;
	padding-left: 5%;
	padding-right: 5%;
	background-color: #ececec;
}
/* 素材
padding: 5%;
*/
</style>
