import { CSVLink } from "react-csv";
import Loader from "../../utils/Loader";
import { fechaBitacora, fechaBitacoraServer } from '../../helpers/FormatearFecha';
import { useState, useEffect } from 'react';

const Print = ({ csv }) => {
    const [fechaInicio, setFechaInicio] = useState([0]);
    const [reporteFiltrado, setReporteFiltrado] = useState([]);
    const [funcion, setFuncion] = useState()
    const [state, setState] = useState(false);
    const { tareas } = csv;

    const reporteTotal = tareas?.map((item) => {
        return {
            usuario: item.usuario,
            area: item.area,
            fechaEntrega: fechaBitacoraServer(item.fechaEntrega),
            comanda: item.comanda,
            tiempo: item.tiempo,
            nombre: item.nombre,
            cuenta: item.cuenta,
        }
    })


    const bitacora = reporteTotal?.filter(item => item?.fechaEntrega.valueOf() >= fechaInicio.valueOf());
    const filtro = bitacora?.splice(122);

    const filtroFecha = () => {
        setFuncion(true);
        setReporteFiltrado(filtro);
        setTimeout(() => {
            setState(true);
            setFuncion(false);
        }, 1000);
    }

    const headers = [
        { label: "Nombre", key: "usuario" },
        { label: "Area", key: "area" },
        { label: "Semana", key: "" },
        { label: "Dia", key: "fechaEntrega" },
        { label: "Comanda", key: "comanda" },
        { label: "Cuenta", key: "cuenta" },
        { label: "Minutos", key: "tiempo" },
        { label: "Tarea", key: "nombre" },
    ]



    if (!tareas) {
        return <Loader />
    } {
        return (
            <>
                <div className="flex items-center justify-between p-4 border-b-2 mt-2">
                    <div className="flex items-center gap-4">
                        <input
                            type="date"
                            className="p-2 bg-gray-100 focus:outline-none"
                            value={fechaInicio || ''}
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                        <button
                            onClick={filtroFecha}
                            className="bg-red-600 rounded-md text-white flex items-center px-3 py-1 text-sm gap-4">
                            Buscar
                        </button>
                    </div>
                    {funcion ?
                        <Loader />
                        :
                        <div className="flex items-center ">
                            {state ?
                                <CSVLink
                                    data={reporteFiltrado}
                                    headers={headers}
                                    className="bg-red-600 rounded-md text-white flex items-center px-4 py-3 text-md gap-1"
                                    filename="Bitacora"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>Bitácora</CSVLink>
                                :
                                <p className="text-black font-semibold text-lg">Selecciona una fecha de inicio</p>
                            }
                        </div>
                    }
                </div>
            </>

        )
    }
}

export default Print;