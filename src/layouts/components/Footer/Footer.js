import classNames from 'classnames/bind';
import { FaTiktok, FaYoutubeSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ImFacebook2 } from 'react-icons/im';
import { Image } from '~/assets/image';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('colum')}>
                        <div className={cx('fill')}>
                            <div>
                                <div className={cx('colum-header')}>
                                    <Link className={cx('logo')}>
                                        <img src={Image.iconLogo} alt="Logo F8" />
                                    </Link>
                                    <h4>Học Lập Trình Để Đi Làm</h4>
                                </div>
                                <div className={cx('colum-body')}>
                                    <p>
                                        Điện thoại <a href="tel:0246.329.1102">0246.329.1102</a>
                                    </p>
                                    <p>
                                        Email: <a href="mailto:contact@fullstack.edu.vn">contact@fullstack.edu.vn</a>
                                    </p>
                                    <p>Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà Nội</p>
                                </div>
                                <div className={cx('colum-footer')}>
                                    <a
                                        className={cx('dmca')}
                                        href="https://www.dmca.com/Protection/Status.aspx?id=1b325c69-aeb7-4e32-8784-a0009613323a&refurl=https%3a%2f%2ffullstack.edu.vn%2f&rlo=true"
                                    >
                                        <img src={Image.dmca} alt="DMCA" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('colum', 'col')}>
                        <div className={cx('fill')}>
                            <div>
                                <h3 className={cx('title')}>Về F8</h3>

                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="/about-us">
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx('item')} to="/careers">
                                        <Link className={cx('link')}>Cơ hội việc làm</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={cx('colum', 'col')}>
                        <div className={cx('fill')}>
                            <div>
                                <h3 className={cx('title')}>SẢN PHẨM</h3>

                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="/shorten-urls">
                                            Rút gọn liên kết
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="">
                                            CSS Selector
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>CSS Diner</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Froggy</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Froggy Pro</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Nester</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Scoops</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={cx('colum', 'col')}>
                        <div className={cx('fill')}>
                            <div>
                                <h3 className={cx('title')}>HỖ TRỢ</h3>

                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="/contact-us">
                                            Liên hệ
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="/privacy">
                                            Bảo mật
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')} to="/terms">
                                            Điều khoản
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={cx('colum')}>
                        <div className={cx('fill')}>
                            <div>
                                <h3 className={cx('title')}>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Mã số thuế: 0109922901</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>Ngày thành lập: 04/03/2022</Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link className={cx('link')}>
                                            Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những
                                            sản phẩm mang lại giá trị cho cộng đồng.
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('bottom')}>
                        <p>© 2018 - 2022 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>

                        <div className={cx('social')}>
                            <a className={cx('youtube')} href="https://www.youtube.com/c/F8VNOfficial">
                                <FaYoutubeSquare />
                            </a>
                            <a className={cx('facebook')} href="https://www.facebook.com/groups/f8official">
                                <ImFacebook2 />
                            </a>
                            <a className={cx('tiktok')} href="https://www.tiktok.com/@f8official">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
