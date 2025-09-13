import React from 'react'
export default function WorkFlexBox({icon, heading, subheading}) {
  return (
    <div className='border border-gray-300 rounded shadow-xl flex flex-col items-center   py-16 lg:py-20 '>
        <div className='text-6xl mb-6'>
          {icon}
        </div>
        <h3 className='text-xl xl:text-2xl font-semibold mt-2 mb-8'>{heading}</h3>
        <p className='text-gray-600 lg:text-xl px-4'>{subheading}</p>
    </div>
  )
}
