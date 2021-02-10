<template>
    <div>
        <Table
            :items="items"
            :headings="columns"
            :on-row-click="rowClicked"
            :pagination.sync="pagination"
            :sort.sync="sort"
            table-class="tr-split table-bordered"
            thead-class="thead-light"
            :tbody-td-class="tbodyTdClass"
            :options="tableOptions"
            :is-expandable="true"
            responsive
        >
            <template v-slot:OS="data">
                <div class="logo" :style="{'background-image': 'url(' + getImageUrl(data) + ')'}"></div>
            </template>
            <template v-slot:expanded-area="data">
                <div class="result">
                    <pre>{{ data.data.row.result }}</pre>
                </div>
            </template>
        </Table>
    </div>
</template>

<script>
import Table from '../../../src/components/Table';

export default {
    name: 'NormalTable',
    components: {
        Table
    },
    data() {
        return {
            columns: [
                {
                    key: 'Hostname',
                    sortable: true
                },
                {
                    key: 'OS'
                },
                {
                    key: 'IPAddress'
                },
                {
                    key: 'LifeCycleStatus',
                    label: 'Status',
                    sortable: true
                },
                {
                    key: 'Environment',
                    class: (data) => {
                        return data.Environment;
                    },
                    formatter: (data) => {
                        return data.toUpperCase();
                    }
                },
                {
                    key: 'Network'
                }
            ],
            items: [
                {
                    Hostname: 'e9ine-host01',
                    IPAddress: '192.168.0.1',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'Live',
                    Critical: 'ProductionCritical',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/hpux.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host02',
                    IPAddress: '192.168.0.2',
                    Network: 'MBN',
                    LifeCycleStatus: 'SwitchedOff',
                    Environment: 'Live',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/solaris.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host03',
                    IPAddress: '192.168.1.199',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'prod',
                    OS: {},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },

                {
                    Hostname: 'e9ine-host04',
                    IPAddress: '192.168.28.151',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'dr',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/hpux.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host05',
                    IPAddress: '192.168.2.0',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'prod',
                    OS: {},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },

                {
                    Hostname: 'e9ine-host06',
                    IPAddress: '192.168.2.22',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'dr',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/hpux.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host07',
                    IPAddress: '192.168.11.11',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'dr',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/ibm.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host08',
                    IPAddress: '192.168.11.21',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'Live',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/np_window-data-base_705788_2E4066.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host09',
                    IPAddress: '192.168.11.30',
                    Network: 'SDN',
                    LifeCycleStatus: 'SwitchedOff',
                    Environment: 'Live',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/redhat.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                },
                {
                    Hostname: 'e9ine-host10',
                    IPAddress: '192.168.110.22',
                    Network: 'CDN',
                    LifeCycleStatus: 'Active',
                    Environment: 'Live',
                    OS: {Logo: 'https://storage.googleapis.com/oneview-production-bucket/resources/hpux.png'},
                    result:
                        '500.0: Module or ISAPI error occurred.\n500.11: Application is shutting down on the web server.\n500.12: Application is busy restarting on the web server.\n500.13: Web server is too busy.\n500.15: Direct requests for global.asax are not allowed.\n500.19: Configuration data is invalid.\n500.21: Module not recognised.'
                }
            ],
            pagination: {
                perPage: 4,
                totalItems: 0,
                currentPage: 1,
                threshold: 2,
                showJumpToLast: true,
                showJumpToFirst: true
            },
            sort: {
                name: 'Hostname',
                value: 'asc'
            },
            tableOptions: {
                export: true,
                arrange: true,
                reset: true
            }
        };
    },
    methods: {
        getImageUrl(data) {
            return data.value.OS ? data.value.OS.Logo : '';
        },
        rowClicked(data) {
            console.log(JSON.stringify(data));
        },
        tbodyTdClass(header, row) {
            return row.LifeCycleStatus + ' pointer';
        }
    }
};
</script>

<style lang="scss" scoped>
.logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-color: white;
}
</style>
<style lang="scss">
table {
    display: table;
    margin: 0;
}
.table-wrapper table tbody tr td {
    &.SwitchedOff {
        background-color: rgba(231, 178, 169, 0.65);
    }
}
.result {
    padding: 0 0.5rem;
    pre {
        background: #f0f0f5;
        padding: 1rem;
        border-radius: 4px;
    }
}
</style>
