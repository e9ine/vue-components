<template>
    <div>
        <h5>Search an Address</h5>
        <address-finder :address.sync="address" :local-addresses="localAddresses" :options="options" class="address-finder" type="Google" @updated="addressChanged"></address-finder>
    </div>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_KEY,
        libraries: 'places'
    },
    installComponents: false
});
export default {
    name: 'GoogleAddressFinderExample',
    data() {
        return {
            address: {},
            options: {
                componentRestrictions: {
                    country: 'gb'
                }
            },
            localAddresses: [
                {
                    Name: 'e9 office',
                    Line1: 'Tower Bridge Road',
                    Line2: null,
                    TownCity: 'London',
                    County: 'Greater London',
                    PostCode: 'SE1 2UP',
                    Country: 'United Kingdom',
                    Latitude: 51.5054564,
                    Longitude: -0.07535649999999999,
                    Summary: 'Tower Bridge Rd, London SE1 2UP, UK'
                },
                {
                    Line1: ' Gateway Road',
                    Line2: 'Leyton',
                    TownCity: 'London',
                    County: 'Greater London',
                    PostCode: 'E10 5BY',
                    Country: 'United Kingdom',
                    Latitude: 51.5585809,
                    Longitude: -0.0141258,
                    Summary: 'Gateway Rd, Leyton, London E10 5BY, UK'
                }
            ],
            newAddress: {}
        };
    },
    methods: {
        addressChanged(data) {
            this.newAddress = data;
        }
    },
    async created() {
        this.options.google = await this.$gmapApiPromiseLazy();
    }
};
</script>
