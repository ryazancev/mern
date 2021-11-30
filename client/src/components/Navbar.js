import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    // Через контекст получаем данные которые передаем в AuthContext
    const auth = useContext(AuthContext);
    // воспользуемся хуком useNavigate чтобы после выхода перекидывать пользователя на главную
    const navigate = useNavigate();

    const logoutHandler = e => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: `0 2rem`}}>
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={`/create`}>Создать</NavLink></li>
                    <li><NavLink to={`/links`}>Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
};