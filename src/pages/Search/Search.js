import classNames from 'classnames/bind';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Courses from './Courses';
import Posts from './Posts';
import styles from './Search.module.scss';
import Videos from './Videos';
import useDebounce from '~/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { search } from '~/services/apiSearch';

const cx = classNames.bind(styles);

function Search() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [courses, setCourses] = useState([]);
    const [posts, setPost] = useState([]);
    const [videos, setVideos] = useState([]);

    const navigate = useNavigate();
    const { slug } = useParams();
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('q');

    const debounced = useDebounce(searchValue, 600);

    useEffect(() => {
        setSearchValue(q);
    }, [q]);

    useEffect(() => {
        if (searchValue !== '') {
            navigate(`/search/${slug}?q=${searchValue}`);
        }

        if (searchValue === '') {
            setActiveTab(false);
        }

        if (!debounced.trim()) {
            return;
        }

        if (debounced.length > 1) {
            setLoading(true);
            const fetchApi = async () => {
                const result = await search(debounced);
                setActiveTab(true);

                if (result.errCode === 0) {
                    setLoading(false);
                    setCourses(result.data.courses);
                    setPost(result.data.blogs);
                    setVideos(result.data.videos);
                } else {
                    setLoading(false);
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleOnChangeInput = (e) => {
        setSearchValue(e);
        setActiveTab(true);

        if (searchValue === '') {
            setCourses([]);
            setPost([]);
            setVideos([]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <input
                    className={activeTab ? cx('active') : ''}
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchValue}
                    onChange={(e) => handleOnChangeInput(e.target.value)}
                />

                <div className={cx('result')}>
                    <div className={cx('content')}>
                        {activeTab && searchValue !== '' && (
                            <div className={cx('heading')}>
                                <ul className={cx('tabs')}>
                                    <li>
                                        <NavLink
                                            className={(nav) => cx({ active: nav.isActive })}
                                            to={`/search/courses?q=${searchValue}`}
                                        >
                                            Khóa học
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={(nav) => cx({ active: nav.isActive })}
                                            to={`/search/posts?q=${searchValue}`}
                                        >
                                            Bài viết
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={(nav) => cx({ active: nav.isActive })}
                                            to={`/search/videos?q=${searchValue}`}
                                        >
                                            Video
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className={cx('divider')}></div>
                            </div>
                        )}

                        {searchValue !== '' && (
                            <>
                                {slug === 'courses' && <Courses loading={loading} courses={courses} />}
                                {slug === 'posts' && <Posts loading={loading} posts={posts} />}
                                {slug === 'videos' && <Videos loading={loading} videos={videos} />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
