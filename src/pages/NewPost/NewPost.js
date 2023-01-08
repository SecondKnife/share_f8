import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditorNewPost from '~/components/EditorNewPost';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import styles from './NewPost.module.scss';

const cx = classNames.bind(styles);

function NewPost() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');

    useEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = 'Viết blog | F8';
        }
    }, [title]);

    const [activePublic, setActivePublic] = useState(false);

    const words = text.split(' ');
    const wordCount = (words.length / 60).toFixed();

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const author = currentUser?._id;

    const handleGetDataNewPost = ({ text, html }) => {
        setText(text);
        setHtml(html);
    };

    useEffect(() => {
        if (text !== '' && title !== '') {
            setActivePublic(true);
        } else {
            setActivePublic(false);
        }
    }, [text, title]);

    return (
        <div className={cx('wrapper')}>
            <Header post={true} activePublic={activePublic} dataNewPost={{ title, text, html, wordCount, author }} />

            <div className={cx('container')}>
                <div className={cx('title')}>
                    <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={cx('text-editor')}>
                    <EditorNewPost handleGetDataNewPost={handleGetDataNewPost} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default NewPost;
