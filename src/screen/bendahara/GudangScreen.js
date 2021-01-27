import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getStok } from "../../services/endpoint/penjual";
import {
  addSampah,
  deleteSampah,
  editSampah,
} from "../../services/endpoint/sampah";

const GudangScreen = () => {
  const { penjual } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [selected, setSelected] = useState(null);

  const { data } = penjual.stok;

  const onAdd = (e) => {
    setLoading(true);
    addSampah(name, price, stock)
      .then((res) => {
        if (res.code === 200) {
          alert("Berhasil ditambahkan");
          getStok();
          setName("");
          setPrice("");
          setStock("");
        } else {
          alert("Gagal ditambahkan");
        }
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
    e.preventDefault();
  };

  const onDelete = (sampahId) => {
    setLoading(true);
    deleteSampah(sampahId)
      .then((res) => {
        if (res.code === 200) {
          alert("Berhasil dihapus");
          getStok();
        } else {
          alert(res);
        }
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  };

  const onSelected = (index) => {
    setSelected({
      id: data[index].id,
      name: data[index].nama_kategori,
      price: data[index].harga,
      stock: data[index].stok_gudang,
    });
  };

  const onUpdate = (e) => {
    const { id, name, price, stock } = selected;
    setLoading(true);
    editSampah(id, name, price, stock)
      .then((res) => {
        if (res.code === 200) {
          alert("Berhasil diedit");
          getStok();
        } else {
          alert(res);
        }
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
    e.preventDefault();
  };

  return (
    <div>
      <h1>Data Sampah</h1>
      {user.role === 999 && (
        <div>
          <div className="card easion-card">
            <div className="card-header">
              <div className="easion-card-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <div className="easion-card-title"> Inline Form </div>
            </div>
            <div className="card-body ">
              <form className="form-inline">
                <div className="form-group mb-2">
                  <label htmlFor="name" className="sr-only">
                    Nama Sampah
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nama Sampah"
                    value={name}
                    onInput={(e) => {
                      setName(e.target.value);
                      e.preventDefault();
                    }}
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="price" className="sr-only">
                    Harga Sampah
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    min="1"
                    value={price}
                    onInput={(e) => {
                      setPrice(e.target.value);
                      e.preventDefault();
                    }}
                    placeholder="Harga Sampah"
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="stock" className="sr-only">
                    Jumlah Sampah
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    min="0"
                    value={stock}
                    onInput={(e) => {
                      setStock(e.target.value);
                      e.preventDefault();
                    }}
                    placeholder="Jumlah Sampah"
                  />
                </div>
                <button
                  type="submit"
                  className="form-group btn btn-primary mb-2"
                  onClick={onAdd}
                  disabled={loading}
                >
                  {!loading ? (
                    "Tambah Sampah"
                  ) : (
                    <>
                      <span className="spinner-grow spinner-grow-sm"></span>
                      Menambah Sampah
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          {selected && (
            <div className="modal fade" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Edit Sampah</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <form className="form">
                      <div className="form-group mb-2">
                        <label htmlFor="name" className="sr-only">
                          Nama Sampah
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Nama Sampah"
                          value={selected.name}
                          onInput={(e) => {
                            setSelected({ ...selected, name: e.target.value });
                            e.preventDefault();
                          }}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="price" className="sr-only">
                          Harga Sampah
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          min="1"
                          value={selected.price}
                          onInput={(e) => {
                            setSelected({
                              ...selected,
                              price: e.target.value,
                            });
                            e.preventDefault();
                          }}
                          placeholder="Harga Sampah"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="stock" className="sr-only">
                          Jumlah Sampah
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock"
                          min="0"
                          value={selected.stock}
                          onInput={(e) => {
                            setSelected({ ...selected, stock: e.target.value });
                            e.preventDefault();
                          }}
                          placeholder="Jumlah Sampah"
                        />
                      </div>
                      <button
                        type="submit"
                        className="form-group btn btn-primary mb-2"
                        onClick={onUpdate}
                        disabled={loading}
                      >
                        {!loading ? (
                          "Ubah Sampah"
                        ) : (
                          <>
                            <span className="spinner-grow spinner-grow-sm"></span>
                            Mengubah Sampah
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-table"></i>
          </div>
          <div className="easion-card-title">Data Sampah</div>
        </div>
        <div className="card-body ">
          <table className="table table-in-card">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Jenis Sampah</th>
                <th scope="col">Harga</th>
                <th scope="col">Jumlah Stok</th>
                {user.role === 999 && <th scope="col">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((sampah, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{sampah.nama_kategori}</td>
                    <td>{sampah.harga}</td>
                    <td>{sampah.stok_gudang}</td>
                    {user.role === 999 && (
                      <td>
                        <span
                          className="btn btn-secondary m-1"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={(e) => onSelected(index)}
                        >
                          <i className="fas fa-edit"></i>
                        </span>
                        <span
                          className="btn btn-danger m-1"
                          onClick={(e) => {
                            onDelete(sampah.id);
                            e.preventDefault();
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GudangScreen;
