// productoService.js
import axios from 'axios';

const API_URL = 'https://stunning-rebirth-production.up.railway.app/api/productos';

export const obtenerProductos = async () => {
    return await axios.get(API_URL);
};

export const crearProducto = async (producto) => {
    return await axios.post(API_URL, producto);
};

export const actualizarProducto = async (id, producto) => {
    return await axios.put(`${API_URL}/${id}`, producto);
};

export const desactivarProducto = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const ajustarStock = async (id, cantidad) => {
    return await axios.put(`${API_URL}/${id}/stock?cantidad=${cantidad}`);
};

export const obtenerProductoPorId = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};
