// MyMixin.ts
import Vue from "vue";
import { LocaleMessages } from 'vue-i18n';
import { lazyload, activator } from "@/assets/js/temporaryGuebbit2";

interface metaMap {
	property :string
	content :any
}

export default Vue.extend({
	//@ts-ignore
	head () {
		const i18nSeo = this.$nuxtI18nSeo() as any;
		let metaArray = [] as metaMap[],
			ogList = this.$t('meta.og') as LocaleMessages,
			metaList = {
				"og:title": this.$t('meta.title'),
				"og:description": this.$t('meta.description'),
				"og:type": "website",
				"og:url": process.env.baseUrl,
			} as any,
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
	data(){
		return {
			//default, tanto è necessario anche isCompatible = false
			compatibilityModal: true as boolean,
		}
	},
	computed: {
		isCompatible() :boolean {
			if(!process.client)
				return true;
			// @ts-ignore Chrome 1 - 79
			let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
				// @ts-ignore Opera
				//isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
				// @ts-ignore Firefox 1.0+
				//isFirefox = typeof InstallTrigger !== 'undefined',
				// @ts-ignore Safari 3.0+ "[object HTMLElementConstructor]"
				//isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
				// @ts-ignore Internet Explorer 6-11
				isIE = /*@cc_on!@*/false || !!document.documentMode,
				// @ts-ignore Edge 20+
				isEdge = !isIE && !!window.StyleMedia,
				// @ts-ignore Edge (based on chromium) detection
				isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
			return !(isIE || (isEdge && !isEdgeChromium));
		}
	},
	mounted(){
		lazyload();
		activator();

		setTimeout(() => {
			console.log(Object.assign([],this.$store.getters.debug));
		}, 5000);
	},
});
