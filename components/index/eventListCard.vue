<template>
	<li class="post-body row observer-activate observer-mobile-only">
		<div class="col-sm-12 col-lg-4 post-date">
			<img :src="image" :alt="title">
			<time :datetime="start">
				<span class="day">{{ startDay }}</span>
				<span class="month">{{ $t("months")[startMonth] }}</span>
				<span class="year">{{ startYear }}</span>
			</time>
		</div>
		<div class="col-sm-12 col-lg-4 post-place">
			<div class="text-center">
				<h5>{{ title }}</h5>
				<span>{{ subtitle }}</span>
				<div class="hashtags">
					<a :href="'#todopage_'+hashtag" v-for="hashtag in hashtags">
						{{ hashtag }}
					</a>
				</div>
			</div>
		</div>
		<div class="col-sm-12 col-lg-4 post-action">
			<b-button
				v-if="league_url"
				variant="secondary"
				:to="league_url"
			>
				{{ $t('league') }}
			</b-button>
			<b-button
				variant="primary"
				v-if="todaytimestamp <= endTimestamp"
				:to="url+'#subscription'"
			>
				{{ $t('subscribe') }}
				<b-badge v-if="price"
					class="ml-2"
					variant="light"
				>
					{{ price }}€
				</b-badge>
			</b-button>
			<b-button
				:to="url"
				v-else
				variant="primary"
			>
				{{ $t('more-info') }}
			</b-button>
		</div>
	</li>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCalendar);

const Component = Vue.extend({
	name: 'EventListCard',
	components: {
		FontAwesomeIcon,
	},
	props: {
		start: {
			type: String,
			required: true,
		} as PropOptions<string>,
		end: {
			type: String
		} as PropOptions<string>,

		image: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		title: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		subtitle: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		url: {
			type: String,
			required: true,
		} as PropOptions<string>,
		league_url: {
			type: String,
			required: false,
		} as PropOptions<string>,
		price: {
			type: Number,
			required: false,
		} as PropOptions<number>,
		hashtags: {
			type: Array,
			default: () => {
				return [];
			}
		} as PropOptions<string[]>,
	},
	computed: {
		startDate() :Date {
			return new Date(this.start);
		},
		endDate() :Date {
			if(!this.end)
				return new Date(this.start);
			return new Date(this.end);
		},

		startYear() :number {
			return this.startDate.getFullYear();
		},
		startMonth() :number {
			return this.startDate.getMonth();
		},
		startDay() :number {
			return this.startDate.getDate();
		},
		startDayName() :number {
			return this.startDate.getDay();
		},

		endTimestamp() :number {
			return Math.floor(this.endDate.getTime() / 1000);
		},
		todaytimestamp() :number {
			return Math.floor((new Date()).getTime() / 1000);
		},
	}
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';

ul.postList3 {
	& > li {
		&.active,
		&:hover{
			@include media-breakpoint-up(lg) {
				margin-right: -3px;
				border-right: 3px solid;
				border-color: $secondary-color;
			}
		}
	}
	.post-action > *{
		text-transform: uppercase;
	}
}
</style>
