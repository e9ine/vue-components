<template>
    <div class="rich-text-editor">
        <editor-content ref="editor" :editor="editor" />
        <div class="extensions-images">
            <div v-for="(item, key) in attachments" :key="key" class="image-wrapper">
                <img :alt="key" :src="options.attachmentKey ? item[options.attachmentKey] : item" @click="previewAttachment(key, item)" />
                <button class="icon-button icon-button-top" @click="removeAttachment(key, item)">
                    <Icon name="close" />
                </button>
            </div>
        </div>
        <div class="rich-text-editor-extensions">
            <editor-menu-bar v-slot="{commands, isActive, getMarkAttrs}" :editor="editor">
                <div>
                    <Overlay :show="linkMenuIsActive" :opacity="0.4" :show-close="false">
                        <form class="link-modal">
                            <h4>Add link</h4>
                            <div class="form-group">
                                <label for="link" class="control-label" />
                                <input id="link" ref="linkInput" v-model="linkUrl" class="form-control" type="text" placeholder="https://" autocomplete="off" @keydown.esc="hideLinkMenu" />
                            </div>
                            <Button class="mr-2" type="danger" text="Cancel" :action="() => setLinkUrl(commands.link, null)" />
                            <Button type="success" text="Save" :action="() => setLinkUrl(commands.link, linkUrl)" />
                        </form>
                    </Overlay>
                    <div class="rich-text-editor-extensions-wrapper" :class="{'formatter-active': isFormatterActive}">
                        <div class="extensions-format">
                            <IconButton icon="text_format" class="icon-button toggle" :class="{active: isFormatterActive}" :action="activateFormatter" />
                            <IconButton icon="format_bold" :class="{visible: isFormatterActive, active: isActive.bold()}" :action="commands.bold" />
                            <IconButton icon="format_italic" :class="{visible: isFormatterActive, active: isActive.italic()}" :action="commands.italic" />
                            <IconButton icon="strikethrough_s" :class="{visible: isFormatterActive, active: isActive.strike()}" :action="commands.strike" />
                            <IconButton icon="format_list_bulleted" :class="{visible: isFormatterActive, active: isActive.bullet_list()}" :action="commands.bullet_list" />
                            <IconButton icon="format_list_numbered" :class="{visible: isFormatterActive, active: isActive.ordered_list()}" :action="commands.ordered_list" />
                            <IconButton icon="format_quote" :class="{visible: isFormatterActive, active: isActive.blockquote()}" :action="commands.blockquote" />
                            <IconButton v-if="!linkMenuIsActive" icon="link" :class="{visible: isFormatterActive, active: isActive.link()}" :action="() => showLinkMenu(getMarkAttrs('link'))" />
                        </div>
                        <div class="extensions-extra">
                            <emoji-picker :search="search" @emoji="append">
                                <button slot="emoji-invoker" slot-scope="{events: {click: clickEvent}}" class="icon-button" @click.stop="clickEvent">
                                    <Icon name="sentiment_satisfied_alt" />
                                </button>
                                <div slot="emoji-picker" slot-scope="{emojis, insert}">
                                    <div style="position: relative">
                                        <div class="emoji-picker">
                                            <div class="form-group">
                                                <input v-model="search" aria-label="emoji-picker" class="form-control border" type="text" />
                                            </div>
                                            <div>
                                                <div v-for="(emojiGroup, category) in emojis" :key="category">
                                                    <h5>{{ category }}</h5>
                                                    <div class="emojis">
                                                        <span v-for="(emoji, emojiName) in emojiGroup" :key="emojiName" :title="emojiName" @click="insert(emoji)">{{ emoji }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </emoji-picker>
                            <IconButton icon="attachment" :action="addAttachment" />
                            <IconButton v-if="options.content !== '<p></p>'" class="send" icon="send" :action="send" />
                        </div>
                    </div>
                </div>
            </editor-menu-bar>
        </div>
    </div>
</template>

<script>
import Button from '../Button.vue';
import IconButton from '../rich-text/IconButton.vue';
import EmojiPicker from 'vue-emoji-picker';
import Overlay from '../Overlay.vue';
import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
import EnterHandler from '../rich-text/EnterHandler';
import {Blockquote, BulletList, OrderedList, Bold, Italic, Strike, Link, ListItem, HardBreak} from 'tiptap-extensions';
import Icon from '../rich-text/Icon.vue';
export default {
    name: 'RichText',
    components: {
        Button,
        Icon,
        IconButton,
        EditorMenuBar,
        EditorContent,
        EmojiPicker,
        Overlay
    },
    props: {
        options: {
            type: Object,
            required: true
        },
        attachments: {
            type: Array,
            default: () => []
        },
        send: {
            type: Function,
            required: true
        },
        addAttachment: {
            type: Function,
            default: () => {}
        },
        previewAttachment: {
            type: Function,
            default: () => {}
        },
        removeAttachment: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            editor: new Editor({
                autoFocus: this.options.autoFocus,
                content: this.options.content ? this.options.content : this.options.placeholder ? '<p>' + this.options.placeholder + '</p>' : '<p>Start typing...</p>',
                onUpdate: ({getHTML}) => {
                    this.options.content = getHTML();
                },
                onFocus: () => {
                    if (!this.isFirstFocus) {
                        this.isFirstFocus = true;
                        this.clearContent();
                    }
                    this.$emit('focus');
                },
                onBlur: () => {
                    this.$emit('blur');
                },
                extensions: [new Blockquote(), new BulletList(), new OrderedList(), new Bold(), new Italic(), new Strike(), new Link(), new ListItem(), new HardBreak(), new EnterHandler(this.send)]
            }),
            isFirstFocus: false,
            linkUrl: null,
            linkMenuIsActive: false,
            search: '',
            isFormatterActive: false
        };
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        activateFormatter() {
            this.isFormatterActive = !this.isFormatterActive;
        },
        clearContent() {
            this.editor.clearContent();
        },
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href;
            this.linkMenuIsActive = true;
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            });
        },
        hideLinkMenu() {
            this.linkUrl = null;
            this.linkMenuIsActive = false;
        },
        setLinkUrl(command, url) {
            command({
                href: url,
                target: '_blank'
            });
            setTimeout(() => {
                this.hideLinkMenu();
            }, 0);
        },
        append(emoji) {
            if (!this.isFirstFocus) {
                this.isFirstFocus = true;
                this.clearContent();
            }
            const transaction = this.editor.state.tr.insertText(emoji);
            this.editor.view.dispatch(transaction);
        }
    }
};
</script>
