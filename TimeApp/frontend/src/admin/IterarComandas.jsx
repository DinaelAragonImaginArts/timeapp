import { formatearFecha, formatDia, formatDiaServidor, formatMes, formatMesServidor } from '../helpers/FormatearFecha';


const IterarComandas = ({ list }) => {
    const { nombre, creadorNombre, fecha, terminado } = list;

    return (
        <>
            {terminado ?
                <div className="bg-gray-200 border-2 rounded-lg p-4 mt-1">
                    <div className='flex-1'>
                        <p className="flex-1 text-black"><span className='font-bold text-black'>Nombre de comanda: </span> {nombre}</p>
                        <p className="flex-1"><span className='text-black font-bold'>Creador: </span><span className='text-black'> {creadorNombre}</span></p>
                        <p className="flex-1"><span className='font-bold text-black'>Estado: </span>{terminado ? <span className='text-black'>Finalizado</span> : <span className='text-black'>En proceso</span>}</p>
                        <p className="flex-1">
                            <span className='text-black font-bold'>
                                Fecha de entrega:&nbsp;
                            </span>
                            <span className='text-black'>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                </div>
                :
                <div>
                    {(formatDia(fecha).valueOf() - formatDiaServidor(Date()).valueOf()) <= 1 && formatMes(fecha).valueOf() === formatMesServidor(Date()).valueOf() ?
                        <div className="bg-[#ff3131] border-2 rounded-lg p-4 mt-1">
                            <div className='flex-1'>
                                <p className="flex-1 text-white"><span className='font-bold text-white'>Nombre de comanda: </span> {nombre}</p>
                                <p className="flex-1"><span className='text-white font-bold'>Creador: </span><span className='text-white'> {creadorNombre}</span></p>
                                <p className="flex-1"><span className='font-bold text-white'>Estado: </span>{terminado ? <span className='text-white'>Finalizado</span> : <span className='text-white'>En proceso</span>}</p>
                                <p className="flex-1">
                                    <span className='text-white font-bold'>
                                        Fecha de entrega:&nbsp;
                                    </span>
                                    <span className='text-white'>{formatearFecha(fecha)}</span>
                                </p>
                            </div>
                        </div>
                        :
                        <div>
                            {(formatDia(fecha).valueOf() - formatDiaServidor(Date()).valueOf()) > 1 && (formatDia(fecha).valueOf() - formatDiaServidor(Date()).valueOf()) <= 5 && formatMes(fecha).valueOf() === formatMesServidor(Date()).valueOf() ?
                                <div className="bg-[#ffb206] border-2 rounded-lg p-4 mt-1">
                                    <div className='flex-1'>
                                        <p className="flex-1 text-white"><span className='font-bold text-white'>Nombre de comanda: </span> {nombre}</p>
                                        <p className="flex-1"><span className='text-white font-bold'>Creador: </span><span className='text-white'> {creadorNombre}</span></p>
                                        <p className="flex-1"><span className='font-bold text-white'>Estado: </span>{terminado ? <span className='text-white'>Finalizado</span> : <span className='text-white'>En proceso</span>}</p>
                                        <p className="flex-1">
                                            <span className='text-white font-bold'>
                                                Fecha de entrega:&nbsp;
                                            </span>
                                            <span className='text-white'>{formatearFecha(fecha)}</span>
                                        </p>
                                    </div>
                                </div>
                                :
                                <div className="bg-[#c6d933] border-2 rounded-lg p-4 mt-1">
                                    <div className='flex-1'>
                                        <p className="flex-1 text-white"><span className='font-bold text-white'>Nombre de comanda: </span> {nombre}</p>
                                        <p className="flex-1"><span className='text-white font-bold'>Creador: </span><span className='text-white'> {creadorNombre}</span></p>
                                        <p className="flex-1"><span className='font-bold text-white'>Estado: </span>{terminado ? <span className='text-white'>Finalizado</span> : <span className='text-white'>En proceso</span>}</p>
                                        <p className="flex-1">
                                            <span className='text-white font-bold'>
                                                Fecha de entrega:&nbsp;
                                            </span>
                                            <span className='text-white'>{formatearFecha(fecha)}</span>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}


export default IterarComandas