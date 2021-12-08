import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    // Эти значения будет передавать через контекст
    const { token, login, logout, userId, ready } = useAuth();
    // Флаг авторизации
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider
            value={{token, login, logout, userId, isAuth}}>
            { isAuth && <Navbar/>}
            <div className={'container'}>
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
