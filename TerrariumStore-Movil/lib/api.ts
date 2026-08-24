import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8000";

class ApiClient {
  private async getHeaders(customHeaders?: HeadersInit) {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...customHeaders,
    });
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }

  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = await this.getHeaders(options.headers);
    
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error en la petición a la API");
    }
    
    return response.json();
  }

  async get(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  }

  async post(endpoint: string, data: any, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "POST", body: JSON.stringify(data) });
  }

  async put(endpoint: string, data: any, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "PUT", body: JSON.stringify(data) });
  }

  async delete(endpoint: string, options?: RequestInit) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient();
