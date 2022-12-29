import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';


const View = createContext();


let socket;

const ViewProvider = ({ children }) => {
    const [comandaView, setComandaView] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState([]);
    const [tareas, setTareas] = useState({});
    const [comanda, setComanda] = useState({});
    const [tipoTarea, setTipoTarea] = useState({});
    const [tareaSelect, setTareaSelect] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const obtenerComandas = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/view', config);
                setComandaView(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerComandas();
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const obtenerComanda = async id => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/view/${id}`, config)
            setComanda(data);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            navigate('/view');
        } finally {
            setCargando(false);
        }

    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }

    const submitTarea = async tarea => {
        if (tarea.id) {
            await editarTarea(tarea)
        }
        else {
            await crearTarea(tarea)
        }
    }
    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config);
            //Agregando  la tarea al state
            const proyectoActualizado = { ...comanda }
            proyectoActualizado.tareas = [...comanda.tareas, data]
            setComanda(proyectoActualizado);
            setAlerta({
                msg: 'Tarea creada correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                setModalFormularioTarea(false);
            }, 1000);

            //socket.emit('nueva tarea', data);

        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

            //sincronizando  la tarea al state
            const comandaActualizada = { ...comanda }
            comandaActualizada.tareas = comandaActualizada.tareas.map(tareaState => tareaState._id === data._id
                ? data
                : tareaState)
            setComanda(comandaActualizada);

            setAlerta({
                msg: 'Comanda guardada correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({});
                setModalFormularioTarea(false);
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }
    const handleEditarTarea = tarea => {
        setTarea(tarea);
        setModalFormularioTarea(true);
    }
    const handleEliminarTarea = tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }
    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config);

            const comandaActualizada = { ...comanda };
            comandaActualizada.tareas = comandaActualizada.tareas.filter(tareaState => tareaState._id !== tarea._id)
            setComanda(comandaActualizada);
            setModalEliminarTarea(false);
            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 1800);

            setTarea({})

        } catch (error) {
            console.log(error)
        }
    }
    const submitColaborador = async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/admin/comanda/colaboradores');
            setColaborador(data)
            setAlerta({});
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        }
        setCargando(false)
    }
    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`admin/comanda/colaboradores/${comanda._id}`, email, config);

            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 1000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
            setTimeout(() => {
                setAlerta({})
            }, 1500);

        }
    }
    return (
        <View.Provider
            value={
                {
                    comandaView,
                    mostrarAlerta,
                    handleModalTarea,
                    setModalFormularioTarea,
                    cargando,
                    submitTarea,
                    handleEditarTarea,
                    handleEliminarTarea,
                    eliminarTarea,
                    agregarColaborador,
                    obtenerComanda,
                    comanda,
                    alerta,
                    modalFormularioTarea,
                    colaborador,
                    tipoTarea,
                    tarea,
                    modalEliminarTarea,
                    setComanda,
                    submitColaborador,
                    tareaSelect,
                    setTareaSelect
                }
            }
        >{children}
        </View.Provider>
    )
}

export {
    ViewProvider
}

export default View;
