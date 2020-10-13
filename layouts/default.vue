<template>
	<div>
		<main-header id="mainHeader" />
		<Nuxt />
		<main-footer id="mainFooter" />
	</div>
</template>

<script>
//TODO trovare come metterlo lang="ts" (head() non riconosciuto e problemi vari)
// https://github.com/nuxt/typescript/issues/28
import Vue from 'vue';

import MainHeader from '@/components/generic/Header.vue';
import MainFooter from '@/components/generic/Footer.vue';

import { lazyload, activator } from "@/assets/js/temporaryGuebbit2";

const Component = Vue.extend({
	head () {
		const i18nSeo = this.$nuxtI18nSeo();
		let metaArray = [],
			ogList = this.$t('meta.og'),
			metaList = {
				"og:title": this.$t('meta.title'),
				"og:description": this.$t('meta.description'),
				"og:type": "website",
				"og:url": process.env.baseUrl,
			},
			meta;

		for (meta in ogList)
			if (ogList.hasOwnProperty(meta))
				metaArray.push({
					property: meta,
					content: ogList[meta]
				});
		for (meta in metaList)
			if (metaList.hasOwnProperty(meta))
				metaArray.push({
					property: meta,
					content: metaList[meta]
				});

		return {
			title: this.$t('meta.title'),
			htmlAttrs: {
				//amp: true,
				...i18nSeo.htmlAttrs,
			},
			meta: [
				...metaArray,
				...i18nSeo.meta,
				{
					name: 'description',
					description: this.$t('meta.description'),
				},
				//SVG
				{
					name: 'msapplication-TileColor',
					content: '#ffffff'
				},
				{
					name: 'msapplication-config',
					content: '/images/favicon/browserconfig.xml'
				},
				{
					name: 'theme-color',
					content: '#ffffff'
				}
			],
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/images/favicon/favicon.ico'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					type: 'image/png',
					href: '/images/favicon/apple-touch-icon.png'
				},
				{
					rel: 'icon',
					sizes: '32x32',
					type: 'image/png',
					href: '/images/favicon/favicon-32x32.png'
				},
				{
					rel: 'icon',
					sizes: '16x16',
					type: 'image/png',
					href: '/images/favicon/favicon-16x16.png'
				},
				{
					rel: 'manifest',
					type: 'image/x-icon',
					href: '/images/favicon/site.webmanifest'
				},
				{
					rel: 'shortcut icon',
					type: 'image/x-icon',
					color: "#3a319c",
					href: '/images/favicon/safari-pinned-tab.svg'
				},
			],
			script: [{
				//TODO andrebbe solo in _uri.vue
				type: "text/javascript",
				src: 'https://www.paypal.com/sdk/js?client-id='+process.env.paypal_clientid+'&currency=EUR&disable-funding=sofort,mybank'
			}],
		}
	},
	components: {
		MainHeader,
		MainFooter
	},
	mounted(){
		lazyload();
		activator();

		setTimeout(() => {
			console.log(Object.assign([],this.$store.getters.debug));
		}, 5000);
	},
});

export default Component;
</script>



<style lang="scss">
@import '~/assets/scss/variables.scss';

@import '@/node_modules/bootstrap/scss/bootstrap';
@import '@/node_modules/bootstrap-vue/src/index.scss';
@import '@/assets/scss/global';

@import '@/assets/scss/components/highlight1';
@import '@/assets/scss/components/imagereveal2';
@import '@/assets/scss/components/heropanel2';
@import '@/assets/scss/components/simplelist1';
@import '@/assets/scss/components/socialbutton1';
@import '@/assets/scss/components/iconbutton1';

/*
@import '../../../archives/code/collabpanel3/collabpanel3';
@import '../../../archives/code/simplefooter1/simplefooter1';
*/

// https://material-components.github.io/material-components-web-catalog/#/component/ripple

section{
	min-height: 90vh;
	padding-top: 10vh;
	padding-bottom: 10vh;
}

.page-title,
.page-subtitle{
	text-align: center;
	span{
		padding: 6px 12px;
	}
}
.page-title{
	text-transform: uppercase;
	@include media-breakpoint-up(lg) {
		font-size: 2.5em;
	}
}
.page-subtitle{
	@include media-breakpoint-up(lg) {
		font-size: 1.5em;
	}
}
.page-description{
	font-size: 1.2em;
}

.socialButton1{
	&.observer-activate-once{
		&.active{
			font-size: 12em;
		}
	}
}


/*
//RE-TODO guebbit mixin
$shadowTitle1-size: 0.03em !default;
$shadowTitle1-blur: 2px !default;

.shadowTitle1{
	font-weight:500;
	text-transform: uppercase;
	text-shadow: $shadowTitle1-size $shadowTitle1-size $primary;
	&.inverted{
		text-shadow: $shadowTitle1-size $shadowTitle1-size $secondary;
	}
	&.v2{
		text-shadow: (-$shadowTitle1-size) (-$shadowTitle1-size) $primary;
		&.inverted{
			text-shadow: (-$shadowTitle1-size) (-$shadowTitle1-size) $secondary;
		}
	}
	&.v3{
		text-shadow: $shadowTitle1-size 0 $shadowTitle1-blur $primary,
					 (-$shadowTitle1-size) 0 $shadowTitle1-blur $primary,
					 0 $shadowTitle1-size $shadowTitle1-blur $primary,
					 0 (-$shadowTitle1-size) $shadowTitle1-blur $primary;
		&.inverted{
			text-shadow: $shadowTitle1-size 0 $shadowTitle1-blur $secondary,
						 (-$shadowTitle1-size) 0 $shadowTitle1-blur $secondary,
						 0 $shadowTitle1-size $shadowTitle1-blur $secondary,
						 0 (-$shadowTitle1-size) $shadowTitle1-blur $secondary;
		}
	}
}
*/
</style>
