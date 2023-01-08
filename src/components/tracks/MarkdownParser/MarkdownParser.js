import classNames from 'classnames/bind';
import styles from './MarkdownParser.module.scss';

const cx = classNames.bind(styles);

function MarkdownParser({ data, fontSize }) {
    return (
        <div className={cx('wrapper')} style={{ fontSize: fontSize }} dangerouslySetInnerHTML={{ __html: data }}></div>
    );
}

export default MarkdownParser;
