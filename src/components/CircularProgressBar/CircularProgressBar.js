import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './CircularProgressBar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CircularProgressBar({ course }) {
    return (
        <Tippy content={course.name}>
            <Link className={cx('wrapper')} to={`/courses/${course.slug}`}>
                <img src={course.icon} alt={course.name} />
            </Link>
        </Tippy>
    );
}

export default CircularProgressBar;
