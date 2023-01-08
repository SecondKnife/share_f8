import classNames from 'classnames/bind';
import Form from '~/components/Form';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <Form
                name="Đăng ký tài khoản F8"
                nameBtn="Đăng ký"
                question="Bạn đã có tài khoản?"
                path="/login"
                action="Đăng nhập"
                role={false}
            />
        </div>
    );
}

export default Register;
