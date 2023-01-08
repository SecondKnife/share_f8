import Select from 'react-select';
import classNames from 'classnames/bind';

import styles from './PreviewPost.module.scss';
import { useRef, useState } from 'react';
import { handleUploadImage } from '~/services/apiImage';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateNewPost } from '~/services/apiBlog';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const options = [
    { value: 'front-end-mobile-apps', label: 'Front-end / Mobile apps' },
    { value: 'back-end-devops', label: 'Back-end / Devops' },
    { value: 'ui-ux-design', label: 'UI / UX / Design' },
    { value: 'others', label: 'Others' },
];

function PreviewPost({ setActivePrevPost, dataNewPost }) {
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handlePublicNewPost = async () => {
        const tags = selectedOption?.map((option) => {
            return option.value;
        });
        const newPost = {
            title: dataNewPost.title,
            author: currentUser._id,
            contentHTML: dataNewPost.html,
            contentMarkdown: dataNewPost.text,
            readingTime: dataNewPost.wordCount,
            imagePreview: image,
            tags: tags,
        };
        const result = await handleCreateNewPost(newPost, dispatch);

        if (result.errCode === 0) {
            navigate(`/blog/${result.data.slug}`);
        } else {
            alert(`Lỗi : ${result.message}`);
        }
    };

    const handleSelectImage = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const result = await handleUploadImage(formData, dispatch);

        if (result.errCode === 0) {
            setImage(result.data.urlImage);
            return result.data.urlImage;
        } else {
            alert('Upload ảnh thất bại');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('close')} onClick={() => setActivePrevPost(false)}>
                ×
            </div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('wrap')}>
                        <div className={cx('box')}>
                            <div className={cx('preview')}>
                                <h3>Xem trước</h3>

                                <div
                                    className={cx('image-prev')}
                                    onClick={() => inputRef.current.click()}
                                    style={image && { backgroundImage: `url(${image})` }}
                                >
                                    <input ref={inputRef} onChange={handleSelectImage} type="file" />
                                    <p>
                                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                    </p>
                                    <span>Bấm vào đây để chọn ảnh</span>
                                </div>
                                <div className={cx('prev-title')}>{dataNewPost.title}</div>
                                <div className={cx('prev-desc')}>{dataNewPost.text}</div>

                                <p className={cx('note')}>
                                    <strong>Lưu ý: </strong>
                                    <span>
                                        Chỉnh sửa tại đây sẽ thay đổi cách bài viết được hiển thị tại trang chủ, tin nổi
                                        bật - Chứ không ảnh hưởng tới nội dung bài viết của bạn.
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className={cx('box')}>
                            <div className={cx('preview-tag')}>
                                <p>Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.</p>

                                <Select
                                    isMulti
                                    placeholder="Chọn tags của chủ đề của bạn"
                                    onChange={setSelectedOption}
                                    options={options}
                                />

                                <div className={cx('action')}>
                                    <button className={cx('action-public')} onClick={handlePublicNewPost}>
                                        Xuất bản ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewPost;
