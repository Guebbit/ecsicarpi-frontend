<template>
	<div id="event-details-page"
		:class="{
			'event-ended': ended,
			'event-active': active,
			'event-comingsoon': comingsoon
		}"
	>
		<hero-header
			:title="event.title"
			:subtitle="event.subtitle"
			:cover="coverGallery.length > 0 ? coverGallery[0] : null"
		>
		<div class="colorButton1 call-to-action-wrapper">
			{{ $t("subscribe") }}!
		</div>

		</hero-header>

		<div class="container hashtag-wrapper d-flex justify-content-center align-items-center">
			<div class="w-100">
				<section-timer
					v-if="comingsoon"
					:start="event.data_start"
					:end="event.data_end"
				/>
				<div class="d-flex justify-content-around flex-wrap">
					<a href="#todo" v-for="hashtag in event.array_hashtags">{{ hashtag }}</a>
				</div>
			</div>
		</div>

		<section class="info-panels">
			<info-panel
				shadow
				:title = "'Lorem ipsum dolor sit amet'"
				:text = "'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'"
				:image = "'https://placehold.it/1280x720'"
			/>
			<info-panel
				shadow
				inverted
				:title = "'Lorem ipsum dolor sit amet'"
				:text = "'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'"
				:image = "'https://placehold.it/1280x720'"
			/>
		</section>


		<section-contacts

		/>

		<section-paywall-subscription
			v-if="event.paywall"
			:price="event.paywall"
		/>
		<section-free-subscription
			v-else
			:arrayUrls="event.array_urls"
		/>

		<section-collab
			:sponsors = "sponsorList"
			:collaborators = "collabList"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import { eventMap, mediaMap, partnerMap } from '@/interfaces';

import axios from 'axios';

import HeroHeader from '@/components/generic/HeroHeader.vue';
import sectionTimer from '@/components/events/Timer.vue';
import infoPanel from '@/components/events/PrimaryInfo.vue';
import sectionContacts from '@/components/events/Contatti.vue';
import sectionFreeSubscription from '@/components/events/IscrizioneGratuita.vue';
import sectionPaywallSubscription from '@/components/events/IscrizionePagamento.vue';
import sectionCollab from '@/components/events/Collab.vue';

const Component = Vue.extend({
	name: 'Event-details-page',
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
		sectionCollab,
	},
	computed: {
		...mapGetters({
			loading: 'getAwait'
		}),

		uri() :string {
			return this.$route.params.uri;
		},

		mediaGallery() :mediaMap[] {
			//@ts-ignore
			if(!this.event)
				return [];
			//@ts-ignore
			return this.$store.getters.getEventGallery(this.event.id);
		},
		coverGallery() :mediaMap[] {
			return this.mediaGallery.filter(({ role } :mediaMap) => {
				return role === 'cover';
			});
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
				return 0;
			//@ts-ignore
			return Math.floor((new Date(this.event.data_end)).getTime() / 1000);
		},

		sponsorList() :partnerMap[] {
			let sponsorList :partnerMap[];
			//@ts-ignore
			if(!this.event)
				return [];
			//@ts-ignore
			sponsorList = this.event.partners.filter(({ role } :partnerMap) => {
				return role === 'sponsor';
			});
			sponsorList.unshift({
				"id": "1",
				"name": "CSI Carpi",
				"url": "http://www.csicarpi.it/",
				"role": "sponsor",
				"media": {
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
			return this.event.partners.filter(({ role } :partnerMap) => {
				return role === 'collab';
			});
		},




		ended() :boolean {
			return Date.now() > this.endTimestamp;
		},
		active() :boolean {
			return this.startTimestamp > Date.now() && Date.now() < this.endTimestamp;
		},
		comingsoon() :boolean {
			return this.startTimestamp < Date.now();
		},
	},
	methods: {
		...mapActions({
			setLoading: 'setAwait',
			getEvent: 'getEventsByUri',
			editEvent: 'editEvent',
		}),
	},
	mounted(){
		//this.editEvent({});
	},
	created(){
		this.setLoading([true, 'event']);
		this.getEvent(this.uri).then(() => {
			this.setLoading([false, 'event']);
			return;//TODO
			//@ts-ignore
			if(!this.event)
				this.$router.push('/');
		});
	}
});

export default Component;
</script>


<style lang="scss">
@import '@/assets/scss/core';
@import '@/assets/scss/components/colorbutton1';
@import '@/assets/scss/components/blogpage1';
@import '@/assets/scss/components/csshake1';


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
	.hashtag-wrapper{
		padding-top: 60px;
		padding-bottom: 120px;
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
	.info-panels{
		.card-title{
			font-size: 2.5em;
			& + p{
				font-size: 1.4em;
			}
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
