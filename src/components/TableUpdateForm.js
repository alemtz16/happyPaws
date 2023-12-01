import React, { useState } from 'react';

const TableUpdateForm = () => {
    const [tableName, setTableName] = useState('');
    const [updateData, setUpdateData] = useState('');
    const [tableData, setTableData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/update_table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, updateData })
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            console.log("Received data:", data);
            setTableData(data.details);
            console.log("Updated Report Data:", data.details);
        } catch (err) {
            setError(err.message);
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

    const renderTableHeader = () => {
        if (tableName === 'Clientes') {
            return (
                <tr>
                    <th>Apellido</th>
                    <th>ClienteID</th>
                    <th>Domicilio</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    
                </tr>
            );
        } else if (tableName === 'Empleados') {
            // Adjust these headers based on the actual data structure of your service history report
            return (
                <tr>
                    <th>Apellido</th>
                    <th>EmpleadoID</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                </tr>
            );
        } else if (tableName === 'Productos') {
            // Adjust these headers based on the actual data structure of your service history report
            return (
                <tr>
                    <th>Descripcion</th>
                    <th>FechaVencimiento</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>ProductoID</th>
                    <th>Stock</th>
                    <th>TipoProducto</th>
                </tr>
            );
        } else if (tableName === 'Servicios') {
            // Adjust these headers based on the actual data structure of your service history report
            return (
                <tr>
                    <th>Descripcion</th>
                    <th>NombreServicio</th>
                    <th>Precio</th>
                    <th>ServicioID</th>
                </tr>
            );
        } else if (tableName === 'Ventas') {
            // Adjust these headers based on the actual data structure of your service history report
            return (
                <tr> 
                    <th>Cantidad</th>
                    <th>ClienteID</th>
                    <th>EmpleadoID</th>
                    <th>FechaVenta</th>
                    <th>ProductoID</th>
                    <th>ServicioID</th>
                    <th>TotalVenta</th>
                    <th>VentaID</th>
                </tr>
            );
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Table Name:
                <select value={tableName} onChange={e => setTableName(e.target.value)}>
                        <option value="Clientes">Clientes</option>
                        <option value="Empleados">Empleados</option>
                        <option value="Productos">Productos</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Citas">Citas</option>
                        <option value="Ventas">Ventas</option>
                </select>
            </label>
            <button type="submit">Mostrar Tabla</button>
            {tableName && (
                <div>
                    <h3>Selected Table:</h3>
                    <p>{tableName}</p>
                </div>
            )}
            {tableData && (
                <div>
                    <h3>Table Data:</h3>
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
            <br />

        </form>
    );
};

export default TableUpdateForm;
