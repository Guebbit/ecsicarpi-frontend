<template>
	<b-modal
		v-model="trueShow"
		modal-class="theme-modal"
		centered
		header-class="theme-modal-header d-flex justify-content-between align-items-center"
		footer-class="theme-modal-footer"
	>
		<template v-slot:modal-header>
			<h5 class="theme-modal-title">{{ $t('Rilevato browser non compatibile') }}</h5>
			<b-link class="theme-close-btn"
				@click="emitClose"
			>
				<font-awesome-icon :icon="['fas', 'times']" />
			</b-link>
		</template>
		<div class="theme-modal-body text-center">
			<p>
				{{ $t('Rilevato browser non compatibile') }},
				{{ $t('consigliamo di aggiornare il browser in uso o di scaricarne di nuovi') }}
			</p>
		</div>
		<template v-slot:modal-footer>
			<b-button variant="light"
				href="https://www.google.com/intl/it_it/chrome/"
				target="_blank"
			>
				{{ $t('Chrome') }}
				<font-awesome-icon :icon="['fab', 'chrome']" />
			</b-button>
			<b-button variant="light"
				href="https://www.mozilla.org/it/firefox/new/"
				target="_blank"
			>
				{{ $t('Firefox') }}
				<font-awesome-icon :icon="['fab', 'firefox-browser']" />
			</b-button>
		</template>
	</b-modal>
</template>

<script lang="ts">
import Vue, { PropOptions, VueConstructor } from 'vue';

import showStructureMixin from './mixin/defaultShowStructure';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCommentAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFirefoxBrowser, faChrome } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCommentAlt, faFirefoxBrowser, faChrome, faTimes);

const Component = (Vue as VueConstructor<Vue & InstanceType<typeof showStructureMixin>>).extend({
	mixins: [
		showStructureMixin
	],
	name: 'compatibility-modal',
	components: {
		FontAwesomeIcon,
	},
});

export default Component;
</script>
