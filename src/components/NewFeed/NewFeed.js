import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { IconBullHorn } from '~/assets/Icon';
import styles from './NewFeed.module.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '~/redux/reducer/modunReducer';

const cx = classNames.bind(styles);

function NewFeed() {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy content="Bảng tin F8">
                <button className={cx('btn')} onClick={handleOpenModal}>
                    <span className={cx('icon')}>
                        <IconBullHorn />
                    </span>
                </button>
            </Tippy>
        </div>
    );
}

export default NewFeed;
