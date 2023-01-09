import axios from 'axios';
import { baseUrl } from './Base';

export default class CategoryAxios {

    async getCategory() {
        try {
          return (await axios.get(`${baseUrl}/category`)).data;
        } 
        catch (error) {
          console.error(error)
        }
      }

    async deleteCategory(id) {
      try {
        return (await axios.delete(`${baseUrl}/category/${id}`)).data;
      } 
      catch (error) {
        console.error(error)
      }
    }

    async createCategory(category) {
        try {
          await axios.post(`${baseUrl}/category`, { 
            name: category.name 
        })
        } 
        catch (error) {
          console.error(error)
        }
    }

    async createCategory(id, category) {
        try {
          await axios.put(`${baseUrl}/category/${id}`, { 
            id: category.id,
            name: category.name 
        })
        } 
        catch (error) {
          console.error(error)
        }
    }
}