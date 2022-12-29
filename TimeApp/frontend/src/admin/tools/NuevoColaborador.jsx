import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../utils/Loader';
import Alerta from "../../components/Alerta";
import useView from "../../hooks/UseView";
import ColaboradoresList from './pages/ColaboradoresList';
const NuevoColaborador = () => {
  const { obtenerComanda, comanda, cargando, colaborador, alerta, submitColaborador } = useView();
  const params = useParams();
  useEffect(() => {
    obtenerComanda(params.id);
    submitColaborador()
  }, []);

  
  const { msg } = alerta;
  return (
    cargando ? <Loader /> : (
      <>
        <h1 className="text-4xl font-black">Añadir Colaborador(a) la comanda: {comanda.nombre} </h1>
        {msg && <Alerta alerta={alerta} />}
        <div className="flex flex-col gap-5 justify-between">
          {colaborador?.length ?
            <ColaboradoresList />
            : <span>No hay usuarios disponibles para agregar</span>
          }
        </div>
      </>

    )
  )
}

export default NuevoColaborador;