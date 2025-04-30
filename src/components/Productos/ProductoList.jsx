import React, { useState } from 'react';
import { 
    crearProducto,
    desactivarProducto, 
    actualizarProducto,
    ajustarStock
} from '../../services/productoService';
import ProductoForm from './ProductoForm';

const ProductoList = ({ productos = [], actualizarLista }) => {
    const [productoEditando, setProductoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(true); // Mostrar formulario por defecto
    const [ajusteStock, setAjusteStock] = useState({ id: null, cantidad: 0 });

    const handleCrear = async (nuevoProducto) => {
        try {
            await crearProducto(nuevoProducto);
            setMostrarFormulario(false);
            actualizarLista && actualizarLista();
        } catch (error) {
            console.error('Error creando producto:', error);
        }
    };

    const handleDesactivar = async (id) => {
        try {
            await desactivarProducto(id);
            actualizarLista && actualizarLista();
        } catch (error) {
            console.error('Error desactivando producto:', error);
        }
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto);
        setMostrarFormulario(true);
    };

    const handleActualizar = async (productoActualizado) => {
        try {
            await actualizarProducto(productoActualizado.id, productoActualizado);
            setMostrarFormulario(false);
            setProductoEditando(null);
            actualizarLista && actualizarLista();
        } catch (error) {
            console.error('Error actualizando producto:', error);
        }
    };

    const handleAjustarStock = async () => {
        try {
            await ajustarStock(ajusteStock.id, ajusteStock.cantidad);
            setAjusteStock({ id: null, cantidad: 0 });
            actualizarLista && actualizarLista();
        } catch (error) {
            console.error('Error ajustando stock:', error);
        }
    };

    return (
        <div>
            <button 
                onClick={() => {
                    setProductoEditando(null);
                    setMostrarFormulario(!mostrarFormulario);
                }}
                style={{ 
                    marginBottom: '15px', 
                    backgroundColor: mostrarFormulario ? '#f44336' : '#4CAF50',
                    color: 'white',
                    padding: '8px 15px',
                    border: 'none',
                    borderRadius: '3px'
                }}
            >
                {mostrarFormulario ? 'Ocultar Formulario' : 'Crear Producto'}
            </button>

            {mostrarFormulario && (
                <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                    <h3>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                    <ProductoForm 
                        productoExistente={productoEditando}
                        onSubmit={productoEditando ? handleActualizar : handleCrear}
                        onCancel={() => {
                            setMostrarFormulario(false);
                            setProductoEditando(null);
                        }}
                    />
                </div>
            )}

            {ajusteStock.id && (
                <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                    <h3>Ajustar Stock</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={ajusteStock.cantidad}
                            onChange={(e) => setAjusteStock({...ajusteStock, cantidad: parseInt(e.target.value) || 0})}
                            style={{ marginRight: '10px', padding: '5px', width: '80px' }}
                        />
                        <button 
                            onClick={handleAjustarStock}
                            style={{ 
                                marginRight: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px'
                            }}
                        >
                            Aplicar
                        </button>
                        <button 
                            onClick={() => setAjusteStock({ id: null, cantidad: 0 })}
                            style={{ 
                                padding: '5px 10px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {productos.filter(p => p.activo).map(producto => (
                    <li key={producto.id} style={{ 
                        marginBottom: '10px', 
                        padding: '10px', 
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <strong>{producto.nombre}</strong>
                            <p>Precio: ${producto.precio?.toFixed(2) || '0.00'}</p>
                            <p>Stock: {producto.stock}</p>
                            <p>Categoría: {producto.categoria || 'N/A'}</p>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleEditar(producto)}
                                style={{ 
                                    marginRight: '10px',
                                    padding: '5px 10px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px'
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => setAjusteStock({ id: producto.id, cantidad: 0 })}
                                style={{ 
                                    marginRight: '10px',
                                    padding: '5px 10px',
                                    backgroundColor: '#FFC107',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '3px'
                                }}
                            >
                                Ajustar Stock
                            </button>
                            <button 
                                onClick={() => handleDesactivar(producto.id)}
                                style={{ 
                                    padding: '5px 10px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px'
                                }}
                            >
                                Desactivar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductoList;