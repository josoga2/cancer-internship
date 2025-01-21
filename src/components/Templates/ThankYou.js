import PlatformNavBar from "./PlatformNavBar";
import { Link } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { FiGrid, FiTerminal } from "react-icons/fi";






const ThankYou = () => {
  
  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:flex-col md:max-w-full md:m-auto md:items-center md:justify-between">
                <div className="w-full bg-zinc-100 min-h-full">
                <div className="w-full py-2 bg-hackbio-green-light px-5">
                    <PlatformNavBar /> 
                </div>
                
                <div className="pt-10 px-5 flex flex-row gap-10 items-start justify-start w-full h-full">
                <div className="flex flex-col gap-5 bg-white p-10 h-fit w-fit rounded-md">
                            <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiGrid /> Dashboard </div></Link>
                            <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiTerminal /> Playground </div>
                        </div>
                    <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                          <div className="flex flex-row items-center justify-between pr-20">

                          </div>
                        <div className="rounded-md p-5 w-3/5 border border-hackbio-green-light h-full">
                            <p className="text-sm leading-5 text-justify prose prose-lg max-w-none"> 
                              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}> 
                                I hope this email finds you in good health and high spirits. 
                                
                                I am pleased to inform you that you have successfully completed your Internship with HackBio, and I would like to take this opportunity to congratulate you on this achievement.
                                It has been a pleasure having you as our student, and we are thrilled that you have taken this important step towards expanding your knowledge and skills in bioinformatics. By completing this course, you have demonstrated your dedication to learning and your commitment to your career development. I am confident that the knowledge and skills you have gained through this course will serve you well in your present and future endeavors
                                We are proud to have been a part of your journey, and we hope that you found our course both challenging and rewarding. Your dedication and hard work have paid off, and we hope that this is just the beginning of your success in the field of bioinformatics.
                                Please feel free to reach out to us with any feedback or suggestions you may have. We are always looking for ways to improve our courses and make them more relevant and useful for our students.
                                Once again, congratulations on your achievement, and we wish you all the best in your future endeavors.
                                Nice regards,
                                **Wale Ogunleye (Founder, HackBio)**
                              </Markdown> 
                            </p>
                        </div>
                        <Link to={'/dashboard'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' > Back To Dashboard </Link> 
                    </div>
                </div>
                </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 bg-zinc-100 text-sm w-full'>
          <div className="w-full">
                <PlatformNavBar />  
              </div>

              <div className="pt-10 flex flex-col gap-10 items-start justify-start w-full h-full">
                    <div className="flex flex-row  w-full items-center justify-center">
                        <div className="px-5 py-2 border h-full font-bold text-xl bg-white">🔙</div>
                        <Link to={'/dashboard'}> <div className="flex gap-5 border px-3 py-2  bg-white font-bold items-center text-lg">  Table of content </div></Link>
                        <div className="px-5 py-2 border h-full font-bold text-xl bg-white">→</div>
                    </div>
                    <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                          <div className="flex flex-row items-center justify-between pr-20">
                          <p className="font-bold text-lg">Thank You</p>
                          </div>
                        <div className="rounded-md p-5  border border-hackbio-green-light h-full">
                          
                            <p className="text-sm leading-5 text-justify prose prose-lg max-w-none"> 
                              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}> 
                                I hope this message finds you in good health and high spirits. 
                                <br/> If you are seeing this, it means you have completed your internship and I would like to take this opportunity to congratulate you on this achievement.<br/>
                                It has been a pleasure having you as our student, and we are thrilled that you have taken this important step towards expanding your knowledge and skills in bioinformatics. By completing this course, you have demonstrated your dedication to learning and your commitment to your career development. I am confident that the knowledge and skills you have gained through this course will serve you well in your present and future endeavors<br/>
                                We are proud to have been a part of your journey, and we hope that you found our course both challenging and rewarding. Your dedication and hard work have paid off, and we hope that this is just the beginning of your success in the field of bioinformatics.<br/>
                                Please feel free to reach out to us with any feedback or suggestions you may have. We are always looking for ways to improve our courses and make them more relevant and useful for our students.<br/>
                                Once again, congratulations on your achievement, and we wish you all the best in your future endeavors.<br/>
                                Nice regards,<br/>
                                **Wale Ogunleye (Founder, HackBio)**
                              </Markdown> 
                            </p>
                        </div>
                        <Link to={'/dashboard'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' > Back To Dashboard </Link> 
                    </div>
                </div>
          </section>
          
  
      </main>
  );
}

export default ThankYou;
