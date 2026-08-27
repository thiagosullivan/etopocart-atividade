import axios from "axios";

// Pega a URL do ambiente ou usa o localhost como segurança
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Instância configurada do Axios
export const api = axios.create({
  baseURL: API_URL,
});

// Consultar localizações
export async function getLocations() {
  try {
    // Com Axios, basta passar a rota relativa. Ele junta com o baseURL automaticamente!
    const response = await api.get("/api/locations");
    return response.data; // O Axios já entrega o JSON mastigado em .data
  } catch (error) {
    console.error("Erro em getLocations:", error);
    throw error;
  }
}

// Adicionar localização
export async function addLocations(newLocation) {
  if (!newLocation || !newLocation.properties) {
    throw new Error("Os dados são inválidos.");
  }

  try {
    // Não precisa de Headers nem de JSON.stringify, o Axios faz sozinho
    const response = await api.post("/api/locations", newLocation);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar localização:", error);
    throw error.response?.data || error;
  }
}

// Deletar localização
export async function deleteLocation(location_id) {
  if (!location_id) {
    throw new Error("ID da localização não fornecido.");
  }

  try {
    const response = await api.delete(`/api/locations/${location_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar localização:", error);
    throw error.response?.data || error;
  }
}

// Atualizar localização
export async function updateLocations(updatedLocationData) {
  if (!updatedLocationData || !updatedLocationData.id) {
    throw new Error("Dados inválidos para atualização.");
  }

  try {
    const response = await api.put(
      `/api/locations/${updatedLocationData.id}`,
      updatedLocationData,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar localização:", error);
    throw error.response?.data || error;
  }
}
