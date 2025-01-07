import PaymentModal from "./PaymentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from './../constants/constants'

const Pricing = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        const authToken = localStorage.getItem(ACCESS_TOKEN);
    
        if (authToken) {
          // Redirect to dashboard if the user is authenticated
          navigate("/dashboard");
        } else {
          // Open the payment modal
          setModalOpen(true);
        }
      };
      const closeModal = () => setModalOpen(false);
  return (
    <main>
          <div>
        {/* Desktop view */}
        <div className="hidden md:flex flex-col items-center gap-8 py-10 ">
            <h1 className="text-4xl font-bold text-center">What you are actually paying for!</h1>
            <div className="flex gap-4 text-sm">
                <div className="max-w-sm w-full bg-white rounded-lg shadow-lg shadow-hackbio-green/20 p-8">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold text-hackbio-green">Free</h2>
                    <div className="text-4xl font-bold">$0</div>
                    
                    <ul className="space-y-3 w-full">
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Team and Project-based learning</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Team Tasks Weekly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to first 4 stages</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className=""> Certificate of participation</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Access to all course materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Weekly live sessions</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Hybrid (AI + Human) mentorship</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">One-on-one troubleshooting</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Unlimited access to bioinformatics servers*</span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Final Capstone Project</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Support for first draft manuscript ª</span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Community access (Zero Evictions)</span>
                        </li>
                    </ul>
                   
                    {/* {<PaymentModal isOpen={isModalOpen} onClose={closeModal} />} */}
                    <div className="px-3 py-3 bg-hackbio-green-light rounded-md font-bold">Not yet available!</div>
                </div>
            </div>

            <div className="max-w-sm w-full bg-white rounded-lg shadow-lg shadow-hackbio-green/20 p-8">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-2xl font-bold text-hackbio-green">Premium Learning</h2>
                    <div className="text-4xl font-bold">$10 <span className="text-sm font-thin text-red-500 line-through">($20)</span></div>
                    
                    <ul className="space-y-3 w-full">
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to all course materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Weekly live sessions</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Hybrid (AI + Human) mentorship</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>One-on-one troubleshooting</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Team and Project-based learning</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Team Tasks Weekly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unlimited access to bioinformatics servers*</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to all 8-stages</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Final Capstone Project</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Support for first draft manuscript ª</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Certificate upon completion</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Community access (Zero Evictions)</span>
                        </li>
                    </ul>
                    <p className="text-sm text-start">*Active only for the duration of the program</p>
                    <p className="text-sm text-start">ª Or preprint manuscript</p>
                    <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden flex flex-col items-center gap-6 py-8 px-4">
            <h1 className="text-2xl font-bold text-center">What you are actually paying for!</h1>
            
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg shadow-hackbio-green/20 p-6">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-xl font-bold text-hackbio-green">Free</h2>
                    <div className="text-3xl font-bold">$0</div>
                    
                    <ul className="space-y-3 w-full">
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Team and Project-based learning</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Team Tasks Weekly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to first 4 stages</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className=""> Certificate of participation</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Access to all course materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Weekly live sessions</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Hybrid (AI + Human) mentorship</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">One-on-one troubleshooting</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Unlimited access to bioinformatics servers</span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Final Capstone Project</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Support for first draft manuscript </span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-through">Community access (Zero Evictions)</span>
                        </li>
                    </ul>
                    {/* {<PaymentModal isOpen={isModalOpen} onClose={closeModal} />} */}
                    <div className="px-3 py-3 bg-hackbio-green-light rounded-md font-bold">Not yet available!</div>
                </div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg shadow-hackbio-green/20 p-6">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-xl font-bold text-hackbio-green">Premium Learning</h2>
                    <div className="text-3xl font-bold">$10 <span className="text-sm font-thin text-red-500 line-through">($20)</span></div>
                    
                    <ul className="space-y-3 w-full">
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to all course materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Weekly live sessions</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Hybrid (AI + Human) mentorship</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>One-on-one troubleshooting</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Team and Project-based learning</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Team Tasks Weekly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unlimited access to bioinformatics servers*</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Access to all 8-stages</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Final Capstone Project</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Support for first draft manuscript ª</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Graded Certificate upon completion</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-hackbio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Community access (Zero Evictions)</span>
                        </li>
                    </ul>
                    <p className="text-xs text-start mt-2">*Active only for the duration of the program</p>
                    <p className="text-xs text-start">ª Or preprint manuscript</p>
                    <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    </div>
        
  
    </main>
  );
}

export default Pricing;
