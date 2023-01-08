import classNames from 'classnames/bind';
import styles from './Videos.module.scss';

const cx = classNames.bind(styles);

function Videos({ videos, loading }) {
    return (
        <div className={cx('wrapper')}>
            {videos.length > 0 ? (
                <>
                    {videos.map((video) => (
                        <div className={cx('item')} key={video._id}>
                            <a href={`https://youtu.be/${video.urlVideo}`}>
                                <img src={video.image} alt={video.title} />
                            </a>
                            <div className={cx('info')}>
                                <h2>
                                    <a href={`https://youtu.be/${video.urlVideo}`}>{video.title}</a>
                                </h2>
                                <p>
                                    <a href={`https://youtu.be/${video.urlVideo}`}>Xem trên youtube</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className={cx('black')}>
                    <span>{loading && 'Đang tìm kiếm...'}</span>
                    <span>{!loading && videos.length === 0 && 'Chưa có kết quả nào phù hợp.'}</span>
                </div>
            )}
        </div>
    );
}

export default Videos;
