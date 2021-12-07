import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {
    // Редирект
    const navigate = useNavigate();

    // Получаем токен
    const auth = useContext(AuthContext);

    const {request} = useHttp();

    const [link, setLink] = useState('');

    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                // Получаем ссылку которую мы ввели в инпут
                const data = await request('/links/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
                // Редирект на страницу ссылки
                navigate(`/detail/${data.link._id}`);
            } catch (e) {
                console.log(e)
            }
        }
    };
    // убираем проблемы у инпутов, делая из активными
    useEffect(() => {
        window.M.updateTextFields();
    }, []);
    return (
        <div className={'row'}>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="Вставьте ссылку"
                           id="link"
                           type="text"
                           name='link'
                           value={link}
                           onKeyPress={pressHandler}
                           onChange={e => setLink(e.target.value)}/>
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
};