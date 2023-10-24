import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Login from './section-components/login';
import Footer from './global-components/footer';

const LoginV1 = () => {
    return <div>
        <Navbar />
        {/* <PageHeader headertitle="Login" subheader="Login" /> */}
        <Login />
        <Footer />
        
    </div>
}

export default LoginV1

