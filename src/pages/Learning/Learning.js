import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Learning.module.scss';
import Heading from '~/components/Heading';
import LearningPathItem from '~/components/LearningPathItem';
import { Image } from '~/assets/image';
import SuggestionBox from '~/components/SuggestionBox';
import { getLearningRoute } from '~/services/apiCourse';

const cx = classNames.bind(styles);

function Learning() {
    const [learningRoute, setLearningRoute] = useState([]);

    useEffect(() => {
        document.title = 'Lộ trình học lập trình cho người mới tại F8';
    });

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getLearningRoute();

            if (result.errCode === 0) {
                setLearningRoute(result.data);
            } else {
                alert('Lỗi gọi api lấy lộ trình học');
            }
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Lộ trình học"
                desc="Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    “Lập trình viên Front-end” bạn nên tập trung vào lộ trình “Front-end”."
            />

            <div className={cx('body')}>
                <div className={cx('content')}>
                    {learningRoute.map((route) => (
                        <LearningPathItem key={route._id} data={route} />
                    ))}
                </div>

                <SuggestionBox
                    title="Tham gia cộng đồng học viên F8 trên Facebook"
                    desc="Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau
                    trong quá trình học nhé."
                    path="https://www.facebook.com/groups/f8official"
                    nameBtn="Tham gia nhóm"
                />
            </div>
        </div>
    );
}

export default Learning;
