import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slideshow from './Slideshow';
import { useEffect, useState } from 'react';
import { getAllSlideShow } from '~/services/apiBanner';

const cx = classNames.bind(styles);

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={cx(className, 'arrow')} style={{ ...style }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
}

function Banner() {
    const [slideshows, setSlideShows] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllSlideShow();

            if (result.errCode === 0) {
                setSlideShows(result.data);
            } else {
                alert('Lỗi gọi api lấy slideshow');
            }
        };
        fetchApi();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {slideshows.map((slideshow) => (
                    <div key={slideshow._id}>
                        <Slideshow
                            color={slideshow.color}
                            background={slideshow.background}
                            title={slideshow.title}
                            desc={slideshow.description}
                            link={slideshow.link}
                            textBtn={slideshow.textBtn}
                            img={slideshow.image}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;
