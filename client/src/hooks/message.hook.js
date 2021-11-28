import { useCallback } from "react";

export const useMessage = () => {
    // useCallback нужен чтобы реакт не входил в рекурсию
    return useCallback(text => {
        // M - api материалайза, которое выводит сообщение на экран
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, []);
};