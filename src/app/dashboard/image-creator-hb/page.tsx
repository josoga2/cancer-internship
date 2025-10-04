'use client';

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const ImageGenerator = () => {
  const [name, setName] = useState('');
  const [program, setProgram] = useState('Next Generation Sequencing (NGS)');
  const [title, setTitle] = useState('I just graduated from HackBio 🏆🎉!');
  const [announcement, setAnnouncement] = useState('I am excited to announce that I just finished HackBio NGS Internship 🏆🎉');
  //const [announcement, setAnnouncement] = useState('I am excited to announce that I got into the Hackbio NGS Internship bioinformatics program 🎉');
  const [hashtag, setHashtag] = useState('#HackBioNGS25');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const templateRef = useRef(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const exportImage = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'generated-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className='flex flex-col items-start justify-start p-5'>
      <h2 className='text-lg font-bold w-[400px]'>You have taken a bold career step, now announce it to the world.</h2>
      
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Full Name"
        className='border-2 border-gray-700 rounded p-2 w-72 my-2'
      />
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className='py-2 font-bold border-2 bg-[#27AE60] text-[#ffffff] border-[#27AE60] rounded w-48 my-2 px-5'
      />
      
      <div
        ref={templateRef}
        style={{
          width: '500px',
          height: '600px',
          backgroundColor: '#f0f8ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '20px',
          border: '1px solid #ccc',
          position: 'relative',
          overflow: 'hidden',
        }}
        className='rounded-lg shadow-lg bg-gradient-to-b from-white via-hb-lightgreen to-hb-green '
      >
        <div className='w-full flex justify-center items-start'>
          <div className='bg-[#27AE60] text-[#ffffff] px-2 py-2 text-xl rounded-full font-bold flex items-center justify-center'>
            HB
          </div>
        </div>
        
        <h1 style={{ marginTop: '50px', textAlign: 'center', fontSize: '24px' }} className='font-bold'>{title}</h1>
        
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '20px 0',
          background: 'linear-gradient(to bottom, #34d399, #10b981, #047857)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ textAlign: 'center' }}>Your Image Appears Here</div>
          )}
        </div>
        
        <h2 style={{ textAlign: 'center'}} className='font-bold text-2xl'>{name}</h2>
        <h3 style={{ textAlign: 'center'}}  className='font-medium pt-5 text-sm'>{program}</h3>
        
        <p style={{ textAlign: 'center', fontSize: '16px', margin: '20px 0' }}>{announcement}</p>
        
        <p style={{ textAlign: 'center', fontSize: '16px'}} className='text-white font-bold'>{hashtag}</p>
      </div>
      
      <button onClick={exportImage} className='bg-[#27AE60] text-[#ffffff] px-4 py-2 rounded my-10'>
        Export as Image
      </button>
    </div>
  );
};

export default ImageGenerator;