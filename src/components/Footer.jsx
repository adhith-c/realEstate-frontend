import React from "react";

function Footer() {
  return (
    <div className="w-full bg-slate-900">
      <div className="grid grid-col-3 gap-28 max-w-[1100px] mx-auto grid-flow-col">
        <div className="mt-4 text-slate-400">
          <h2 className="font-Jost text-2xl font-medium">ABOUT US</h2>

          <p className="font-Jost text-sm">
            We are a growing company with a focus on the future. Our mission is
            to change the way people think about widgets and have fun while
            doing it.We makes our client happy and satisfied.
          </p>
        </div>
        <div className="mt-4 mx-10 text-slate-400">
          <h2 className="font-Jost text-2xl font-medium">PROPERTIES</h2>

          <ul>
            <li className="font-Jost text-sm">For Sale</li>
            <li className="font-Jost text-sm">For Rent</li>
            <li className="font-Jost text-sm">For Vacational Rent</li>
          </ul>
        </div>
        <div className="mt-4 mx-10 text-slate-400">
          <h2 className="font-Jost text-2xl font-medium">CONTACT US</h2>
          <ul>
            <li className="font-Jost text-sm">underdmn@gmail.com</li>
            <li className="font-Jost text-sm">+91 8137845214</li>
            <li className="font-Jost text-sm">
              Near Hilite City ,Palazhi ,Kozhikode,Kerala,India
            </li>
          </ul>
        </div>
        {/* <div className="mx-10">
          <h2 className="font-Jost text-2xl font-medium">ABOUT US</h2>

          <p className="font-Jost text-xs">
            We are a growing company with a focus on the future. Our mission is
            to change the way people think about widgets and have fun while
            doing it.We makes our client happy and satisfied.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
