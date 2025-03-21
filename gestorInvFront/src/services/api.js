import axios from 'axios';

const API_URL = 'http://10.10.1.39:3000';

export const registrarInvitacionPrincipal = async (nombre, numero, cantidadInv) => {
  try {
    const response = await axios.post(`${API_URL}/asistentePrincipal/registrar`, {
      nombre,
      numero,
      cantidadInv,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al registrar la invitación principal';
  }
};

export const registrarAcompanante = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/asistente/registrar`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al registrar';
  }
};

export const obtenerInvitados = async () => {
  try {
    const response = await axios.get(`${API_URL}/asistentePrincipal`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener los invitados';
  }
};

export const obtenerInvitadoPrincipal = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/asistentePrincipal/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener datos';
  }
};

export const obtenerIdPorNumero = async (numero) => {
  try {
    const response = await axios.get(`${API_URL}/asistentePrincipal/porNumero/${numero}`);
    return response.data.id;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener ID';
  }
};

export const obtenerAcompanantes = async (idPrincipal) => {
  try {
    const response = await axios.get(`${API_URL}/asistente/${idPrincipal}/nombres`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener los acompañantes';
  }
};

export const actualizarInvitadoPrincipal = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/asistentePrincipal/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al actualizar el invitado";
  }
};

export const actualizarAcompanante = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/asistente/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al actualizar';
  }
};

export const eliminarInvitado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/asistentePrincipal/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar el invitada';
  }
};

export const eliminarAcompanante = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/asistente/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar';
  }
};