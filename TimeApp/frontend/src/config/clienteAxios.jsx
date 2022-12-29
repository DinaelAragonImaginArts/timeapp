import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`
    //Produccion URl
    //baseURL: 'https://nameless-chamber-71749.herokuapp.com/api/'

    //Desarrollo frontend
    //baseURL: 'https://timeappagos.herokuapp.com/api/'

})

export default clienteAxios;



