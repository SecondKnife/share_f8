import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import TrackItem from '../TrackItem/TrackItem';
import styles from './SidebarTrack.module.scss';

const cx = classNames.bind(styles);

function SidebarTrack({ chapters, slug }) {
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);

    return (
        <div className={sidebarCourse ? cx('wrapper') : cx('wrapper', 'active')}>
            <div className={cx('learn-list')}>
                <div className={cx('header')}>
                    <h2 className={cx('heading')}>Nội dung khóa học</h2>
                </div>

                <div className={cx('body')}>
                    {chapters?.map((chapter, index) => (
                        <TrackItem key={chapter._id} chapter={chapter} index={index} slug={slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SidebarTrack;
