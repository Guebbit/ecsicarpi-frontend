<template>
	<div class="text-center">Forbidden</div>
</template>

<script lang="ts">
import Vue from 'vue'

const Component = Vue.extend({
	name: 'events-list-page',
	created() {
		this.$router.push("/");
	}
});

export default Component;
</script>
