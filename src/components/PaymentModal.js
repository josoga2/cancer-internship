import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCcStripe } from "react-icons/fa";
import { PiButterflyBold } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowRight, FaCcPaypal } from "react-icons/fa6";

export default function PaymentModal() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-4 py-3 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green"
      >
        Enroll Now!
      </button>

      {/* Modal */}
      <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between px-10 relative">
        {isModalOpen && (
          <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex items-start">
            <div className="bg-white m-auto p-8 w-1/4 rounded-lg border-4 shadow-md border-hbgreen-1">
              <div className="flex flex-col items-start gap-2">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-5 top-5 text-5xl text-white"
                >
                  <IoMdCloseCircleOutline />
                </button>
                <p className="font-bold text-2xl">
                  Enroll For this HackBio Internship
                </p>
                <p className="font-bold">Starts: February 02, 2025</p>
                <h3 className="font-bold">Choose your enrollment type</h3>
                <p className="text-xs">
                  50% Early bird discount closes January 20th
                </p>
                <div className="flex flex-col gap-4 pt-5">
                  {/* Premium Option */}
                  <div className="p-4 border-2 border-hbblue-1 rounded-md">
                    <span className="flex flex-row items-center gap-2">
                      <p className="font-bold">Premium</p>
                      <p className="font-bold">$10</p> 
                      <p className="font-bold text-red-600 line-through">$20</p> 
                    </span>
                    <span className="flex flex-row items-center gap-2 text-xs">
                      <p className="font-light">
                        100% Access to learning and mentorship
                      </p>
                    </span>
                    <div className="flex flex-col gap-3 pt-5">
                      <Link to="https://buy.stripe.com/4gw1635f0bkR0SI14b">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <FaCcStripe className="text-xl" /> (Works globally)
                        </span>
                      </Link>
                      <Link to="https://flutterwave.com/pay/xncny83hyjjf">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <PiButterflyBold className="text-xl" /> (Works well in
                          Africa)
                        </span>
                      </Link>
                      <Link to="https://www.paypal.com/ncp/payment/TLCE8JFAZQF2L">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <FaCcPaypal className="text-xl" /> (Works globally)
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Free Option */}
                  {/*<div className="p-4 border-2 border-hbblue-1 rounded-md">
                    <p className="font-bold">Free</p>
                    <Link to="https://forms.gle/D8G4RWwNyzkfq7x37">
                      <span className="text-xs flex flex-row gap-2 items-center">
                        <FaArrowRight /> Register Here (Now Open!)
                      </span>
                    </Link>
                  </div>*/}
                </div>
              </div>
            </div>
          </dialog>
        )}
      </section>

      {/**Mobile */}
      <section className="md:hidden p-2">
        {isModalOpen && (
          <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex items-start px-2">
            <div className="bg-white m-auto p-8 w-full rounded-lg border-4 shadow-md border-hbgreen-1">
              <div className="flex flex-col items-start gap-2">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-5 top-5 text-5xl text-white"
                >
                  <IoMdCloseCircleOutline />
                </button>
                <p className="font-bold text-2xl">
                  Enroll For this HackBio Internship
                </p>
                <h3 className="font-bold">Choose your enrollment type</h3>
                <p className="text-xs">
                  50% Early bird discount closes August 8th
                </p>
                <div className="flex flex-col gap-4 pt-5">
                  {/* Premium Option */}
                  <div className="p-4 border-2 border-hbblue-1 rounded-md">
                    <span className="flex flex-row items-center gap-2">
                      <p className="font-bold">Premium</p>
                      <p className="font-bold">$10</p>
                      <p className="font-bold text-red-600 line-through">$20</p> 
                    </span>
                    <span className="flex flex-row items-center gap-2 text-xs">
                      <p className="font-light">
                        100% Access to learning and mentorship
                      </p>
                    </span>
                    <div className="flex flex-col gap-3 pt-5">
                      <Link to="https://buy.stripe.com/4gw1635f0bkR0SI14b">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <FaCcStripe className="text-xl" /> (Works globally)
                        </span>
                      </Link>
                      <Link to="https://flutterwave.com/pay/xncny83hyjjf">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <PiButterflyBold className="text-xl" /> (Works well in
                          Africa)
                        </span>
                      </Link>
                      <Link to="https://www.paypal.com/ncp/payment/TLCE8JFAZQF2L">
                        <span className="text-xs flex flex-row gap-2 items-center">
                          <FaArrowRight /> Register with{" "}
                          <FaCcPaypal className="text-xl" /> (Works globally)
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Free Option */}
                  {/**<div className="p-4 border-2 border-hbblue-1 rounded-md">
                    <p className="font-bold">Free</p>
                    <Link to="https://forms.gle/D8G4RWwNyzkfq7x37">
                      <span className="text-xs flex flex-row gap-2 items-center">
                        <FaArrowRight /> Register Here (Now Open!)
                      </span>
                    </Link>
                  </div>**/}
                </div>
              </div>
            </div>
          </dialog>
        )}
      </section>
    </main>
  );
}
