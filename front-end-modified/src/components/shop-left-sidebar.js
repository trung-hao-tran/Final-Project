import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ShopLeftSidebar from './shop-components/shop-left-sidebar';
import Footer from './global-components/footer';

const ShopLeftSidebarPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Tasks overthrough" />
        <ShopLeftSidebar />

        <Footer />
    </div>
}

export default ShopLeftSidebarPage

