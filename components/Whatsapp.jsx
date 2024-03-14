import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const Whatsapp = () => {
  const HandleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=%2B5519989331908&data=ARCfCoqXL6rAuAeRtb11yu7mTAXVzpS7R-2_bWpHOkmckPOwx0hkFkFkgz-usYQHRMW1Gv6hwxJJW5jf6QICCMa1Ai7DswvlKNoDCxIo7m3JyQMo6vGDsRLT7nqWawnb6lpO0OwsK_ogxLzd4PWyeVbuFg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2_qJkpPjDi8B5_waq26qjrRJtYiMSLxylP7l0HrF8X-6u7Lt1xfI_3T5o");
  };
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="55 19 98933-1908"
        allowClickAway="true"
        onClick={HandleClick}
        chatboxClassName="invisible"
      />
    </div>
  );
};

export default Whatsapp;
