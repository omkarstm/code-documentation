import React from 'react';
import ZipUploader from './ZipUploader';
import ButtonLink from '../../ui/ButtonLinks';

const Hero: React.FC = () => (
    <section className='custome-container h-full pt-24'>
        <div className='flex flex-col items-center   w-[50%] mx-auto text-center gap-5'>
            <div className='bg-[#F2F3F5] rounded text-[12px] px-2 py-1'>Hii, new friend!</div>
            <h1 className='text-[45px]! font-semibold'>Turn Your Code into Clear Docs & Workflow Maps — Instantly</h1>
            <p>Upload your project as a ZIP file and let AI generate professional documentation and architecture diagrams in seconds. Save hours of manual effort.</p>
            <ZipUploader />
            <ButtonLink href='#' variant='secondary' className='bg-blue-600  p-2 px-3 text-[#fff]! rounded-sm'>Get Started</ButtonLink>
        </div>
    </section>
)
export default Hero;