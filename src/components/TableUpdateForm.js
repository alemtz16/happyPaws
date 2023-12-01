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
            <table>
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
        <div>
            <div>
                <button onClick={fetchTableData}>Mostrar Tabla</button>
                <button onClick={executeCommit}>Commit</button>
            </div>
            <div>
                <label>
                    Operation:
                    <select value={updateData} onChange={e => setUpdateData(e.target.value)}>
                        <option value="INSERT">INSERT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="UPDATE">UPDATE</option>
                    </select>
                </label>
                {updateData !== 'DELETE' && (
                    <div>
                        <label>
                            Nombre Servicio:
                            <input type="text" value={nombreServicio} onChange={e => setNombreServicio(e.target.value)} />
                        </label>
                        <label>
                            Descripcion:
                            <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        </label>
                        <label>
                            Precio:
                            <input type="text" value={precio} onChange={e => setPrecio(e.target.value)} />
                        </label>
                    </div>
                )}
                
                
                    <label>
                        ID:
                        <input type="text" value={id} onChange={e => setId(e.target.value)} />
                    </label>
                
            </div>
            <div>
                {renderTable()}
            </div>
        </div>
    );
};

export default TableUpdateForm;