import React from 'react'
import { MDBListGroupItem } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { BsPencil, BsTrash } from "react-icons/bs";
import { app } from '../../FireBase/config'
import {doc, getFirestore, updateDoc } from 'firebase/firestore'
import ABMProveedor from './ABMProveedor';
import { useNavigate } from 'react-router-dom'

const ProveedoresItem = ({proveedores}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const currentProveedores = proveedores.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(propiedades.length / itemsPerPage);
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const navigate = useNavigate();
    const db = getFirestore(app);
    const deleteDoc=(id)=>{
        console.log(id)
        const examcollref = doc(db, 'proveedores',id)
        updateDoc(examcollref, {Activo:false}).then(() => {
          alert("Deleted")
          navigate(0)
        }).catch(error => {
          console.log(error.message)
        })
      }

  return (
    <>
    {
        currentProveedores.map(({id,nombre , descripcion, CUIT, email, telefono }) =>
            <MDBListGroupItem key={id} className='container align-items-center justify-content-center'>
                <div className='row '>
                        <div className='col'>
                            <p className='fw-bold mb-1'>Nombre</p>
                            <p className='text-muted mb-0'>{nombre}</p>
                        </div>
                        <div className="col" >
                            <p className='fw-bold mb-1'>Descripción</p>
                            <p className='text-muted mb-0'>{descripcion}</p>
                        </div>
                        <div className="col">
                            <p className='fw-bold mb-1'>CUIT</p>
                            <p className='text-muted mb-0'>{CUIT}</p>
                        </div>
                        <div className="col-3">
                            <p className='fw-bold mb-1'>E-mail</p>
                            <p className='text-muted mb-0'>{email}</p>
                        </div>
                        <div className="col">
                            <p className='fw-bold mb-1'>Telefono</p>
                            <p className='text-muted mb-0'>{telefono}</p>
                        </div>
                    <div className='col d-flex align-items-center'>
                        <Popup trigger={<button  className='btn btn-warning'><BsPencil ></BsPencil></button>} modal>
                            <ABMProveedor proveedor={{id,nombre,descripcion,CUIT, email, telefono}}></ABMProveedor>
                        </Popup>
                        <button className='btn btn-danger ms-2' onClick={()=>deleteDoc(id)}><BsTrash></BsTrash></button>
                    </div>
              </div>
            
            </MDBListGroupItem>
        )  
    }
     <div className="d-flex flex-column align-items-center m-3">
            <p>
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={handleNextPage}
          disabled={endIndex >= proveedores.length}
        >
          Next
        </button>
        </p>
      </div>
    </>
  )
}

export default ProveedoresItem