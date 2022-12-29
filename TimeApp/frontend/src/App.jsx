import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Modulos Globales
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
//Modulos restringidos
import View from './paginas/View';
import Comanda from './paginas/Comanda';

//Modulos de administracion
import Admin from './admin/Admin';
import VerComanda from './admin/views/VerComanda';
import NuevoColaborador from './admin/tools/NuevoColaborador';
import Comandas from './admin/Comandas';

//Componentes - controladores
import { AuthProvider } from './context/AuthProvider';
import { ViewProvider } from './context/ViewProvider';
import { AdminProvider } from './context/AdminProvider';

//Rutas
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import Administracion from './layouts/Administracion';
import ClientesView from './admin/views/ClientesView';
import ProductosView from './admin/views/ProductosView';
import { FechaProvider } from './context/FechaProvider';



let socket;


const App = () => {

  return (

    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <ViewProvider>
            <FechaProvider >
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrar" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route path="olvide-password/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>
                <Route path="/admin" element={<Administracion />} >
                  <Route index element={<Admin />} />
                  <Route path='comandas-terminadas' element={<Comandas />} />
                  <Route path='clientes' element={<ClientesView />} />
                  <Route path='producto' element={<ProductosView />} />
                  <Route path='comanda/:id' element={<VerComanda />} />
                  <Route path="comanda/colaboradores/:id" element={<NuevoColaborador />} />
                </Route>
                <Route path="/view" element={<RutaProtegida />}>
                  <Route index element={<View />} />
                  <Route path=":id" element={<Comanda />} />
                </Route>
              </Routes>
            </FechaProvider>
          </ViewProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


/* <Route path='comandas' element={<Comandas />} />*/