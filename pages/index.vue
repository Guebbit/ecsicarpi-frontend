<template>
	<div id="landing-page">
		<hero-header
			:title="'ECSI Carpi'"
			:subtitle="'Tornei E-Sports dal Centro Sportivo Italiano'"
			:cover="{
				MediaChunk: {
					url: 'https://assets.guebbit.com/ecsicarpi/video/main-hero-sd.mp4',
					thumb800: 'https://assets.guebbit.com/ecsicarpi/images/fifa2020-1-thumb800.jpg',
					chunkType: 'video',
				},
				title: '',
				alt: '',
			}"
		>
			<div class="cssArrow1 secondary">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</hero-header>

		<section v-if="activeEvents.length > 0" class="event-active-section container d-flex justify-content-center align-items-center">
			<div class="w-100">
				<h3 class="text-center"><b class="white-text highlight1 secondary">EVENTI IN CORSO</b></h3>
				<div class="row">
					<div v-for="event in activeEvents"
						class="col-sm-12 col-md-6"
					>
						<b-link
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
				</div>
			</div>
		</section>
		<section class="event-list-section container d-flex justify-content-center align-items-center">
			<ul class="postList3 v2 w-100">
				<li class="post-title">
					<h4 class="list-title">
						{{ $t('pages.event-list.event-list-title') }}
						<font-awesome-icon :icon="['fas', 'calendar']" />
					</h4>
				</li>
				<event-list-card
					v-for="event in events"
					:key="event.id+'_list-card'"
					:start="event.data_start"
					:end="event.data_end"
					:image="getCover(event.id)"
					:title="event.title"
					:subtitle="event.subtitle"
					:url="'events/'+event.uri"
					:league_url="event.league ? 'leagues/'+event.league.uri : null"
					:price="parseInt(event.paywall)"
					:hashtags="event.array_hashtags"
				/>
			</ul>
		</section>

		<section-contacts />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import eventListCard from '@/components/index/eventListCard.vue';
import sectionContacts from '@/components/events/Contatti.vue';
import { lazyload, activator } from "@/assets/js/temporaryGuebbit2";
import { MediaChunk } from '@/interfaces';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCalendar);

const Component = Vue.extend({
	name: 'Landing-page',
	async asyncData ({ params, error, store }) {
		return store.dispatch("getEvents").then(() => {
			return{
				events: store.getters['getEvents'],
				activeEvents: store.getters['getEventsActive']
			};
		});
	},
	components: {
		sectionContacts,
		eventListCard,
		FontAwesomeIcon,
	},
	computed: {
		...mapGetters({
			loading: 'getAwait',
		}),
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getEvents: 'getEvents',
		}),
		getCover(id :string) :string {
			const cover :MediaChunk = this.$store.getters.getEventCover(id);
			if(!cover || !cover.hasOwnProperty('thumb800'))
				return '';
			return cover.thumb800;
		}
	},
	created(){
		this.setLoading([true, 'event']);
		this.getEvents().then(() => {
			this.setLoading([false, 'event']);
		});
	},
	mounted(){
		lazyload();
		activator();
	}
});

export default Component;
</script>

<style lang="scss">
$cssArrow1-speed: 1.5s;

@import '@/assets/scss/core';
@import '@/assets/scss/components/postlist3';
@import '@/assets/scss/components/cssarrow1';

#landing-page{
	margin-bottom: 50px;
	.cssArrow1{
		margin: 50px auto;
		transform: scale(1.5);
	}

	.contact-section{
		.social-wrapper{
			min-height: 10em;
		}
		.contact-info{
			margin-top: 60px;
			text-align: right;
			.contact-button{
				font-size: 1.2em;
				text-transform: uppercase;
				text-indent: 0.7em;
				font-weight: 600;
				margin: 0.5em;
				@include media-breakpoint-up(lg) {
					font-size: 2em;
				}
			}
		}
	}
}
</style>
