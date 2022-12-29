import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useView from '../hooks/UseView';
import Alerta from '../components/Alerta';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAdmin from '../hooks/UseAdmin';


let opcion;

const ModalFormularioTarea = ({ comandaId }) => {
    const { tarea, modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea } = useView();
    const { info } = useAdmin();
    const { usuario, auth } = useAuth();
    const [user, setUser] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [id, setId] = useState('');
    const [comanda, setComanda] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [area, setArea] = useState('');
    const [cuenta, setCuenta] = useState('');
    const params = useParams();
    const { tipoTarea } = info;



    if (usuario?.area !== "Administracion") {
        const tareaOpcion = tipoTarea?.filter(tarea => tarea?.area === auth?.area || tarea?.area === "General");
        opcion = tareaOpcion?.map(item => {
            return item.nombre
        })
    }
    else {
        opcion = tipoTarea?.map(item => {
            return item.nombre
        })
    }


    useEffect(() => {
        if (tarea?._id) {
            setId(tarea._id);
            setNombre(tarea.nombre);
            setDescripcion(tarea.descripcion);
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
            setTiempo(tarea.tiempo);
            setComanda(tarea.comanda);
            setUser(tarea.usuario);
            setArea(tarea.area);
            setCuenta(tarea.cuenta);
            return
        }
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega(Date());
        setComanda(comandaId.nombre);
        setUser(usuario.nombre);
        setArea(usuario.area);
        setCuenta(comandaId.cuenta)
    }, [tarea]);

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son obligatorios',
                error: true
            })
            return
        }
        await submitTarea(
            {
                id,
                nombre,
                descripcion,
                tiempo,
                fechaEntrega,
                comandaId: params.id,
                comanda: comanda,
                usuario: user,
                area: area,
                cuenta: cuenta,
            });
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
    }

    const { msg } = alerta


    return (
        <Transition.Root show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTarea}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-red-600 hover:text-red-700"
                                    onClick={handleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        <form
                                            onSubmit={handleSubmit}
                                            className='my-10 p-2 rounded-lg'>
                                            {msg && <Alerta alerta={alerta} />}
                                            <div className='mb-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    htmlFor="nombre">
                                                    Tipo de tarea
                                                </label>
                                                <select
                                                    id="nombre"
                                                    placeholder='Nombre de la tarea'
                                                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={nombre}
                                                    onChange={e => setNombre(e.target.value)}
                                                >
                                                    <option value="">--- Seleccionar ---</option>
                                                    {opcion?.map(tarea => (
                                                        <option key={tarea._id}>{tarea}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='mb-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    htmlFor="descripcion">
                                                    Comentarios
                                                </label>
                                                <textarea
                                                    id="descripcion"
                                                    placeholder='Comentarios'
                                                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={descripcion}
                                                    onChange={e => setDescripcion(e.target.value)}
                                                />
                                            </div>
                                            <input
                                                type="submit"
                                                className='hover:cursor-pointer bg-red-600 text-white py-3 px-5 rounded-lg w-full'
                                                value={id ? 'Guardar cambios' : 'Crear tarea'}
                                            />
                                        </form>
                                    </Dialog.Title>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea