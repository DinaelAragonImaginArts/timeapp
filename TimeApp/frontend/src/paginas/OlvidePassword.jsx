import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});



  const handleSubmit  = async e =>{
    e.preventDefault();

    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El E-mail es obligatorio',
        error: true
      });
      return
    }

    try {    
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }
  const {msg} = alerta;

  return (
    <>
      <h1 className="text-center my-5 text-slate-100 uppercase text-5xl">Recuperar password</h1>
      <div className="">
        <div className="">
          {msg && <Alerta alerta={alerta}/>}
          <form
            className='my-10 bg-white shadow rounded-lg p-10 '
            onSubmit={handleSubmit}
          >

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
            <input
              type="submit"
              value="Enviar instrucciones"
              className="bg-red-500 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-red-800 transition-colors" />
          </form>
          <nav className='navegacion-registro lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-slate-100 uppercase text-sm'
              to="/"
            >¿Ya tienes una cuenta? Incia sesión</Link>
            <Link
              className='block text-center my-5 text-slate-100 uppercase text-sm'
              to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default OlvidePassword