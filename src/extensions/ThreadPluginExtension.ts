import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

const ThreadPlugin = new Plugin({
    key: new PluginKey('threadPlugin'),
    props: {
        handleDOMEvents: {
            paste(view, event) {
                // Handle paste logic for thread items
                return false;
            },
        },
        handleKeyDown(view, event) {
            const { state, dispatch } = view;
            const { selection } = state;
            const { $from, $to } = selection;

            if (event.key === 'Backspace' && $from.pos === $to.pos) {
                // Handle deletion of thread items
                const nodeBefore = $from.nodeBefore;
                if (nodeBefore && nodeBefore.type.name === 'threadItem' && nodeBefore.content.size === 0) {
                    dispatch(state.tr.deleteRange($from.pos - nodeBefore.nodeSize, $from.pos));
                    return true;
                }
            }

            if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
                // Handle selection behavior
                if ($from.node().type.name === 'threadItem') {
                    dispatch(state.tr.setSelection(TextSelection.create(state.doc, $from.start(), $from.end())));
                    return true;
                }
            }

            return false;
        },
    },
    appendTransaction(transactions, oldState, newState) {
        // Handle splitting and merging of thread items
        return null;
    },
});

export const ThreadPluginExtension = Extension.create({
    name: 'threadPluginExtension',
    addProseMirrorPlugins() {
        return [ThreadPlugin];
    },
});