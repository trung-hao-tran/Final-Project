import React from "react";
import Navbar from "../global-components/navbar";
import PageHeader from "../global-components/page-header";
import MyAccount from "./profile_content";
import Footer from "../global-components/footer";

const MyaccountV1 = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="My Account" />
      <MyAccount />

      <Footer />
    </div>
  );
};

export default MyaccountV1;
