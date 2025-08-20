

export default function Banner({ backgroundImg, heading, subheading, button1='',button2='', containerClassName = '', }) {
  return (
    <div className={`${containerClassName}`}>
      {/* Background Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center px-4 justify-center  text-white"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10  mb-4 text-center md:px-[6%]">
          <h1 className="text-5xl md:text-7xl font-bold mb-10">
            {heading}
          </h1>
          <p className="text-xl md:text-3xl mb-12">
            {subheading}
          </p>
         
          <div className='flex flex-col  gap-8 justify-center items-center'>
            
            <div className='max-w-[300px]'>
                {button1}
            </div>

            <div className=''>
              {button2}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
