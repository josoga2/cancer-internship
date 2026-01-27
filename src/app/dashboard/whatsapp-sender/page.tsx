'use client'
import HbButtons from "@/components/widgets/hb-buttons";
import { useState, ChangeEvent, FormEvent } from "react";




// Props: upcoming, coursesList, internshipStatus
export default function WhatsappSender() {

    const [numbers, setNumbers] = useState('');
    const [message, setMessage] = useState('');
    const [sendingKey, setSendingKey] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const parsedNumbers = numbers
            .split('\n')
            .map(n => n.trim())
            .filter(Boolean);
        
        const getDelay = () => {
            const min = 10000;
            const max = 15000;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const sleep = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));




        // Prepare data for the API
        for (const number of parsedNumbers) {
            const formData = new FormData();
            formData.append('to', number);
            formData.append('text', message);
            if (imageUrl) formData.append('imageUrl', imageUrl);

            try {
                const response = await fetch(
                'https://www.wasenderapi.com/api/send-message',
                {
                    method: 'POST',
                    headers: {
                    Authorization: `Bearer 18299ebc0f6011f6ab19ce07ffebf51c3e78701a638b8359303abdbf437421e9`,
                    },
                    body: formData,
                }
                );

                console.log(`Sent to ${number}:`, response.status);
            } catch (err) {
                console.error(`Failed for ${number}`, err);
            }

            await sleep(getDelay());
        }

    };

  return (
    <main>
      <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-start justify-start ">
        {/*desktop*/}
        <div className="flex flex-col gap-5 w-full">
            <p className="text-lg font-semibold">Send Whatsapp Messages to Interns</p>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <textarea value={numbers} onChange={(e) => setNumbers(e.target.value)} className="w-full border-2 h-72 rounded-md p-5 border-sky-950 text-sm" placeholder="Paste the numbers with their country codes*" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border-2 h-36 rounded-md p-5 border-sky-950 text-sm" placeholder="Your Message*" />
                <input type="text" className="w-full border-2 rounded-md px-5 py-3 border-sky-950 font-mono text-sm" placeholder="Sending key*" />
                <label className="w-full  border-sky-950 font-mono text-xs">Link to an image (optional)</label> 
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border-2 rounded-md px-5 py-3 border-sky-950 text-xs" />
                <button type="submit" className="bg-hb-green px-3 py-2 text-white rounded-md hover:bg-hb-green-dark"> Send Message </button>
            </form>
        </div>
        
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
          <div>Please open on your laptop</div>
          <HbButtons type="primary" text="HackBio"/>
      </div>
    </main>
    
  );
}
