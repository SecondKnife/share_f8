import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './LearningPath.module.scss';

const cx = classNames.bind(styles);

function LearningPath({ group }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>
                {group.priority}. {group.title}
            </h2>
            <div className={cx('desc')}>{group.description}</div>

            <div className={cx('body')}>
                {group.courses.map((course) => (
                    <div className={cx('item')} key={course._id}>
                        <div className={cx('wrap')}>
                            <div className={cx('thumb')}>
                                <Link to={`/courses/${course.slug}`}>
                                    <img src={course.image} alt={course.name} />
                                </Link>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title-course')}>
                                    <Link to={`/courses/${course.slug}`}>
                                        <span>{course.name}</span>
                                        <span className={cx('free')}>{course.price > 0 ? 'Pro' : 'Miễn phí'}</span>
                                    </Link>
                                </div>
                                <p className={cx('desc-course')}>{course.description}</p>
                                <Link className={cx('btn-course')} to={`/courses/${course.slug}`}>
                                    {currentUser.myCourses.includes(course._id) ? 'Tiếp tục học' : 'Xem khóa học'}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningPath;
