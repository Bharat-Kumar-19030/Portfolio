import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FiMapPin, FiBook, FiAward, FiCode } from 'react-icons/fi';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { HiOutlineAcademicCap } from 'react-icons/hi';


const About = () => {
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
    <section id="about" className="relative  overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px] animate-blob animation-delay-2000" />
        
      <div className="section-padding" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">
              Get to know 
            </span>
            <h2 className="section-title">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ">
            {/* Left - Terminal Style Bio */}
            <motion.div variants={itemVariants}>
              <div className="glass-strong rounded-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-gray-400 text-xs font-mono ml-2">about-bharat.js</span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm leading-relaxed space-y-3">
                  <p><span className="text-purple-400">const</span> <span className="text-cyan-300">aboutMe</span> = {'{'}</p>
                  <p className="pl-6"><span className="text-green-400">name</span>: <span className="text-yellow-300">"Bharat Kumar"</span>,</p>
                  <p className="pl-6"><span className="text-green-400">role</span>: <span className="text-yellow-300">"Full Stack Developer"</span>,</p>
                  <p className="pl-6"><span className="text-green-400">location</span>: <span className="text-yellow-300">"Phagwara, Punjab 🇮🇳"</span>,</p>
                  <p className="pl-6"><span className="text-green-400">education</span>: <span className="text-yellow-300">"B.Tech CSE @ LPU"</span>,</p>
                  {/* <p className="pl-6"><span className="text-green-400">year</span>: <span className="text-orange-300">3</span>,</p>
                  <p className="pl-6"><span className="text-green-400">cgpa</span>: <span className="text-orange-300">9.30</span>,</p> */}
                  <p className="pl-6"><span className="text-green-400">Tech stack</span>: [<span className="text-yellow-300">"DBMS"</span>, <span className="text-yellow-300">"Express"</span>, <span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"Node.js"</span>],</p>
                  <p className="pl-6"><span className="text-green-400">loves</span>: [<span className="text-yellow-300">"Building Apps"</span>, <span className="text-yellow-300">"Solving DSA"</span>, <span className="text-yellow-300">"Exploring Tech"</span>],</p>
                  <p>{'}'};</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Bio & Achievements */}
            <motion.div variants={itemVariants} className="space-y-6 px-4 md:px-1">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-purple-400 font-semibold"> B.Tech CSE student</span> at 
                Lovely Professional University, recognized in the <span className="text-cyan-400 font-semibold">Dean's List 
                (Top 10%)</span> for academic excellence.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in building full-stack web applications using the MERN stack. From real-time food delivery 
                platforms to e-commerce solutions, I love turning ideas into scalable, user-friendly products. I've solved 
                <span className="text-purple-400 font-semibold"> 600+ DSA problems</span> across platforms like LeetCode, 
                HackerRank, and CodeChef.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, I'm exploring generative AI, cloud computing, and contributing to open-source 
                projects. I believe in continuous learning and building solutions that make a real impact.
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-gray-300">Phagwara, Punjab</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <HiOutlineAcademicCap />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Studying at</p>
                    <p className="text-sm text-gray-300">LPU, Punjab</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          {/* <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='flex flex-row items-center justify-around  gap-2  rounded-xl border border-gray-700 p-4'>
                    <SiLeetcode className="text-2xl text-yellow-400" />
                    <p className=" text-gray-300">LeetCode</p>
            </div>
            <div className='flex flex-row items-center justify-around  gap-2  rounded-xl border border-gray-700 p-4'>
                    <SiGeeksforgeeks className="text-2xl text-green-400" />
                    <p className=" text-gray-300">GeeksforGeeks</p>
            </div>
            <div className='flex flex-row items-center justify-around  gap-2  rounded-xl border border-gray-700 p-4'>
                    <FiGithub className="text-2xl text-gray-300" />
                    <p className=" text-gray-300">GitHub</p>
            </div>
            <div className='flex flex-row items-center justify-around  gap-2  rounded-xl border border-gray-700 p-4'>
                    <FiCode className="text-2xl text-green-400" />
                    <p className=" text-gray-300">Codolio</p>
            </div>

          </div> */}

        </motion.div>
      </div>
    </section>
  );
};

export default About;
