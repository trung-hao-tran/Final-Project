import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Register from './section-components/register';


const RegisterV1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Account" subheader="Register" />
        <Register />
    </div>
}

export default RegisterV1

