import React from 'react';
import './App.css';

import { store } from "./redux/configStore"
import { Provider } from "react-redux"

import Sidebar from './components/sidebar/Sidebar';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from './components/header/Header';
import CustomerTable from './components/customer/CustomerTable';
import ContractTable from './components/contract/ContractTable';
import CreateContract from './components/contract/CreateContract';
import CreateCustomer from './components/customer/CreateCustomer';
import { checkMicroFe } from './untils/helper';
import ProductTable from './components/product/ProductTable';
import ChanelGContainer from '../src/container/ChanelGContainer';
import ProductEditableTable from './components/product/ProductEditableTable';

function App() {

  const renderMF = () => {
    if (checkMicroFe() === false) {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Sidebar />
              <Header />
              <Routes>
                <Route path="/crm/customer" element={<CustomerTable />} />
                <Route path="/crm/customer/create" element={<CreateCustomer />} />
                <Route path="/crm/customer/update/:client_id" element={<CreateCustomer />} />
                <Route path="/crm/contract" element={<ContractTable />} />
                <Route path="/crm/contract/create" element={<CreateContract />} />
                <Route path="/crm/detail/:contract_id" element={<CreateContract />} />
                {/* <Route path="/crm/product" element={<ProductTable />} /> */}
                <Route path="/crm/channel" element={<ChanelGContainer />} />
                <Route path="/crm/product" element={<ProductEditableTable />} />
                {/**<Route path="*" element={<PageNotFound />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
        </Provider>
      )
    } else {
      return (
        <Provider store={store}>
          <div className="mf-contract">
            <Routes>
              <Route path="/crm/customer" element={<CustomerTable />} />
              <Route path="/crm/customer/create" element={<CreateCustomer />} />
              <Route path="/crm/customer/update/:client_id" element={<CreateCustomer />} />
              <Route path="/crm/contract" element={<ContractTable />} />
              <Route path="/crm/contract/create" element={<CreateContract />} />
              <Route path="/crm/detail/:contract_id" element={<CreateContract />} />
              <Route path="/crm/product" element={<ProductEditableTable />} />
              {/**<Route path="*" element={<PageNotFound />} /> */}
            </Routes>
          </div>
        </Provider>
      )
    }
  }
  return (
    <>
      {renderMF()}
    </>
  );
}

export default App;
