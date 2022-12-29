import useAdmin from '../hooks/UseAdmin';
import Print from './tools/Print';
import ButtonCliente from './tools/ButtonCliente';
import ButtonProducto from './tools/ButtonProducto';
import ButtonComanda from './tools/ButtonComanda';
import ModalCliente from './tools/pages/ModalCliente';
import { Link } from 'react-router-dom';
import ModalProducto from './tools/pages/ModalProducto';
import ModalComanda from './tools/pages/ModalComanda';
import ComandaView from './views/ComandaView';
import ButtonTipoTarea from './tools/ButtonTipoTarea';
import ModalTipoTarea from './tools/pages/ModalTipoTarea';
//import UsersConect from './UsersConect';

const Admin = () => {
  const { info } = useAdmin();

  console.log(info);


  const modalComanda = <ModalComanda />
  const vistaComandas = <ComandaView />

  return (
    <>
      <div className='flex gap-3 justify-between items-center flex-wrap p-4'>
        <ButtonCliente />
        <ButtonProducto />
        <ButtonComanda />
        <ButtonTipoTarea />
      </div>
      <Print csv={info} />
      <div className='flex items-center justify-between bg-white shadow rounded-lg p-5 mt-5'>
        <div className='font-bold uppercase'>Total comandas</div>
        <Link to='comandas-terminadas' className='text-[#ff3131] font-bold hover:text-gray-400'>Ver Comandas</Link>
      </div>
      <div className='md:flex  lg:flex gap-3 mt-10 flex-col'>
        <div className='flex bg-white shadow rounded-lg p-10 mt-5 items-center'>
          <h3 className='flex-1 text-xl font-bold px-2'>Cuenta</h3>
          <Link to="clientes" className='text-[#ff3131] font-bold'>Ver cuenta</Link>
        </div>
        <div className='flex bg-white shadow rounded-lg p-10 mt-5 items-center'>
          <h3 className='flex-1 text-xl font-bold px-2'>Productos</h3>
          <Link to="producto" className='text-[#ff3131] text-center font-bold'>Ver productos</Link>
        </div>
      </div>
      {vistaComandas}
      <ModalCliente />
      {modalComanda}
      <ModalProducto />
      <ModalTipoTarea />
    </>
  )
}

export default Admin