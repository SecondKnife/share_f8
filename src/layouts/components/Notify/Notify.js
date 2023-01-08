import classNames from 'classnames/bind';
import HandlessTippy from '@tippyjs/react/headless';
import styles from './Notify.module.scss';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import 'moment/locale/vi';

const cx = classNames.bind(styles);

function Notify() {
    const [notify, setNotify] = useState([]);
    const [active, setActive] = useState(false);
    const [watch, setWatch] = useState(false);
    const [read, setRead] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        setNotify(currentUser.notify);
    }, [currentUser.notify]);

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('notify-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Thông báo</h4>

                            <HandlessTippy
                                interactive
                                visible={watch}
                                onClickOutside={() => setWatch(false)}
                                render={(attrs) => (
                                    <div className={cx('watched')} tabIndex="-1" {...attrs}>
                                        <div className={cx('send')} onClick={() => setRead(true)}>
                                            <HiCheck />
                                            <span>Đánh dấu tất cả đã đọc</span>
                                        </div>
                                    </div>
                                )}
                            >
                                <span className={cx('dots')} onClick={() => setWatch(!watch)}>
                                    <HiDotsHorizontal />
                                </span>
                            </HandlessTippy>
                        </div>
                        <div className={cx('content')}>
                            {notify?.map((noti) => (
                                <div
                                    className={read ? cx('item', 'read') : cx('item')}
                                    key={noti.timestamps}
                                    onClick={() => setRead(true)}
                                >
                                    <div className={cx('avatar')}>
                                        <img src={noti.avatar} alt={noti.description} />
                                    </div>
                                    <div className={cx('message')}>
                                        <div className={cx('message-tt')}>
                                            Chào mừng<strong> {currentUser.name} </strong>đã gia nhập F8.{' '}
                                            {noti.description} &#129505;
                                        </div>
                                        <div className={cx('time')}>{moment(noti.timestamps).from(moment.now())}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            >
                <button className={cx('btn-notify')} onClick={() => setActive(!active)}>
                    <FontAwesomeIcon icon={faBell} />
                </button>
            </HandlessTippy>
        </div>
    );
}

export default Notify;
