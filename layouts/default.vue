<template>
	<div>
		<header-area />
		<global-navi />
		<div id="main-contents-wrapper">
			<bread-crumb id="bread-crumb" />
			<nuxt />
		</div>
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
	border: 1px solid #3b8070;
	border-radius: 4px;
	color: #3b8070;
	display: inline-block;
	padding: 10px 30px;
	text-decoration: none;
}

.button--green:hover {
	background-color: #3b8070;
	color: #fff;
}

.button--grey {
	border: 1px solid #35495e;
	border-radius: 4px;
	color: #35495e;
	display: inline-block;
	margin-left: 15px;
	padding: 10px 30px;
	text-decoration: none;
}

.button--grey:hover {
	background-color: #35495e;
	color: #fff;
}

#main-contents-wrapper {
	background-color: #ececec;
	padding-bottom: 5%;
	padding-left: 5%;
	padding-right: 5%;
	padding-top: 2%;
}
</style>
