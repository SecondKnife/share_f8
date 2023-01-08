import classNames from 'classnames/bind';
import CommonItem from '../CommonItem';
import styles from './CoursesPro.module.scss';

const cx = classNames.bind(styles);

function CoursesPro() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>
                Các khóa học Pro tại F8
                <img
                    className={cx('crown-icon')}
                    src="https://res.cloudinary.com/dwld3bqia/image/upload/v1672844503/Banner/crown_icon_qjnbtf.svg"
                    alt="Crown Icon"
                />
            </h2>

            <p className={cx('desc')}>
                Các khóa học Pro được thiết kế đầy đủ chi tiết, bài bản. Với đa dạng các loại bài học và bài tập thực
                hành đi kèm, code luôn ở trang web. Cuối khóa học sẽ được thực hành từ 8 - 10 dự án thực chiến với cấp
                độ từ dễ đến khó.
            </p>

            <div className={cx('courses')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <CommonItem
                            styles={{ width: '100%' }}
                            type="pro"
                            name="HTML CSS Pro"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                        />
                    </div>
                    <div className={cx('content')}>
                        <CommonItem
                            styles={{ width: '100%' }}
                            type="pro"
                            coming={true}
                            name="JavaScript Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
                        />
                    </div>
                    <div className={cx('content')}>
                        <CommonItem
                            styles={{ width: '100%' }}
                            type="pro"
                            coming={true}
                            name="ReactJS Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/20/62f13dded314e.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesPro;
