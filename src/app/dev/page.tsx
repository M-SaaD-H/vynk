import React from "react"
import { Testimonials } from "../../../registry/components/ui/testimonials"

function page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Testimonials testimonials={testimonials} />
    </div>
  )
}

const testimonials = [
  {
    name: "Alex P.",
    content: "Vynk made my workflow so much smoother. Highly recommended!",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUf3MD28jfnfzyfhpBnuL5RAcLwEnidaCCJQ&s"
  },
  {
    name: "Samantha R.",
    content: "Super intuitive and fast. Vynk is a game changer for my team.",
    avatar: "https://imgv3.fotor.com/images/gallery/generate-a-realistic-ai-avatar-of-a-professional-woman-in-fotor.jpg"
  },
  {
    name: "Jordan L.",
    content: "I love how easy it is to collaborate with Vynk. Great tool!",
    avatar: "https://images.media.io/images2023/ai-portrait-generator/portrait-pic1.png"
  },
  {
    name: "Priya S.",
    content: "Vynk saves me hours every week. Simple and effective.",
    avatar: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d70e/67e289c3be550853f270d71a_66abb234b00a4bc015936331_image%25208.webp"
  },
  {
    name: "Paloma",
    content: "The support team is fantastic. Vynk just works.",
    avatar: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d70e/67e289c3733b75dda4127511_66abb2cc1fbe166075432e7f_image%25209.webp"
  },
  {
    name: "Morgan T.",
    content: "From setup to daily use, Vynk is seamless and reliable.",
    avatar: "https://imgv3.fotor.com/images/gallery/generate-a-realistic-ai-avatar-of-a-formal-man-in-fotor.jpg"
  }
]

export default page
