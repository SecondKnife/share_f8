import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data, handleHideResult }) {
    return (
        <>
            {data.urlVideo ? (
                <a
                    className={cx('wrapper')}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://youtu.be/${data.urlVideo}`}
                    onClick={handleHideResult}
                >
                    <img src={data.image} alt={data.title} />
                    <span>{data.title}</span>
                </a>
            ) : (
                <Link
                    className={cx('wrapper')}
                    to={data.imagePreview ? `/blog/${data.slug}` : `/courses/${data.slug}`}
                    onClick={handleHideResult}
                >
                    <img src={data.image || data.imagePreview} alt={data.name || data.title} />
                    <span>{data.name || data.title}</span>
                </Link>
            )}
        </>
    );
}

export default SearchItem;
