import { Injectable } from "@nestjs/common";
// Solo si estás en Node.js < 18
// import fetch from 'node-fetch';

@Injectable()
export class ImgBBService {
  private apiKey: string = process.env.IMGBB_API_KEY;
  private apiUrl: string = process.env.IMGBB_API_URL;

  constructor() {}

  async uploadImage(imageBase64: string, name?: string, expiration?: number): Promise<any> {
    const formData = new URLSearchParams();
    formData.append("key", this.apiKey);
    formData.append("image", imageBase64);
    
    if (name) formData.append("name", name);
    if (expiration) formData.append("expiration", expiration.toString());

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.statusText}`);
      }

      const data = await response.json();
      // Procesa la respuesta para extraer solo los datos clave
      return {
        id: data.data.id,
        title: data.data.title,
        url: data.data.url,  // URL de la imagen completa
        thumb_url: data.data.thumb.url,  // URL de la miniatura
        delete_url: data.data.delete_url  // URL de eliminación
      };
    } catch (error) {
      throw new Error(`Error uploading image to ImgBB: ${error.message}`);
    }
  }
}
