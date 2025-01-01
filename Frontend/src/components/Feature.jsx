import { FiClock, FiMapPin, FiShield } from "react-icons/fi";

const features = [
  {
    icon: <FiClock size={40} />,
    title: "On-Time Pickups",
    description: "Never wait again. Our drivers are punctual and reliable.",
  },
  {
    icon: <FiMapPin size={40} />,
    title: "Flexible Routes",
    description: "Choose your preferred route or let us optimize it for you.",
  },
  {
    icon: <FiShield size={40} />,
    title: "Safe & Secure",
    description:
      "Your safety is our top priority. All rides are insured and monitored.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          Why Choose Ridemate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" hover:shadow-xl transition-shadow duration-300 bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-primary mb-4 justify-center flex">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
