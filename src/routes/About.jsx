// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquareHeart, Twitter, Linkedin, Github } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const [content, setContent] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  if (!content) {
    return <p className="text-center py-20 text-lg">Loading...</p>;
  }

  const cardClass =
    "bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.015] transition-all duration-300 border border-gray-100 dark:border-gray-800";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-6 py-24 md:px-32 transition-all duration-300 font-sans relative">
      {/* Toggle Dark Mode */}
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent tracking-tight">
            {content.hero?.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.hero?.subtitle}
          </p>
        </div>

        {/* Intro */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white dark:bg-gray-900 shadow-xl rounded-[2rem] p-10 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
          <img
            src={content.intro?.img}
            alt="Team"
            className="w-full md:w-1/2 rounded-3xl shadow-md object-cover"
          />
          <div className="space-y-6 md:w-1/2 text-lg text-gray-700 dark:text-gray-300">
            {content.intro?.paragraphs?.map((p, i) => (
              <ReactMarkdown key={i}>{p}</ReactMarkdown>
            ))}

          </div>
        </div>

        {/* Audience */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
            Our Audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.audience?.map((item, i) => (
              <div key={i} className={cardClass}>
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {content.stats?.map((stat, i) => (
            <div key={i} className={cardClass}>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.number}+
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {content.coreValues?.map((item, i) => (
              <div key={i} className={cardClass}>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.team?.map((member, i) => (
              <div key={i} className={`${cardClass} text-center`}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-blue-500"
                />
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                  {member.desc}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
            What Our Readers Say
          </h2>
          <div className="max-w-3xl mx-auto">
            <Slider {...sliderSettings}>
              {content.testimonials?.map((item, i) => (
                <div key={i} className="px-4">
                  <div className={`${cardClass} mx-4`}>
                    <MessageSquareHeart className="text-blue-500 mb-2 w-6 h-6" />
                    <p className="italic text-gray-700 dark:text-gray-300">"{item.testimonial}"</p>
                    <p className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400">— {item.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {content.faq?.map((item, i) => (
              <div
                key={i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className={`${cardClass} cursor-pointer border hover:border-blue-400`}
              >
                <h3 className="text-lg font-semibold flex justify-between items-center text-blue-600 dark:text-blue-400">
                  {item.question}
                  <span>{openFAQ === i ? "−" : "+"}</span>
                </h3>
                {openFAQ === i && (
                  <p className="text-gray-600 dark:text-gray-300 mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className={`${cardClass} text-center space-y-6 max-w-3xl mx-auto`}>
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get the latest updates and articles delivered directly to your inbox.
          </p>
          {submitted ? (
            <div className="py-4">
              <div className="text-green-500 text-xl mb-2">✓</div>
              <p className="text-xl text-green-500">Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 w-full sm:w-auto flex-grow max-w-md"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Final Message */}
        <div className={`${cardClass} text-center space-y-6`}>
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            {content.finalMessage?.heading}
          </h2>
          <div className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            <ReactMarkdown>{content.finalMessage?.message}</ReactMarkdown>
          </div>
          <a
            href={`mailto:${content.finalMessage?.email}?subject=Hello from website`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
