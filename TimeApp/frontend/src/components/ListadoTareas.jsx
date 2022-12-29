import { formatearFecha } from "../helpers/FormatearFecha";

const ListadoTareas = ({tarea}) => {
    const { descripcion, nombre, prioridad, fechaEntrega, tiempo, estado} = tarea;

    return (
        <div>
            {estado?
            <div className="flex border-b px-10 py-2 justify-between">
                <div className="flex flex-col">
                    <p className="p-2 rounded-xl text-black">Nombre: {nombre}</p>
                    <p className="p-2 rounded-xl text-black">
                        Tiempo de trabajo: {tiempo} Minutos
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="p-2 rounded-xl text-black">Estado {estado ? <span className="text-green-600 font-bold">Terminado</span> : <span className="text-red-700 font-bold">En proceso</span>}</p>
                </div>
            </div>
            :
            <>
            </>
            }
        </div>
    )
}

export default ListadoTareas
