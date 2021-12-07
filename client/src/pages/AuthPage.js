import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    // воспользуемся конетекстом с помощью useContext
    const auth = useContext(AuthContext);
    const message = useMessage();

    // Используем свой хук useHttp
    const {loading, error, request, clearError} = useHttp();

    // Хук возвращает объект и метод с помощью которого мы можем поменять данные в объекте
    const [form, setForm] = useState({
        email: '', password: ''
    });

    // Используем хук useEffect
    // если меняется ошибка то мы выводим сообщение на экран с этой ошибкой
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    // убираем проблемы у инпутов, делая из активными
    useEffect(() => {
        window.M.updateTextFields();
    }, []);

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
            // Показываем всплывающее сообщение на экране
            message(data.message);
        } catch (e) {
            // Оставим пустым, потому что обработали его в useHttp
        }
    };

    const loginHandler = async () => {
        try {
            // Получаем данные с сервера
            const data = await request('/api/auth/login', 'post', {...form}); // разворачиваем объект которые заполнили из формы
            // воспользуемся медотом логин который мы передали через контекст
            auth.login(data.token, data.userId);
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
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">EMAIL</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       className="validate yellow-input"
                                       name='password'
                                       value={form.password}
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
                            onClick={loginHandler}>
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