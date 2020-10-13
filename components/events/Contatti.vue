<template>
	<section id="contatti" class="contact-section container d-flex justify-content-center flex-column">
		<div class="contact-info text-center mb-20">
			<h2 class="page-title mb-5">
				<span class="highlight1 white-text">{{ $t('pages.event-details.contacts-followus-title') }}</span>
			</h2>
			<p class="page-description">{{ $t('pages.event-details.contacts-followus-text') }}</p>
			<div class="d-flex justify-content-center align-items-center">
				<a v-for="(social, social_name) in $t('info.social')" :href="social.url" target="_blank" class="socialButton1 observer-activate-once" :class="social_name">
					<font-awesome-icon :icon="['fab', social_name]" />
				</a>
			</div>
		</div>
		<div class="contact-info text-center">
			<h2 class="page-title mb-5">
				<span class="highlight1 white-text">{{ $t('pages.event-details.contacts-links-title') }}</span>
			</h2>
			<p class="page-description mb-5">{{ $t('pages.event-details.contacts-links-text') }}</p>
			<div class="d-flex justify-content-center flex-wrap">
				<b-button
					variant="outline-secondary"
					class="contact-button d-inline-flex justify-content-center align-items-center"
					:href="'mailto:'+$t('info.email')"
				>
					{{ $t("info.email") }}
					<font-awesome-icon class="ml-4" :icon="['fas', 'envelope']" />
				</b-button>
				<b-button
					variant="outline-secondary"
					class="contact-button d-inline-flex justify-content-center align-items-center"
					:href="'tel:'+$t('info.tel')"
				>
					{{ $t("info.tel") }}
					<font-awesome-icon class="ml-4" :icon="['fas', 'phone']" />
				</b-button>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEnvelope, faPhone, faFacebook, faInstagram);

const Component = Vue.extend({
	name: 'event-subscription',
	components: {
		FontAwesomeIcon
	}
});

export default Component;
</script>
