import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './ReportFormStyles.css';  // Custom CSS for ReportForm

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
        <div style={{ backgroundColor: '#ffe4e1' }}>
        <div className="container mt-3">
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="form-group">
                    <label>Report Type:</label>
                    <select className="form-control" value={reportType} onChange={e => setReportType(e.target.value)}>
                        <option value="salesHistory">Historial de Ventas</option>
                        <option value="serviceHistory">Historial de Servicios por Cliente</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Start Date:</label>
                    <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>End Date:</label>
                    <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Generate Report</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {reportData && (
                <div>
                    <h3>Report Data:</h3>
                    <table className="table table-bordered table-striped">
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
        </div>
    );
};

export default ReportForm;
    


