import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*left side*/}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" srcset="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/*center*/}
        <div>
          <p>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/*right side*/}
        <div>
            <p>GET IN TOUCH</p>
            <ul>
                <li>+1-212-456-7890</li>
                <li>email@gmail.com</li>
            </ul>
        </div>
      </div>
      {/*copyright text*/}
      <div>
        <hr />
        <p>Copyright © 2025 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
