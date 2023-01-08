import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getLessonById } from '~/services/apiCourse';
import MarkdownParser from '../MarkdownParser';
import VideoTrack from '../VideoTrack';
import styles from './ContentTrack.module.scss';

const cx = classNames.bind(styles);

function ContentTrack() {
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);
    const lesson = useSelector((state) => state.lesson?.currentLesson);
    const date = moment(lesson?.updatedAt);

    const dispatch = useDispatch();
    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        if (lessonId) {
            const fetchApi = async () => {
                await getLessonById(lessonId, dispatch);
            };
            fetchApi();
        }
    }, [lessonId, dispatch]);

    return (
        <div className={sidebarCourse ? cx('wrapper') : cx('wrapper', 'active')}>
            <VideoTrack status={sidebarCourse} />

            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('heading')}>
                        <h2 className={cx('title')}>{lesson?.nameLesson}</h2>
                        <p className={cx('time-update')}>
                            Cập nhật tháng {date.format('MM')} năm {date.format('YYYY')}
                        </p>
                    </div>

                    <button className={cx('note')}>
                        <FontAwesomeIcon icon={faPlus} />

                        <span className={cx('label')}>
                            Thêm ghi chú tại <span className={cx('number')}>00:00</span>
                        </span>
                    </button>
                </div>

                <MarkdownParser data={lesson?.descHTML} fontSize="1.6rem" />
            </div>

            <p className={cx('powered')}>
                Made with <FontAwesomeIcon icon={faHeart} /> <span className={cx('dot')}>·</span> Powered by F8
            </p>
        </div>
    );
}

export default ContentTrack;
