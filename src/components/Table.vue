<template>
    <div class="table-wrapper">
        <div v-if="options" class="table-options">
            <a v-show="options.export" @click="exportData">
                Export
            </a>
            <a v-show="options.arrange" @click="arrangeColumns">
                Arrange
            </a>
            <a v-show="options.reset" @click="resetTable">
                Reset
            </a>
        </div>
        <div class="table-responsive">
            <table
                v-if="clonedHeadings"
                :class="[tableClass]"
                :style="{'border-spacing': '0px ' + ($attrs.hasOwnProperty('spacing') ? $attrs.spacing + 'px' : '0px'), 'border-collapse': 'separate', 'min-width': minWidth + 'px'}"
            >
                <thead :class="[theadClass]">
                    <tr>
                        <th v-for="(header, hKey) in clonedHeadings" :key="hKey" :class="[theadThClass, typeof header.class == 'string' ? header.class : '']">
                            <span v-if="$scopedSlots[header.key + '(head)']">
                                <slot :name="header.key + '(head)'" />
                            </span>
                            <div v-else>
                                {{ header.label || header.key || '' }}
                                <span v-if="sortBy[header.key]" class="sort">
                                    <i class="material-icons" :class="{active: currentSort && currentSort.name === header.key && currentSort.value === 'asc'}" @click="changeSort(header.key, 'asc')"
                                        >arrow_drop_up</i
                                    >
                                    <i class="material-icons" :class="{active: currentSort && currentSort.name === header.key && currentSort.value === 'desc'}" @click="changeSort(header.key, 'desc')"
                                        >arrow_drop_down</i
                                    >
                                </span>
                            </div>
                        </th>
                        <th v-if="isExpandable" />
                    </tr>
                    <tr v-show="isLoading" class="linear-activity">
                        <td class="indeterminate" :colspan="isExpandable ? clonedHeadings.length + 1 : clonedHeadings.length" />
                    </tr>
                </thead>
                <tbody v-if="clonedItems.length">
                    <template v-for="(row, key) in clonedItems">
                        <tr :key="key" :class="tbodyTrClass" @click="actionWrapper(row)">
                            <td v-for="(header, hKey) in clonedHeadings" :key="hKey" :class="setTdClasses(header, row)">
                                <span v-if="$scopedSlots[header.key]">
                                    <slot :name="header.key" :value="row" />
                                </span>
                                <span v-else>
                                    {{ header.formatter ? header.formatter(row[header.key]) : row[header.key] }}
                                </span>
                            </td>
                            <td v-if="isExpandable" class="text-right" :class="setTdClasses('', row)">
                                <div class="row-expand-btn">
                                    <span :class="[row.$expanded ? 'expanded' : '']" class="material-icons" @click="expand(row, key)">expand_more</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="row.$expanded" :key="key + '-expanded'">
                            <td :colspan="clonedHeadings.length + 1">
                                <slot name="expanded-area" :data="{row, key}" />
                            </td>
                        </tr>
                    </template>
                    <tr v-if="isLoading" class="overlay" />
                </tbody>
                <div v-else-if="$slots.empty" v-show="!isLoading">
                    <slot name="empty" />
                </div>
                <div v-else v-show="!isLoading" class="empty">
                    <p>There are currently no items to show.</p>
                </div>
            </table>
        </div>
        <div v-if="pagination" class="pagination">
            <p>
                Showing {{ (pagination.currentPage - 1) * pagination.perPage + 1 }} - {{ Math.min(...[pagination.currentPage * pagination.perPage, pagination.totalItems]) }} of
                {{ pagination.totalItems }} results.
            </p>
            <ul>
                <li v-if="pagination.currentPage !== 1 && pagination.showJumpToFirst" @click="changePage(1)">
                    <!--eslint-disable-next-line-->
                    <span>{{ '<<' }}</span>
                </li>
                <li v-if="pagination.currentPage !== 1" @click="changePage(--pagination.currentPage)">
                    <!--eslint-disable-next-line-->
                    <span>{{ '<' }}</span>
                </li>
                <li v-for="(val, key) in totalPages" :key="key" :class="{active: pagination.currentPage === val}" @click="changePage(val)">
                    <span>{{ val }}</span>
                </li>
                <li v-if="clonedItems.length === pagination.perPage" @click="changePage(++pagination.currentPage)">
                    <span>{{ '>' }}</span>
                </li>
                <li v-if="clonedItems.length === pagination.perPage" @click="changePage(Math.ceil(pagination.totalItems / pagination.perPage))">
                    <span>{{ '>>' }}</span>
                </li>
            </ul>
        </div>
        <div v-if="isArrange" class="arrange">
            <div class="arrange__overlay" />
            <div class="arrange__box">
                <h6 class="arrange__box__title">
                    Arrange Columns
                </h6>
                <div class="arrange__box__body">
                    <div v-for="(prop, key) in tempHeadings" :key="key" class="arrange__box__body__option">
                        <div class="arrange__box__body__option__name">
                            {{ prop.label || prop.key }}
                        </div>
                        <div class="arrange__box__body__option__value">
                            <label :for="prop.key" class="checkbox">
                                <input :id="prop.key" v-model="prop.selected" type="checkbox" />
                                <span class="checkmark" />
                            </label>
                        </div>
                    </div>
                    <div class="text-center">
                        <Button type="success" size="sm" :action="saveColumns" text="Save" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';
export default {
    name: 'Table',
    components: {
        Button
    },
    props: {
        filters: {},
        headings: {
            type: Array
        },
        items: {
            type: [Array, Function],
            required: true
        },
        onRowClick: {
            type: Function
        },
        pagination: {
            type: Object
        },
        sort: {
            type: Object
        },
        tableClass: {
            type: String
        },
        theadClass: {
            type: String
        },
        theadThClass: {
            type: String
        },
        tbodyTrClass: {
            type: String
        },
        tbodyTdClass: {
            type: [String, Function]
        },
        minWidth: {
            type: Number,
            default: 900
        },
        isExpandable: {
            type: Boolean
        },
        options: {
            type: Object
        }
    },
    data() {
        return {
            clonedItems: [],
            sortedItems: [],
            clonedHeadings: this.headings || [],
            tempHeadings:
                this.headings.map((heading) => {
                    return {...heading, selected: true};
                }) || [],
            sortBy: {},
            currentSort: this.sort,
            isAPI: true,
            isArrange: false,
            isLoading: false
        };
    },
    computed: {
        totalPages() {
            let threshold = this.pagination.threshold ? Math.ceil(this.pagination.threshold) : 2;
            let total = Math.ceil(this.pagination.totalItems / this.pagination.perPage);
            let pages = new Set();
            let counter = this.pagination.currentPage;
            while (counter >= 1 && this.pagination.currentPage - counter <= threshold / 2) {
                pages.add(counter);
                counter--;
            }
            counter = this.pagination.currentPage;
            while (counter <= total && counter - this.pagination.currentPage <= threshold / 2) {
                pages.add(counter);
                counter++;
            }
            return Array.from(pages).sort();
        }
    },
    watch: {
        filters: {
            handler() {
                this.pagination.currentPage = 1;
                this.callAPI();
            },
            deep: true
        },
        items: {
            handler(newValue) {
                if (!this.isAPI) {
                    this.sortedItems = newValue;
                    if (this.pagination) this.changePage(1);
                }
            },
            deep: true
        }
    },
    async created() {
        // Initialise the sorts
        let err = this.validateAllProps();
        if (err) {
            console.error(err);
        }
        for (let key in this.clonedHeadings) {
            if (this.clonedHeadings[key].sortable) {
                this.sortBy[this.clonedHeadings[key].key] = true;
            }
        }
        if (Array.isArray(this.items)) {
            this.isAPI = false;
            if (this.pagination) this.pagination.totalItems = this.items.length;
        }
        if (this.sort && this.sort.name) {
            this.changeSort(this.sort.name, this.sort.value);
        } else {
            if (!this.isAPI) {
                this.sortedItems = [
                    ...this.items.map((item) => {
                        return {...item};
                    })
                ];
                if (this.pagination) {
                    this.clonedItems = this.sortedItems.slice((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
                } else {
                    this.clonedItems = this.sortedItems;
                }
            } else {
                this.callAPI();
            }
        }
    },
    methods: {
        actionWrapper(row) {
            if (this.onRowClick) this.onRowClick(row);
            else return false;
        },
        arrangeColumns() {
            this.isArrange = true;
        },
        callAPI() {
            this.isLoading = true;
            this.$nextTick(async () => {
                let obj = {
                    pagination: this.pagination,
                    sort: this.currentSort,
                    filters: this.filters
                };
                try {
                    this.clonedItems = await this.items(obj);
                    this.isLoading = false;
                } catch (err) {
                    this.isLoading = false;
                }
                this.isLoading = false;
            });
        },
        changePage(index) {
            let pagination = this.pagination;
            if (this.isAPI) {
                this.callAPI();
            } else {
                this.clonedItems = this.sortedItems.slice((index - 1) * this.pagination.perPage, index * this.pagination.perPage);
                pagination.totalItems = this.sortedItems.length;
            }
            pagination.currentPage = index;
            this.$emit('update:pagination', pagination);
        },
        changeSort(key, type) {
            this.currentSort = {
                name: key,
                value: type
            };
            if (this.isAPI) {
                this.callAPI();
            } else {
                let items = [
                    ...this.items.map((item) => {
                        return {...item};
                    })
                ];
                this.sortedItems = items.sort((a, b) => {
                    if (type === 'asc') {
                        return a[key] > b[key] ? 1 : -1;
                    } else if (type === 'desc') return b[key] > a[key] ? 1 : -1;
                    return 0;
                });
                if (this.pagination) this.changePage(this.pagination.currentPage);
                else this.clonedItems = this.sortedItems;
            }
        },
        exportData() {
            let csvContent = 'data:text/csv;charset=utf-8,';
            let includedColumns = [];
            csvContent += this.clonedHeadings.map((head) => {
                includedColumns.push(head.key);
                return head.label || head.key;
            });
            csvContent += '\r\n';
            this.sortedItems.map((item) => {
                includedColumns.map((key) => {
                    if (typeof item[key] === 'object') {
                        csvContent += this.processObject(item[key]) + ',';
                    } else if (item[key] instanceof Date) {
                        csvContent += item[key].toLocaleString();
                    } else if (key !== '_id') {
                        csvContent += item[key] + ',';
                    }
                });
                csvContent += '\r\n';
            });
            let encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        },
        processObject(obj) {
            let str = '';
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    str += this.processObject(obj[key]);
                } else if (obj[key] instanceof Date) {
                    str += obj[key].toLocaleString() + ';';
                } else if (key !== '_id') {
                    str += key + ': ' + obj[key] + ';';
                }
            }
            return str;
        },
        resetTable() {
            this.clonedHeadings = this.headings;
        },
        saveColumns() {
            this.clonedHeadings = this.tempHeadings.filter((heading) => heading.selected);
            this.isArrange = false;
        },
        setTdClasses(header, row) {
            let classes = [];
            if (header.class && typeof header.class === 'function') {
                classes.push(header.class(row));
            } else {
                classes.push(header.class);
            }
            if (typeof this.tbodyTdClass === 'function') {
                classes.push(this.tbodyTdClass(header, row));
            } else {
                classes.push(this.tbodyTdClass);
            }
            if (this.onRowClick) {
                classes.push('pointer');
            }
            return classes;
        },
        validateAllProps() {
            let err;
            if (!Array.isArray(this.items) && !this.pagination) {
                err = 'items must be a function when using it with the pagination or pagination object must be present when items is a function';
            }
            return err;
        },
        expand(row, key) {
            this.$set(row, '$expanded', !row.$expanded);
            this.$emit('expanded', {row, key});
        }
    }
};
</script>
