<template>
	<b-link
		block
		:to="url"
	 	class="ticketCard1 info-right-side info-with-background text-decoration-none"
	>
		<a class="card-link" href="#test"></a>
		<div class="stub">
			<time :datetime="start">
				<span class="day">{{ startDay }}</span>
				<span class="month">{{ $t("months")[startMonth] }}</span>
				<span class="year">{{ startYear }}</span>
			</time>
		</div>
		<div class="check">
			<img :src="image" :alt="title">
			<div class="info">
				<b-button
					v-if="league_url"
					variant="secondary"
					:to="league_url"
					size="lg"
				>
					{{ $t('league') }}
				</b-button>
				<b-button
					variant="primary"
					v-if="todaytimestamp <= endTimestamp"
					:to="url+'#subscription'"
					size="lg"
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
					size="lg"
				>
					{{ $t('more-info') }}
				</b-button>
			</div>
		</div>
	</b-link>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCalendar);

const Component = Vue.extend({
	name: 'EventActiveCard',
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
$ticketCard1-height: 400px;
@import '@/assets/scss/components/ticketcard1';

.ticketCard1{
	.stub {
		time{
			.day{
				font-size: 8em;
			}
		}
	}
	.info{
		color: $dark;
		& > *{
			border: 1px solid $light;
		}
	}
}
</style>
