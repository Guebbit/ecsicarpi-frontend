<template>
	<footer class="simpleFooter1">
		<div class="footer-copyright center-align">
			<a href="https://guebbit.com/" class="url" target="_blank">
				Made by <span class="flow-text">Guebbit</span>
				<img :src="require('@/assets/svg/guebbit-logo-simple.svg')" class="logo"/>
			</a>
		</div>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue';

const Component = Vue.extend({
	name: 'MainFooter'
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';

.simpleFooter1{
	a{
		text-decoration: none !important;
	}
	text-align: center;
	.footer-content{
		padding: 40px 0;
	}
	.social-wrapper{
		text-align: left;
		font-size: 2em;
	}
	.col{
		&.with-border{
			min-height: 90px;
			padding: 0 24px;
			border-right: 1px solid $primary-color;
		}
	}
	@include builder_media("small") {
		.social-wrapper{
			text-align: center;
			& > a{
				margin: 0 0.5em;
			}
		}
		.col{
			&.with-border{
				border-right: none;
			}
		}
	}
	.footer-copyright{
		background-color: $primary-color;
		position: relative;
		line-height: 54px;
		color: color("shades","white");
		a{
			color: inherit;
		}
		.url{
			display: block;
		}
		.logo{
			position: absolute;
			padding:5px;
			height:100%;
			svg{
				height: 100%;
			}
		}
	}
}
</style>
