import React from 'react';
import classNames from 'classnames/bind';
import styles from './ActivityItem.module.scss';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';

const cx = classNames.bind(styles);

function ActivityItem({ info, data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={info.avatar ? info.avatar : Image.avatar} alt={info.name} />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Link className={cx('author')}>
                        <span>{info.name}</span>
                    </Link>
                    <span> đã bình luận bài viết:</span>
                    <Link className={cx('message')}>
                        <span>{data.contentMarkdown}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ActivityItem;
