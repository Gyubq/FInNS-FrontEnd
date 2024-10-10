// src/api/CardService.js
import axiosInstance from './axiosInstance';

export const getCards = async () => {
  try {
    const response = await axiosInstance.get('/api/product/card');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error; // 에러를 상위 컴포넌트로 던짐
  }
};

export const getCardDetail = async (cardNo) => {
  try {
    const response = await axiosInstance.get(`/api/product/card/${cardNo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching card detail:', error);
    throw error;
  }
};
