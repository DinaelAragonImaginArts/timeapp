import { useState, useEffect } from 'react'
import { io } from 'socket.io-client';
let socket;

const UsersConect = () => {
    const [activo, setActivo] = useState(false);
    const [usuarioConectado, setUsuarioConectado] = useState([]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.on('usuariosConectados', (active) => {
            setUsuarioConectado(active);
        })
    },[activo]);

    const user = usuarioConectado?.map(item =>{
        return <li>{item.usuario}</li>
    });
    const sitio = usuarioConectado?.map(item =>{
        return <li>{item.sitio}</li>
    })

    return (
        <>
            {activo ?
                <div
                    onClick={() => setActivo(!activo)}
                    className='fixed right-0 w-72 cursor-pointer'>
                    <div className='flex items-center w-full h-10 border-green-400 border-2 bg-green-100 rounded-tl-lg'>
                        <p className='px-4 font-semibold'>Usuarios conectados</p>
                    </div>
                    <div className='bg-white w-full scroll-smooth overflow-auto h-48'>
                        <div className='p-4 flex justify-between items-start'>
                            <div className='text-center'>
                                <p>Usuario</p>
                                <ul>{user}</ul>
                            </div>
                            <div className='text-center'>
                                <p>Conectado en:</p>
                                <ul>{sitio}</ul>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div
                    onClick={() => setActivo(!activo)}
                    className='fixed right-0 bottom-0 w-72 cursor-pointer'>
                    <div className='flex items-center w-full h-10 border-green-400 border-2 bg-green-100 rounded-tl-lg'>
                        <p className='px-4 font-semibold'>Usuarios conectados</p>
                    </div>
                </div>
            }
        </>
    )
}

export default UsersConect
