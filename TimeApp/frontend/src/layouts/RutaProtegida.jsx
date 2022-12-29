import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import Header from '../components/Header';
import Loader from '../utils/Loader';

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    if (cargando) return <Loader />
    return (
        <>
            {auth._id ?
                (
                    <div className=''>
                        <Header />
                        <div className='md:flex md:min-h-screen'>
                            <main className='bg-stone-100 flex-1 p-10 lg:mt-20'>
                                <Outlet />
                            </main>
                        </div>

                    </div>
                ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida;
