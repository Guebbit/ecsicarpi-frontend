<template>
	<section class="subscription-section container d-flex justify-content-center flex-column">
		<page-title
			:title="'ISCRIVITI!'"
		/>
		<h1 class="text-center">form iscrizione {{price}}</h1>
	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import pageTitle from '@/components/generic/elementBallTitle.vue';

const Component = Vue.extend({
	name: 'event-paywall-subscription',
	components: {
		pageTitle,
	},
	props: {
		price: {
			type: String,
			default: () => {
				return "0";
			}
		} as PropOptions<string>,
	}
});

export default Component;
</script>
