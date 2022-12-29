import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const [usuario, setUsuario] = useState({});
    const [autorizado, setAutorizado] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                setUsuario(data);
            } catch (error) {
                console.log(error);
                setAuth({});
            } finally {
                setCargando(false);
            }
        }
        autenticarUsuario();
    }, []);
    
    useEffect(() => {
        if (auth?.area === 'Administracion') {
            setAutorizado(true);
        } else {
            setAutorizado(false);
        }
    }, [auth]);


    useEffect(()=>{
        autorizado ? navigate('/admin') : navigate('/view');
    }, [autorizado]);



    const handleCerrarSesion = () => {
        localStorage.removeItem('token')
        navigate('/');
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                handleCerrarSesion,
                usuario,
                autorizado
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthProvider
}

export default AuthContext;