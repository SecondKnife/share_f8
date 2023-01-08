import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './CourseCurriculum.module.scss';

const cx = classNames.bind(styles);

function CourseCurriculum({ chapters, index }) {
    const [activeItem, setActiveIcon] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('panel')}>
                <div className={cx('chapter')} onClick={() => setActiveIcon(!activeItem)}>
                    <div className={cx('heading')}>
                        <div className={activeItem ? cx('title', 'active') : cx('title')}>
                            <span className={cx('name-chapter')}>
                                <strong>
                                    {index + 1}. {chapters.nameChapter}
                                </strong>
                            </span>
                            <div className={cx('number-lesson')}>{chapters.lesson.length} bài học</div>
                        </div>
                    </div>
                </div>

                {activeItem && (
                    <div className={cx('collapse')}>
                        {chapters.lesson.map((lesson, index) => (
                            <div className={cx('lesson-item')} key={lesson._id}>
                                <span className={cx('lesson-left')}>
                                    <FontAwesomeIcon icon={faCirclePlay} />
                                    <div className={cx('lesson-name')}>
                                        {index + 1}. {lesson.nameLesson}
                                    </div>
                                </span>
                                <span className={cx('lesson-right')}>{lesson.timeVideo}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseCurriculum;
