import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Courses.module.scss';

const cx = classNames.bind(styles);

function Courses({ courses, loading }) {
    return (
        <div className={cx('wrapper')}>
            {courses.length > 0 ? (
                <>
                    {courses.map((course) => (
                        <div className={cx('item')} key={course._id}>
                            <Link to={`/courses/${course.slug}`}>
                                <img src={course.image} alt={course.name} />
                            </Link>
                            <div className={cx('info')}>
                                <h2>
                                    <Link to={`/courses/${course.slug}`}>{course.name}</Link>
                                </h2>
                                <p>{course.description}</p>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className={cx('black')}>
                    <span>{loading && 'Đang tìm kiếm...'}</span>
                    <span>{!loading && courses.length === 0 && 'Chưa có kết quả nào phù hợp.'}</span>
                </div>
            )}
        </div>
    );
}

export default Courses;
