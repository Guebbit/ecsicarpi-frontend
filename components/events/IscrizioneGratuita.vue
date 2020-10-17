<template>
	<section id="subscription" class="subscription-section container d-flex justify-content-center flex-column">
		<page-title
			:title="'Iscriviti!'"
		/>
		<h3 class="page-subtitle text-primary" v-html="$t('pages.event-details.subscription-free-title', { name: this.event_name })"></h3>
		<p class="page-description text-center" v-html="$t('pages.event-details.subscription-free-text')"></p>

		<div class="d-flex justify-content-center align-items-center">
			<div class="cssArrow1 to-right">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="battlefy-wrapper d-flex justify-content-center align-items-center">
				<a v-for="url in arrayUrls" :href="url" target="_blank" class="socialButton1 observer-activate-once">
					<font-awesome-icon :icon="['fas', 'futbol']" />
				</a>
			</div>
			<div class="cssArrow1 to-left">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="d-flex justify-content-center align-items-center">
			<p class="page-subtitle mb-0 mr-5" v-html="$t('pages.event-details.subscription-battlefy-instructions-text')"></p>
			<a class="btn iconButton1 with-hover"
				href="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcarpiecsi%2Fvideos%2F289710082186887%2F&show_text=0&width=560"
				target="_blank"
			>
				<span>{{ $t('pages.event-details.subscription-battlefy-instructions-button') }}</span>
				<span><font-awesome-icon :icon="['fas', 'video']" /></span>
			</a>
		</div>
	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import pageTitle from '@/components/generic/elementBallTitle.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faFutbol, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEnvelope, faVideo, faFutbol, faFacebook, faInstagram);

const Component = Vue.extend({
	name: 'event-free-subscription',
	components: {
		pageTitle,
		FontAwesomeIcon,
	},
	props: {
		event_name: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		arrayUrls: {
			type: Array,
			default: () => {
				return [];
			}
		} as PropOptions<string[]>,
	}
});

export default Component;
</script>
