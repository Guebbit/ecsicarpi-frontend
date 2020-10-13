<template>
	<div id="landing-page" class="container">

		<div class="mt-100 mb-100">
			<h1 class="text-center"><span class="white-text highlight1">ECSI Carpi COMING SOON</span></h1>
			<br />
			<h3 class="text-center"><b class="white-text highlight1 secondary">EVENTI IN CORSO</b></h3>
		</div>

		<b-link
			v-for="event in reorderedEvents"
			:key="'link_'+event.id"
			:to="'/events/'+event.uri"
			class="event-link"
		>
			<b-card
			 	:title="event.title"
				:sub-title="event.subtitle"
				:img-src="getCover(event.id)"
				img-top
				class="mt-50"
			/>
		</b-link>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import { mediaMap, eventMap } from '@/interfaces';

const Component = Vue.extend({
	name: 'Landing-page',
	computed: {
		...mapState({
			events: 'events'
		}),
		...mapGetters({
			loading: 'getAwait',
		}),
		reorderedEvents() :eventMap[] {
			//@ts-ignore TODO sort con le date
			return Object.values(this.events).reverse();
		}
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getEvents: 'getEvents',
		}),
		getCover(id :string) :string {
			let gallery :mediaMap[];
			gallery = Object.values(this.$store.getters.getEventGallery(id))
			if(gallery.length < 1)
				return '';
			gallery = gallery.filter(({ role } :mediaMap) => {
				return role === 'cover';
			});
			if(gallery.length < 1)
				return '';
			return gallery[0].MediaChunk.thumb800;
		}
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
