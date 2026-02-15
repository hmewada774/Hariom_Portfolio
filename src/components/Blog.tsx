import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Blog() {
  const blogPosts = [
    {
      title: 'Why I Love Building AI Projects',
      excerpt: "Cybersecurity is more than just a field of study or a career path for me; it's a passion, a continuous challenge, and an exhilarating journey into the intricate world of digital defense. Building cybersecurity projects, in particular, is where this passion truly comes alive. It's not just about writing code or configuring systems; it's about the thrill of creation, the satisfaction of problem-solving, and the profound impact these projects can have.",
      image: './blog1.jpeg',
      date: 'Nov 20, 2025',
      readTime: '5 min read',
    },
    {
      title: 'The Beauty of Simple Code',
      excerpt: 'Clean code isn’t just about fewer lines — it’s about clarity. Elegance in code feels like poetry to me — each function should have rhythm and purpose.',
      image: './blog2.jpg',
      date: 'Nov 15, 2025',
      readTime: '7 min read',
    },
    {
      title: 'From Curiosity to Creation: My Technical Journey',
      excerpt: "In my journey, I have grown from a curious learner into a focused and driven technologist, constantly pushing myself to explore new challenges in programming, cybersecurity, and research. I have built a strong foundation in C, C++, Java, and Python, completed certified courses, published research work, and developed real-world projects ranging from encryption tools and security systems to AI-based and IoT solutions. Through internships, competitions, and hands-on experimentation, I have learned to turn ideas into practical implementations while continuously improving my problem-solving and analytical skills. This journey reflects my passion for technology, my commitment to learning, and my determination to create impactful and secure solutions for the future.",
      image: './blog3.jpg',
      date: 'Nov 10, 2025',
      readTime: '6 min read',
    },
    {
      title: 'Mastering Security: My Journey in Cyber Defense',
      excerpt: "Mastering security has been a journey of deep learning, practical experimentation, and constant curiosity, where I have explored core concepts of cybersecurity, cryptography, network and system security, and ethical hacking. Through hands-on projects like encryption tools, Bluetooth and IoT security systems, and research on secure authentication and pairing mechanisms, I have developed a strong understanding of how attacks work and how to defend against them. By combining theoretical knowledge with real-world implementation, certifications, and continuous practice, I am building the skills needed to design secure, reliable, and future-ready digital systems.",
      image: './blog4.png',
      date: 'Nov 5, 2025',
      readTime: '8 min read',
    },
  ];

  return (
    <section id="blog" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-12"
        >
          My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Thoughts</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 rounded-2xl overflow-hidden hover:border-blue-500 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-white/70 mb-4">{post.excerpt}</p>

                <div className="flex items-center gap-2 text-blue-500 group-hover:gap-4 transition-all">
                  <span>Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}