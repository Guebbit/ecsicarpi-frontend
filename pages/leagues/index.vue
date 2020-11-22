<template>
	<div class="text-center">Forbidden</div>
</template>

<script lang="ts">
import Vue from 'vue'

const Component = Vue.extend({
	name: 'leagues-list-page',
	beforeRouteEnter (to, from, next) {
		next("/");
	},
});

export default Component;
</script>
