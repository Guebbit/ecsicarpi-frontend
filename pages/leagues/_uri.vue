<template>
	<div id="league-details-page">
		<hero-header
			:title="(league.id !== '3' && league.id !== '4') ? league.name : ''"
			:cover="coverGallery.length > 0 ? coverGallery[0] : null"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapState } from 'vuex';

import { leagueMap, mediaMap } from '@/interfaces';

import HeroHeader from '@/components/generic/HeroHeader.vue';

const Component = Vue.extend({
	name: 'League-details-page',
	layout: 'leagueDetails',
	async asyncData ({ params, error, payload, store }) {
		if(payload)
			return {
				league: payload,
			};
		return store.dispatch("getLeaguesByUri", params.uri).then(() => {
			let leagueData :leagueMap = store.getters["getLeaguesByParams"]([['uri',params.uri]]);
			if(!leagueData || leagueData.length < 1)
				return{
					league: false	//in created() fa redirect alla home
				}
			return {
				league: leagueData[0] as leagueMap
			};
		});
	},
	components: {
		HeroHeader,
	},
	computed:{
		...mapGetters({
			loading: 'getAwait'
		}),
		...mapState({
			subscriptions: 'subscriptions'
		}),

		uri() :string {
			return this.$route.params.uri;
		},

		mediaGallery() :mediaMap[] {
			//@ts-ignore
			if(!this.league)
				return [];
			//@ts-ignore
			return Object.values(this.$store.getters.getLeagueGallery(this.league.id));
		},
		coverGallery() :mediaMap[] {
			//@ts-ignore
			return this.mediaGallery.filter(({ role } :mediaMap) => {
				return role === 'cover';
			});
		},
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getLeagues: 'getLeaguesByUri',
		}),
	},
	created() {
		//TODO bug da correggere, solo in produzione non mostra
		this.$router.push("/");
	},
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';
</style>
