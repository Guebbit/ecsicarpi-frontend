<template>
	<footer class="simpleFooter1">
		<div class="footer-copyright center-align">
			<a href="https://guebbit.com/" class="url" target="_blank">
				Made by <span class="flow-text">Guebbit</span>
				<img :src="require('@/assets/svg/guebbit-logo-simple.svg')" class="logo"/>
			</a>
		</div>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue';

const Component = Vue.extend({
	name: 'MainFooter'
});

export default Component;
</script>
