<template>
	<div>
		<main-header id="mainHeader" />
		<Nuxt />
		<main-footer id="mainFooter" />
	</div>
</template>

<script>
//TODO trovare come metterlo lang="ts" (head() non riconosciuto e problemi vari)
// https://github.com/nuxt/typescript/issues/28
import Vue from 'vue';

import MainHeader from '@/components/generic/Header.vue';
import MainFooter from '@/components/generic/Footer.vue';

import layoutDefaultStructure from './mixin/layoutDefaultStructure';

const Component = Vue.extend({
	mixins: [
		layoutDefaultStructure
	],
	components: {
		MainHeader,
		MainFooter
	},
});

export default Component;
</script>

<style lang="scss">
@import '~/assets/scss/main.scss';
</style>
