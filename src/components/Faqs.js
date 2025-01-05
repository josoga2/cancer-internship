import { Link } from "react-router-dom";

const faqlist = [
  {
    "index": 1,
    "question": "What is the HackBio internship program?",
    "answer": "The HackBio internship is an open virtual program designed to provide hands-on experience in bioinformatics and related fields. It focuses on collaborative projects, peer-to-peer mentorship, and real-world datasets to enhance participants' skills."
  },
  {
    "index": 2,
    "question": "Who is eligible to apply for the HackBio internship?",
    "answer": "The internship is open to students, graduates, and professionals interested in bioinformatics. While prior experience in bioinformatics is beneficial, the program also welcomes individuals from related fields who are eager to learn and collaborate."
  },
  {
    "index": 3,
    "question": "What is a biostack?",
    "answer": "A biostack refers to a specific area of focus within bioinformatics, such as genomics, proteomics, or data science. Participants can choose a biostack that aligns with their interests and career goals."
  },
  {
    "index": 4,
    "question": "How does peer-to-peer mentorship work?",
    "answer": "Peer-to-peer mentorship involves participants collaborating and learning from each other. This approach fosters a supportive community where individuals can share knowledge, resources, and experiences to enhance collective learning."
  },
  {
    "index": 5,
    "question": "What is a bootcamp?",
    "answer": "A bootcamp is an intensive, short-term training program designed to equip participants with specific skills in a particular area. HackBio offers bootcamps focusing on various aspects of bioinformatics to prepare individuals for specialized roles."
  },
  {
    "index": 6,
    "question": "Do you offer free courses?",
    "answer": "Yes, HackBio offers a range of free courses aimed at providing foundational knowledge in bioinformatics and related fields. These courses are designed to make education accessible to a broader audience."
  },
  {
    "index": 7,
    "question": "Do you offer scholarships?",
    "answer": "HackBio is committed to making education accessible and may offer scholarships for certain programs. For more information on available scholarships and eligibility criteria, please visit the official HackBio website or contact their support team."
  },
  {
    "index": 8,
    "question": "Where can I find more information or ask additional questions?",
    "answer": "For more details or specific inquiries, you can visit the official HackBio website at https://thehackbio.com or reach out via email at hello@thehackbio.com."
  }
]


const Faqs = () => {
  return (
    <main className=' py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between pt-10 px-5">
              <div className='w-full flex flex-col items-center justify-center gap-10'>
                <div className='max-w-xl text-justify'>
                    <p className='font-bold text-2xl pb-5'>Frequently Asked Questions</p>
                    {faqlist.map((faq)=>(
                        <div className='pb-5' key={faq.index}>
                            <p className='font-bold text-sm'>{faq.index}. {faq.question}</p>
                            <p className='text-xs'>{faq.answer}</p>
                        </div>
                    ))}
                </div>
                <a href={'#open_internships'} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Get Started </a> 
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='w-full flex flex-col items-center justify-center gap-10'>
                <div className='max-w-xl text-justify'>
                    <p className='font-bold text-2xl py-5'>Frequently Asked Questions</p>
                    {faqlist.map((faq)=>(
                        <div className='pb-5' key={faq.index}>
                            <p className='font-bold text-sm'>{faq.index}. {faq.question}</p>
                            <p className='text-xs'>{faq.answer}</p>
                        </div>
                    ))}
                </div>
                <a href={"#open_internships"} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Get Started </a> 
              </div>
          </section>
        
  
    </main>
  );
}

export default Faqs;
