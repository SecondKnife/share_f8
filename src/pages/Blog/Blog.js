import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import PostItem from '~/components/PostItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import { getPageBlogs } from '~/services/apiBlog';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
    const [dataPages, setDataPages] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const navigate = useNavigate();

    const location = useLocation();
    const page = new URLSearchParams(location.search).get('page');

    useEffect(() => {
        const fetchApi = async () => {
            if (!page) {
                navigate('/blog?page=1');
            }
            if (page) {
                const result = await getPageBlogs(page);

                if (result.errCode === 0) {
                    setDataPages(result.data);
                    setTotalPage(result.totalPages);
                } else {
                    alert('Lỗi lấy dữ liệu bài viết');
                }
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        document.title = 'Danh sách bài viết về lĩnh vực IT';
    });

    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Bài viết nổi bật"
                desc="Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web."
            />

            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('content-left')}>
                        {dataPages?.map((post) => (
                            <PostItem key={post._id} dataPost={post} />
                        ))}

                        <Pagination totalPage={totalPage} />
                    </div>
                </div>
                <div className={cx('right')}>
                    <h4>Các chủ đề được đề xuất</h4>
                    <ul>
                        <li>
                            <Link>Front-end / Mobile apps</Link>
                        </li>
                        <li>
                            <Link>Back-end / Devops</Link>
                        </li>
                        <li>
                            <Link>UI / UX / Design</Link>
                        </li>
                        <li>
                            <Link>Others</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Blog;
