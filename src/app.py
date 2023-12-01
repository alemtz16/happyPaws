from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# Configure your SQL Server connection string
conn_str = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=DESKTOP-O6J8BDF\\SQLEXPRESS;DATABASE=HappyPawsDB;Trusted_Connection=yes'

@app.route('/generate_report', methods=['POST'])
def generate_report():
    data = request.json
    report_type = data['reportType']
    start_date = data['startDate']
    end_date = data['endDate']

    try:
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                if report_type == 'salesHistory':
                    cursor.execute("EXEC SP_HistorialVentas ?, ?", start_date, end_date)
                    
                    # Assuming the stored procedure returns a single result set
                    details = cursor.fetchall()
                    response = {'details': [dict(zip([column[0] for column in cursor.description], row)) for row in details]}
                
                elif report_type == 'serviceHistory':
                        # Querying the view directly
                    cursor.execute("SELECT * FROM Vista_ServiciosPorCliente")
                    results = cursor.fetchall()
                    if results:
                        data = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
                        response = {'data': data}
                    else:
                        response = {'message': 'No service history found.'}
                else:
                    response = {'error': 'Invalid report type'}
    except Exception as e:
        response = {'error': str(e)}
    # In your Flask app
    print("Response:", report_type)
    return jsonify(response)

@app.route('/update_table', methods=['POST'])
def update_table():
    data = request.json
    table_name = data['tableName']
    update_data = data['updateData']
 
    try:
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                # Use string formatting to construct the query with the table name
                cursor.execute(f"SELECT * FROM {table_name}")
                
                # Assuming the query returns a single result set
                details = cursor.fetchall()
                response = {'details': [dict(zip([column[0] for column in cursor.description], row)) for row in details]}
    except Exception as e:
        response = {'error': str(e)} 
      
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
