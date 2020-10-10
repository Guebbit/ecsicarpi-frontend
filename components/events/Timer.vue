<template>
	<time v-if="startTimestamp > now"
		id="depletion"
		class="countdown2"
		:datetime="startTimestamp"
		:date-timestamp="start"
	>
		<h4 class="count-title page-subtitle">
			{{ $t("days")[startDayName] }} <b class="text-secondary">{{ startDay }}</b>
			<font-awesome-icon
				class="text-primary large-screen"
				:icon="['fas', 'long-arrow-alt-right']"
			/>
			<font-awesome-icon
				class="text-primary mobile-screen"
				:icon="['fas', 'long-arrow-alt-down']"
			/>
			{{ $t("days")[endDayName] }} <b class="text-secondary">{{ endDay }}</b>
			<br />
			<big><b class="text-secondary">{{ $t("months")[startMonth] }}</b></big>
		</h4>
		<div class="countdown">
			<div class="date-days">
				<span class="timer">00</span>
				<span class="label">Giorni</span>
			</div>
			<div class="date-hours">
				<span class="timer">00</span>
				<span class="label">Ore</span>
			</div>
			<div class="date-minutes">
				<span class="timer">00</span>
				<span class="label">Minuti</span>
			</div>
			<div class="date-seconds">
				<span class="timer">00</span>
				<span class="label">Secondi</span>
			</div>
		</div>
	</time>
	<div v-else>
		<slot/>
	</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import timerHelper from '@/assets/js/timerHelper.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltRight, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faLongArrowAltRight, faLongArrowAltDown);


//TODO named slots (in arrivo, in corso, finito) https://vuejs.org/v2/guide/components-slots.html

const Component = Vue.extend({
	name: 'index-timer',
	components: {
		FontAwesomeIcon,
	},
	props: {
		start: {
			type: String,
			required: true,
		} as PropOptions<string>,
		end: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
	},
	computed:{
		startDate() :Date {
			return new Date(this.start);
		},
		endDate() :Date {
			return new Date(this.end);
		},


		startTimestamp() :number {
			return Math.floor(this.startDate.getTime() / 1000);
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
		endMonth() :number {
			return this.endDate.getMonth();
		},
		endDay() :number {
			return this.endDate.getDate();
		},
		endDayName() :number {
			return this.endDate.getDay();
		},

		now() :number {
			return Math.floor((new Date()).getTime() / 1000);
		},
	},
	mounted(){
		if(this.startTimestamp <= this.now)
			return false;
		var timerObject :HTMLElement = document.getElementById("depletion")!;
		var timerChildren={
			"years": timerObject.querySelector(".date-years .timer"),
			"months": timerObject.querySelector(".date-months .timer"),
			"weeks": timerObject.querySelector(".date-weeks .timer"),
			"days": timerObject.querySelector(".date-days .timer"),
			"hours": timerObject.querySelector(".date-hours .timer"),
			"minutes": timerObject.querySelector(".date-minutes .timer"),
			"seconds": timerObject.querySelector(".date-seconds .timer"),
		};
		// @ts-ignore
		new timerHelper(function(countdown){
			//per ogni tipo di coundown
			for(var day in countdown){
				if(countdown.hasOwnProperty(day)){
					//controllo se esiste un elemento corrispondente
					// @ts-ignore
					if(timerChildren[day])
						// @ts-ignore
						timerChildren[day].innerText=countdown[day].toString().padStart(2, '0');
				}
			}
			// @ts-ignore
		}, timerObject.getAttribute("date-timestamp"));
	}
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';
@import '@/assets/scss/components/cardpanel4';

.countdown2{
	display: block;
	position: relative;
	z-index: 1;
	margin-top: -5em;
	margin-bottom: 50px;
	.timer{
		color: $primary-color;
		line-height: 1;
		font-size: 2.5em;
		font-weight: 600;
		text-shadow: 0.03em 2px rgba($secondary-color,0.8);
	}
	.count-title{
		margin-bottom: 2em;
		font-weight: 700;
		padding-top: 0.5em;
		font-size: 2em;
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
	.countdown{
		display: flex;
		justify-content: space-around;
		& > div{
			display: flex;
			flex-direction: column;
			text-align: center;
			font-size: 1.2em;
		}
		@include media-breakpoint-up(lg) {
			font-size: 2em;
		}
	}
}
</style>
