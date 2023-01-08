import { useEffect } from 'react';
import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import { useSelector } from 'react-redux';
import CommonItem from '~/components/CommonItem';
import styles from './Courses.module.scss';
import SuggestionBox from '~/components/SuggestionBox';

const cx = classNames.bind(styles);

function Courses() {
    const courses = useSelector((state) => state.home.courses?.currentCourses);

    useEffect(() => {
        document.title = 'Danh sách các khóa học lập trình tại F8';
    });

    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Khóa học"
                desc="Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học miễn phí, chất lượng, nội dung dễ hiểu."
            />

            <div className={cx('course')}>
                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>
                                Khóa học Pro
                                <span className={cx('course-new')}>Mới</span>
                            </h4>
                        </div>
                    </div>
                    <div className={cx('list')}>
                        <CommonItem
                            type="pro"
                            name="HTML CSS Pro"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                        />
                        <CommonItem
                            type="pro"
                            coming={true}
                            name="JavaScript Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
                        />
                        <CommonItem
                            type="pro"
                            coming={true}
                            name="ReactJS Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/20/62f13dded314e.png"
                        />
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Khóa học miễn phí</h4>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {courses?.map((course) => (
                            <CommonItem
                                type="free"
                                key={course._id}
                                student={course.userLearning}
                                name={course.name}
                                image={course.image}
                                pathName={course.slug}
                            />
                        ))}
                    </div>
                </div>

                <SuggestionBox
                    title="Bạn đang tìm kiếm lộ trình học cho người mới?"
                    desc="Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu."
                    path="/learning"
                    nameBtn="Xem lộ trình"
                />
            </div>
        </div>
    );
}

export default Courses;
