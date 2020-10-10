<template>
	<div id="landing-page" class="container">

		<div class="mt-100 mb-100">
			<h1 class="text-center">ECSI Carpi COMING SOON</h1>
			<br />
			<h3 class="text-center text-secondary"><b>EVENTI IN CORSO</b></h3>
		</div>

		<b-link
			v-for="event in events"
			:key="'link_'+event.id"
			:to="'/events/'+event.uri"
			class="event-link"
		>
			<b-card
			 	:title="event.title"
				:sub-title="event.subtitle"
				:img-src="event.media[0].media.thumb800"
				img-top
				class="mt-50"
			/>
		</b-link>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

const Component = Vue.extend({
	name: 'Landing-page',
	computed: {
		...mapState({
			events: 'events'
		}),
		...mapGetters({
			loading: 'getAwait',
		}),
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getEvents: 'getEvents',
		}),
	},
	created(){
		this.setLoading([true, 'event']);
		this.getEvents().then(() => {
			this.setLoading([false, 'event']);
		});
	}
});

export default Component;
</script>

<style lang="scss">
#landing-page{
	margin-bottom: 50px;
	.event-link{
		text-decoration: none !important;
	}
}


</style>
