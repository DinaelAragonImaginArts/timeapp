import useView from '../../hooks/UseView';
import ControlButtons from './ControlButtons';
import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';


const Cronometro = ({ tarea }) => {
    //const [timing, setTiming] = useState();
    const [inicio, setInicio] = useState();
    //sin status = 0
    //status inicio = 1
    //status pause = 2
    //status fin = 3
    const [status, setStatus] = useState(0);
    const [terminar, setTerminar] = useState();
    const [step, setStep] = useState(0)
    const [active, setActive] = useState(false);
    const [pausa, setPausa] = useState(false);
    const [tiempo, setTiempo] = useState(0);
    const [estado, setEstado] = useState(false);
    const [state, setState] = useState(false);

    const { setComanda, comanda, setTareaSelect } = useView();
    //const inicio = iniciio.getMinutes() + ':' + iniciio.getSeconds()
    //console.log(60 - parseInt(inicio))

    useEffect(() => {
        if (status === 2) {
            setTiempo(step - inicio);
        }
        else if (status === 3) {
            setTiempo(terminar - inicio);
        }
    }, [status]);

    useEffect(() => {
        if (status === 2) {
            guardarProgreso(tarea);
        }
        else if (status === 3) {
            terminarTarea(tarea);
        }
    }, [tiempo]);




    function handleStart() {
        let timing = new Date();
        setInicio(((60 * timing.getHours()) + timing.getMinutes()))
        setActive(true);
        setPausa(false);
        setStatus(1);
        setTareaSelect(true);
    }

    function handlePause() {
        let timing = new Date();
        setStep(((60 * timing.getHours()) + timing.getMinutes()))
        setActive(false);
        setPausa(true);
        setStatus(2);
        setTareaSelect(false);
    }

    function handleTerminar() {
        let timing = new Date();
        setTerminar(((60 * timing.getHours()) + timing.getMinutes()))
        setActive(false);
        setStatus(3);
        setPausa(false);
        setEstado(true);
        setTareaSelect(false);
    }

    const guardarProgreso = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            tarea.tiempo = parseInt(tiempo) + parseInt(tarea?.tiempo) || tiempo;
            const { data } = await clienteAxios.put(`/tareas/${tarea._id}`, tarea, config);
            const comandaActualizada = { ...comanda }
            comandaActualizada.tareas = comandaActualizada.tareas.map(tareaState => tareaState._id === data._id
                ? data
                : tareaState)
            setComanda(comandaActualizada);
            setPausa(false);
        }
        catch (error) {
            console.log(error);
        }
    }



    const terminarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            tarea.tiempo = parseInt(tiempo) + parseInt(tarea?.tiempo) || tiempo;
            tarea.estado = estado;
            const { data } = await clienteAxios.put(`/tareas/${tarea._id}`, tarea, config);
            const comandaActualizada = { ...comanda }
            comandaActualizada.tareas = comandaActualizada.tareas.map(tareaState => tareaState._id === data._id
                ? data
                : tareaState)
            setComanda(comandaActualizada);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <ControlButtons
                tarea={tarea}
                handleStart={handleStart}
                handlePause={handlePause}
                handleTerminar={handleTerminar}
                estado={estado}
                active={active}
                pausa={pausa}
                terminarTarea={terminarTarea}
                guardarProgreso={guardarProgreso}
                state={state}
                setInicio={setInicio}
                setStatus={setStatus}

            />
        </>
    )
}

export default Cronometro;

