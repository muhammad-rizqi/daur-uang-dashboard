import React from "react";
import { useSelector } from "react-redux";

const GudangScreen = () => {
  const { penjual } = useSelector((state) => state);

  const { data } = penjual.stok;

  return (
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GudangScreen;
