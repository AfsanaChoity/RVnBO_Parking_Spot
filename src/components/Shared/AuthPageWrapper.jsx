import bgImg from "../../assets/images/BG_images/img3"

export default function AuthPageWrapper({ text,icon=null, children}) {
  return (
      <div
      className="min-h-screen relative p-4 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImg})`, // Background image
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 blur-3xl"></div>

      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 opacity-100 z-10">
        {/* Icon */}{icon}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">{text}</h2>
        {children}
      </div>
    </div>
  )
}