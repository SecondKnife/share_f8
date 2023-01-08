import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '~/redux/reducer/modunReducer';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.addEventListener('wheel', (event) => {
                event.preventDefault();
            });
        }
    }, []);

    return (
        <>
            <div ref={modalRef} className={cx('wrapper')}>
                <div className={cx('content')}>
                    <h2 className={cx('heading')}>Bảng Tin F8</h2>

                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <h4 className={cx('title')}>
                                Chào mừng {currentUser.name} đến với dự án clone F8 - Fullstack.edu.vn
                            </h4>
                            <p className={cx('time')}>10 ngày trước</p>
                            <div className={cx('body')}>
                                <p>
                                    Chào bạn mình tên <strong>Hà</strong>. Đây là dự án của mình với mục đính học hỏi và
                                    trau dồi kiến thức học được chứ không phải vì mục đính phá hoại hay công kích tổ
                                    chức hay cá nhân nào cả!
                                </p>
                                <p>
                                    <span>Bạn có thể truy cập : </span>
                                    <a href="https://fullstack.edu.vn/">https://fullstack.edu.vn/</a>
                                    <span> để tham khảo trang gốc</span>
                                </p>
                                <i>
                                    <strong>Cảm ơn bạn đã đến đây chúc bạn 1 ngày thật tuyệt vời &#128151;</strong>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('close')} onClick={handleCloseModal}>
                    ×
                </div>
            </div>
            <div ref={modalRef} className={cx('overlay')} onClick={handleCloseModal}></div>
        </>
    );
}

export default Modal;
