// facturaService.js
import axios from 'axios';

const API_URL = 'https://stunning-rebirth-production.up.railway.app/api';

export const obtenerFacturas = async () => {
    return await axios.get(`${API_URL}/facturas`);
};

export const crearFactura = async (factura) => {
    return await axios.post(`${API_URL}/facturas`, factura);
};
