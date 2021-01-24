import React from "react";
import { useSelector } from "react-redux";

const SetoranScreen = () => {
  const { penyetor } = useSelector((state) => state);
  const { data } = penyetor.penyetoran;

  return (
    <div className="card easion-card">
      <div className="card-header">
        <div className="easion-card-icon">
          <i className="fas fa-table"></i>
        </div>
        <div className="easion-card-title">Data Penyetoran</div>
      </div>
      <div className="card-body ">
        <table className="table table-in-card">
          <thead>
            <tr>
              <th scope="col">No. </th>
              <th scope="col">Tanggal</th>
              <th scope="col">Nasabah</th>
              <th scope="col">Jenis Sampah</th>
              <th scope="col">Berat</th>
              <th scope="col">Debit</th>
              <th scope="col">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((setor, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{setor.tanggal}</td>
                  <td>{setor.relation.nasabah.nama_lengkap}</td>
                  <td>{setor.relation.jenis_sampah.nama_kategori}</td>
                  <td>{setor.berat}</td>
                  <td>{setor.debit}</td>
                  <td>{setor.saldo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SetoranScreen;
