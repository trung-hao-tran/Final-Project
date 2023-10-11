import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Login from './section-components/login';

const LoginV1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Login" subheader="Login" />
        <Login />

    </div>
}

export default LoginV1

