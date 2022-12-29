import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/clienteAxios';


const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [info, setInfo] = useState([{}]);
    const [comandaTerminada, setComandaTerminada] = useState({})
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalComanda, setModalComanda] = useState(false);
    const [modalProducto, setModalProducto] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [comandaListar, setComandaListar] = useState({});
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [colaborador, setColaborador] = useState({});
    const [modalTipoTarea, setModalTipoTarea] = useState(false);
    const [comanda, setComanda] = useState({});
    const [productoExtract, setProductoExtract] = useState({});
    const [comandaActualizada, setComandaActualizada] = useState({})

    useEffect(() => {
        const obtenerInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/admin', config);
                setInfo(data)
                setComanda(data.comanda)
                setClientes(data.cliente)
                setProductos(data.producto)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerInfo();
    }, [], [info]);
    //Creamos comanda
    const crearComanda = async comanda => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/admin', comanda, config);
            setComanda([...info.comanda, data]);
            info.comanda.push(data);
            setAlerta({
                msg: 'Comanda creada correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                setModalComanda(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }
    const obtenerComanda = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`admin/comanda/${id}`, config)
            setComandaListar(data);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const terminarComanda = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/admin/${id}`, { id: id }, config);
            const comandaActualizada = comanda.map(comandaState => comandaState._id === data._id ? data : comandaState)
            setComanda(comandaActualizada);
            setAlerta({
                msg: 'Comanda Terminada',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }
    const obtenerClientes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/admin/cliente', config);
            setClientes([...info.cliente, data])
        } catch (error) {
            console.log(error)
        }
    }
    const crearCliente = async cliente => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/admin/cliente', cliente, config);
            //Para visualizarlos: creamos una copia de los clientes
            setAlerta({
                msg: 'Cliente creado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                setModal(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }
    //Productos
    const obtenerProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/admin/producto', config);
            setProductos([...info.producto, data])
        } catch (error) {
            console.log(error)
        }
    }
    const crearProducto = async producto => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/admin/producto', producto, config);
            //Para visualizarlos: creamos una copia de los productos
            setProductos([...productos, data]);
            setAlerta({
                msg: 'Producto creado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                setModalProducto(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }
    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador);
        setColaborador(colaborador)
    }
    const eliminarColaborador = async (colaborador) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`admin/comanda/eliminar-colaboradores/${comandaListar._id}`, colaborador, config)
            const comandaActualizada = { ...comandaListar }
            comandaActualizada.colaboradores = comandaActualizada.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id);
            setComandaListar(comandaActualizada);
            setTimeout(() => {
                setColaborador({});
                setModalEliminarColaborador(false)
            }, 1000);
        } catch (error) {
           console.log(error);
        }
    }
    const crearTipoTarea = async tipoTarea => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/admin/tipo-tarea', tipoTarea, config);
            //TODO: No se lista en tiempo real pero tampoco la estoy actualizando
            setAlerta({
                msg: 'Tipo tarea creado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                setModalTipoTarea(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }
    //Modales 
    const handleTipoTarea = () => {
        setModalTipoTarea(!modalTipoTarea);
    }
    const handleModal = () => {
        setModal(!modal);
    }
    const handleModalProducto = () => {
        setModalProducto(!modalProducto);
    }
    const openModalProducto = () => {
        setModalProducto(true);
    }
    const handleComanda = () => {
        setModalComanda(!modalComanda);
    }
    const openModal = () => {
        setModal(true);
    }
    //Alerta
    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }
    return (
        <AdminContext.Provider
            value={{
                info,
                handleModal,
                openModal,
                modal,
                crearCliente,
                obtenerClientes,
                mostrarAlerta,
                alerta,
                clientes,
                modalProducto,
                openModalProducto,
                handleModalProducto,
                crearProducto,
                obtenerProductos,
                productos,
                comanda,
                handleComanda,
                modalComanda,
                crearComanda,
                comandaTerminada,
                obtenerComanda,
                comandaListar,
                eliminarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                modalTipoTarea,
                handleTipoTarea,
                crearTipoTarea,
                comandaActualizada,
                productoExtract,
                terminarComanda
            }}>{children}</AdminContext.Provider>
    );
}


export {
    AdminProvider
}

export default AdminContext;