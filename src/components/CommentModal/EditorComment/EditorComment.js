import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function EditorComment({ handleGetDataChild }) {
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setText(text);
        setHtml(html);
    };

    useEffect(() => {
        handleGetDataChild({ html, text });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [html, text]);

    return (
        <MdEditor
            style={{ height: 280 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            placeholder="Bạn có thắc mắc gì trong bài học này?"
            view={{ html: false }}
        />
    );
}

export default EditorComment;
