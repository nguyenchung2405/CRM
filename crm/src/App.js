import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import CustomerTable from './components/customer/CustomerTable';
import ContractTable from './components/contract/ContractTable';
import CreateContract from './components/contract/CreateContract';
import CreateCustomer from './components/customer/CreateCustomer';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/crm/customer" element={<CustomerTable />} />
        <Route path="/crm/customer/create" element={<CreateCustomer />} />
        <Route path="/crm/customer/update" element={<CreateCustomer />} />
        <Route path="/crm/contract" element={<ContractTable />} />
        <Route path="/crm/contract/create" element={<CreateContract />} />
        <Route path="/crm/detail/:contract_id" element={<CreateContract />} />
        {/**<Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
