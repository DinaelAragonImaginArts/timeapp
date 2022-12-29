import React from 'react'

const PreviewProducto = ({ producto }) => {
  const { nombre, descripcion, numero } = producto
  return (
    <>
      <div className="flex mt-10 bg-white p-4 rounded-lg items-center justify-between">
        <div>
          <p className="font-bold">{nombre}</p>
          <p className="text-gray-600 font-bold">{descripcion}</p>
          <p className="text-red-600 font-bold">{numero}</p>
        </div>
        <div className="flex gap-3 items-center">
         
        </div>
      </div>
    </>
  )
}

export default PreviewProducto


/* <button
            className="bg-red-600 text-white rounded-lg p-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button className="bg-red-600 text-white rounded-lg p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>*/