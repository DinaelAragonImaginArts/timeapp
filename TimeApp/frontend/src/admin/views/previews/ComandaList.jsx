import { Link } from 'react-router-dom';
import { formatearFecha, formatDia, formatMes } from '../../../helpers/FormatearFecha';
import useFecha from '../../../hooks/UseFecha';
import { useState, useEffect } from 'react';
import useAdmin from '../../../hooks/UseAdmin';

const ComandaList = ({ list }) => {
    const { mesServidor, diaServidor } = useFecha();
    const { terminarComanda } = useAdmin();
    //States
    const [prioridad, setPrioridad] = useState("");
    const [fechaValid, setFechaValid] = useState('');

    const { nombre, _id, creador, fecha, terminado, comentario } = list;

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
    }, [])




    const handleTerminar = async id => {
        await terminarComanda(id)
    }
    return (
        <>
            {terminado ? <></> :
                <div className="border-b p-5 flex gap-2 items-center">
                    <div className='flex-1'>
                        <p className="flex-1"><span className='font-bold text-black'>Nombre de comanda: </span> {nombre}</p>
                        <p className="flex-1"><span className='font-bold text-black'>Comentarios: </span> {comentario}</p>
                        <p className="flex-1"><span className='text-blacks font-bold'>Creador: </span> {creador}</p>
                        <p className="flex-1"><span className='font-bold text-black'>Estado: </span>{terminado ? "Finalizado" : "En proceso"}</p>
                        <p className="flex-1">
                            <span className='text-black font-bold'>
                                Fecha de entrega:&nbsp;
                            </span>
                            {fechaValid}
                        </p>
                        <p className='font-bold text-black'> PRIORIDAD: {prioridad}</p>
                    </div>
                    <Link to={`comanda/${_id}`}
                        className="text-white bg-[#ffb206] rounded-lg px-3 py-2 text-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </Link>
                    <Link
                        to={`comanda/colaboradores/${list._id}`}
                        className="text-white bg-[#6393f2] rounded-lg p-2 text-md flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </Link>
                    <button
                        onClick={() => handleTerminar(_id)}
                        className="text-white bg-[#c6d933] rounded-lg p-2 text-md flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            }
        </>
    )
}


export default ComandaList;
