<template>
	<div v-if="!inverted"
		class="cardPanel4 mobile-friendly"
		:class="{ 'text-with-shadow': shadow }"
	>
		<div class="static-container">
			<div class="row">
				<div class="col-sm-12 col-md-8">
					<div class="text-wrapper text-right">
						<h3 class="card-title"><span>{{ title }}</span></h3>
						<p>{{ text }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="fixed-container">
			<div class="row">
				<div class="col-sm-12 col-md-6 offset-md-6 text-center">
					<img v-if="thumbnail"
						class="img-fluid advancingMoon1 to-left observer-activate-once"
						:src="thumbnail"
						:data-src="image"
						:title="title_tag"
						:alt="alt_tag ? alt_tag : title"
					/>
					<img v-else
						class="img-fluid advancingMoon1 to-left observer-activate-once"
						:src="image"
						:title="title_tag"
						:alt="alt_tag ? alt_tag : title"
					/>
				</div>
			</div>
		</div>
	</div>
	<div v-else
		class="cardPanel4 mobile-friendly"
		:class="{ 'text-with-shadow': shadow }"
	>
		<div class="static-container">
	        <div class="row">
	            <div class="col-sm-12 col-md-8 offset-md-4">
					<div class="text-wrapper">
	                    <h3 class="card-title"><span>{{ title }}</span></h3>
						<p>{{ text }}</p>
	                </div>
	            </div>
	        </div>
	    </div>
	    <div class="fixed-container">
	        <div class="row">
	            <div class="col-sm-12 col-md-6 text-center">
					<img v-if="thumbnail"
						class="img-fluid advancingMoon1 observer-activate-once"
						:src="thumbnail"
						:data-src="image"
						:title="title_tag"
						:alt="alt_tag ? alt_tag : title"
					/>
					<img v-else
						class="img-fluid advancingMoon1 observer-activate-once"
						:src="image"
						:title="title_tag"
						:alt="alt_tag ? alt_tag : title"
					/>
	            </div>
	        </div>
	    </div>
	</div>
</template>


<script lang="ts">
import Vue, { PropOptions } from 'vue';

const Component = Vue.extend({
	name: 'basic-info-event',
	props: {
		title: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		text: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		alt_tag: {
			type: String,
			required: false,
		} as PropOptions<string>,
		title_tag: {
			type: String,
			required: false,
		} as PropOptions<string>,

		image: {
			type: String,
			required: false,
		} as PropOptions<string>,
		thumbnail: {
			type: String,
			required: false,
		} as PropOptions<string>,
		inverted: {
			type: Boolean,
			default: () => {
				return false;
			}
		} as PropOptions<boolean>,
		shadow: {
			type: Boolean,
			default: () => {
				return false;
			}
		} as PropOptions<boolean>,
	}
});

export default Component;
</script>

<style lang="scss">
@import '@/assets/scss/core';
@import '@/assets/scss/components/cardpanel4';
</style>
