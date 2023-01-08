import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('logo')} to="/">
                    <img src={Image.iconLogo} alt="Logo" />
                </Link>
                <p className={cx('name')}>
                    <Link to="/">Học Lập Trình Để Đi Làm</Link>
                </p>
            </div>

            <div className={cx('content')}>
                <h2 className={cx('error-404')}>&nbsp;</h2>
                <h1 className={cx('error-title')}>Không tìm thấy nội dung &#128531;</h1>

                <ul>
                    <li>
                        URL của nội dung này đã <strong>bị thay đổi</strong> hoặc <strong>không còn tồn tại</strong>.
                    </li>
                    <li>
                        Nếu bạn <strong>đang lưu URL này</strong>, hãy thử <strong>truy cập lại từ trang chủ </strong>
                        thay vì dùng URL đã lưu.
                    </li>
                </ul>

                <p>
                    <Link className={cx('back-home')} to="/">
                        Truy cập trang chủ
                    </Link>
                </p>

                <p>
                    &#128073; hoặc đi tới
                    <Link className={cx('my-courses')} to="/my-courses">
                        Khóa học của tôi
                    </Link>
                </p>
            </div>

            <div className={cx('copyright')}>© 2018 - 2023 F8. Nền tảng học lập trình hàng đầu Việt Nam</div>
        </div>
    );
}

export default NotFound;
