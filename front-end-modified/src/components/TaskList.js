import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import TaskList from './shop-components/TaskList';
import Footer from './global-components/footer';

const TaskListPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Tasks overthrough" />
        <TaskList />

        <Footer />
    </div>
}

export default TaskListPage

