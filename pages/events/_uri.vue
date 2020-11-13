<template>
	<div id="event-details-page"
		:class="{
			'event-ended': ended,
			'event-active': active,
			'event-comingsoon': comingsoon
		}"
	>
		<hero-header
			:title="(event.id !== '3' && event.id !== '4') ? event.title : ''"
			:subtitle="(event.id !== '3' && event.id !== '4') ? event.subtitle : ''"
			:cover="coverGallery.length > 0 ? coverGallery[0] : null"
		>
			<b-link v-if="!ended" href="#subscription" class="cta-button colorButton1 call-to-action-wrapper">
				{{ $t("subscribe") }}!
			</b-link>
		</hero-header>
		<section class="first-section container d-flex justify-content-center align-items-center">
			<div class="w-100">
				<section-timer
					:start="event.data_start"
					:end="event.data_end"
				/>
				<div class="hashtag-wrapper d-flex justify-content-around flex-wrap">
					<a :href="'#todopage_'+hashtag" v-for="hashtag in event.array_hashtags">{{ hashtag }}</a>
				</div>
				<div class="d-flex justify-content-center">
					<div class="platform-card" v-for="platform in event.platforms">
						<img v-if="platform.MediaChunk.thumbnail"
							:src="platform.MediaChunk.thumb100"
							:data-src="platform.MediaChunk.thumb800"
							:title="platform.title ? platform.title : platform.name"
							:alt="platform.alt"
						/>
						<img v-else
							:src="platform.MediaChunk.thumb800"
							:title="platform.title ? platform.title : platform.name"
							:alt="platform.alt"
						/>
						<p class="page-description text-center mt-4"><b class="highlight1 text-white">{{ platform.name }}</b></p>
					</div>
				</div>
			</div>
		</section>


		<section class="info-panels">
			<info-panel
				shadow
				:title = "$t('pages.temp.infopanel-1-title')"
				:text = "$t('pages.temp.infopanel-1-text')"
				:image = "'/images/logotipo-ecsi.png'"
			/>
			<info-panel
				shadow
				inverted
				:title = "$t('pages.temp.infopanel-2-title')"
				:text = "$t('pages.temp.infopanel-2-text')"
				:image = "'/images/generic/premi-1.png'"
			/>
		</section>

		<template v-if="!ended">
			<section-paywall-subscription
				v-if="event.paywall"
				:event_id = "event.id"
				:event_name = "event.title"
				:event_price="event.paywall"
				:arrayUrls="event.array_urls"
			/>
			<section-free-subscription
				v-else
				:event_name = "event.title"
				:arrayUrls="event.array_urls"
			/>
		</template>
		<section v-else class="blogpage1 d-flex justify-content-center flex-column">
			<h2 class="page-title text-white mb-5">
				<span class="highlight1">{{ $t('pages.event-details.subscription-event-ended-title') }}</span>
			</h2>
			<!-- TODO fare meglio -->
			<p class="page-subtitle text-center">Purtroppo l'evento è concluso, ma rimani aggiornato con i nuovi tornei:</p>
			<b-button to="/events" style="max-width: 400px; margin: 0 auto">Scopri di più</b-button>
			<article
				v-if="event.WYSIWYG_post && event.WYSIWYG_post.length > 0"
				class="blog-panel container"
				v-html="event.WYSIWYG_post"
			/>
		</section>


		<section-contacts />

		<section class="blogpage1" v-if="event.WYSIWYG_pre && event.WYSIWYG_pre.length > 0">
			<article
				class="blog-panel container"
				v-html="event.WYSIWYG_pre"
			/>
		</section>

		<section-players
			 v-if="Object.values(subscriptions).length > 10"
		/>

		<section id="rules" class="blogpage1"
			v-if="(event.WYSIWYG_rules && event.WYSIWYG_rules.length > 0) || (event.WYSIWYG_gamerules && event.WYSIWYG_gamerules.length > 0)"
		>
			<h2 class="page-title mb-50">
				<span class="highlight1 white-text">{{ $t('rule-book') }}</span>
			</h2>
			<article
				v-if="event.WYSIWYG_rules && event.WYSIWYG_rules.length > 0"
				class="blog-panel container"
				v-html="event.WYSIWYG_rules"
			/>
			<article
				v-if="event.WYSIWYG_gamerules && event.WYSIWYG_gamerules.length > 0"
				class="blog-panel container"
				v-html="event.WYSIWYG_gamerules"
			/>
		</section>

		<section-collab
			:sponsors = "sponsorList"
			:collaborators = "collabList"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapState } from 'vuex';
import { eventMap, mediaMap, partnerMap } from '@/interfaces';

import axios from 'axios';
import { lazyload, activator, intersectionHelper } from "@/assets/js/temporaryGuebbit2";

import HeroHeader from '@/components/generic/HeroHeader.vue';
import sectionTimer from '@/components/events/Timer.vue';
import infoPanel from '@/components/events/PrimaryInfo.vue';
import sectionContacts from '@/components/events/Contatti.vue';
import sectionFreeSubscription from '@/components/events/IscrizioneGratuita.vue';
import sectionPaywallSubscription from '@/components/events/IscrizionePagamento.vue';
import sectionPlayers from '@/components/events/Players.vue';
import sectionCollab from '@/components/events/Collab.vue';

const Component = Vue.extend({
	name: 'Event-details-page',
	layout: 'eventDetails',
	async asyncData ({ params, error, payload, store }) {
		if(payload)
			return {
				event: payload,
			};
		return store.dispatch("getEventsByUri", params.uri).then(() => {
			let eventData :eventMap = store.getters["getEventsByParams"]([['uri',params.uri]]);
			if(!eventData || eventData.length < 1)
				return{
					event: false	//in created() fa redirect alla home
				}
			return {
				event: eventData[0] as eventMap
			};
		});
	},
	components: {
		HeroHeader,
		sectionTimer,
		infoPanel,
		sectionContacts,
		sectionFreeSubscription,
		sectionPaywallSubscription,
		sectionPlayers,
		sectionCollab,
	},
	computed: {
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
			if(!this.event)
				return [];
			//@ts-ignore
			return Object.values(this.$store.getters.getEventGallery(this.event.id));
		},
		coverGallery() :mediaMap[] {
			//@ts-ignore
			return this.mediaGallery.filter(({ role } :mediaMap) => {
				return role === 'cover';
			});
		},


		todaytimestamp() :number {
			return Math.floor((new Date()).getTime() / 1000);
		},
		startTimestamp() :number {
			//@ts-ignore
			if(!this.event || !this.event.data_start)
				return 0;
			//@ts-ignore
			return Math.floor((new Date(this.event.data_start)).getTime() / 1000);
		},
		endTimestamp() :number {
			//@ts-ignore
			if(!this.event || !this.event.data_end)
				return this.startTimestamp;
			//@ts-ignore
			return Math.floor((new Date(this.event.data_end)).getTime() / 1000);
		},

		sponsorList() :partnerMap[] {
			let sponsorList :partnerMap[];
			//@ts-ignore
			if(!this.event)
				return [];
			//@ts-ignore
			sponsorList = Object.values(this.event.partners).filter(({ role } :partnerMap) => {
				return role === 'sponsor';
			});
			sponsorList.unshift({
				"id": "1",
				"name": "CSI Carpi",
				"url": "http://www.csicarpi.it/",
				"role": "sponsor",
				"MediaChunk": {
				  "url": "https://assets.guebbit.com/ecsicarpi/images/logo-csi.png",
				  "thumb800": "",
				  "thumb100": "",
				  "chunkType": "image"
				},
				"alt": "",
				"title": ""
			});
			return sponsorList;
		},
		collabList() :partnerMap[] {
			//@ts-ignore
			if(!this.event)
				return [];
			//@ts-ignore
			return Object.values(this.event.partners).filter(({ role } :partnerMap) => {
				return role === 'collab';
			});
		},

		comingsoon() :boolean {
			//@ts-ignore
			return this.startTimestamp >= this.todaytimestamp;
		},
		active() :boolean {
			//@ts-ignore
			return this.startTimestamp <= this.todaytimestamp && this.todaytimestamp <= this.endTimestamp;
		},
		ended() :boolean {
			//@ts-ignore
			return this.endTimestamp <= this.todaytimestamp;
		},
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getEvent: 'getEventsByUri',
			getSubscriptions: 'getSubscriptions',
		}),
	},
	mounted(){
		lazyload();
		activator();
		intersectionHelper(document.querySelectorAll('.blog-section'),{
			threshold: 1,
			intersectingCallback: function(entry){
				entry.classList.add("active");
				return true;
			},
			notIntersectingCallback: function(entry){
				entry.classList.remove("active");
				return true;
			}
		})


		this.setLoading([true, 'event']);
		this.getEvent(this.uri)
			.then(() => {
				//@ts-ignore
				if(!this.event)
					this.$router.push('/');
				//@ts-ignore
				return this.getSubscriptions(this.event.id);
			})
			.then(() => {
				this.setLoading([false, 'event']);
			});
	},
});

export default Component;
</script>


<style lang="scss">
$cssArrow1-speed: 1.5s;

@import '@/assets/scss/core';
@import '@/assets/scss/components/colorbutton1';
@import '@/assets/scss/components/blogpage1';
@import '@/assets/scss/components/csshake1';
@import '@/assets/scss/components/cssarrow1';

#event-details-page{
	margin-bottom: 50px;
	.heroPanel2{
		overflow: visible;
		margin-bottom: 150px;
		.call-to-action-wrapper{
			margin-top: 75px;
			margin-bottom: -75px;
			text-transform: uppercase;
		}
	}
	.cta-button{
		display: block;
		text-decoration: none !important;
	}
	.first-section{
		.count-title{
			margin-bottom: 1em;
			font-weight: 700;
			padding-top: 0.5em;
			font-size: 3em;
			text-align: center;
			.mobile-screen{
				display: block;
				margin: 0 auto;
				@include media-breakpoint-up(lg) {
					display: none;
				}
			}
			.large-screen{
				margin: 0 12px;
				@include media-breakpoint-down(lg) {
					display: none;
				}
			}
			.big{
				font-size: 1.5em;
			}
		}
		.year-label{
			font-size: 3em;
		}
		.hashtag-wrapper{
			padding-bottom: 60px;
			text-align: center;
			a{
				font-size: 3em;
				color: inherit;
				text-decoration: none;
				&:before{
					content: "#";
					color: $secondary-color;
					font-size: 1.5em;
					margin-right: 0.1em;
				    vertical-align: sub;
				}
				&:hover{
					color: $primary-color;
					transition: color 0.2s;
				}
				&:nth-child(odd){
					&:before{
						color: $primary-color;
					}
					&:hover{
						color: $secondary-color;
						transition: color 0.2s;
					}
				}
			}
		}
		.platform-card{
			margin: 24px;
			img{
				max-height: 300px;
				max-width: 300px;
			}
		}
	}

	.info-panels{
		.cardPanel4{
			margin-top: 60px;
			margin-bottom: 60px;
		}
		.card-title{
			font-size: 2.5em;
			& + p{
				font-size: 1.4em;
			}
		}
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

	.subscription-section{
		.card{
			.card-header{
				font-size: 1.5em;
				text-transform: uppercase;
			}
			.card-text{
				font-size: 1.2em;
			}
		}
		.to-right{
			transform: rotate(270deg);
			margin-right: 1em;
		}
		.to-left{
			transform: rotate(90deg);
			margin-left: 1em;
		}
		.ballTitle{
			text-transform: uppercase;
		}
		.battlefy-wrapper{
			min-height: 10em;
		}
	}

	.section-collabs{
		.sponsorPanel{
			padding: 24px;
		}
	}

	//TODO fare una versione generica per stylare le WYSIWYG
	.blog-section{
		ul{
			& > li{
				position:relative;
				list-style:none;
				padding:0;
				margin: 0 0 0.7em 0;
				padding-left: 2em;
				line-height: 1.2;
				&:before{
					content: '';
					@include builder_abscenter-y;
					left: 0;
					speak: none;
					height: 0.75em;
					width: 0.75em;
					border-radius: 50%;
					background-color: $primary-color;
					transition: width 0.2s, height 0.2s, background-color 0.2s;
				}
				&.active,
				&:hover{
					&:before{
						background-color: $secondary-color;
						height: 1em;
						width: 1em;
					}
				}
			}
		}
	}
}




</style>
