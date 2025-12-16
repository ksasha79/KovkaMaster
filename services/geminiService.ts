// Function to generate a conceptual image calling our own secure backend
export const generateGateConcept = async (promptDetails: string): Promise<string | null> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promptDetails }),
    });

    if (!response.ok) {
      console.error("API Request failed");
      return null;
    }

    const data = await response.json();
    return data.image || null;

  } catch (error) {
    console.error("Error generating gate concept:", error);
    return null;
  }
};