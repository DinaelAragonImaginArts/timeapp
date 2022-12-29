import { formatSort } from '../helpers/FormatearFecha';
import useView from '../hooks/UseView';
import ListaComanda from '../components/ListaComanda';
const View = () => {
  const { comandaView } = useView();
  const comandas = comandaView?.map(item => {
    return {
      nombre: item.nombre,
      fechaSort: formatSort(item.fecha),
      fecha: item.fecha,
      _id: item._id,
      productoComanda: item.productoComanda,
      terminado: item.terminado,
      comentario: item.comentario,
    }
  })

  function sortear(a, b) {
    return a.fechaSort.valueOf() - b.fechaSort.valueOf();
  }

  const comandasAcomodadas = comandas.sort(sortear);




  return (
    <>
      <h1 className='text-4xl font-black'>Comandas</h1>
      <div className='bg-white shadow rounded-lg  mt-5'>
        {comandasAcomodadas?.length ?
          comandasAcomodadas.map(comanda => (
            <ListaComanda
              key={comanda._id}
              comanda={comanda}
            />
          ))
          : <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay comandas aún</p>}
      </div>
    </>
  )
}

export default View;
