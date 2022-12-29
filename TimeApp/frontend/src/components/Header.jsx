import logo from '../timeApp.png';
import { Link } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';


const Header = () => {
    const { handleCerrarSesion, auth} = UseAuth();
    const admin =  <Link to='/admin' className='text-white font-bold uppercase'>Administración</Link>
    
    return (
        <header className='w-full'>
            <div 
            className='bg-[#24313E] h-28 flex justify-center md:justify-between md:px-5 items-center flex-wrap lg:justify-between lg:fixed  w-full md:h-24'>
                <div className="logo px-10">
                    <Link to="/view"> 
                    <img src={logo} alt="timeApp" />
                    </Link>
                </div>
                <div className='flex items-center gap-3 px-10'>
                    {auth.area?.includes('Administracion') ? <>{admin}</>: <></>}
                    <Link to="/view" className="text-white font-bold uppercase">Comandas</Link>
                    <button
                        onClick={handleCerrarSesion}
                        className='text-white bg-[#FF0000] p-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header