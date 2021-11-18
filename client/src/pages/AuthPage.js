import {useState} from "react";
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () => {
    // Используем свой хук useHttp
    const {loading, error, request} = useHttp();
    // Хук возвращает объект и метод с помощью которого мы можем поменять данные в объекте
    const [form, setForm] = useState({
        email: '', password: ''
    });

    // Достаем значения из формы логина
    const changeHandler = e => {
        // Копируем объект и уже в копии меняем данные которые приходят из инпутов
        setForm({...form, [e.target.name]: e.target.value});
    };

    // Запрос на сарвар
    const registerHandler = async () => {
        try {
            // Получаем данные с сервера
            const data = await request('/api/auth/register', 'post', {...form}); // разворачиваем объект которые заполнили из формы
        } catch (e) {
            // Оставим пустым, потому что обработали его в useHttp
        }
    };

    return (
        <div className={'row'}>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Введите email"
                                       id="email"
                                       type="email"
                                       className="validate yellow-input"
                                       name='email'
                                       onChange={changeHandler}/>
                                <label htmlFor="email">EMAIL</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       className="validate yellow-input"
                                       name='password'
                                       onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={`btn yellow darken-4`}
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={registerHandler}>
                            Войти
                        </button>
                        <button
                            className={`btn grey lighten-1 black-text`}
                            disabled={loading}
                            onClick={registerHandler}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};