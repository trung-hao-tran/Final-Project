import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import AddTask from './section-components/add-task';
import Footer from './global-components/footer';

const AddTaskV1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Add Task" />
        <AddTask />
        <Footer />
    </div>
}

export default AddTaskV1

