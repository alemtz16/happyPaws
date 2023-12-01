import React from 'react';
import ReportForm from './components/ReportForm';
import TableUpdateForm from './components/TableUpdateForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>Happy Paws Database Management</h1>
      <ReportForm />
      <TableUpdateForm />
    </div>
  );
}

export default App;
