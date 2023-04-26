<template>
    <div>
        <h4>Choice Chips</h4>
        <Chip
            v-for="(place, index) in places"
            :key="index"
            :text="place"
            :value="place"
            :hide-remove="true"
            :class="['selection-chip', selectedPlaces.indexOf(place) > -1 ? 'selected' : '']"
            @click.native="chipClicked(place)"
        />
        <div class="spacer-v" />
        <h4>Profile Chips</h4>
        <Chip v-for="person in people" :key="person.name" :text="person.name" :value="person.name" class="profile-chip" @removed="removeChip">
            <template #pre>
                <Avatar :image-url="person.imageURL" :size="20" />
            </template>
        </Chip>
    </div>
</template>

<script>
import Chip from '@/components/Chip.vue';
import Avatar from '@/components/Avatar.vue';
export default {
    name: 'ChipsExample',
    components: {
        Chip,
        Avatar
    },
    data() {
        return {
            places: ['London', 'Liverpool', 'Sounthampton', 'Leeds'],
            selectedPlaces: [],
            people: [
                {name: 'John Doe', imageURL: 'https://m.media-amazon.com/images/M/MV5BOThhZTkxMWMtY2UyYS00MTdlLTk1ZmMtZWQ0OWFkZjE2YTA1XkEyXkFqcGdeQXVyMjU0ODI4MzY@._V1_UX172_CR0,0,172,256_AL_.jpg'},
                {name: 'Jane Doe', imageURL: 'https://66.media.tumblr.com/3f6c3a89a576a4a09a2ea18c5f2d5da9/tumblr_pk0lqkbqM31ss2e34o1_1280.jpg'}
            ]
        };
    },
    methods: {
        chipClicked(place) {
            let index = this.selectedPlaces.indexOf(place);
            if (index > -1) {
                this.selectedPlaces.splice(index, 1);
            } else {
                this.selectedPlaces.push(place);
            }
        },
        removeChip(value) {
            this.people = this.people.filter(function(item) {
                return item.name !== value;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.chip {
    margin-right: 0.5rem;
    &.selection-chip {
        cursor: pointer;
        &.selected {
            background: $brand-primary;
        }
    }
    &.profile-chip {
        background-color: $brand-primary;
        .avatar {
            margin-right: 0.5rem;
        }
    }
}
</style>
