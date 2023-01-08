import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CommonItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faComment, faEye, faPlay, faThumbsUp, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconCrownUser } from '~/assets/Icon';
import { Image } from '~/assets/image';

const cx = classNames.bind(styles);

function CommonItem({
    type,
    pathName,
    student,
    coming = false,
    name,
    imageComing,
    image,
    author,
    dataVideo,
    readingTime,
    styles = null,
}) {
    return (
        <div className={cx('wrapper')} style={styles}>
            <div className={cx('item-course')}>
                {type === 'video' ? (
                    <a
                        className={coming ? cx('link', 'disabled') : cx('link')}
                        href={pathName}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className={cx('image')} src={coming ? imageComing : image} alt={name} />
                        <button className={cx('btn-view')}>Xem khóa học</button>

                        {type === 'pro' && (
                            <div className={cx('crown')}>
                                <img
                                    src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                                    alt="Crown"
                                />
                            </div>
                        )}

                        {type === 'video' && (
                            <div className={cx('video-wrap')}>
                                <div className={cx('play')}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                                <div className={cx('duration')}>
                                    <span>{dataVideo.timeVideo}</span>
                                </div>
                            </div>
                        )}
                    </a>
                ) : (
                    <Link className={coming ? cx('link', 'disabled') : cx('link')} to={pathName}>
                        <img className={cx('image')} src={coming ? imageComing : image} alt={name} />
                        <button className={cx('btn-view')}>Xem khóa học</button>

                        {type === 'pro' && (
                            <div className={cx('crown')}>
                                <img
                                    src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                                    alt="Crown"
                                />
                            </div>
                        )}

                        {type === 'video' && (
                            <div className={cx('video-wrap')}>
                                <div className={cx('play')}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                                <div className={cx('duration')}>
                                    <span>{dataVideo.timeVideo}</span>
                                </div>
                            </div>
                        )}
                    </Link>
                )}

                <h4 className={cx('name-course')}>
                    <Link to={pathName} className={coming ? cx('disabled-name') : ''}>
                        {name}
                    </Link>
                </h4>

                {type === 'pro' && !coming && (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>2.499.000đ</span>
                        <span className={cx('new-price')}>1.299.000đ</span>
                    </div>
                )}

                {type === 'free' && (
                    <div className={cx('studying')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{student}</span>
                    </div>
                )}

                {type === 'blog' && (
                    <div className={cx('author')}>
                        <Link className={cx('avatar-wrap')} to={`/@${author.username}`}>
                            <div className={author?.admin ? cx('avatar', 'admin') : cx('avatar')}>
                                <img src={author?.avatar !== '' ? author?.avatar : Image.avatar} alt={author?.name} />
                            </div>
                            {author?.admin && <IconCrownUser className={cx('crown-user')} />}
                        </Link>
                        <Link className={cx('name-author')} to={`/@${author.username}`}>
                            <span className={cx('user-name')}>{author?.name}</span>
                            {author?.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                            <span className={cx('dot')}>·</span>
                            <span>{readingTime > 0 ? readingTime : '1'} phút đọc</span>
                        </Link>
                    </div>
                )}

                {type === 'video' && (
                    <div className={cx('stats')}>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>{new Intl.NumberFormat('it-IT').format(dataVideo.view)}</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{new Intl.NumberFormat('it-IT').format(dataVideo.like.toLocaleString())}</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>{new Intl.NumberFormat('it-IT').format(dataVideo.comment)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommonItem;
