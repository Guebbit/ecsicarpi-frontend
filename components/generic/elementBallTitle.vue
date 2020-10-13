<template>
	<div class="ballTitle">
		<span class="label">
			<span class="CSShake1 shake-slow" :class="{ 'active': active}">{{ title }}</span>
		</span>
		<soccer-ball class="soccerBall1" />
	</div>
</template>

<script>
//TODO trovare come renderlo lang="ts" (cannot find module '@/assets/svg/soccerBall1.svg?inline' or its corresponding type declarations)
import Vue from 'vue';

import soccerBall from '@/assets/svg/soccerBall1.svg?inline';
const Component = Vue.extend({
	name: 'element-balltitle',
	components: {
		soccerBall,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: () => {
				return false;
			}
		},
	},
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';

.ballTitle{
	display: block;
	position: relative;
	text-decoration: none;
	margin-top: 24px;
	.label{
		color: $secondary;
		font-size: 3em;
		@include builder_abscenter-xy;
		font-weight: 600;
		text-shadow: 0.03em 2px rgba(black,0.8);
		z-index: 1;
		@include builder_media("large") {
			font-size: 5em;
		}
	}
	svg{
		opacity: 0.5;
	}
	&:hover{
		.soccerBall1{
			path {
				animation-duration: $soccerBall1-speed/2;
				@for $i from 1 through 8 {
					&:nth-child(#{$i}) {
						animation-delay: $soccerBall1-speed/16 * $i
					}
				}
			}
		}
	}
}



//TODO guebbit
$soccerBall1-color: $primary !default;
$soccerBall1-speed: 1s !default;
.soccerBall1{
	height: 300px;
	display: block;
	margin: 0 auto;
	path {
		fill: $primary;
		animation-duration: $soccerBall1-speed;
		animation-name: soccerBall1-animation;
		animation-iteration-count: infinite;
		@for $i from 1 through 8 {
			&:nth-child(#{$i}) {
				animation-delay: $soccerBall1-speed/8 * $i
			}
		}
	}
}
@keyframes soccerBall1-animation {
	0%     { opacity: .1; }
	30%    { opacity: .8; }
	100%   { opacity: .1; }
}

</style>
