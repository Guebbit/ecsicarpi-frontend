<template>
	<section class="subscription-section container d-flex justify-content-center flex-column">
		<page-title
			:title="'ISCRIVITI!'"
		/>
		<div class="battlefy-section text-center">
			<div class="d-flex justify-content-center">
				<a v-for="url in arrayUrls" :href="url" target="_blank" class="socialButton1">
					<font-awesome-icon :icon="['fas', 'futbol']" />
				</a>
			</div>
			<p class="page-subtitle">
				Non sai come funziona <b class="text-secondary">BATTLEFY</b>?
			</p>
			<a class="btn iconButton1 with-hover"
				href="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcarpiecsi%2Fvideos%2F289710082186887%2F&show_text=0&width=560"
				target="_blank"
			>
				<span>Guarda il video</span>
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

<style lang="scss">
.subscription-section{
	.battlefy-section{
		.socialButton1{
			font-size: 10em;
		}
	}
}
</style>
