<template>
	<div>
		<h2 class="page-title mb-50">Sponsor</h2>
		<div class="sponsorPanel">
			<a v-for="sponsor in sponsors" :href="sponsor.url" target="_blank">
				<img v-if="sponsor.media.thumb100"
					class="img-fluid"
					:src="sponsor.media.thumb100"
					:data-src="sponsor.media.thumb800 ? sponsor.media.thumb800 : sponsor.media.url"
					:title="sponsor.title ? sponsor.title : sponsor.name"
					:alt="sponsor.alt ? sponsor.alt : sponsor.name+' logo'"
				/>
				<img v-else
					class="img-fluid"
					:src="sponsor.media.thumb800 ? sponsor.media.thumb800 : sponsor.media.url"
					:title="sponsor.title ? sponsor.title : sponsor.name"
					:alt="sponsor.alt ? sponsor.alt : sponsor.name+' logo'"
				/>
			</a>
		</div>
		<h2 class="page-title mt-100 mb-50">Collaborazioni</h2>
		<div class="collabPanel3">
		    <div>
		        <div v-for="collab in collaborators">
					<a :href="collab.url" target="_blank">
						<img v-if="collab.media.thumb100"
							class="img-fluid advancingMoon1 to-left observer-activate-once"
							:src="collab.media.thumb100"
							:data-src="collab.media.thumb800 ? collab.media.thumb800 : collab.media.url"
							:title="collab.title ? collab.title : collab.name"
							:alt="collab.alt ? collab.alt : collab.name+' logo'"
						/>
						<img v-else
							class="img-fluid advancingMoon1 to-left observer-activate-once"
							:src="collab.media.thumb800 ? collab.media.thumb800 : collab.media.url"
							:title="collab.title ? collab.title : collab.name"
							:alt="collab.alt ? collab.alt : collab.name+' logo'"
						/>
					</a>
				</div>
		    </div>
		</div>
	</div>
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
