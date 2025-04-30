import React, { useState, useEffect } from 'react';

const ClienteForm = ({ clienteExistente, onSubmit, onCancel }) => {
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        documento: '',
        telefono: ''
    });

    useEffect(() => {
        if (clienteExistente) {
            setCliente(clienteExistente);
        } else {
            setCliente({
                nombre: '',
                apellido: '',
                documento: '',
                telefono: ''
            });
        }
    }, [clienteExistente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cliente);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
                type="text" 
                name="nombre" 
                value={cliente.nombre} 
                onChange={handleChange} 
                placeholder="Nombre" 
                required 
            />
            <input 
                type="text" 
                name="apellido" 
                value={cliente.apellido} 
                onChange={handleChange} 
                placeholder="Apellido" 
                required 
            />
            <input 
                type="text" 
                name="documento" 
                value={cliente.documento} 
                onChange={handleChange} 
                placeholder="Documento" 
                required 
            />
            <input 
                type="text" 
                name="telefono" 
                value={cliente.telefono} 
                onChange={handleChange} 
                placeholder="Teléfono" 
                required 
            />
            <div>
                <button type="submit" style={{ marginRight: '10px' }}>
                    {clienteExistente ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={onCancel}>Cancelarr</button>
            </div>
        </form>
    );
};

export default ClienteForm;
