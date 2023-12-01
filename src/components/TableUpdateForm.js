import React, { useState } from 'react';

const TableUpdateForm = () => {
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
                body: JSON.stringify({ tableName: "Servicios", updateData })
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
            <br />
        </form>
    );
};

export default TableUpdateForm;
