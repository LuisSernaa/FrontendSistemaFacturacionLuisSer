// ProductoForm.jsx
import React, { useState, useEffect } from 'react';

const ProductoForm = ({ productoExistente, onSubmit, onCancel }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        codigoBarras: '',
        categoria: ''
    });

    useEffect(() => {
        if (productoExistente) {
            setProducto(productoExistente);
        }
    }, [productoExistente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: parseFloat(value) || 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(producto);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', minHeight: '60px' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleNumberChange}
                        min="0"
                        step="0.01"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={producto.stock}
                        onChange={handleNumberChange}
                        min="0"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Código de Barras:</label>
                <input
                    type="text"
                    name="codigoBarras"
                    value={producto.codigoBarras}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Categoría:</label>
                <input
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                <button 
                    type="button" 
                    onClick={onCancel}
                    style={{ 
                        marginRight: '10px',
                        padding: '8px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px'
                    }}
                >
                    Cancelar
                </button>
                <button 
                    type="submit"
                    style={{ 
                        padding: '8px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px'
                    }}
                >
                    {productoExistente ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
};

export default ProductoForm;