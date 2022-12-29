import useAdmin from '../../../hooks/UseAdmin';
import ModalEliminarColaborador from './ModalEliminarColaborador';
import Alerta from '../../../components/Alerta';

const Colaborador = ({ colaborador }) => {
    const { nombre, email } = colaborador;
    const { alerta, eliminarColaborador } = useAdmin();
    const { msg } = alerta;

    return (
        <div>
            <div className="border-b p-5 flex justify-between items-center">
                <div className="flex-1 text-md">
                    <p className="text-lg font-semibold">{nombre}</p>
                    <p className="text-md text-gray-700">{email}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="gap-2 flex">
                        {msg && <Alerta alerta={alerta} />}
                        <button
                            onClick={() => eliminarColaborador(colaborador)}
                            className="bg-red-600 text-white rounded-lg py-2 px-2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <ModalEliminarColaborador />
        </div>

    )
}

export default Colaborador;