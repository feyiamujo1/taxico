import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 md:py-16 bg-custom-blue">
      <div className="w-11/12 2xl:w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-5 justify-between mb-6 md:mb-24">
          <div className="max-w-[300px]">
            <p className="text-white">
              Pay with cash for your trips around the Obafemi Awolowo University
              Campus
            </p>
            <p className=" cursor-pointer mt-3 font-semibold text-[#F6F7FF]">
              hello@taxico.com
            </p>
          </div>
          <p className="max-w-[300px] text-white">
            Taxico is a modern transportation company reinventing Revenue
            Collections for Commute
          </p>
        </div>
        <div className="md:text-center flex flex-col md:flex-row w-full md:justify-center md:items-center gap-3 mb-6 font-light">
          <p className="text-footer-link text-nowrap cursor-pointer text-[15px]">
            Privacy policy
          </p>
          <p className="text-footer-link text-nowrap cursor-pointer text-[15px]">
            Terms of use
          </p>
          <p className="text-footer-link text-nowrap cursor-pointer text-[15px]">
            Terms & Conditions
          </p>
        </div>
        <p className="text-center text-white font-light text-[15px]">
          © 2024 Taxico Inc
        </p>
      </div>
    </footer>
  );
};

export default Footer;
