import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import MarkdownParser from '~/components/tracks/MarkdownParser';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Link to={`/@${comment.author?.username}`}>
                    <img
                        src={comment.author?.avatar !== '' ? comment.author?.avatar : Image.avatar}
                        alt={comment.author?.name}
                    />
                </Link>
            </div>

            <div className={cx('body')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <Link to={`/@${comment.author?.username}`}>
                            <span className={cx('author')}>{comment.author?.name}</span>
                        </Link>
                        <div className={cx('text')}>
                            <MarkdownParser data={comment?.contentHTML} fontSize="1.4rem" />
                        </div>
                    </div>

                    <div className={cx('time')}>
                        <p className={cx('createdAt')}>
                            <button className={cx('icon')}>
                                <span className={cx('like')}>Thích</span>
                            </button>
                            <span>·</span>
                            <span className={cx('reply-comment')}>Trả lời</span>
                            <span>·</span>
                            <span className={cx('create-time')}>{moment(comment?.createdAt).fromNow()}</span>
                            <span className={cx('more-btn-wrap')}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
