<template>
	<section id="subscription" class="subscription-section container d-flex justify-content-center flex-column">
		<page-title
			:title="$t('subscribe')+'!'"
		/>

		<b-form
			v-if="!payment_success && showForm"
			class="mb-50"
			@reset.prevent="onReset"
		>
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<b-form-group
						:label="$t('pages.event-details.subscription-form-email-label')"
						label-for="form-input-email"
						:description="$t('pages.event-details.subscription-form-email-description')"
					>
						<b-form-input
							id="form-input-email"
							v-model="form.email"
							type="email"
							required
							:placeholder="$t('pages.event-details.subscription-form-email-placeholder')"
						/>
					</b-form-group>
				</div>
				<div class="col-sm-12 col-md-6">
					<b-form-group
						:label="$t('pages.event-details.subscription-form-username-label')"
						label-for="form-input-username"
						:description="$t('pages.event-details.subscription-form-username-description')"
					>
						<b-form-input
							id="form-input-username"
							v-model="form.username"
							required
							:placeholder="$t('pages.event-details.subscription-form-username-placeholder')"
						/>
					</b-form-group>
				</div>
				<div class="col-sm-12 col-md-6 offset-md-3">
					<b-form-group
						:label="$t('pages.event-details.subscription-form-city-label')"
						label-for="form-input-city"
						:description="$t('pages.event-details.subscription-form-city-description')"
					>
						<b-form-input
							id="form-input-city"
							v-model="form.city"
							required
							:placeholder="$t('pages.event-details.subscription-form-city-placeholder')"
						/>
					</b-form-group>
				</div>
				<div class="col-sm-12 col-md-6 offset-md-3">
					<b-form-group>
						<b-form-checkbox-group v-model="form.checked">
							<!-- TODO $t() -->
							<b-form-checkbox value="privacy">
								Preso atto dell'informativa
								<a target="_blank" href="https://www.garanteprivacy.it/documents/10160/0/Regolamento+UE+2016+679.+Arricchito+con+riferimenti+ai+Considerando+Aggiornato+alle+rettifiche+pubblicate+sulla+Gazzetta+Ufficiale++dell%27Unione+europea+127+del+23+maggio+2018">Privacy art. 13 Reg. UE 679/2016</a>
								autorizzo il trattamento dei dati di cui al presente modulo di contatto per i fini e le modalità indicate nell'informativa
							</b-form-checkbox>
						</b-form-checkbox-group>
					</b-form-group>
				</div>
			</div>
		</b-form>

		<div v-show="form_success && !payment_success" ref="paypal" class="paypal-wrapper text-center"></div>

		<template v-if="payment_success">
			<b-card
				border-variant="secondary"
		        header-bg-variant="secondary"
		        header-text-variant="white"
		        align="center"
				:header="$t('pages.event-details.subscription-form-success-title')"
			>
				<b-card-text>{{ $t('pages.event-details.subscription-form-success-text', { user: form.username, email: form.email}) }}</b-card-text>
			</b-card>

			<br /><br /><br /><br />

			<p class="page-subtitle">
				Non sai come funziona <b class="text-secondary">BATTLEFY</b>?
			</p>
			<a class="btn iconButton1 with-hover"
				href="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcarpiecsi%2Fvideos%2F289710082186887%2F&show_text=0&width=560"
				target="_blank"
			>
				<span>Guarda il video</span>
				<span><font-awesome-icon :icon="['fas', 'video']" /></span>
			</a>
		</template>



	</section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapActions } from 'vuex';

import pageTitle from '@/components/generic/elementBallTitle.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faVideo);

declare const paypal :any;

const Component = Vue.extend({
	name: 'event-paywall-subscription',
	components: {
		pageTitle,
		FontAwesomeIcon
	},
	data() {
		return {
			payment_success: false as boolean,
			form: {
				email: '' as string,
				username: '' as string,
				city: '' as string,
				checked: [] as boolean[],
			},
			showForm: true as boolean
		}
	},
	props: {
		event_id: {
			type: String,
			required: true,
		} as PropOptions<string>,
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
		price: {
			type: String,
			default: () => {
				return "0.01";
			}
		} as PropOptions<string>,
	},
	computed: {
		form_success() :boolean {
			//TODO validation
			return true;
		}
	},
	methods: {
		...mapActions({
			subscribe: 'addSubscription',
		}),
		onReset() :void {
			// Reset our form values
			this.form.email = '';
			this.form.username = '';
			this.form.checked = [];
			// Trick to reset/clear native browser form validation state
			this.showForm = false;
			this.$nextTick(() => {
				this.showForm = true;
			})
		}
	},
	mounted(){

		if(paypal)
			paypal.Buttons({
				//commit: true,
				//env: process.env.enviroment === "production" ? "production" : "sandbox",
				env: "sandbox",
				client: {
					sandbox: process.env.paypal_clientid,
					production: process.env.paypal_clientid,
				},
				style: {
					layout: 'vertical',
					label: 'paypal',
					size:  'responsive',
					shape: 'rect', //pill or rect
					color: 'gold',
					tagline: false,
					//fundingicons: false,
				},

				createOrder: (data :any, actions :any) => {
	                return actions.order.create({
	                    purchase_units: [{
							intent: 'CAPTURE',
							description: this.text,
							amount: {
								currency_code: 'EUR',
								value: this.price,
							},
	                    }]
	                });
	            },

	            // Finalize the transaction
	            onApprove: (data :any, actions :any) => {
	                return actions.order.capture().then((details :any) => {
						if(details.status !== "COMPLETED")
							return;
						this.subscribe([
							this.event_id,
							details.id,
							details.create_time,
							this.form.email,
							this.form.username,
							this.form.city,
						]);
						this.payment_success = true;
	                });
	            },

			})
			.render(this.$refs.paypal);
	},
});


export default Component;






/* TODO salvare da qualche parte (aggiornare ROGH)
// Finalize the transaction
onApprove: (data :any, actions :any) => {
	return actions.order.capture().then((details :any) => {
		// Show a success message to the buyer
		details.create_time
		details.update_time
		details.id
		// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-shipping_detail.address_portable
		details.payer.address
		details.payer.email_address
		// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-purchase_unit
		details.purchase_units[]
		details.status
		alert('Transaction completed by ' + details.payer.name.given_name + '!');
		this.payment_success = true;
	});
},
createOrder: (data :any, actions :any) => {
	// https://developer.paypal.com/docs/api/orders/v2/
	return actions.order.create({
		// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-purchase_unit
		purchase_units: [{
			intent: 'CAPTURE',
			description: 'descrizione lorem ipsum',
			amount: {
				currency_code: 'EUR',
				value: '7.50',
				// WARNING Se listo "items" è necessario:
				breakdown: {
					item_total: {
						value: '7.50', currency_code: 'EUR'
					}
				}
			},
			// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-item
			items: [
				{
					name: 'Hafer',
					unit_amount: {
						value: '3.50',
						currency_code: 'EUR'
					},
					quantity: '1',
				},
				{
					name: 'Discount',
					unit_amount: {
						value: '4',
						currency_code: 'EUR'
					},
					quantity: '1',
				}
			]
			// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-shipping_detail
			shipping: {
				name: {
					full_name: 'Tizio Caio',
				},
				// https://developer.paypal.com/docs/api/orders/v2/?mark=purchase_units#definition-shipping_detail.address_portable
				address: {
					address_line_1: 'Via Londra 9',
					address_line_2: 'Appartamento 17',
					admin_area_1: 'Modena',
					admin_area_2: 'Carpi',
					postal_code: '41012',
					country_code: 'IT',
				},
			},
		}]
	});
}
*/



</script>
