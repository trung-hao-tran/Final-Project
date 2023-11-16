import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import EditTask from './section-components/edit-task';
import Footer from './global-components/footer';

const EditTaskV1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Edit Task" />
        <EditTask />
        <Footer />
    </div>
}

export default EditTaskV1

