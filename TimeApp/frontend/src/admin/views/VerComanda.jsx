import { useParams } from 'react-router-dom';
import useAdmin from '../../hooks/UseAdmin';
import { useEffect } from 'react';
import Colaborador from './previews/Colaborador'


const VerComanda = () => {
    const params = useParams();
    const { obtenerComanda, comandaListar } = useAdmin();
    useEffect(() => {
        obtenerComanda(params.id);
    }, [])
    const { colaboradores } = comandaListar;
    
    return (
        <div className='flex flex-col'>
            <div>
                <h1 className='font-bold text-2xl '>{comandaListar.nombre}</h1>
            </div>
            <h1 className='border-b p-2 font-semibold text-lg'>Usuarios en la comanda</h1>
            <div className='mt-10'>
                {colaboradores?.length ?
                    colaboradores.map(colaborador => (
                        <Colaborador
                            key={colaborador}
                            colaborador={colaborador}
                            comandaListar = {comandaListar}
                        />
                    ))
                    : <p className='text-center my-5 p-10'>Aún no hay colaboradores asignados</p>
                }
            </div>
        </div>
    )
}

export default VerComanda;