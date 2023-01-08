import classNames from 'classnames/bind';
import HandlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './MyCourse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyCourses } from '~/services/apiAuth';

const cx = classNames.bind(styles);

function MyCourse() {
    const [active, setActive] = useState(false);
    const [allMyCourse, setAllMyCourse] = useState([]);

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleGetAllMyCourses = async () => {
        if (!active) {
            setActive(!active);
            const result = await getAllMyCourses(currentUser._id);

            if (result.errCode === 0) {
                setAllMyCourse(result.data);
            } else {
                alert('Lỗi api lấy khóa học đang học');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('course-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Khóa học của tôi</h4>
                        </div>
                        <div className={cx('content')}>
                            {allMyCourse?.length > 0 ? (
                                allMyCourse.map((course) => (
                                    <div className={cx('item')} key={course._id}>
                                        <Link to={`/courses/${course.slug}`}>
                                            <img className={cx('img')} src={course.image} alt={course.name} />
                                        </Link>
                                        <div className={cx('info')}>
                                            <h5 className={cx('info-title')}>
                                                <Link to={`/courses/${course.slug}`}>{course.name}</Link>
                                            </h5>
                                            <p className={cx('complete')}>Vừa học xong</p>
                                            <Tippy content="1%" placement="bottom">
                                                <div className={cx('vertical')}></div>
                                            </Tippy>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={cx('unregistered')}>Bạn chưa đăng ký khóa học nào</div>
                            )}
                        </div>
                    </div>
                )}
            >
                <button className={cx('btn')} onClick={handleGetAllMyCourses}>
                    Khóa học của tôi
                </button>
            </HandlessTippy>
        </div>
    );
}

export default MyCourse;
