export interface GrokChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GrokChatCompletionRequest {
  model: string;
  messages: GrokChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: {
    type: "json_object" | "text";
  };
  stream?: boolean;
}

export interface GrokChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: "assistant";
      content: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
