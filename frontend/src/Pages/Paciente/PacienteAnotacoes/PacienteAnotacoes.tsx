import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Button } from '@mantine/core';
import { DataAgoraPorExtenso } from '../../../Utils/Data';
import { useState } from 'react';

const content =
    `<u>${DataAgoraPorExtenso()}</u><br /><br />
      `;

export function PacienteAnotacoes() {
    const [salvou, setSalvou] = useState<boolean>(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
        ],
        content,
        onUpdate: () => { salvou && setSalvou(false) }
    });


    function onSave() {
        console.log(editor.getHTML());
        setSalvou(true);
    }

    return (
        <RichTextEditor editor={editor} variant='subtle'>
            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
                <Button disabled={salvou} size='compact-sm' onClick={onSave}>Salvar</Button>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    );
}