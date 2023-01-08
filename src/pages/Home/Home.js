import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Banner from '~/components/Banner';
import styles from './Home.module.scss';
import CommonItem from '~/components/CommonItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCourses } from '~/services/apiCourse';
import { getDataHomePage } from '~/services/apiSearch';

const cx = classNames.bind(styles);

function Home() {
    const [countStudent, setCountStudent] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [videos, setVideos] = useState([]);

    const courses = useSelector((state) => state.home.courses?.currentCourses);

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'F8 - Học lâp trình để đi làm!';
    }, []);

    useEffect(() => {
        let totalStudent = 0;

        courses?.forEach((course) => {
            totalStudent += course.userLearning;
        });

        setCountStudent(totalStudent);
    }, [courses]);

    useEffect(() => {
        const fetchApi = async () => {
            await getAllCourses(dispatch);

            const dataHome = await getDataHomePage();

            if (dataHome.errCode === 0) {
                setBlogs(dataHome.data.homeBlogs);
                setVideos(dataHome.data.homeVideos);
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner />
            </div>

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
                        <p className={cx('sub-heading')}>
                            <strong>{countStudent}+</strong>
                            <span>người khác đã học</span>
                        </p>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Khóa học miễn phí</h4>
                            <Link className={cx('view-all')} to="/learning">
                                Xem lộ trình
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {courses?.map(
                            (course) =>
                                course.price === 0 && (
                                    <CommonItem
                                        type="free"
                                        key={course._id}
                                        student={course.userLearning}
                                        name={course.name}
                                        image={course.image}
                                        pathName={`/courses/${course.slug}`}
                                    />
                                )
                        )}
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Bài viết nổi bật</h4>
                            <Link className={cx('view-all')} to="/blog?page=1">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {blogs?.slice(-8).map((blog) => (
                            <CommonItem
                                type="blog"
                                key={blog._id}
                                name={blog.title}
                                image={blog.imagePreview}
                                author={blog.author}
                                readingTime={blog.readingTime}
                                pathName={`/blog/${blog.slug}`}
                            />
                        ))}
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Videos nổi bật</h4>
                            <a className={cx('view-all')} href="https://www.youtube.com/c/F8VNOfficial/videos">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {videos?.slice(-8).map((video) => (
                            <CommonItem
                                type="video"
                                key={video._id}
                                name={video.title}
                                image={video.image}
                                pathName={`https://www.youtube.com/watch?v=${video.urlVideo}`}
                                dataVideo={video}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
