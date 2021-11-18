import {useCallback, useState} from "react";

// Свой хук для запросов на сарвар
export const useHttp = () => {
    // Обработка загрузки
    const [loading, setLoading] = useState(false);
    // Обработка ошибки
    const [error, setError] = useState(null);
    // Ф-ция позволяющая делать запрос
    // Хук useCb нужен чтобы избавится от рекурсии. Второй параметр - зависимости (пока что [])
    const request = useCallback(async (url, method = 'get', body = null, headers = {}) => {
        // Запускаем лоадер
        setLoading(true);

        try {

            if (body) {
                // Если body мы передали, то нам надо привести его в формат JSON
                body = JSON.stringify(body);
                // Также нужно установить заголовок
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (response.ok) {
                throw new Error(data.message || 'Что-то пошло не так') // data.message - определяли на бэке
            }

            setLoading(false);

            return data
        } catch (e) {
            setLoading(false);
            setError(e.message) // Ошибка появляется из throw (выше)
            throw e
        }
    }, []);

    // Чистим ошибки
    const clearError = () => setError(null)

    return { loading, error, request, clearError }
};