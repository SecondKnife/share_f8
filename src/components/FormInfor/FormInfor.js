import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSendMail, loginUser, RegisterNewUser } from '~/services/apiAuth';
import { openModal } from '~/redux/reducer/modunReducer';
import styles from './FormInfor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FormInfor({ role, nameBtn }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [btnText, setBtnText] = useState('Gửi mã');
    const [btnCount, setBtnCount] = useState(0);

    const [active, setActive] = useState(false);
    const [activeBtnCode, setActiveBtnCode] = useState(false);
    const [activeInputCode, setActiveInputCode] = useState(false);

    const [loading, setLoading] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [validCode, setValidCode] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let interval;

        if (btnCount > 0) {
            interval = setInterval(() => {
                setBtnCount(btnCount - 1);
            }, 1000);
            setBtnText(`Gửi lại mã ${btnCount}`);
            setActiveBtnCode(false);
        } else if (btnCount === 0) {
            setValidCode('');
            setBtnText('Gửi mã');
            setActiveBtnCode(true);
        }

        return () => clearInterval(interval);
    }, [btnCount]);

    useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPassword = /^.{8,}$/;

        if (regexEmail.test(email) && regexPassword.test(password) && btnCount === 0) {
            setActiveBtnCode(true);
        } else {
            setActiveBtnCode(false);
        }

        if (regexEmail.test(email) && regexPassword.test(password)) {
            if (role) {
                setActive(true);
            } else if (!role && code.length === 6) {
                setActive(true);
            }
        } else {
            setActive(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password, code]);

    const handleSubmit = async () => {
        if (active) {
            if (role) {
                const user = {
                    email: email,
                    password: password,
                };
                const result = await loginUser(user, dispatch, navigate);

                if (result?.data.errCode === 1) {
                    setValidEmail(result.data.message);
                } else if (result?.data.errCode === 2) {
                    setValidPassword(result.data.message);
                } else if (result === undefined) {
                    setValidEmail('Kết nối database thất bại');
                } else if (result.errCode === 0) {
                    dispatch(openModal());
                }
            } else {
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    code: code,
                };
                const result = await RegisterNewUser(newUser, dispatch, navigate);

                if (result?.data.errCode === 2 || result?.data.errCode === 3) {
                    setValidEmail(result.data.message);
                } else if (result?.data.errCode === 4) {
                    setValidPassword(result.data.message);
                } else if (result?.data.errCode === 5) {
                    setValidCode(result.data.message);
                } else if (result === undefined) {
                    setValidEmail('Kết nối database thất bại');
                } else if (result.errCode === 0) {
                    dispatch(openModal());
                }
            }
        }
    };

    const handleValidName = (name) => {
        // eslint-disable-next-line no-useless-escape
        const regexName = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;

        if (regexName.test(name)) {
            setValidName(true);
        } else {
            setValidName(false);
        }
    };

    const handleOnchangeCode = (e) => {
        if (activeInputCode) {
            setCode(e);
        }
    };

    const handleSendCode = async () => {
        if (activeBtnCode) {
            setActiveInputCode(true);
            setActiveBtnCode(false);
            setLoading(true);
            const result = await handleSendMail(email);
            setCode('');
            if (result.errCode === 0) {
                setBtnCount(120);
                setLoading(false);
            } else {
                setValidEmail(result.message);
                setLoading(false);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            {!role && (
                <div className={cx('form')}>
                    <div className={cx('form-label')}>
                        <label>Tên của bạn?</label>
                    </div>
                    <div className={validName ? cx('form-input', 'active') : cx('form-input')}>
                        <input
                            type="text"
                            placeholder="Họ và tên của bạn"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setValidName(false);
                            }}
                            onBlur={() => handleValidName(name)}
                        />
                    </div>
                    {validName && <div className={cx('message')}>Tên của bạn không hợp lệ</div>}
                </div>
            )}
            <div className={cx('form')}>
                <div className={cx('form-label')}>
                    <label>Email</label>
                    <label>{nameBtn} với SĐT</label>
                </div>
                <div className={validEmail !== '' ? cx('form-input', 'active') : cx('form-input')}>
                    <input
                        type="email"
                        placeholder="Địa chỉ email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setValidEmail('');
                        }}
                    />
                </div>
                {validEmail !== '' && <div className={cx('message')}>{validEmail}</div>}
            </div>
            <div className={cx('form')}>
                <div className={validPassword !== '' ? cx('form-input', 'active') : cx('form-input')}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setValidPassword('');
                        }}
                    />
                </div>
                {validPassword !== '' && <div className={cx('message')}>{validPassword}</div>}
                {!role && <div className={cx('help')}>Gợi ý: Mật khẩu cần có ít nhất 8 kí tự</div>}
            </div>

            {!role && (
                <div className={cx('form')}>
                    <div className={validCode !== '' ? cx('form-input', 'code', 'active') : cx('form-input', 'code')}>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Nhập mã xác nhận"
                            value={code}
                            onChange={(e) => handleOnchangeCode(e.target.value)}
                        />
                        <div
                            className={activeBtnCode ? cx('send-code', 'active') : cx('send-code')}
                            onClick={handleSendCode}
                        >
                            <span>
                                {btnText}
                                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('icon-loading')} />}
                            </span>
                        </div>
                    </div>
                    {validCode !== '' && <div className={cx('message')}>{validCode}</div>}
                </div>
            )}
            <button
                type="submit"
                className={active ? cx('btn-login', 'active') : cx('btn-login')}
                onClick={handleSubmit}
            >
                {nameBtn}
            </button>
        </div>
    );
}

export default FormInfor;
