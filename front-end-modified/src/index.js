import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeV1 from './components/home-v1';

import Prefetch from './feature/auth/prefetch';

import ShopLeftSidebar from './components/shop-left-sidebar';
import TaskDetails from './components/task_details';

import MyAccount from './components/my-account';
import Login from './components/login';
import Register from './components/register';

import { store } from './app/store'
import { Provider } from 'react-redux'

class Root extends Component {
    render() {
        return(
            <Provider store={store}>   
                <BrowserRouter path="/*">
	                <Routes>
	                    <Route path="/" element={<HomeV1 />} />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/register" element={ <Register /> } />
                       
                        <Route element={<Prefetch />}>
                        
                            <Route path="/my-account" element={ <MyAccount /> } />
                            <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
                            
                            <Route path="/task-details/:taskId" element={<TaskDetails />} />
                        </Route>
	                
                    </Routes>
                </BrowserRouter>
            </Provider>
            
        )
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('quarter'));
