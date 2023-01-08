import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { IconCrownUser } from '~/assets/Icon';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Image } from '~/assets/image';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function PostItem({ dataPost }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('author')}>
                    <Link to={`/@${dataPost.author.username}`}>
                        <div className={cx('avatar-wrap')}>
                            <div className={dataPost.author.admin ? cx('avatar', 'admin') : cx('avatar')}>
                                <img
                                    src={dataPost.author.avatar ? dataPost.author.avatar : Image.avatar}
                                    alt={dataPost.author.name}
                                />
                            </div>
                            {dataPost.author.admin && <IconCrownUser />}
                        </div>
                    </Link>
                    <Link to={`/@${dataPost.author.username}`}>
                        <span>{dataPost.author.name}</span>
                        {dataPost.author.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                    </Link>
                </div>

                <div className={cx('actions')}>
                    <div className={cx('btn-save')}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <div className={cx('btn-option')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>

            <div className={cx('body')}>
                <div className={cx('content')}>
                    <Link to={`/blog/${dataPost.slug}`}>
                        <h2 className={cx('title')}>{dataPost.title}</h2>
                    </Link>
                    <p className={cx('desc')}>
                        {dataPost.contentMarkdown.length > 130
                            ? dataPost.contentMarkdown.substring(0, 130) + '...'
                            : dataPost.contentMarkdown}
                    </p>
                    <div className={cx('info')}>
                        {dataPost.tags.length > 0 && <Link className={cx('tags')}>{dataPost.tags[0]}</Link>}

                        <span>{moment(dataPost.createdAt).fromNow()}</span>
                        <span className={cx('dot')}>·</span>
                        <span>{dataPost.readingTime > 0 ? dataPost.readingTime : 0} phút đọc</span>
                    </div>
                </div>
                {dataPost.imagePreview && (
                    <div className={cx('thumb')}>
                        <Link to={`/blog/${dataPost.slug}`}>
                            <img src={dataPost.imagePreview} alt={dataPost.title} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostItem;
