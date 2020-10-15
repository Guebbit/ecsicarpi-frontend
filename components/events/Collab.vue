<template>
	<section class="section-collabs">
		<template v-if="sponsors.length > 0">
			<h2 class="page-title mb-50">
				<span class="highlight1 white-text">{{ $tc('sponsors', sponsors.length) }}</span>
			</h2>
			<div class="sponsorPanel">
				<a v-for="sponsor in sponsors" :href="sponsor.url" target="_blank">
					<img v-if="sponsor.MediaChunk.thumb100"
						class="img-fluid"
						:src="sponsor.MediaChunk.thumb100"
						:data-src="sponsor.MediaChunk.thumb800 ? sponsor.MediaChunk.thumb800 : sponsor.MediaChunk.url"
						:title="sponsor.title ? sponsor.title : sponsor.name"
						:alt="sponsor.alt ? sponsor.alt : sponsor.name+' logo'"
					/>
					<img v-else
						class="img-fluid"
						:src="sponsor.MediaChunk.thumb800 ? sponsor.MediaChunk.thumb800 : sponsor.MediaChunk.url"
						:title="sponsor.title ? sponsor.title : sponsor.name"
						:alt="sponsor.alt ? sponsor.alt : sponsor.name+' logo'"
					/>
				</a>
			</div>
		</template>
		<template v-if="collaborators.length > 0">
			<h2 class="page-title mb-50 mt-100">
				<span class="highlight1 white-text">{{ $tc('collaborators', collaborators.length) }}</span>
			</h2>
			<div class="collabPanel3">
			    <div>
			        <div v-for="collab in collaborators" class="d-flex justify-content-center align-items-center">
						<a :href="collab.url" target="_blank">
							<img v-if="collab.MediaChunk.thumb100"
								:src="collab.MediaChunk.thumb100"
								:data-src="collab.MediaChunk.thumb800 ? collab.MediaChunk.thumb800 : collab.MediaChunk.url"
								:title="collab.title ? collab.title : collab.name"
								:alt="collab.alt ? collab.alt : collab.name+' logo'"
							/>
							<img v-else
								:src="collab.MediaChunk.thumb800 ? collab.MediaChunk.thumb800 : collab.MediaChunk.url"
								:title="collab.title ? collab.title : collab.name"
								:alt="collab.alt ? collab.alt : collab.name+' logo'"
							/>
						</a>
					</div>
			    </div>
			</div>
		</template>
	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { partnerMap } from '@/interfaces';

const Component = Vue.extend({
	name: 'event-collaborators',
	props: {
		sponsors: {
			type: Array,
			default: () => {
				return [];
			}
		} as PropOptions<partnerMap[]>,
		collaborators: {
			type: Array,
			default: () => {
				return [];
			}
		} as PropOptions<partnerMap[]>,
	}
});

export default Component;
</script>

<style lang="scss">
.sponsorPanel{
	a{
		display: block;
		max-width: 400px;
		margin: 0 auto;
	}
}
.collabPanel3{
    padding:50px 0;
	& > div{
	    display:flex;
	    flex-wrap: wrap;
	    align-content: center;
	    justify-content: center;
		& > div{
		    margin: 1% 2%;
		    max-width: 200px;
		    overflow: hidden;
			transition: max-width 0.5s;
			&:hover{
			    max-width: 300px;
			}
		}
	}
	img{
	    max-width: 100%;
	    height: auto;
	}
	&.v2{
		& > div{
		    display:block;
			& > div{
			    display: inline-block;
			}
		}
	}
}
</style>
