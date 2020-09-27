<template>
	<div>
		<Nuxt />
	</div>
</template>


<script>
import Vue from 'vue';

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
			script: [],
		}
	},
});

export default Component;

</script>



<style lang="scss">
@import '~/assets/scss/variables.scss';


$theme-colors: (
	"primary": 		#3A319C,
	"secondary":	#FF6D10,
	//"info":		$info,
	//"success":	$success,
	//"warning":	$warning,
	//"danger": 	$danger,
	//"light":  	$light,
	//"dark":   	$dark
);


@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

//RE-TODO guebbit mixin
$shadowTitle1-size: 0.03em !default;
$shadowTitle1-blur: 2px;

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
