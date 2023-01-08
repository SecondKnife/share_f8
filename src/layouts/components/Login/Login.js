import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Form from '~/components/Form';
import Loading from '~/components/Loading';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const isFetching = useSelector((state) => state.auth.login.isFetching);

    return (
        <div className={cx('wrapper')}>
            {isFetching && <Loading />}
            <Form
                name="Đăng nhập vào F8"
                nameBtn="Đăng nhập"
                question="Bạn chưa có tài khoản?"
                path="/register"
                action="Đăng ký"
                role={true}
            />
        </div>
    );
}

export default Login;
