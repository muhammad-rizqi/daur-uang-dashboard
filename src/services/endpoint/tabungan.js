import { api } from "../API/webapi";

export const getSaldo = (userId) => {
  return api("GET", "/saldo/" + userId);
};

export const addTarik = (nasabahId, kredit) => {
  const data = {
    id_nasabah: nasabahId,
    kredit,
  };
  return api("POST", "/penarikan", data);
};
