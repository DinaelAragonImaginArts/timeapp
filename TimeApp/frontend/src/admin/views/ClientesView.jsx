import useAdmin from '../../hooks/UseAdmin';
import PreviewCliente from './previews/PreviewCliente';
import { useEffect } from 'react';

const ClientesView = () => {
  const { clientes, obtenerClientes } = useAdmin();
  useEffect(() => {
    obtenerClientes();
  }, [])
  
  return (
    <>
      <h1 className='text-4xl font-black'>Cuenta</h1>
          {clientes?.length ?
            clientes.map(cliente => (
              <PreviewCliente
                key={cliente._id}
                cliente={cliente}
              />
            ))
            : <p className='mt-5 text-center text-gray-600 uppercase p-5'>Aún no hay clientes</p>}
    </>
  )
}

export default ClientesView;
