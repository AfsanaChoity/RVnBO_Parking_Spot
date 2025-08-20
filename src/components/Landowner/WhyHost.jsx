

import { DollarSign, Calendar, Leaf } from "lucide-react"
import Heading from "../common/Heading"

export default function WhyHost() {
  const benefits = [
    {
      id: 1,
      icon: DollarSign,
      iconBg: "bg-yellow-500",
      title: "Earn Extra",
      description: "Turn your unused land into passive income.",
    },
    {
      id: 2,
      icon: Calendar,
      iconBg: "bg-gray-800",
      title: "Be Flexible",
      description: "You choose when and how long guests stay.",
    },
    {
      id: 3,
      icon: Leaf,
      iconBg: "bg-teal-500",
      title: "Eco-friendly Hosting",
      description: "Help travelers find safe, off-grid spots and reduce urban overcrowding.",
    },
  ]

  return (
    <div className=" p-6 my-20 md:px-20">
      {/* Main Heading */}
      
      <div className="text-center mb-20">
        <Heading text="Why Host with RVnBO"></Heading>
      </div>

      {/* Benefits List */}
      <div className="space-y-10">
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon
          return (
            <div key={benefit.id} className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-8 h-8 ${benefit.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-4 h-4 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
