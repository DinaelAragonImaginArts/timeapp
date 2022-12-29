
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/UseAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }
    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      setAlerta({})
      localStorage.setItem('token', data.token);
      setAuth(data);
      if (data.area === "Administracion") {
        navigate('/admin')
      } else {
        navigate('/view')
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;


  return (
    <>
      <div className="">
        <div className="">
          {msg && <Alerta alerta={alerta} />}
          <form className='my-10 bg-white shadow rounded-lg p-10 ' onSubmit={handleSubmit}>
            <div className='my-5'>
              <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>E-mail</label>
              <input
                id='email'
                type="email"
                placeholder='E-mail de registro'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
              <input
                id='password'
                type="password"
                placeholder='Password'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Iniciar sesión"
              className="bg-red-500 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-red-800 transition-colors" />
          </form>
          <nav className='navegacion-registro lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-slate-100 uppercase text-sm'
              to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>
            <Link
              className='block text-center my-5 text-slate-100 uppercase text-sm'
              to="/olvide-password"
            >Olvidé mi password</Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Login