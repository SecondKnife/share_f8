import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import styles from './SuggestionBox.module.scss';

const cx = classNames.bind(styles);

function SuggestionBox({ title, desc, path, nameBtn }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <h2>{title}</h2>
                <p>{desc}</p>
                {path === '/learning' ? (
                    <Link to={path}>{nameBtn}</Link>
                ) : (
                    <a href={path} target="_blank" rel="noreferrer">
                        {nameBtn}
                    </a>
                )}
            </div>
            <div className={cx('image')}>
                <img src={Image.imageLearning} alt="Học lập trình web (F8 - Fullstack.edu.vn)" />
            </div>
        </div>
    );
}

export default SuggestionBox;
