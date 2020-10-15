<template>
	<section class="players-section container d-flex justify-content-center align-items-center flex-column">

		<h2 class="page-title mb-5">
			<span class="highlight1 white-text">{{ $t('players-title') }}</span>
		</h2>
		<b-table striped hover :items="Object.values(subscriptions)" :fields="tableFields"></b-table>
	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapState } from 'vuex';

const Component = Vue.extend({
	name: 'event-players',
	computed: {
		tableFields() :object[] {
			return [
				{
					key: 'username',
					label: this.$t('username'),
					thClass: 'text-center',
					tdClass: 'main-info align-middle text-center',
					sortable: true,
				},
				{
					key: 'city',
					label: this.$t('city'),
					thClass: 'text-center',
					tdClass: 'align-middle text-center',
					sortable: true,
				},
			];
		},
		...mapState({
			subscriptions: 'subscriptions'
		}),
	}
});

export default Component;
</script>
