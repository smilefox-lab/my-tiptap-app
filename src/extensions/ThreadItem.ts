import { Node, mergeAttributes } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export const ThreadItem = Node.create({
    name: 'threadItem',
    group: 'block',
    content: 'paragraph+',
    parseHTML() {
        return [{ tag: 'div[data-type="thread-item"]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'thread-item' }), 0];
    },
});

export const extensions = [
    Document,
    Paragraph,
    Text,
    ThreadItem,
];