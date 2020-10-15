<template>
	<div>
		<h1>Admin Page?</h1>	
		<div class="container mt-40 mb-40">
			<WYSIWYGEditor
				:api-key="apikey_tinymce"
				:init="{
					plugins: [
						'print preview importcss autolink directionality visualchars image link codesample charmap hr pagebreak nonbreaking anchor toc advlist lists imagetools textpattern noneditable charmap quickbars autoresize',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste help wordcount'
					],
					menubar: 'file edit view insert format tools table help',
					toolbar:'undo redo | code | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor backcolor removeformat | pagebreak | fullscreen  preview save print | insertfile image media link anchor | ltr rtl',
					toolbar_sticky: true,
					//extended_valid_elements: 'span', //così la smette di rimuovere gli span
				}"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

import WYSIWYGEditor from '@tinymce/tinymce-vue'

const Component = Vue.extend({
	name: 'admin-page',
	components: {
		WYSIWYGEditor,
	},
	computed: {
		apikey_tinymce() :string | undefined {
			return process.env.apikey_tinymce;
		}
	},
	created() {
		if(process.env.enviroment !== 'development' && (!this.$route.query.auth || this.$route.query.auth !== "cavoletti1di1bruxelles"))
			this.$router.push("/");
	}
});

export default Component;
</script>
