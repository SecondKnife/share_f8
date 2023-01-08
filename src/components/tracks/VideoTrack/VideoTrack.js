import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import styles from './VideoTrack.module.scss';

const cx = classNames.bind(styles);

function VideoTrack({ status }) {
    const lesson = useSelector((state) => state.lesson?.currentLesson);
    const modalComment = useSelector((state) => state.modun.modalComment.status);

    return (
        <div className={status ? cx('wrapper') : cx('wrapper', 'active')}>
            <div className={cx('player-wrap')}>
                <div className={cx('player')}>
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        playing={!modalComment}
                        controls
                        light={lesson?.thumbNail}
                        url={`https://www.youtube.com/watch?v=${lesson?.urlVideo}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoTrack;
