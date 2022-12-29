import { createContext, useState, useEffect } from 'react';
import { formatDiaServidor, formatearFechaServidor, formatMesServidor } from '../helpers/FormatearFecha';

//Creamos el contexto 
const FechaContext = createContext();

const FechaProvider = ({ children }) => {
    //Inicializamos estados
    const [fechaServidor, setFechaServidor] = useState();
    const [mesServidor, setMesServidor] = useState();
    const [diaServidor, setDiaServidor] = useState();
    
    //Aqui comienzan las funciones
    
    useEffect(()=>{
        setFechaServidor(formatearFechaServidor(Date()));
        setDiaServidor(formatDiaServidor(Date()))
        setMesServidor(formatMesServidor(Date()))
      }, [])
      
    return (
        <FechaContext.Provider
            value={{
                fechaServidor,
                mesServidor,
                diaServidor,
            }}>{children}</FechaContext.Provider>
    );
}


export {
    FechaProvider
}

export default FechaContext;