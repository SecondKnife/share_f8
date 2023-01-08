import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

function Posts({ posts, loading }) {
    return (
        <div className={cx('wrapper')}>
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => (
                        <div className={cx('item')} key={post._id}>
                            <Link to={`/blog/${post.slug}`}>
                                <img src={post.imagePreview} alt={post.title} />
                            </Link>
                            <div className={cx('info')}>
                                <h2>
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <p>
                                    <Link to={`/blog/${post.slug}`}>Đọc tiếp...</Link>
                                </p>
                                <div className={cx('reaction')}>
                                    <div className={cx('heart')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span>41</span>
                                    </div>
                                    <div className={cx('comment')}>0 bình luận</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className={cx('black')}>
                    <span>{loading && 'Đang tìm kiếm...'}</span>
                    <span>{!loading && posts.length === 0 && 'Chưa có kết quả nào phù hợp.'}</span>
                </div>
            )}
        </div>
    );
}

export default Posts;
