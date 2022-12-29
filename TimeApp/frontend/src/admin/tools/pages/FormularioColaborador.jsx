import { useState } from "react";
import useView from "../../../hooks/UseView";

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const {mostrarAlerta, alerta, submitColaborador } = useView();
    
    const handleSubmit = e => {
        e.preventDefault();
        if(email === ''){
            mostrarAlerta ({
                msg: 'El E-mail es obligatorio ',
                error: true
            })
            return
        }

       submitColaborador({email});
    }
    return (

        <form
            onSubmit={handleSubmit}
            className="border py-10 px-2 md:w-1/2 rounded-lg shadow-md "
        >   
            <div className="mb-5">
                <label
                    htmlFor="email-colaborador"
                    className="text-gray-700 uppercase font-bold text-sm"
                >E-mail del colaborador</label>
                <input
                    id="email-colaborador"
                    type="email"
                    placeholder="Email del usuario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <input
                value={'Buscar'}
                type="submit"
                className='hover:cursor-pointer bg-red-600 text-white py-3 px-5 rounded-lg w-full'
            />
        </form>
    )
}

export default FormularioColaborador