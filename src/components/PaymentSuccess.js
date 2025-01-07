import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const PaymentSuccess = () => {
  

  return (
    <main>
      {/* Desktop */}
      <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between px-5">
        <div className="flex flex-col items-center justify-center w-screen h-screen max-h-screen">
          <div className="rounded-full w-96 h-96 bg-green-50 flex items-center justify-center">
            <div className="rounded-full w-48 h-48 bg-hackbio-green-light flex items-center justify-center">
              <span>
                <BsFillCheckCircleFill className="text-7xl text-hackbio-green" />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center pt-5">
            <p className="font-bold text-xl">Payment Successful</p>
            <p>
              HackBio will now start processing your internship package and get
              back to you in 24 hours
            </p>
            <p>
              If you don't receive any mail from us, please write to{" "}
              <span>
                <a
                  href="mailto:contact@thehackbio.com"
                  className="underline font-bold text-hackbio-green"
                >
                  contact@thehackbio.com
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Mobiles */}
      <section className="md:hidden text-sm max-w-screen-sm h-screen pt-20">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full w-48 h-48 bg-green-50 flex items-center justify-center">
            <div className="rounded-full w-24 h-24 bg-hackbio-green-light flex items-center justify-center">
              <span>
                <BsFillCheckCircleFill className="text-7xl text-hackbio-green" />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center pt-5 px-5 text-center">
            <p className="font-bold text-xl">Payment Successful</p>
            <p>
              HackBio will now start processing your internship package and get
              back to you in 24 hours
            </p>
            <p>
              If you don't receive any mail from us, please write to{" "}
              <span>
                <a
                  href="mailto:contact@thehackbio.com"
                  className="underline font-bold text-hackbio-green"
                >
                  contact@thehackbio.com
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccess;
