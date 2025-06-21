import { IConversation } from '../../types';

export const createConversation = async (
  token: string,
  personaId?: string
): Promise<IConversation> => {
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({
      persona_id: personaId || "p9a95912", // Default to Stock Demo Persona
      properties: {
        apply_greenscreen: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create conversation: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};