import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "Ridemate has transformed my daily commute. It's reliable, affordable, and the drivers are always friendly!",
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "As a frequent business traveler, I appreciate the consistency and professionalism of Ridemate. It's my go-to choice in every city.",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "The student discounts and safe ride options make Ridemate perfect for campus life. I feel secure using it, even late at night.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          What Our Riders Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg text-start font-semibold text-black">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-start">{testimonial.role}</p>
                </div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
              </div>
              <p className="text-gray-800 mb-4">{testimonial.quote}</p>
              <div className="flex text-yellow-400 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
