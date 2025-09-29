// Consultar localizações
export async function getLocations() {
    console.log('ENTROU')
  try {
    const response = await fetch('/api/locations');
    console.log(response, 'RESPONSE')
    if (!response.ok) {
      throw new Error('Erro ao buscar localizações');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro em getLocations:', error);
    throw error;
  }
}