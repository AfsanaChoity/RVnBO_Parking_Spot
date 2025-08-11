
export default function CenterParagraph({ text, children }) {
  return (
    <div>
        <p className='text-center text-gray-600'>{text}</p>
        {children}
    </div>
  )
}
