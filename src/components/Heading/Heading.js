import className from 'classnames/bind';
import styles from './Heading.module.scss';

const cx = className.bind(styles);

function Heading({ name, desc }) {
    return (
        <div className={cx('wrapper')}>
            <h2>{name}</h2>
            <div className={cx('desc')}>
                <p>{desc}</p>
            </div>
        </div>
    );
}

export default Heading;
