import React, { useState } from 'react';
import { crearCliente, eliminarCliente, actualizarCliente } from '../../services/clienteService';
import ClienteForm from './ClienteForm';

const ClienteList = ({ clientes, actualizarLista }) => {
    const [clienteEditando, setClienteEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleCrear = async (clienteNuevo) => {
        try {
            await crearCliente(clienteNuevo);
            setMostrarFormulario(false);
            actualizarLista();
        } catch (error) {
            console.error('Error creando cliente:', error);
        }
    };

    const handleActualizar = async (clienteActualizado) => {
        try {
            await actualizarCliente(clienteActualizado.id, clienteActualizado);
            setMostrarFormulario(false);
            setClienteEditando(null);
            actualizarLista();
        } catch (error) {
            console.error('Error actualizando cliente:', error);
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminarCliente(id);
            actualizarLista();
        } catch (error) {
            console.error('Error eliminando cliente:', error);
        }
    };

    const handleEditar = (cliente) => {
        setClienteEditando(cliente);
        setMostrarFormulario(true);
    };

    return (
        <div>
            <h2>Clientes</h2>
            <button 
                onClick={() => {
                    setClienteEditando(null);
                    setMostrarFormulario(true);
                }}
                style={{ marginBottom: '15px', backgroundColor: 'green', color: 'white' }}
            >
                Crear Cliente
            </button>

            {mostrarFormulario && (
                <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                    <h3>{clienteEditando ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
                    <ClienteForm 
                        clienteExistente={clienteEditando}
                        onSubmit={clienteEditando ? handleActualizar : handleCrear}
                        onCancel={() => {
                            setMostrarFormulario(false);
                            setClienteEditando(null);
                        }}
                    />
                </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {clientes.map(cliente => (
                    <li key={cliente.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                        <strong>{cliente.nombre} {cliente.apellido}</strong>
                        <p>Documento: {cliente.documento}</p>
                        <p>Teléfono: {cliente.telefono}</p>
                        <button onClick={() => handleEditar(cliente)}>Editar</button>
                        <button onClick={() => handleEliminar(cliente.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
