import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ totalPage }) {
    const savedPage = localStorage.getItem('currentPage');
    const initialPage = savedPage ? parseInt(savedPage, 10) : 1;

    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
    };

    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            <Link
                key={i}
                className={cx('page', { active: currentPage === i })}
                to={`/blog?page=${i}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Link>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <Link
                to={currentPage === 1 ? `/blog?page=${1}` : `/blog?page=${currentPage - 1}`}
                className={cx('page', { disabled: currentPage === 1 })}
                onClick={currentPage === 1 ? null : () => handlePageChange(currentPage - 1)}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </Link>

            {pages.map((page) => page)}

            <Link
                to={currentPage === totalPage ? `/blog?page=${totalPage}` : `/blog?page=${currentPage + 1}`}
                className={cx('page', { disabled: currentPage === totalPage })}
                onClick={currentPage === totalPage ? null : () => handlePageChange(currentPage + 1)}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </Link>
        </div>
    );
}

export default Pagination;
