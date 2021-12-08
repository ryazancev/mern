import { useState, useCallback, useEffect } from "react";

const storageName = 'userData';

export const useAuth = () => {
    // Стэйт который отвечает за токен и юзера
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        // Мы получаем с сервера токен и id пользователя и записываем их в локал сторадж
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}));
    }, []);

    const logout = useCallback(() => {
        // При логауте чистим данные
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    // Воспользуемся хуком для того чтобы данные из локал стораджа автоматом подтягивались
    // Как зависимость для хука указываем login
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true);
    }, [login]);
    return { login, logout, token, userId, ready }
};