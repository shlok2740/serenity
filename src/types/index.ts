export interface IConversation {
  conversation_id: string;
  conversation_url: string;
  status: string;
}

export interface CVIState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  conversation: IConversation | null;
}