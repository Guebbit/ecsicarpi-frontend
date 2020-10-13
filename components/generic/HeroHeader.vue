<template>
	<div class="heroPanel2 full-height">
		<video v-if="cover && cover.MediaChunk.chunkType === 'video'"
			class="background"
			async=""
			autoplay=""
			loop=""
			muted=""
			:poster="cover.MediaChunk.thumb800"
		>
			<source :src="cover.MediaChunk.url" type="video/mp4">
		</video>
		<template v-if="cover && cover.MediaChunk.chunkType === 'image'">
			<img v-if="cover.MediaChunk.thumbnail"
				class="background"
				:src="cover.MediaChunk.thumb100"
				:data-src="cover.MediaChunk.url"
				:title="cover.title"
				:alt="cover.alt"
			/>
			<img v-else
				class="background"
				:src="cover.MediaChunk.url"
				:title="cover.title"
				:alt="cover.alt"
			/>
		</template>
		<div class="panel-content d-flex align-items-end">
			<div>
				<h1 class="page-title text-white"><span class="highlight1 with-opacity">{{ title }}</span></h1>
				<h4 class="page-subtitle text-white"><span class="highlight1 secondary with-opacity">{{ subtitle }}</span></h4>
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
