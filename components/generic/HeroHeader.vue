<template>
	<div class="heroPanel2 full-height">
		<video v-if="cover && cover.media.chunkType === 'video'"
			class="background"
			async=""
			autoplay=""
			loop=""
			muted=""
			:poster="cover.media.thumb800"
		>
			<source :src="cover.media.url" type="video/mp4">
		</video>
		<template v-if="cover && cover.media.chunkType === 'image'">
			<img v-if="cover.media.thumbnail"
				class="background"
				:src="cover.media.thumb100"
				:data-src="cover.media.url"
				:title="cover.title"
				:alt="cover.alt"
			/>
			<img v-else
				class="background"
				:src="cover.media.url"
				:title="cover.title"
				:alt="cover.alt"
			/>
		</template>
		<div class="full-height panel-content d-flex align-items-end">
			<div>
				<h1 class="page-title text-white"><span>{{ title }}</span></h1>
				<h4 class="page-subtitle text-white"><span>{{ subtitle }}</span></h4>
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mediaMap } from '@/interfaces';

const Component = Vue.extend({
	name: 'HeroHeader',
	props: {
		title: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		subtitle: {
			type: String,
			default: () => {
				return '';
			}
		} as PropOptions<string>,
		cover: {
			type: Object,
			required: false
		} as PropOptions<mediaMap>,
	}
});


export default Component;
</script>

<style lang="scss" scoped>
@import '@/assets/scss/core';

.heroPanel2{
	.panel-content{
		& > div{
			padding: 24px;
		}
	}
	.page-subtitle{
		margin-top: 0.5em;
	}
}
</style>
