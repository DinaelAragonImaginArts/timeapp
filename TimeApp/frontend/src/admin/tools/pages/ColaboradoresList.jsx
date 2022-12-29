import useView from "../../../hooks/UseView"
import { useEffect, useState } from 'react'



const ColaboradoresList = () => {
    const { comanda, colaborador, agregarColaborador } = useView()
    const [users, setUsers] = useState([]);
    const userDenied = comanda.colaboradores?.map(item => item._id)


    useEffect(() => {
        const userList = () => colaborador.map(item => {
            if (!userDenied?.includes(item._id)) {
                users.push(item)
            }
        })
        userList()
    }, [])

    const eliminarDelaLista = (usuario) => {
        const indice = users.indexOf(usuario)
        if (indice > -1) {
            users.splice(indice, 1);
        }
    }
    function starter(item) {
        agregarColaborador({ email: item.email })
        eliminarDelaLista(item);
    }

    const card = users.map(item => {
        return (
            <div key={item._id} className="p-4 rounded shadow mt-5 bg-white flex  justify-between items-center gap-5">
                <div className="w-1/3">
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">{item.nombre}</span>
                        <span className="font-bold text-slate-400">{item.email}</span>
                    </div>
                    <div className="py-1 px-4 bg-red-600 rounded shadow min-w-fit">
                        <span className=" text-white font-black">{item.area}</span>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => starter(item)}
                        className="bg-red-600 p-1 rounded shadow text-white font-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    })
    return (
        <>
            {users.length ?
                <div>
                    {card}
                </div>
                : <span className="py-4 font-bold text-red-600 text-xl">Todos los usuarios ya se encuentran en la comanda</span>}
        </>
    )
}

export default ColaboradoresList