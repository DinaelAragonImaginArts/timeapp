import useAdmin from '../../hooks/UseAdmin';

const ButtonProducto = () => {
    const { openModalProducto } = useAdmin();
    return (
        <button
            onClick={openModalProducto}
            className="bg-[#ffb206] rounded-md text-white flex items-center p-3 text-md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>Producto
        </button>
    )
}

export default ButtonProducto