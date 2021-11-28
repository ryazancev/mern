import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import {AuthContext} from "./context/AuthContext";

function App() {
    // Эти значения будет передавать через контекст
    const { token, login, logout, userId } = useAuth();
    // Флаг авторизации
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth
        }}>
            <div className={'container'}>
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
