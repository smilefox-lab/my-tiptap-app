import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from '../extensions/ThreadItem';
import { ThreadPluginExtension } from '../extensions/ThreadPluginExtension';

const CommentApp: React.FC = () => {
    const editor = useEditor({
        extensions: [...extensions, ThreadPluginExtension],
        content: '<div data-type="thread-item"><p>Start typing</p></div>',
    });

    if (!editor) {
        return null; // Ensure editor is initialized before rendering
    }

    return (
        <div className="flex items-start">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2 flex justify-center items-center">A</div>
            <div className='flex flex-col items-start'>
                <div className="flex gap-1">
                    <span className="font-bold">John Doe</span>
                    <span className="text-gray-500">@johndoe</span>
                </div>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default CommentApp;