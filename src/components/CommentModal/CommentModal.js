import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Image } from '~/assets/image';
import { closeModalComment } from '~/redux/reducer/modunReducer';
import { handlePostComment } from '~/services/apiAuth';
import CommentItem from './CommentItem';
import EditorComment from './EditorComment';

import styles from './CommentModal.module.scss';

const cx = classNames.bind(styles);

function CommentModal({ allComments }) {
    const [isChat, setIsChat] = useState(true);
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');

    const [allComment, setAllComment] = useState(null);

    useEffect(() => {
        setAllComment(allComments);
    }, [allComments]);

    const modalComment = useSelector((state) => state.modun.modalComment?.status);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');

    const handleCloseModalComment = () => {
        dispatch(closeModalComment());
    };

    const handleGetDataChild = ({ html, text }) => {
        setText(text);
        setHtml(html);
    };

    const handleComment = async () => {
        const newComment = {
            lessonId: lessonId,
            author: currentUser._id,
            contentHTML: html,
            contentMarkdown: text,
        };
        const result = await handlePostComment(newComment);

        if (result.errCode === 0) {
            setIsChat(true);
            setAllComment(result.data);
        } else {
            alert('Lỗi vui lòng liên hệ admin để khắc phục');
        }
    };

    return (
        <div className={modalComment ? cx('wrapper') : cx('wrapper', 'open')} onClick={handleCloseModalComment}>
            <div className={cx('container')}>
                <div className={cx('close-modal')} onClick={handleCloseModalComment}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className={cx('content')} onClick={(event) => event.stopPropagation()}>
                    <div className={cx('detail')}>
                        <div className={cx('heading')}>
                            <h4 className={cx('title')}>{allComment?.length} hỏi đáp</h4>
                            <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                        </div>

                        <div className={cx('my-comment')}>
                            <div className={cx('my-avatar')}>
                                <img
                                    src={currentUser.avatar ? currentUser.avatar : Image.avatar}
                                    alt={currentUser.name}
                                />
                            </div>
                            <div className={cx('comment-content')}>
                                {isChat ? (
                                    <div className={cx('placeholder')} onClick={() => setIsChat(false)}>
                                        <span>Bạn có thắc mắc gì trong bài học này?</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className={cx('text-editor')}>
                                            <EditorComment handleGetDataChild={handleGetDataChild} />
                                        </div>
                                        <div className={cx('action-chat')}>
                                            <button className={cx('action-cancel')} onClick={() => setIsChat(true)}>
                                                Hủy
                                            </button>
                                            <button className={cx('action-ok', 'active')} onClick={handleComment}>
                                                Bình luận
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {allComment?.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
