import React from 'react';
import FacturaItem from './FacturaItem';

const FacturaForm = ({
  nuevaFactura,
  clientes,
  productos,
  handleFacturaChange,
  handleItemChange,
  agregarItem,
  eliminarItem,
  agregarImpuesto,
  eliminarImpuesto,
  handleImpuestoChange,
  crearFactura
}) => {
  return (
    <form onSubmit={crearFactura} style={{ marginBottom: '15px' }}>
      {/* Sección Cliente */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Cliente:</label>
        <select
          name="clienteId"
          value={nuevaFactura.clienteId}
          onChange={handleFacturaChange}
          required
          style={{ padding: '5px' }}
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </div>
      
      {/* Sección Items de Factura */}
      <h3>Items de la Factura</h3>
      {nuevaFactura.items.map((item, index) => (
        <FacturaItem
          key={index}
          item={item}
          index={index}
          productos={productos}
          handleItemChange={handleItemChange}
          eliminarItem={eliminarItem}
        />
      ))}
      
      <button 
        type="button" 
        onClick={agregarItem}
        style={{ 
          marginRight: '10px', 
          padding: '5px 10px', 
          backgroundColor: '#2196F3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px' 
        }}
      >
        Agregar Item
      </button>
      
      {/* Sección Impuestos */}
      <div style={{ margin: '20px 0', padding: '15px', borderTop: '1px solid #eee' }}>
        <h3>Impuestos</h3>
        {nuevaFactura.impuestos.map((impuesto, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '10px', 
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre impuesto"
              value={impuesto.nombre}
              onChange={(e) => handleImpuestoChange(index, e)}
              required
              style={{ padding: '5px', width: '150px' }}
            />
            <input
              type="number"
              name="porcentaje"
              placeholder="%"
              value={impuesto.porcentaje}
              onChange={(e) => handleImpuestoChange(index, e)}
              min="0"
              max="100"
              step="0.1"
              required
              style={{ padding: '5px', width: '80px' }}
            />
            <button 
              type="button" 
              onClick={() => eliminarImpuesto(index)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px' 
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
        
        <button 
          type="button" 
          onClick={agregarImpuesto}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            marginRight: '10px'
          }}
        >
          Agregar Impuesto
        </button>
      </div>
      
      {/* Botón Crear Factura */}
      <button 
        type="submit" 
        style={{ 
          padding: '8px 15px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px',
          fontSize: '16px'
        }}
      >
        Crear Factura
      </button>
    </form>
  );
};

export default FacturaForm;