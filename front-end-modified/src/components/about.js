import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import About from './section-components/about';
import Features from './section-components/features-v1';

import Footer from './global-components/footer';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="About Us" />
        <About />
        <Features customClass="ltn__feature-area section-bg-1 pt-120 pb-90 mb-120---" />
        <Footer />
    </div>
}

export default AboutPage
