import React from "react";
import { useSelector } from "react-redux";

const PenjualanScreen = () => {
  const { penjual } = useSelector((state) => state);

  const { data } = penjual.penjualan;

  return (
    <div className="card easion-card">
      <div className="card-header">
        <div className="easion-card-icon">
          <i className="fas fa-table"></i>
        </div>
        <div className="easion-card-title">Data Penjualan</div>
      </div>
      <div className="card-body ">
        <table className="table table-in-card">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Petugas</th>
              <th scope="col">Jenis Sampah</th>
              <th scope="col">Client</th>
              <th scope="col">Harga Satuan</th>
              <th scope="col">Berat</th>
              <th scope="col">Debit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((jual, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{jual.tanggal}</td>
                  <td>{jual.relation.pengurus.nama_lengkap}</td>
                  <td>{jual.relation.jenis_sampah.nama_kategori}</td>
                  <td>{jual.client}</td>
                  <td>{jual.harga_satuan}</td>
                  <td>{jual.berat}</td>
                  <td>{jual.debit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenjualanScreen;
