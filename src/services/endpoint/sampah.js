import { api } from "../API/webapi";

export const getSampahCategory = () => {
  return api("GET", "/sampah");
};

export const addSampah = (nama_kategori, harga, stok_gudang) => {
  const body = {
    nama_kategori,
    harga,
    stok_gudang,
  };
  return api("POST", "/sampah", body);
};

export const deleteSampah = (sampahId) => {
  return api("DELETE", "/sampah/" + sampahId, {});
};

export const editSampah = (sampahId, nama_kategori, harga, stok_gudang) => {
  const body = {
    nama_kategori,
    harga,
    stok_gudang,
  };
  return api("PATCH", "/sampah/" + sampahId, body);
};
