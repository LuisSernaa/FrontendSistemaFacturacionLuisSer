import React from 'react';

const FacturaList = ({ facturas }) => {
    // Función para calcular el subtotal seguro
    const calcularSubtotal = (items) => {
        if (!items) return 0;
        return items.reduce((total, item) => total + (item.subtotal || 0), 0);
    };

    // Función para calcular el total seguro
    const calcularTotalSeguro = (factura) => {
        if (factura.total !== null && factura.total !== undefined) {
            return factura.total;
        }
        return calcularSubtotal(factura.items);
    };

    // Función para formatear números de manera segura
    const formatoMoneda = (valor) => {
        if (valor === null || valor === undefined) return '$0.00';
        return `$${parseFloat(valor).toFixed(2)}`;
    };

    return (
        <div>
            <h3>Facturas existentes</h3>
            {facturas && facturas.map(factura => {
                const subtotal = calcularSubtotal(factura.items);
                const total = calcularTotalSeguro(factura);
                const impuestos = total - subtotal;

                return (
                    <div key={factura.id} style={{ 
                        marginBottom: '15px', 
                        padding: '10px', 
                        border: '1px solid #ddd', 
                        borderRadius: '3px' 
                    }}>
                        <p><strong>Fecha:</strong> {factura.fechaCreacion ? new Date(factura.fechaCreacion).toLocaleDateString() : 'Sin fecha'}</p>
                        <p><strong>Subtotal:</strong> {formatoMoneda(subtotal)}</p>
                        {impuestos > 0 && <p><strong>Impuestos:</strong> {formatoMoneda(impuestos)}</p>}
                        <p><strong>Total:</strong> {formatoMoneda(total)}</p>
                        
                        <h4>Items:</h4>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '5px' }}>
                            {factura.items?.map(item => (
                                <li key={item.id} style={{ marginBottom: '3px' }}>
                                    {item.cantidad || 0} x {item.producto?.nombre || 'Producto desconocido'} - {formatoMoneda(item.subtotal)} ({formatoMoneda(item.precioUnitario)} c/u)
                                </li>
                            )) || <li>No hay items</li>}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default FacturaList;