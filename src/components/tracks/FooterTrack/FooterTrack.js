import { faArrowRight, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { closeSidebarCourse, openSidebarCourse } from '~/redux/reducer/modunReducer';
import styles from './FooterTrack.module.scss';

const cx = classNames.bind(styles);

function FooterTrack({ chapters }) {
    const [nextLesson, setNextLesson] = useState('');
    const [prevLesson, setPrevLesson] = useState('');
    const [active, setActive] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const slug = useParams().slug;
    const currentId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const lessonIds = [];

        for (let i = 0; i < chapters?.length; i++) {
            const chapter = chapters[i];
            for (let j = 0; j < chapter.lesson.length; j++) {
                const lesson = chapter.lesson[j];
                lessonIds.push(lesson._id);
            }
        }

        let prevId;
        let nextId;

        for (let i = 0; i < lessonIds.length; i++) {
            if (lessonIds[i] === currentId) {
                if (i > 0) {
                    prevId = lessonIds[i - 1];
                }
                if (i < lessonIds.length - 1) {
                    nextId = lessonIds[i + 1];
                }
            }
        }
        setNextLesson(nextId);
        setPrevLesson(prevId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleSidebar = () => {
        if (active) {
            dispatch(openSidebarCourse());
            setActive(false);
        } else {
            dispatch(closeSidebarCourse());
            setActive(true);
        }
    };

    const handlePrevLesson = () => {
        if (prevLesson) {
            navigate(`/courses/${slug}?id=${prevLesson}`);
        }
    };

    const handleNextLesson = () => {
        if (nextLesson) {
            navigate(`/courses/${slug}?id=${nextLesson}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button className={prevLesson ? cx('btn-left') : cx('btn-left', 'active')} onClick={handlePrevLesson}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Bài trước</span>
            </button>
            <button className={nextLesson ? cx('btn-right') : cx('btn-right', 'active')} onClick={handleNextLesson}>
                <span>Bài tiếp theo</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className={cx('toggle-sidebar')} onClick={handleToggleSidebar}>
                <h3 className={cx('title')}>1. Giới thiệu</h3>
                <button className={cx('toggle-btn')}>
                    {active ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faArrowRight} />}
                </button>
            </div>
        </div>
    );
}

export default FooterTrack;
