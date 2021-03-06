import { api } from "../API/webapi";
import store from "../../redux/store";
import {
  setNasabah,
  setPenarikan,
  setPenjemputan,
  setPenyetoran,
} from "../../redux/nasabahAction";

export const penyetoranNasabah = (userId) => {
  const data = { loading: true, data: [], error: false };
  store.dispatch(setPenyetoran(data));
  api("GET", "/users/" + userId + "/penyetoran")
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setPenyetoran(data));
    });
};

export const penjemputanNasabah = (userId) => {
  const data = { loading: true, data: [], error: false };
  store.dispatch(setPenjemputan(data));
  api("GET", "/users/" + userId + "/penjemputan")
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setPenjemputan(data));
    });
};

export const penarikanNasabah = (userId) => {
  const data = { loading: true, data: [], error: false };
  store.dispatch(setPenarikan(data));
  api("GET", "/users/" + userId + "/penarikan")
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setPenarikan(data));
    });
};

export const ajukanJemput = (
  userId,
  nama_pengirim,
  telepon,
  lokasi,
  keterangan
) => {
  const data = {
    id_nasabah: userId,
    nama_pengirim,
    telepon,
    lokasi: JSON.stringify({
      ...lokasi,
      latitude: parseFloat(lokasi.latitude),
      longitude: parseFloat(lokasi.longitude),
    }),
    keterangan,
  };
  return api("POST", "/penjemputan", data);
};

export const batalkanJemput = (penjemputanId, userId) => {
  const data = {
    id_nasabah: userId,
    status: 3,
  };
  return api("PATCH", "/penjemputan/" + penjemputanId, data);
};

export const getNasabah = () => {
  const data = { loading: true, data: [], error: false };
  store.dispatch(setNasabah(data));
  api("GET", "/users/")
    .then((res) => {
      if (res.code === 200) {
        data.data = res.data;
      } else {
        data.error = res.error;
      }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
      data.loading = false;
      store.dispatch(setNasabah(data));
    });
};
