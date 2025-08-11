import React from 'react'

export default function AuthHeaderImage({ img }) {
  return (
     <div className='flex justify-center mb-10'>
        <img src={img} alt="image" className="w-20 h-20" />
    </div>
  )
}
