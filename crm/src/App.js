import React from 'react';
import './App.css';
import { store } from "./redux/configStore"
import { Provider } from "react-redux"
import Sidebar from './components/sidebar/Sidebar';
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Header from './components/header/Header';
import CustomerTable from './components/customer/CustomerTable';
import ContractTable from './components/contract/ContractTable';
import CreateContract from './components/contract/CreateContract';
import CreateCustomer from './components/customer/CreateCustomer';
import { checkMicroFe } from './untils/helper';
import ChanelGContainer from '../src/container/ChanelGContainer';
import ProductEditableTable from './components/product/ProductEditableTable';
import TypeAndAttribute from './components/product/TypeAndAttribute';
import CustomerTableType from "./components/customer/CustomerTableType"
import SpecialProductTable from './components/product/special/SpecialProductTable';
import CreateEvent from './components/contract/event/CreateEvent';
import EventTable from './components/contract/event/EventTable';
import ReceiptTable from './components/receipt/ReceiptTable';
import Acceptance from './components/acceptance/Acceptance';
import EventAcceptance from './components/acceptance/EventAcceptance';
import ContactTypeTable from './components/contract/ContactTypeTable';

function App() {
  
  const renderMF = () => {
    if (checkMicroFe() === false) {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Sidebar />
              <Header />
              <Switch>
                <Route exact path="/crm/customer" component={CustomerTable} />
                <Route exact path="/crm/customer/type" component={CustomerTableType} />
                <Route exact path="/crm/customer/create" component={CreateCustomer} />
                <Route exact path="/crm/customer/update/:client_id" component={CreateCustomer} />
                <Route exact path="/crm/contract" component={ContractTable} />
                <Route exact path="/crm/contract/create" component={CreateContract} />
                <Route exact path="/crm/detail/:contract_id" component={CreateContract} />
                <Route exact path="/crm/channel" component={ChanelGContainer} />
                <Route exact path="/crm/product" component={ProductEditableTable} />
                <Route exact path="/crm/product/type-att" component={TypeAndAttribute} />
                <Route exact path="/crm/product/special" component={SpecialProductTable} />
                <Route exact path="/crm/event/create" component={CreateEvent} />
                <Route exact path="/crm/event" component={EventTable} />
                <Route exact path="/crm/event/:event_id" component={CreateEvent} />
                <Route exact path="/crm/receipt" component={ReceiptTable} />
                <Route exact path="/crm/acceptance/contract" component={Acceptance} />
                <Route exact path="/crm/acceptance/event" component={EventAcceptance} />
                <Route exact path="/crm/contract/type" component={ContactTypeTable} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      )
    } else {
      return (
        <Provider store={store}>
          <div className="mf-contract">
            <Switch>
              <Route exact path="/contract-service/crm/customer" component={CustomerTable} />
              <Route exact path="/contract-service/crm/customer/create" component={CreateCustomer} />
              <Route exact path="/contract-service/crm/customer/type" component={CustomerTableType} />
              <Route exact path="/contract-service/crm/customer/update/:client_id" component={CreateCustomer} />
              <Route exact path="/contract-service/crm/contract" component={ContractTable} />
              <Route exact path="/contract-service/crm/contract/create" component={CreateContract} />
              <Route exact path="/contract-service/crm/detail/:contract_id" component={CreateContract} />
              <Route exact path="/contract-service/crm/product" component={ProductEditableTable} />
              <Route exact path="/contract-service/crm/product/type-att" component={TypeAndAttribute} />
              <Route exact path="/contract-service/crm/product/special" component={SpecialProductTable} />
              <Route exact path="/contract-service/crm/channel" component={ChanelGContainer} />
              <Route exact path="/contract-service/crm/event/create" component={CreateEvent} />
              <Route exact path="/contract-service/crm/event" component={EventTable} />
              <Route exact path="/contract-service/crm/event/:event_id" component={CreateEvent} />
              <Route exact path="/contract-service/crm/receipt" component={ReceiptTable} />
              <Route exact path="/contract-service/crm/acceptance/contract" component={Acceptance} />
              <Route exact path="/contract-service/crm/acceptance/event" component={EventAcceptance} />
            </Switch>
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