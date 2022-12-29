import { useEffect } from "react"
import useAdmin from "../../hooks/UseAdmin"
import PreviewProducto from './previews/PreviewProducto';

const ProductosView = () => {
  const { obtenerProductos, productos } = useAdmin();
  useEffect(() => {
    obtenerProductos();
  }, [])
  return (
    <>
      <h1 className='text-4xl font-black'>Lista de productos</h1>
        {productos?.length ?
          productos.map(producto => (
            <PreviewProducto
              key={producto._id}
              producto={producto}
            />
          ))

          :
          <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay productos</p>
        }
    </>
  )
}

export default ProductosView