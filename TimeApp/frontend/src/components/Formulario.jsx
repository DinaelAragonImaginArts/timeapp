import { useState, useEffect } from 'react';
import useView from '../hooks/UseView';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState(null);
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const params = useParams();

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useView();

  useEffect(() => {
    if (params.id) {
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setFechaEntrega(proyecto.fecha?.split('T')[0])
        setDescripcion(proyecto.descripcion)
        setCliente(proyecto.cliente)
    }
  }, [params]);

  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return
    }
    //pasar los datos del formulario a la provider
    await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente });
    setId(null);
    setNombre('');
    setCliente('');
    setDescripcion('');
    setFechaEntrega('');

  }
  const { msg } = alerta
  return (
    <form className='py-10 px-5 md:w-1/2 rounded-lg bg-white shadow' onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta} />}
      <div className='mb-5'>
        <label htmlFor="nombre" className='text-gray-700 uppercase front-bold text-sm'>
          Nombre de la comanda
        </label>
        <input
          id="nombre"
          type="text"
          placeholder='Nombra tu producto'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="descripcion" className='text-gray-700 uppercase front-bold text-sm'>
          Descripcion
        </label>
        <textarea
          id="descripcion"
          placeholder='Descripcion del producto'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="fecha-entrega" className='text-gray-700 uppercase front-bold text-sm'>
          Fecha de entrega
        </label>
        <input
          type='date'
          id="fecha-entrega"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="nombre-cliente" className='text-gray-700 uppercase front-bold text-sm'>
          nombre del cliente
        </label>
        <input
          id="nombre-cliente"
          type="text"
          placeholder='Nombre del cliente'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>
      <input type="submit"
        value={id ? 'Actualizar Proyecto' : 'Guardar'}
        className='bg-red-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-red-800 transition-colors'
      />
    </form>
  )
}

export default Formulario