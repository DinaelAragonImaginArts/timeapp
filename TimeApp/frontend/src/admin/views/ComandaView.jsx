import ComandaList from "./previews/ComandaList";
import useAdmin from "../../hooks/UseAdmin";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { formatSort } from '../../helpers/FormatearFecha';


const ComandaView = () => {
  const { comanda } = useAdmin();
  const [comandasAcomodadas, setComandasAcomodadas] = useState([]);

  useEffect(() => {
    if (comanda.length) {
      const comandas = comanda?.map(item => {
        return {
          nombre: item.nombre,
          fechaSort: formatSort(item.fecha),
          fecha: item.fecha,
          _id: item._id,
          productoComanda: item.productoComanda,
          terminado: item.terminado,
          comentario: item.comentario,
          creador: item.creadorNombre,
        }
      })
      function sortear(a, b) {
        return a.fechaSort.valueOf() - b.fechaSort.valueOf();
      }
      setComandasAcomodadas(comandas?.sort(sortear));
    }
  }, [comanda])


  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className='text-4xl font-black mt-5'>Comandas</h1>
      </div>
      <div className='bg-white shadow rounded-lg  mt-5'>
        {comandasAcomodadas?.length ?
          comandasAcomodadas.map(list => (
            <ComandaList
              key={list._id}
              list={list}
            />
          ))
          : <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay comandas aún</p>}
      </div>
    </>
  )
}

export default ComandaView


/*
<Link to="comandas">Ver Comandas</Link>*/