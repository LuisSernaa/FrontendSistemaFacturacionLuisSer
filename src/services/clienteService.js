// clienteService.js
import axios from 'axios';

const API_URL = 'https://worthy-transformation-production-b4f7.up.railway.app/api/clientes';

export const obtenerClientes = async () => {
    return await axios.get(API_URL);
};

export const crearCliente = async (cliente) => {
    return await axios.post(API_URL, cliente);
};

export const actualizarCliente = async (id, cliente) => {
    return await axios.put(`${API_URL}/${id}`, cliente);
};

export const eliminarCliente = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const obtenerClientePorId = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};