import useView from "../hooks/UseView";
import useAuth from '../hooks/UseAuth';
import Cronometro from "./app/Cronometro";


const CrearTarea = ({ tarea }) => {
    const { handleEditarTarea, handleEliminarTarea } = useView();
    const { descripcion, nombre, tiempo, estado, usuario, _id } = tarea;
    const { auth } = useAuth();
    


    //importamos hook de cronometro 
    if (usuario === auth.nombre) {
        return (
            <>
                {!estado ?
                    <div>
                        <div className="border-b p-5 flex justify-between items-center">
                            <div className="flex-1 text-md">
                                <p className="font-bold">{nombre}</p>
                                <p className="text-md text-gray-400 ">{descripcion}</p>
                                <p className="text-md text-gray-400 ">
                                    {tiempo}
                                </p>
                                <p className="text-sm text-gray-700">{estado ? <span className="text-[#C6D933] font-bold">Terminado</span> : <span className="text-[#FF0000] font-bold">En proceso</span>}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-2 items-center">
                                    <Cronometro tarea ={tarea} />
                                </div>
                                <div className="flex justify-between items-center gap-1">
                                    <button
                                        onClick={() => handleEditarTarea(tarea)}
                                        className="bg-[#6393F2] text-white rounded-lg py-2 px-2 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleEliminarTarea(tarea)}
                                        className="bg-[#FF0000] text-white rounded-lg py-2 px-2 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <></>
        );
    }
}

export default CrearTarea;