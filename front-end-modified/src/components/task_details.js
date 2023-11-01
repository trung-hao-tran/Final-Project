import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import TaskDetails from './task_details/task_details';
import Footer from './global-components/footer';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
    const { taskId } = useParams();
    return <div>
        <Navbar />
        <PageHeader headertitle="Tasks Details" />
        <TaskDetails taskId={ taskId } />

        <Footer />
    </div>
}

export default TaskDetailsPage