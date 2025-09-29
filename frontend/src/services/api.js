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

// Adicionar localização
export async function addLocations(newLocation) {
  if (!newLocation || !newLocation.properties) {
    throw new Error('Os dados são inválidos.');
  }

  try {
    const response = await fetch('/api/locations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Erro ao adicionar nova localização.');
    }

    return data;
  } catch (error) {
    console.error('Erro ao adicionar localização:', error);
    throw error;
  }
}