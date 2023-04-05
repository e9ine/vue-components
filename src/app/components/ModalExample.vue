<template>
    <div>
        <Button size="md" type="primary" text="Create" :action="showModal" />
        <Button size="md" type="danger" text="Delete" :action="showModal2" class="ml-2" />
        <Button size="md" type="danger" text="Image Selector" :action="showModal3" class="ml-2" />
        <Modal v-model="show1" size="lg" centered @cancel="cancel" @save="modalOKed">
            <template #title>
                {{ header }}
            </template>
            <template #body>
                <p>Are you sure you want to delete this item?</p>
            </template>
            <template #footer>
                <Button size="md" type="border-primary" text="Cancel" :action="cancel" />
                <Button size="md" type="primary" text="Save" :action="save" />
            </template>
        </Modal>
        <Modal v-model="show2" size="md" @cancel="cancel" @save="modalOKed">
            <template #body>
                <p>Are you sure you want to delete this item?</p>
            </template>
            <template #footer>
                <Button size="md" type="border-primary" text="Cancel" :action="cancel" />
                <Button size="md" type="primary" text="Delete" :action="save" />
            </template>
        </Modal>
        <ImageSelector v-model="show3" @cancel="cancel" @close="close" />
    </div>
</template>
<script>
import Modal from '@/components/modal';
import Button from '@/components/Button.vue';
import ImageSelector from '@/components/ImageSelector.vue';

export default {
    name: 'ModalExample',
    components: {
        Modal,
        Button,
        ImageSelector
    },
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            header: 'ABC 1',
            header2: 'XYZ 1'
        };
    },
    methods: {
        showModal() {
            this.show1 = true;
            setTimeout(() => {
                this.header = 'ABC 2';
            }, 1000);
        },
        showModal2() {
            this.show2 = true;
            setTimeout(() => {
                this.header2 = 'XYZ 2';
            }, 1000);
        },
        showModal3() {
            this.show3 = true;
        },
        cancel() {
            this.show1 = false;
            this.show2 = false;
            this.show3 = false;
        },
        modalOKed() {
            this.show1 = false;
            this.show2 = false;
        },
        save() {
            this.show1 = false;
            this.show2 = false;
        },
        close() {}
    }
};
</script>
