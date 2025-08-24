
import CenterParagraph from '../common/CenterParagraph';
import HeadingSmall from '../common/HeadingSmall';
import SubHeading from '../common/SubHeading';

export default function DashboardFlexBox({ heading, subHeading, icon, color }) {
  const isImage = typeof icon === 'string'; 

  return (
    <div className='rounded px-4 py-6 flex items-center justify-between' style={{ backgroundColor: color }}>
      <div className='flex flex-col space-y-2'>
        <HeadingSmall text={heading} />
        <CenterParagraph text={subHeading} />
      </div>
      
      <div className='bg-[#FFFFFF] rounded w-[50px] h-[50px] flex items-center justify-center text-3xl text-[#468F9D]'>
        {isImage ? (
          <img src={icon} alt="icon" className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
      </div>
    </div>
  )
}
