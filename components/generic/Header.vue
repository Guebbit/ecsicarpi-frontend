<template>
	<b-navbar toggleable="lg" type="dark" variant="primary">
		<b-navbar-brand href="/">
			<img :src="$t('meta.og.og:image')" :alt="$t('meta.og.og:image:alt')">
		</b-navbar-brand>
		<b-navbar-toggle target="main-nav-collapse"></b-navbar-toggle>
		<b-collapse id="main-nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item-dropdown>
					<!-- Using 'button-content' slot -->
					<template v-slot:button-content>
						{{ $tc('event', 2) }}
					</template>
					<b-dropdown-item
						v-for="event in events"
						:key="'link_'+event.id"
						:to="'/events/'+event.uri"
					>
						{{ event.title }}
					</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
			<!-- Right aligned nav items
			<b-navbar-nav class="ml-auto">
				<b-nav-form>
					<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
					<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
				</b-nav-form>
			</b-navbar-nav>
			 -->
		</b-collapse>
	</b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

const Component = Vue.extend({
	name: 'main-navigation-bar',
	computed: {
		...mapState({
			events: 'events'
		}),
	},
});

export default Component;


</script>
