import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import AllUser from './components/AllUser';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import PolicyList from './components/PolicyList';
import AddPolicy from './components/AddPolicy';
import License from './components/License';
import AddLicense from './components/AddLicense';
import MachineList from './components/MachineList';
import AddMachine from './components/AddMachine';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/all' element={<AllUser />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/productList' element = {<ProductList/>}/>
        <Route path='/addproduct' element = {<AddProduct/>}/>
        <Route path='/policyList' element = {<PolicyList/>}/>
        <Route path='/addpolicy' element = {<AddPolicy/>}/>
        <Route path='/license' element = {<License/>}/>
        <Route path='/addlicense' element = {<AddLicense/>}/>
        <Route path='/machine' element = {<MachineList/>}/>
        <Route path='/addmachine' element = {<AddMachine/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
