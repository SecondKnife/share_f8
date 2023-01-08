import React from 'react';
import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CourseItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('thumb')} to={`/courses/${data.pathName}`}>
                <img src={data.image} alt={data.name} />
            </Link>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link to={`/courses/${data.pathName}`}>{data.name}</Link>
                </h4>
                <p className={cx('desc')}>{data.description}</p>
            </div>
        </div>
    );
}

export default CourseItem;
