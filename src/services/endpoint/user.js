import { api } from "../API/webapi";

export const updateProfile = (userId, nama_lengkap, email, telepon, lokasi) => {
  const data = {
    nama_lengkap,
    email,
    telepon,
    lokasi: JSON.stringify({
      ...lokasi,
      latitude: parseFloat(lokasi.latitude),
      longitude: parseFloat(lokasi.longitude),
    }),
  };
  return api("PATCH", "/users/" + userId, data);
};

export const updateUser = (userId, nama_lengkap, email, telepon, role) => {
  const data = {
    nama_lengkap,
    email,
    telepon,
    role,
  };
  return api("PATCH", "/users/" + userId, data);
};

export const changePassword = (
  userId,
  password,
  new_password,
  password_confirmation
) => {
  const data = {
    password,
    new_password,
    password_confirmation,
  };
  return api("PATCH", `/users/${userId}/password`, data);
};

export const deleteAcount = (userId, password) => {
  const data = {
    password,
  };
  return api("DELETE", `/users/${userId}`, data);
};

export const changeAvatar = (userId, avatar) => {
  const data = new FormData();

  data.append("avatar", avatar);
  return api("PATCH", `/users/${userId}/avatar`, data, avatar);
};

export const getUserData = (userId) => {
  return api("GET", `/users/` + userId);
};

export const createUser = (nama_lengkap, email, telepon, role, password) => {
  const body = {
    nama_lengkap,
    email,
    password,
    telepon,
    role,
    lokasi:
      '{"place_id":"ChIJAAAAAAAAAAARpkoFa3gE2KE","name":"Pondok Programmer","latitude":-7.9965072,"longitude":110.2951867}',
  };

  return api("POST", "/register", body);
};

export const deleteUser = (userId) => {
  return api("DELETE", `/users/${userId}`, {});
};
