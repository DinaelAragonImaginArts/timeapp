import { useParams, Link } from 'react-router-dom';
import useView from '../hooks/UseView';
import { useEffect } from 'react';
import Loader from '../utils/Loader';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import CrearTarea from '../components/CrearTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Alerta from '../components/Alerta';
import ListadoTareas from '../components/ListadoTareas';

const Comanda = () => {
  const params = useParams();
  const { obtenerComanda, cargando, handleModalTarea, comandas, comanda, alerta, tareaSelect } = useView();
  useEffect(() => {
    obtenerComanda(params.id);
  }, []);
  const { msg } = alerta;

  return (

    cargando ? <Loader /> : (
      <>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-black text-4xl flex-1'>{comanda.nombre}</h1>
          </div>
          <div>
            <button
              onClick={handleModalTarea}
              type='button'
              className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-[#FF0000] text-white items-center flex gap-2 text-center justify-center'
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg> Nueva Tarea </button>
          </div>
        </div>
        <p className='font-bold text-xl mt-10'>Tareas de la comanda</p>
        <div className='flex justify-center'>
          <div className='md:w-1/4 lg:w-1/4 w-full'>
            {msg && <Alerta alerta={alerta} />}
          </div>
        </div>
        <div className={tareaSelect ? 'bg-green-200 shadow mt-10 rounded-lg p-5' : 'bg-white shadow mt-10 rounded-lg p-5'}>
          {comanda.tareas?.length ?
            comanda.tareas?.map(tarea => (
              <CrearTarea
                key={tarea._id}
                tarea={tarea}
              />
            ))
            : <p className='text-center my-5 p-10'>No hay tareas disponibles</p>
          }
        </div>
        <div className='bg-white shadow mt-10 rounded-lg p-5'>
          {comanda.tareas?.length ?
            comanda.tareas?.map(tarea => (
              <ListadoTareas
                key={tarea._id}
                tarea={tarea}
              />
            ))
            : <p className='text-center my-5 p-10'>No hay tareas disponibles</p>}
        </div>
        <ModalFormularioTarea comandaId={comanda} />
        <ModalEliminarTarea comandaId={comanda} />
      </>
    )
  )
}

export default Comanda;
