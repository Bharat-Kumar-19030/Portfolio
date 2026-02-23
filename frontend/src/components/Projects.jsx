import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCalendar } from 'react-icons/fi';
import React from 'react';
import { SiLeetcode } from 'react-icons/si';
const defaultProjects = [
  {
    _id: 'default-1',
    title: 'BigBite - Real Time Food Delivery Platform',
    description: 'A full-featured real-time food delivery platform supporting customers, restaurants, and delivery partners with live GPS tracking, secure payments via Razorpay, and role-based authentication.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Razorpay'],
    image: '',
    githubLink: 'https://github.com/Bharat-Kumar-19030/BigBite_Foods',
    liveLink: 'https://bigbitefoods.shop',
    date: 'Feb 2026',
    featured: true,
  },
  {
    _id: 'default-2',
    title: 'SkillStacks - Interactive Skill Showcase',
    description: 'A centralized platform where developers create profiles and showcase DSA progress, contests, and projects via LeetCode & Github integration.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub API', 'React', 'Node.js', 'Express', 'MongoDB', 'LeetCode API'],
    image: '',
    githubLink: 'https://github.com/Bharat-Kumar-19030/SkillStack',
    liveLink: 'https://skillstacks.vercel.app/',
    date: 'Nov 2025',
    featured: true,
  },
  {
    _id: 'default-3',
    title: 'NexaMart - E Commerce Platform',
    description: 'Full-stack e-commerce platform with product listings, cart, checkout, seller management, user authentication, and responsive mobile-friendly design deployed on cloud.',
    techStack: ['CSS', 'JavaScript', 'Tailwind', 'PHP', 'Gemini API'],
    image: '',
    githubLink: 'https://github.com/Bharat-Kumar-19030/NexaMart',
    liveLink: 'https://nexamartstore.wuaze.com/',
    date: 'May 2025',
    featured: true,
  }
];

const techColors = {
  'React': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Express': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
  'MongoDB': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Socket.IO': 'bg-white/10 text-white border-white/20',
  'JWT': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Razorpay': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'JavaScript': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'CSS': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Tailwind': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'PHP': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Gemini API': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'HTML': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'NASA API': 'bg-red-500/10 text-red-400 border-red-500/20',
};

const Projects = () => {
  const [show, setshow] = React.useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="  relative py-1 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="section-padding" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center "
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">
            My work
          </span>
          <div className='flex flex-col items-center '>
          <h2 className="section-title">
             Turning Ideas Into <span className="text-gradient">Creations</span>
          </h2>
          <div className="w-52 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-3" />
          <p className="section-subtitle mt-6">
            Here are some of the projects I've worked on recently
          </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {defaultProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="flex flex-col relative items-stretch h-full border glass-strong border-gray-700 rounded-2xl overflow-hidden "
            >
              {/* Project Image */}
               {/* <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/20 to-cyan-500/20"> */}
                {/*{project.image ? (
                  <img
                    src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2 opacity-50 group-hover:opacity-80 transition-opacity">
                        {project.title.includes('Food') ? '🍔' : project.title.includes('Commerce') ? '🛒' : project.title.includes('NASA') ? '🚀' : '💻'}
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{project.techStack?.[0]}</span>
                    </div>
                  </div>
                )} */}

                {/* Overlay on hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                  {project.githubLink && project.githubLink !== '#' && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors transform hover:scale-110"
                    >
                      <FiGithub className="text-xl" />
                    </a>
                  )}
                  {project.liveLink && project.liveLink !== '#' && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-cyan-500/30 transition-colors transform hover:scale-110"
                    >
                      <FiExternalLink className="text-xl" />
                    </a>
                  )}
                </div> */}

                {/* Date badge */}
                {/* <div className="absolute top-3 right-3 px-2.5 py-1 glass rounded-lg text-xs font-mono text-gray-300 flex items-center gap-1">
                  <FiCalendar className="text-[10px]" />
                  {project.date}
                </div>
              </div> */}

              {/* Ping badge — only on SkillStacks */}
                  {project._id === 'default-3' && (
                    <>
                    <a
                      href="https://skillstacks.vercel.app/profile/bharat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-200/20 p-2 rounded-full z-20 absolute top-0 right-0 flex items-center gap-2 group"
                      title='connect with me on this project'
                      onMouseEnter={() => setshow(true)}
                      onMouseLeave={() => setshow(false)}
                    >
                      {/* ping dot */}
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400 group-hover:text-emerald-300 tracking-wide transition-colors whitespace-nowrap">
                        Connect
                      </span>
                      <FiExternalLink className="text-emerald-400 group-hover:text-emerald-300 text-[10px] transition-colors" />
                    </a>
                    <div className={`${show ? 'absolute top-10 p-3  glass-strong right-3 text-xs text-emerald-400' : 'hidden'}`}>
                      View my profile on this project
                    </div>
                    </>
                  )}
                
              {/* Project Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 ">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm  mb-4 ">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                        techColors[tech] || 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}

                  
                </div>

                {/* Links */}
                <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5">
                  {project.githubLink && project.githubLink !== '#' && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FiGithub /> Source Code
                    </a>
                  )}
                  {project.liveLink && project.liveLink !== '#' && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      Live Demo <FiExternalLink /> 
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
