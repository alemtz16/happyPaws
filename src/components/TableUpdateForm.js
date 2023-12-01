import React, { useState } from 'react';

const TableUpdateForm = () => {
    const [tableData, setTableData] = useState(null);
    const [updateData, setUpdateData] = useState('');
    const [id, setId] = useState(''); // For DELETE and UPDATE
    const [nombreServicio, setNombreServicio] = useState(''); // For INSERT and UPDATE
    const [descripcion, setDescripcion] = useState(''); // For INSERT and UPDATE
    const [precio, setPrecio] = useState(''); // For INSERT and UPDATE

    const fetchTableData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get_servicios');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    };

    const executeCommit = async () => {
        try {
            const rowData = { id, nombreServicio, descripcion, precio };
            const response = await fetch('http://127.0.0.1:5000/update_servicios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updateData, rowData })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Data being sent:", { updateData, rowData });
            const result = await response.json();
            console.log("Data being sent:", { updateData, rowData });
            console.log(result);
        } catch (error) {
            console.error('Error executing commit:', error);
        }
    };

    const renderTable = () => {
        if (!tableData) return null;
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ServicioID</th>
                        <th>NombreServicio</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.ServicioID}</td>
                            <td>{row.NombreServicio}</td>
                            <td>{row.Descripcion}</td>
                            <td>{row.Precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
    };

    return (
        <div style={{ backgroundColor: '#ffe4e1' }}>
        <div className="container mt-3">
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={fetchTableData}>Mostrar Tabla</button>
                <button className="btn btn-success" onClick={executeCommit}>Commit</button>
            </div>

            <form>
                <div className="form-group">
                    <label>Operation:</label>
                    <select className="form-control" value={updateData} onChange={e => setUpdateData(e.target.value)}>
                        <option value="INSERT">INSERT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="UPDATE">UPDATE</option>
                    </select>
                </div>

                {updateData !== 'DELETE' && (
                    <div>
                        <div className="form-group">
                            <label>Nombre Servicio:</label>
                            <input type="text" className="form-control" value={nombreServicio} onChange={e => setNombreServicio(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Descripcion:</label>
                            <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <input type="text" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label>ID:</label>
                    <input type="text" className="form-control" value={id} onChange={e => setId(e.target.value)} />
                </div>
            </form>

            <div className="mt-3">
                {renderTable()}
            </div>
        </div>
        </div>
    );
};

export default TableUpdateForm;
