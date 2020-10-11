<template>
	<section class="players-section container d-flex justify-content-center align-items-center">
		<b-table striped hover :items="items" :fields="fields"></b-table>
	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';


const Component = Vue.extend({
	name: 'event-players',
	data() {
		return {
			fields: ['first_name', 'last_name', 'age'],
			items: [
				{ age: 40, first_name: 'tizio', last_name: 'caio' },
				{ age: 21, first_name: 'lorem', last_name: 'ipsum' },
				{ age: 89, first_name: 'aaaaaa', last_name: 'bbbbbbb' },
			]
		}
    }
});

export default Component;
</script>
