import React,{useState,useEffect} from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Popup from 'reactjs-popup';
import CustomSpinner from '../CustomSpinner/CustomSpinner';
import { MDBListGroup } from 'mdb-react-ui-kit';
import ABMPagos from './ABMPagos';
import PagosItem from './PagosItem';



const Pagos = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [facturas, setFacturas] = useState ([])
  
  useEffect(()=>{
    const fetchFacturas = async () =>{
      const dbFirestore = getFirestore()
      const queryCollection = collection(dbFirestore, 'pagoFacturas')
      const queryCollectionFiltered = query(queryCollection,where('visible','==',true))
      const res= await getDocs(queryCollectionFiltered)
      let facturasData = res.docs.map(factura => ({
        id: factura.id,
        ...factura.data(),
      }));

      const queryProveedores = collection(dbFirestore, 'proveedores')
      const proveedorSnapshot = await getDocs(queryProveedores);
      const proveedorList = proveedorSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      facturasData = facturasData.map(factura => {
        const proveedor = proveedorList.find(prop => prop.id === factura.proveedor)
        const facturaconProveedor = {
          ...factura,
          nombreProveedor: proveedor ? proveedor.nombre : '',
      };
      return facturaconProveedor;
    });

      setFacturas(facturasData);
      setIsLoading(false)
      }
      fetchFacturas()
  },[])

  return (
    <>
        {isLoading ? <CustomSpinner></CustomSpinner>:
        <div className='mx-auto w-100 m-1 p-3' style={{ marginTop: '20px' }}>
          <h1 className='mb-4' style={{color: "white"}}>Pagos</h1>  
            <div className=' my-3 d-flex justify-content-end'>
                  <Popup trigger={<button type="button" className="btn btn-success">Add New</button>} modal>
                    <ABMPagos factura={{id:"",nombreProveedor:"",monto:"",fecha:"",metodo:"",idDetalle:""}}></ABMPagos>
                  </Popup>
            </div>
                  <MDBListGroup className='w-100'>
                    <PagosItem facturas={facturas}></PagosItem>
                  </MDBListGroup>
          </div>
          
        }
    </> 
  )
}

export default Pagos