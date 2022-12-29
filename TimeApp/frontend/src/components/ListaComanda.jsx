import { Link } from "react-router-dom";
import { formatearFecha, formatDia, formatMes, formatSort } from '../helpers/FormatearFecha';
import useFecha from '../hooks/UseFecha';
import { useState, useEffect } from 'react';

const ListaComanda = ({ comanda }) => {
    const { nombre, fecha, _id, productoComanda, terminado, comentario } = comanda
    const { mesServidor, diaServidor } = useFecha();
    //States
    const [prioridad, setPrioridad] = useState("");
    const [fechaValid, setFechaValid] = useState('');
    //formato
    const fechaComandaDia = formatDia(fecha);
    const fechaComandaMes = formatMes(fecha);
    //Dia en que se toma la comanda
    const diaComanda = parseInt(fechaComandaDia);
    //Dia del servidor
    const fechaServidorDia = parseInt(diaServidor);
    const calendario = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const diasCalendario = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    useEffect(() => {
        //Calculo servidor
        const conteoMesServidor = calendario?.indexOf(mesServidor);
        const mesServidorReal = (conteoMesServidor + 1)
        const Dia = diasCalendario[conteoMesServidor];
        const sumaroriaDiasDelMesServidor = diasCalendario.slice(0, mesServidorReal);
        //Sumatoria general
        const sumatoriaDiasServidor = sumaroriaDiasDelMesServidor?.reduce((a, b) => a + b, 0);
        const DiasNoContablesServidor = (Dia - fechaServidorDia);
        //Designacion de dias hasta la fecha en servidor
        const filtroServidor = sumatoriaDiasServidor - DiasNoContablesServidor;

        //Calculo comanda
        const conteoMesComanda = calendario?.indexOf(fechaComandaMes);
        const mesComandaReal = (conteoMesComanda + 1);
        const DiaComanda = diasCalendario[conteoMesComanda];
        const sumatoriaDiasDelMesComanda = diasCalendario.slice(0, mesComandaReal);
        //Sumatoria de los dias pasados hasta la fecha
        const sumatoriaDiasComanda = sumatoriaDiasDelMesComanda?.reduce((a, b) => a + b, 0);
        //Dias del mes que aun no pasan
        const DiasNoContablesComanda = (DiaComanda - diaComanda)
        //Designacion de dias hasta el cumplimiento de la comanda
        const filtroComanda = sumatoriaDiasComanda - DiasNoContablesComanda;
        //Filtro total para comandas (Dias Faltantes para el vencimiento)
        const FiltroTotal = filtroComanda - filtroServidor;
        if (FiltroTotal <= 1 && FiltroTotal >=0) {
            setFechaValid(<span className='text-[#FF0000] font-bold'>
                {formatearFecha(fecha)} &nbsp;
            </span>
            )
            setPrioridad(<span className='text-[#FF0000]'>Alta</span>)
        } else if (FiltroTotal > 1 && FiltroTotal <= 5) {
            setFechaValid(<span className='text-[#ffb206] font-bold'>
                {formatearFecha(fecha)}
            </span>)
            setPrioridad(<span className='text-[#ffb206]'>Media</span>)
        } else if (FiltroTotal >= 6) {
            setFechaValid(<span className='text-green-600 font-bold'>
                {formatearFecha(fecha)}
            </span>)
            setPrioridad(<span className='text-green-600'>Baja</span>)
        } else if (FiltroTotal < 0) {
            setFechaValid(<span className='text-[#555555] font-bold'>
                {formatearFecha(fecha)} &nbsp;
            </span>
            )
            setPrioridad(<span className='text-[#555555]'>Vencida</span>)
        }
    },[]);
    return (
        <>

            <div>
                {terminado ? <></> :
                    <div className="border-b p-5 flex justify-between items-center">
                        <div>
                            <p className=""><span className="text-[#FF0000] font-bold">Comanda: </span>{nombre}</p>
                            <p className=""><span className="text-[#FF0000] font-bold">Comentarios: </span>{comentario}</p>
                            <p className=""><span className="text-[#FF0000] font-bold">Tipo de producto: </span>{productoComanda.slice(3, 300)}</p>
                            <p className="flex-1">
                                <span className='text-black font-bold'>
                                    Fecha de entrega:&nbsp;
                                </span>
                                {fechaValid}
                            </p>
                            <p className='font-bold text-black'> PRIORIDAD: {prioridad}</p>
                        </div>
                        <div>
                            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-900 uppercase text-xs font-bold">Ver tareas</Link>
                        </div>
                    </div>

                }
            </div>
        </>
    )

}

export default ListaComanda;