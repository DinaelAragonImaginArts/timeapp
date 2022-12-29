import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Administracion = () => {
        return (
            <>
                <div className=''>
                    <Header  />
                    <div className='md:flex md:min-h-screen '>
                        <main className='bg-stone-100 flex-1 p-10 lg:mt-20'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </>
        )
}

export default Administracion;
