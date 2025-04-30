import React, { useState, useEffect } from 'react';
import { ClienteList } from './components/Clientes';
import { ProductoList } from './components/Productos';
import { FacturaForm, FacturaList } from './components/Facturas';
import Layout from './components/Layout';
import { obtenerClientes } from './services/clienteService';
import { obtenerProductos } from './services/productoService';
import { obtenerFacturas, crearFactura } from './services/facturaService';

const Home = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [nuevaFactura, setNuevaFactura] = useState({
        clienteId: '',
        items: [{ productoId: '', cantidad: 1 }],
        impuestos: [{ nombre: 'IVA', porcentaje: 16 }]
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [clientesRes, productosRes, facturasRes] = await Promise.all([
                obtenerClientes(),
                obtenerProductos(),
                obtenerFacturas()
            ]);
            setClientes(clientesRes.data);
            setProductos(productosRes.data);
            setFacturas(facturasRes.data);
        } catch (error) {
            console.error('Error obteniendo datos:', error);
        }
    };

    // Funciones para facturas
    const agregarImpuesto = () => {
        setNuevaFactura({
            ...nuevaFactura,
            impuestos: [...nuevaFactura.impuestos, { nombre: '', porcentaje: 0 }]
        });
    };
    
    const eliminarImpuesto = (index) => {
        const newImpuestos = [...nuevaFactura.impuestos];
        newImpuestos.splice(index, 1);
        setNuevaFactura({
            ...nuevaFactura,
            impuestos: newImpuestos
        });
    };
    
    const handleImpuestoChange = (index, e) => {
        const newImpuestos = [...nuevaFactura.impuestos];
        newImpuestos[index] = {
            ...newImpuestos[index],
            [e.target.name]: e.target.name === 'porcentaje' ? parseFloat(e.target.value) : e.target.value
        };
        setNuevaFactura({
            ...nuevaFactura,
            impuestos: newImpuestos
        });
    };

    const handleCrearFactura = async (e) => {
        e.preventDefault();
        try {
            const subtotal = nuevaFactura.items.reduce((total, item) => {
                const producto = productos.find(p => p.id === item.productoId);
                return total + (producto ? producto.precio * item.cantidad : 0);
            }, 0);
    
            const totalConImpuestos = nuevaFactura.impuestos.reduce((total, impuesto) => {
                return total + (subtotal * (impuesto.porcentaje / 100));
            }, subtotal);
    
            await crearFactura({
                ...nuevaFactura,
                total: totalConImpuestos
            });
    
            setNuevaFactura({
                clienteId: '',
                items: [{ productoId: '', cantidad: 1 }],
                impuestos: [{ nombre: 'IVA', porcentaje: 16 }]
            });
    
            const response = await obtenerFacturas();
            setFacturas(response.data);
        } catch (error) {
            console.error('Error creando factura:', error);
        }
    };

    const handleFacturaChange = (e) => {
        setNuevaFactura({
            ...nuevaFactura,
            [e.target.name]: e.target.value
        });
    };

    const handleItemChange = (index, e) => {
        const newItems = [...nuevaFactura.items];
        newItems[index] = {
            ...newItems[index],
            [e.target.name]: e.target.name === 'cantidad' ? parseInt(e.target.value) : e.target.value
        };
        setNuevaFactura({
            ...nuevaFactura,
            items: newItems
        });
    };

    const agregarItem = () => {
        setNuevaFactura({
            ...nuevaFactura,
            items: [...nuevaFactura.items, { productoId: '', cantidad: 1 }]
        });
    };

    const eliminarItem = (index) => {
        const newItems = [...nuevaFactura.items];
        newItems.splice(index, 1);
        setNuevaFactura({
            ...nuevaFactura,
            items: newItems
        });
    };

    return (
        <Layout>
            {/* Sección de Clientes */}
            <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h2>Clientes</h2>
                <ClienteList 
                    clientes={clientes} 
                    actualizarLista={fetchData} 
                />
            </div>
            
            {/* Sección de Productos */}
            <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h2>Productos</h2>
                <ProductoList 
                    productos={productos} 
                    actualizarLista={fetchData} 
                />
            </div>
            
            {/* Sección de Facturas */}
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h2>Facturas</h2>
                <FacturaForm 
                    nuevaFactura={nuevaFactura}
                    clientes={clientes}
                    productos={productos}
                    handleFacturaChange={handleFacturaChange}
                    handleItemChange={handleItemChange}
                    agregarItem={agregarItem}
                    eliminarItem={eliminarItem}
                    agregarImpuesto={agregarImpuesto}
                    eliminarImpuesto={eliminarImpuesto}
                    handleImpuestoChange={handleImpuestoChange}
                    crearFactura={handleCrearFactura}
                />
                <FacturaList facturas={facturas} />
            </div>
        </Layout>
    );
};

export default Home;