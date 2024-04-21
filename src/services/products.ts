import axios, { AxiosResponse } from "axios";
import { Product_I } from "../interfaces/products";

const pathBase = process.env.REACT_APP_API_URL;
const config = { headers: { authorId: process.env.REACT_APP_AUTHOR_ID } };

export const getProducts = async (): Promise<AxiosResponse<Product_I[]>> => {
  try {
    return axios.get<Product_I[]>(`${pathBase}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createProduct = async (body: Product_I): Promise<AxiosResponse<Product_I>> => {
  try {
    return axios.post(`${pathBase!}`, body, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (body: Product_I): Promise<AxiosResponse<Product_I[]>> => {
  try {
    return await axios.put(`${pathBase!}`,body, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductById = async (productId: string): Promise<AxiosResponse<Product_I[]>> => {
  try {
    return await axios.delete(`${pathBase!}?id=${productId}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
};