import IterarComandas from './IterarComandas';
import useAdmin from '../hooks/UseAdmin';

const Comandas = () => {
  const { comanda, info } = useAdmin();

  const conteo = info.comanda;

  const contar = conteo?.map(item => {
    return item.terminado
  });

  let contarTerminadas = [];

  let contarProceso = [];

  for(let i = 0; contar?.length > i; i++){
    if(contar[i]?.valueOf()){
      contarTerminadas.push(contar[i])
    }else if(!contar[i]?.valueOf()){
      contarProceso.push(contar[i])
    }
  }

  const totalTerminadas = contarTerminadas?.length;
  const totalEnProceso = contarProceso?.length;



  return (
    <div>
      <div className='bg-white shadow rounded-lg p-4'>
        <p className='font-bold'>Comandas terminadas: {totalTerminadas}</p>
        <p className='font-bold'>Comandas en proceso: {totalEnProceso}</p>
      </div>
      <div className='bg-white shadow rounded-lg  mt-5'>
        {comanda?.length ?
          comanda.map(list => (
            <IterarComandas
              key={list._id}
              list={list}
            />
          ))
          : <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay comandas aún</p>}
      </div>
    </div>
  )
}

export default Comandas