<template>
    <div class="row">
        <div class="col-sm-4">
            <h4>Address Finder</h4>
            <address-finder v-if="options.google" :address.sync="address" :options="options" :local-addresses="localAddresses" type="Google" @updated="addressChanged" />
        </div>
    </div>
</template>

<script>
import AddressFinder from '@/components/address-finder/Component.vue';

export default {
    name: 'AddressFinderExample',
    components: {
        AddressFinder
    },
    data() {
        return {
            address: {},
            options: {
                componentRestrictions: {
                    country: 'gb'
                },
                google: null,
                initialValue: 'Tower Bridge Rd, London SE1 2UP, UK'
            },
            localAddresses: [
                {
                    Name: 'e9 WeWork Office',
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
                    Line1: 'Gateway Road',
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
    async created() {
        this.options.google = await this.$gmapApiPromiseLazy();
    },
    methods: {
        addressChanged(data) {
            this.newAddress = data;
        }
    }
};
</script>

<style lang="scss" scoped></style>
