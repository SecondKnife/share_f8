import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import CircularProgressBar from '../CircularProgressBar';
import styles from './LearningPathItem.module.scss';

const cx = classNames.bind(styles);

function LearningPathItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>
                        <Link>{data.title}</Link>
                    </h3>
                    <p className={cx('desc')}>{data.description}</p>
                </div>
                <div className={cx('thumb')}>
                    <Link>
                        <img src={data.image} alt={data.title} />
                    </Link>
                </div>
            </div>

            <div className={cx('list-course')}>
                {data.courses.map((course) => (
                    <CircularProgressBar key={course._id} course={course} />
                ))}
            </div>

            <div className={cx('btn-detail')}>
                <Link to={data.slug}>Xem chi tiết</Link>
            </div>
        </div>
    );
}

export default LearningPathItem;
