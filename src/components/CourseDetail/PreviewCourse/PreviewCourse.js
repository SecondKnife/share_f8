import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import styles from './PreviewCourse.module.scss';

const cx = classNames.bind(styles);

function PreviewCourse({ course, modalPrev, setModalPrev }) {
    return (
        <div className={modalPrev ? cx('wrapper') : cx('wrapper', 'active')} onClick={() => setModalPrev(false)}>
            <div className={cx('container')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <div className={cx('body')} onClick={(event) => event.stopPropagation()}>
                            <div className={cx('close-btn')} onClick={() => setModalPrev(false)}>
                                ×
                            </div>

                            <h4>Giới thiệu khóa học</h4>
                            <h3>{course.name}</h3>

                            <div className={cx('video')}>
                                <div className={cx('play')}>
                                    <ReactPlayer
                                        width="100%"
                                        height="100%"
                                        playing={modalPrev}
                                        controls
                                        url={`https://www.youtube.com/watch?v=${course.video}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewCourse;
