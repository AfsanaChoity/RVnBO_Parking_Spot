import React from 'react'

export default function Heading({text}) {
  return (
    <div>
        <h2 className='text-3xl font-semibold lg:text-5xl '>{text}</h2>
    </div>
  )
}
