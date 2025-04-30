// FacturaItem.jsx
import React from 'react';

const FacturaItem = ({ item, index, productos, handleItemChange, eliminarItem }) => {
    return (
        <div key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
            <select
                name="productoId"
                value={item.productoId}
                onChange={(e) => handleItemChange(index, e)}
                required
                style={{ marginRight: '10px', padding: '5px' }}
            >
                <option value="">Seleccione un producto</option>
                {productos.map(producto => (
                    <option key={producto.id} value={producto.id}>
                        {producto.nombre} (${producto.precio})
                    </option>
                ))}
            </select>
            
            <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={item.cantidad}
                onChange={(e) => handleItemChange(index, e)}
                min="1"
                required
                style={{ marginRight: '10px', padding: '5px', width: '80px' }}
            />
            
            <button 
                type="button" 
                onClick={() => eliminarItem(index)}
                style={{ padding: '2px 5px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px' }}
            >
                Eliminar
            </button>
        </div>
    );
};

export default FacturaItem;