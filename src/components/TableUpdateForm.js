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
            console.log("Operation being sent:", updateData);
            const result = await response.json();
            console.log("Operation being sent:", updateData);
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
                {updateData !== 'INSERT' && (
                    <label>
                        ID:
                        <input type="text" value={id} onChange={e => setId(e.target.value)} />
                    </label>
                )}
            </div>
            <div>
                {renderTable()}
            </div>
        </div>
    );
};

export default TableUpdateForm;



/*
import React, { useState } from 'react';

const TableUpdateForm = () => {
    const [tableData, setTableData] = useState(''); 
    const [updateData, setUpdateData] = useState(''); 
    const [id, setId] = useState(''); // For DELETE and UPDATE
    const [nombreServicio, setNombreServicio] = useState(''); // For INSERT and UPDATE
    const [descripcion, setDescripcion] = useState(''); // For INSERT and UPDATE
    const [precio, setPrecio] = useState(''); // For INSERT and UPDATE

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rowData = {
            id, // Used for DELETE and UPDATE
            nombreServicio, // Used for INSERT and UPDATE
            descripcion, // Used for INSERT and UPDATE
            precio, // Used for INSERT and UPDATE
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/update_table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName: "Servicios", updateData, rowData })
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
        
            // Handle the response data here
            console.log("Received data:", data);
            setTableData(data.details);

            // Optionally, reset form fields after successful operation
            setId('');
            setNombreServicio('');
            setDescripcion('');
            setPrecio('');
        } catch (err) {
            setError(err.message);
            console.error("Error during form submission:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to render table rows
    const renderTableRows = () => {
        return tableData && tableData.map((row, index) => (
            <tr key={index}>
                {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex}>{value}</td>
                ))}
            </tr>
        ));
    };

    // Simplified to only return headers for "Servicios" table
    const renderTableHeader = () => {
        return (
            <tr>
                <th>Descripcion</th>
                <th>NombreServicio</th>
                <th>Precio</th>
                <th>ServicioID</th>
            </tr>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Mostrar Tabla</button>
            {tableData && (
                <div>
                    <h3>Table Data Servicios:</h3>
                    <table>
                        <thead>
                            {renderTableHeader()}
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>
            )}
            <br />
            <label>
                Update Data:
                <select value={updateData} onChange={e => setUpdateData(e.target.value)}>
                        <option value="INSERT">INSERT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="UPDATE">UPDATE</option>
                </select>
            </label>
            // Inside the return statement of the component
            <div>
                <label>
                    ID (for DELETE and UPDATE):
                    <input type="text" value={id} onChange={e => setId(e.target.value)} />
                </label>
                {updateData !== 'DELETE' && (
                    <>
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
                    </>
                )}
            </div>

            <br />
        </form>
    );
};

export default TableUpdateForm;*/
