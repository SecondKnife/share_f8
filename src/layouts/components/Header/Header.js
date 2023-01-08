import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '~/assets/image';
import Search from '../Search';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import MyCourse from '~/layouts/components/MyCourse';
import Notify from '../Notify';
import MyInfo from '../MyInfo';
import BackButton from '~/components/BackButton';
import PreviewPost from '~/components/PreviewPost';
import { Fragment, useState } from 'react';

const cx = classNames.bind(styles);

function Header({ post, activePublic, dataNewPost }) {
    const [activePrevPost, setActivePrevPost] = useState(false);
    const isUser = useSelector((state) => state.auth.login.currentUser);
    const pathName = useLocation().pathname;
    const checkPathProfile = pathName.includes('/@');
    const checkPathNewPost = pathName.includes('/new-post') || pathName.includes('/search');

    return (
        <div className={checkPathProfile ? cx('wrapper', 'active') : cx('wrapper')}>
            {activePrevPost && <PreviewPost setActivePrevPost={setActivePrevPost} dataNewPost={dataNewPost} />}

            <div className={cx('logo')}>
                <Link to="/">
                    <img src={Image.iconLogo} alt="logo F8" />
                </Link>
                {pathName === '/' ? <h4>Học Lập Trình Để Đi Làm</h4> : <BackButton />}
            </div>

            {checkPathProfile ? Fragment : !checkPathNewPost ? <Search /> : Fragment}

            <div className={cx('action')}>
                {isUser !== null ? (
                    <div className={cx('is-login')}>
                        {post && (
                            <button
                                className={activePublic ? cx('public-post', 'active') : cx('public-post')}
                                onClick={() => setActivePrevPost(true)}
                            >
                                Xuất bản
                            </button>
                        )}
                        {!checkPathProfile && <MyCourse />}
                        <Notify />
                        <MyInfo />
                    </div>
                ) : (
                    <div className={cx('btn-login')}>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
