import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiAward } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const education = [
  {
    degree: 'B.Tech - Computer Science & Engineering',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: 'Aug 2023 - Present',
    grade: 'CGPA: 9.27',
    current: true,
  },
  {
    degree: 'Intermediate - PCM',
    institution: 'Maharishi Markandeshwar International School',
    location: 'Ambala, Haryana',
    period: 'Apr 2022 - Mar 2023',
    grade: 'Percentage: 89.40%',
    current: false,
  },
];

const certifications = [
  { name: 'Master Generative AI & Generative AI Tools', platform: 'Udemy', date: 'Aug 2025' },
  { name: 'Cloud Computing', platform: 'NPTEL', date: 'Jun 2025' },
  { name: 'Object Oriented Programming', platform: 'iamNeo', date: 'Aug 2024' },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="education" className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[150px]" />

      <div className="section-padding" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4 block">
              My Academic Journey
            </span>
            <h2 className="section-title">
              <span className="text-blue-400">Education</span> & Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-teal-500" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-dark-900 z-10 mt-2">
                    {edu.current && (
                      <div className="absolute -inset-1 rounded-full bg-blue-500/50 animate-ping" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] glass-strong p-6 rounded-2xl card-hover ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}>
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <HiOutlineAcademicCap className="text-blue-400" />
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                    <p className="text-gray-300 text-sm mb-1">{edu.institution}</p>
                    <p className={`text-gray-500 text-xs flex items-center gap-1 mb-1 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <FiMapPin className="text-xs" /> {edu.location}
                    </p>
                    <p className="text-teal-400 text-sm font-semibold">{edu.grade}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="mt-14">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="text-blue-400">Certifications</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4 justify-around mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass-strong p-5 card-hover rounded-2xl group"
                >
                  <div className="flex items-start justify-between gap-3 ">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FiAward className="text-blue-400" />
                    </div>
                    {/* <span className="text-xs font-mono text-gray-500">{cert.date}</span> */}
                  
                    <h4 className="text-sm font-semibold text-white  leading-snug">{cert.name}</h4>
                    <p className="text-xs text-blue-400">{cert.platform}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
