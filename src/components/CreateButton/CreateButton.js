import classNames from 'classnames/bind';
import HandlessTippy from '@tippyjs/react/headless';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CreateButton.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CreateButton() {
    const [click, setClick] = useState(false);

    return (
        <HandlessTippy
            interactive
            visible={click}
            onClickOutside={() => setClick(false)}
            render={(attrs) => (
                <div className={cx('new-post')} tabIndex="-1" {...attrs}>
                    <Link to="/new-post">
                        <FontAwesomeIcon icon={faPen} />
                        <span>Viết blog</span>
                    </Link>
                </div>
            )}
        >
            <div className={click ? cx('create-blog', 'active') : cx('create-blog')} onClick={() => setClick(!click)}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </HandlessTippy>
    );
}

export default CreateButton;
