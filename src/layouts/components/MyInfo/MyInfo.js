import HandlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './MyInfo.module.scss';
import { Image } from '~/assets/image';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/services/apiAuth';
import { loginSuccess } from '~/redux/reducer/authReducer';
import { createAxios } from '~/redux/createInstance';

const cx = classNames.bind(styles);

function MyInfo() {
    const [active, setActive] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const accessToken = currentUser?.accessToken;

    const id = currentUser?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLout = async () => {
        const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
        await logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
    };

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('my-info')} tabIndex="-1" {...attrs}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img
                                    src={currentUser.avatar !== '' ? currentUser.avatar : Image.avatar}
                                    alt={currentUser.name}
                                />
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{currentUser.name}</span>
                                <div className={cx('username')}>@{currentUser.username}</div>
                            </div>
                        </div>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to={`/@${currentUser.username}`}>Trang c?? nh??n</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="/new-post">Vi???t blog</Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="/me/post/:tab">B??i vi???t c???a t??i</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="/me/bookmark/posts">B??i vi???t ???? l??u</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="/settings">C??i ?????t</Link>
                            </li>
                            <li className={cx('item')} onClick={handleLout}>
                                <Link>????ng xu???t</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('btn-info')} onClick={() => setActive(!active)}>
                    <img src={currentUser.avatar !== '' ? currentUser.avatar : Image.avatar} alt={currentUser.name} />
                </div>
            </HandlessTippy>
        </div>
    );
}

export default MyInfo;
