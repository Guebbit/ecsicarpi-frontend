<template>
	<div class="container">
		<h1>HULLO {{loading}}</h1>
<p>
	{{$t("meta.title")}}
</p>
<pre>
{{event}}
</pre>
	</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

import axios from 'axios';


const Component = Vue.extend({
	async asyncData ({ params, error, payload, store }) {
		if(payload)
			return {
				event: payload,
			};
		return store.dispatch("getEvents").then(() => {
			return {
				event: Object.values(store.getters["getEvents"])
			};
		});
	},
	computed: {
		...mapGetters({
			loading: 'getAwait'
		}),
	},
	methods: {
		...mapActions({
			getEvents: 'getEvents'
		}),
	},
});

export default Component;
</script>
