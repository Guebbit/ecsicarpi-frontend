<template>
	<section class="container d-flex justify-content-center flex-column">
		<div class="contact-info text-center">
			<h2 class="page-title">Contattaci</h2>
			<p class="page-description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<div class="d-flex justify-content-around mt-100 mb-100">
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

		<div class="social-wrapper d-flex justify-content-center">
			<a v-for="(social, social_name) in $t('info.social')" :href="social.url" target="_blank" class="socialButton1" :class="social_name">
				<font-awesome-icon :icon="['fab', social_name]" />
			</a>
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

<style lang="scss" scoped>
.social-wrapper{
	.socialButton1{
		font-size: 10em;
	}
}


.contact-info{
	margin-top: 60px;
	text-align: right;
	.contact-button{
		font-size: 2em;
		text-transform: uppercase;
		text-indent: 0.7em;
		font-weight: 600;
	}
}

</style>
