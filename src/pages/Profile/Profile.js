import { faCamera, faUpload, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '~/assets/image';
import ActivityItem from '~/components/ActivityItem';
import CourseItem from '~/components/CourseItem';
import { getInfoUserByUsername } from '~/services/apiAuth';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [upload, setUpload] = useState(false);
    const [infoUser, setInfoUser] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getInfoUserByUsername(username);

            if (result.errCode === 0) {
                setInfoUser(result.data);
                document.title = `${result.data.name}`;
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        };
        fetchApi();
    }, [username]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <img
                            className={cx('avatar')}
                            src={infoUser?.avatar ? infoUser?.avatar : Image.avatar}
                            alt={infoUser?.name}
                        />
                    </div>
                    <div className={cx('user-name')}>
                        <span>{infoUser?.name}</span>
                    </div>
                </div>
                <div className={cx('btn-change')} onClick={() => setUpload(true)}>
                    <FontAwesomeIcon icon={faCamera} />
                    <span>Chỉnh sửa ảnh bìa</span>
                </div>
                {upload && (
                    <div className={cx('upload')}>
                        <label className={cx('label')}>
                            <div className={cx('label-item')}>
                                <FontAwesomeIcon icon={faUpload} />
                                <span>Tải ảnh lên</span>
                            </div>
                        </label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" />
                    </div>
                )}
            </div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('content-box')}>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Giới thiệu</h4>
                                <div className={cx('participation')}>
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <span>
                                        Thành viên của <strong>F8 - Học lập trình để đi làm </strong>
                                        {moment(infoUser?.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Hoạt động gần đây</h4>
                                <div className={cx('no-participation')}>
                                    {infoUser?.myComments.length > 0 ? (
                                        infoUser?.myComments
                                            .slice(-10)
                                            .map((comment, index) => (
                                                <ActivityItem key={index} info={infoUser} data={comment} />
                                            ))
                                    ) : (
                                        <span>Chưa có hoạt động gần đây</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('content-box')}>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Các khóa học đã tham gia</h4>
                                <div className={cx('no-participation')}>
                                    {infoUser?.myCourses.length > 0 ? (
                                        infoUser?.myCourses
                                            .slice(-10)
                                            .map((course, index) => <CourseItem key={index} data={course} />)
                                    ) : (
                                        <span>Chưa có khóa học nào được đăng ký</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
