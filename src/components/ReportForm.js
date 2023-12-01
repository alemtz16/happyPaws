import React, { useEffect, useState } from 'react';

const ReportForm = () => {
    const [reportType, setReportType] = useState('salesHistory');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
 
        try {
            const response = await fetch('http://127.0.0.1:5000/generate_report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reportType, startDate, endDate })
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            console.log("Received data:", data);
            if(reportType === 'salesHistory' )
                setReportData(data.details);
            else if (reportType === 'serviceHistory')
                setReportData(data.data);
            console.log("Updated Report Data:", reportData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Updated Report Data:", reportData);
    }, [reportData]);

    const renderTableHeader = () => {
        if (reportType === 'salesHistory') {
            return (
                <tr>
                    <th>Cantidad</th>
                    <th>FechaVenta</th>
                    <th>NombreCliente</th>
                    <th>NombreProducto</th>
                    <th>TotalVenta</th>
                    <th>VentaID</th>
                </tr>
            );
        } else if (reportType === 'serviceHistory') {
            // Adjust these headers based on the actual data structure of your service history report
            return (
                <tr>
                    <th>ClienteID</th>
                    <th>Estatus</th>
                    <th>Fecha</th>
                    <th>NombreCliente</th>
                    <th>Detalle</th>
                    <th>ServiceID</th>
                </tr>
            );
        }
    };

    // Function to render table rows
    const renderTableRows = () => {
        return reportData && reportData.map((row, index) => (
            <tr key={index}>
                {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex}>{value}</td>
                ))}
            </tr>
        ));
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Report Type:
                    <select value={reportType} onChange={e => setReportType(e.target.value)}>
                        <option value="salesHistory">Historial de Ventas</option>
                        <option value="serviceHistory">Historial de Servicios por Cliente</option>
                    </select>
                </label>
            <br />
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
            <br />
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
            <br />
                <button type="submit">Generate Report</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {reportData && (
                <div>
                    <h3>Report Data:</h3>
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
        </div>
    );
};


export default ReportForm;


