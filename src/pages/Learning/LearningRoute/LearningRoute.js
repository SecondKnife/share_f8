import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoursesPro from '~/components/CoursesPro';
import Heading from '~/components/Heading';
import { getLearningRouteBySlug } from '~/services/apiCourse';
import LearningPath from './LearningPath';

import styles from './LearningRoute.module.scss';

const cx = classNames.bind(styles);

function LearningRoute() {
    const [route, setRoute] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getLearningRouteBySlug(slug);

            if (result.errCode === 0) {
                setRoute(result.data);
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        };
        fetchApi();
    }, [slug]);

    return (
        <div className={cx('wrapper')}>
            <Heading name={route?.title} desc={route?.content} />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    {route?.groups.map((group) => (
                        <LearningPath key={group._id} group={group} />
                    ))}

                    <CoursesPro />
                </div>
            </div>
        </div>
    );
}

export default LearningRoute;
