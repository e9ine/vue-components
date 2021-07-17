<template>
    <div class="form-group">
        <label class="control-label">{{ label }}</label>
        <div class="address-finder" :class="type == 'Google' ? 'google-address-finder' : ''" v-click-outside="closeAddressList">
            <input type="text" v-debounce="300" @focus="inputFocussed" v-model="searchTxt" class="address-text" @change="searchChanged" autocomplete="no" placeholder="Start typing to search..." />
            <div ref="mapDiv"></div>
            <div v-if="!addressSelected && (filteredAddresses.length > 0 || predictions.length > 0)">
                <div class="places-result">
                    <div v-if="filteredAddresses.length > 0">
                        <div class="places-title"><span class="material-icons">bookmark_border</span><span>Saved Places</span></div>
                        <div class="places-wrapper">
                            <div class="place" v-for="(_pred, key) in filteredAddresses" :key="'local-' + key" @click="setAddress(_pred, true)">
                                <a v-text="_pred.Name || _pred.Summary"></a>
                                <p class="place-desc"><small v-text="_pred.Summary" v-show="_pred.Name"></small></p>
                            </div>
                        </div>
                    </div>
                    <div v-if="predictions.length > 0" :class="filteredAddresses.length > 0 ? 'saved-results' : ''">
                        <div class="places-title">
                            <span class="material-icons">place</span><span>{{ source }} Search</span>
                        </div>
                        <div class="places-wrapper">
                            <div class="place" v-for="(_pred, key) in predictions" :key="key">
                                <a v-text="_pred.description || _pred.Summary" @click="setAddress(_pred)"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import('../../directives/v-debounce');
import('../../directives/v-click-outside');
import {getPredictionsFromPostcodeAPI} from './postcodeService';
import {getPredictionsFromGoogle, getAddressFromGoogle} from './googleService';
import {getPredictionsFromMaps9} from './maps9Service';
const postcodeRegex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

export default {
    name: 'AddressFinder',
    props: {
        address: {
            type: Object,
            default: () => {
                return {};
            }
        },
        label: {
            type: String
        },
        type: {
            type: String,
            default: 'Maps9'
        },
        options: {
            type: Object
        },
        localAddresses: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            searchTxt: (this.address && this.address.Summary) || '',
            addressSelected: true,
            addressObj: this.address,
            autocomplete: null,
            predictions: [],
            source: null
        };
    },
    methods: {
        inputFocussed() {
            this.addressSelected = false;
        },
        closeAddressList() {
            this.addressSelected = true;
        },
        async searchChanged() {
            try {
                if (this.searchTxt.length >= 3) {
                    let result;
                    this.postCodeSearch = false;
                    if (postcodeRegex.test(this.searchTxt)) {
                        this.source = 'Postcode';
                        result = await getPredictionsFromPostcodeAPI(this.searchTxt);
                    } else if (this.type == 'Google') {
                        this.source = 'Google';
                        result = await getPredictionsFromGoogle(this.searchTxt, this.options);
                    } else {
                        this.source = 'Maps9';
                        result = await getPredictionsFromMaps9(this.searchTxt, this.options);
                    }
                    this.predictions = [];
                    if (result) {
                        this.predictions = result;
                        this.addressSelected = false;
                    }
                } else {
                    this.predictions = [];
                }
            } catch (err) {
                console.error(err);
            }
        },
        async setAddress(pred, local) {
            if (this.source == 'Google' && !local) {
                this.addressObj = await getAddressFromGoogle(pred, this.$refs.mapDiv, this.options);
                this.searchTxt = this.addressObj.Summary;
            } else {
                this.addressObj = pred;
                this.searchTxt = pred.Summary;
            }
            this.addressSelected = true;
            this.$emit('update:address', this.addressObj);
            this.$emit('changed', this.addressObj);
        }
    },
    computed: {
        filteredAddresses() {
            return this.searchTxt && this.searchTxt.length >= 3
                ? this.localAddresses.filter((item) =>
                    (item.Name + item.Line1 + item.Line2 + item.Line3 + item.TownCity + item.County + item.PostCode + item.Country + item.Summary)
                        .toLowerCase()
                        .includes(this.searchTxt.toLowerCase())
                )
                : this.localAddresses;
        }
    },
    created() {
        this.component = () => import('./' + this.type + 'AddressFinder.vue');
    }
};
</script>
