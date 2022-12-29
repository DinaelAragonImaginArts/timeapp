import { useState } from 'react';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';



const AREA = ['Producción', 'Digital'];
//const FUNCION = ['diseño', 'redaccion', 'desarrollo', 'Administracion'];


const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
 //Campos para validacion de campo de usuarios
  const [area, setArea] = useState('');

 
  //Alerta para validaciones
  const [alerta, setAlerta] = useState({});



  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword, area].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    setAlerta({})

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }
    setAlerta({})

    if (password.length < 6) {
      setAlerta({
        msg: 'Tu password es muy corto',
        error: true
      })
      return
    }
    setAlerta({})
    //crear usuario en la api
    try {
      const { data } = await clienteAxios.post(`/usuarios`,
        { nombre, email, password, area});
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('');
      setPassword('');
      setEmail('');
      setRepetirPassword('');
      setArea('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta


  return (
    <>
      <h1 className="text-center text-slate-100 uppercase text-3xl margin-negativo">Crea una cuenta</h1>
      {msg && <Alerta alerta={alerta} />}
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className='my-5 bg-white shadow rounded-lg py-5 px-10'>
            <div className='my-5'>
              <label htmlFor="nombre" className='uppercase text-gray-600 block text-md font-bold'>Nombre</label>
              <input
                id='nombre'
                type="text"
                placeholder='Ingresa tu nombre'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="email" className='uppercase text-gray-600 block text-md font-bold'>E-mail</label>
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
              <label htmlFor="password" className='uppercase text-gray-600 block text-md font-bold'>Password</label>
              <input
                id='password'
                type="password"
                placeholder='Password'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="password2" 
              className='uppercase text-gray-600 block text-md font-bold'>Repetir password</label>
              <input
                id='password2'
                type="password"
                placeholder='Repetir password'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
            <div className='mb-5'>
              <label
                className='uppercase text-gray-600 block text-md font-bold'
                htmlFor="area">
                Área
              </label>
              <select
                id="area"
                placeholder='Selecciona tu área'
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                value={area}
                onChange={e => setArea(e.target.value)}
              >
                <option value="">--- Seleccionar ---</option>
                {AREA.map(opcion => (
                  <option key={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Registrarme"
              className="bg-red-500 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-red-800 transition-colors" />
          </form>
          <nav className='navegacion-registro lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-slate-100 uppercase text-sm'
              to="/"
            >¿Ya tienes una cuenta? Incia sesión</Link>
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

export default Registrar