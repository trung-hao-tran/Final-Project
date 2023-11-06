import { Routes, Route } from "react-router-dom"
import React, { useEffect } from 'react';
import HomeV1 from './components/home-v1';

import Prefetch from './feature/auth/prefetch';

import ShopLeftSidebar from './components/shop-left-sidebar';

import MyAccount from './components/my-account';
import Login from './components/login';
import Register from './components/register';

import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated, setCredentials } from './feature/auth/authSlice';
import AddTask from "./components/add-task";


const App = () => {


    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)



    useEffect(() => {
        const checkRefresh = async () => {
            const token = localStorage.getItem('token');
            console.log("triggered")
            console.log('token', token)


            if (!token) {
                localStorage.clear()
                console.log("clear")
                dispatch(setAuthenticated(false));
                return
            }
            if (token) {
                console.log("if token triggered")

                try {
                    const response = await fetch('http://localhost:4000/api/user/refresh', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    console.log("response", response)

                    if (response.ok) {
                        console.log("triggered")
                        dispatch(setAuthenticated(true));
                        dispatch(setCredentials(token))
                        return
                    }
                    localStorage.clear()
                    dispatch(setAuthenticated(false));
                } catch (error) {
                    console.error('Token refresh error:', error);
                    localStorage.clear()
                    dispatch(setAuthenticated(false));
                }

            }

        }

        checkRefresh()
        console.log(isAuthenticated)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<HomeV1 />} index />
            <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
            {isAuthenticated ? <>
                <Route element={<Prefetch />}>
                    <Route path="/add-task" element={<AddTask />} />
                </Route></>
                : <>
                    <Route path="/profile" element={<MyAccount />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>}

        </Routes>
    )
}

export default App