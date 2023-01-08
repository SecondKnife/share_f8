import classNames from 'classnames/bind';
import styles from './Slideshow.module.scss';

const cx = classNames.bind(styles);

function Slideshow({ color, background, title, desc, link, textBtn, img }) {
    const style = { '--cta-hover-color': color, background: background };

    return (
        <div className={cx('item')} style={style}>
            <div className={cx('left')}>
                <h2 className={cx('heading')}>
                    <a rel="noreferrer" target="_blank" href={link}>
                        {title}
                    </a>
                </h2>
                <p className={cx('desc')}>{desc}</p>
                <div>
                    <a rel="noreferrer" className={cx('ctaBtn')} target="_blank" href={link}>
                        {textBtn}
                    </a>
                </div>
            </div>
            <div className={cx('right')}>
                <a rel="noreferrer" target="_blank" href={link}>
                    <img className={cx('img')} src={img} alt={title} title={title} />
                </a>
            </div>
        </div>
    );
}

export default Slideshow;
