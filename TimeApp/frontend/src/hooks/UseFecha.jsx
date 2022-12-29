import { useContext  } from "react";
import FechaContext from "../context/FechaProvider";

const useFecha = ()=>{
    return useContext(FechaContext);
}

export default useFecha;
