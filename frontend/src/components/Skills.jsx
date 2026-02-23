import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiNodedotjs, SiExpress, SiOracle, SiTailwindcss,
  SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub,
  SiPostman, SiSocketdotio,SiMongodb
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineClock, HiOutlinePuzzle } from 'react-icons/hi';

const skillCategories = [
  {
    title: 'Languages',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/5',
    borderColor: 'border-yellow-500/20',
    hoverGlow: 'hover:shadow-yellow-500/10',
    skills: [
      { name: 'Java', icon: <FaJava />, level: 85, color: '#ED8B00' },
      { name: 'JavaScript', icon: <SiJavascript />, level: 90, color: '#F7DF1E' },
      { name: 'HTML5', icon: <SiHtml5 />, level: 95, color: '#E34F26' },
      { name: 'CSS3', icon: <SiCss3 />, level: 90, color: '#1572B6' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
    hoverGlow: 'hover:shadow-blue-500/10',
    skills: [
      { name: 'React.js', icon: <SiReact />, level: 88, color: '#61DAFB' },
      { name: 'Node.js', icon: <SiNodedotjs />, level: 85, color: '#339933' },
      { name: 'Express.js', icon: <SiExpress />, level: 82, color: '#FFFFFF' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 92, color: '#06B6D4' },
      { name: 'Socket.IO', icon: <SiSocketdotio />, level: 75, color: '#010101' },
    ],
  },
  {
    title: 'Databases & Tools',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/5',
    borderColor: 'border-green-500/20',
    hoverGlow: 'hover:shadow-green-500/10',
    skills: [
      { name: 'Oracle DB', icon: <SiOracle />, level: 85, color: '#F80000' },
      { name: 'MongoDB', icon: <SiMongodb />, level: 85, color: '#47A248' },
      { name: 'Git', icon: <SiGit />, level: 88, color: '#F05032' },
      { name: 'GitHub', icon: <SiGithub />, level: 90, color: '#FFFFFF' },
      { name: 'VS Code', icon: <VscVscode />, level: 95, color: '#007ACC' },
      { name: 'Postman', icon: <SiPostman />, level: 80, color: '#FF6C37' },
    ],
  },
//   {
//     title: 'Soft Skills',
//     color: 'from-purple-500 to-pink-500',
//     bgColor: 'bg-purple-500/5',
//     borderColor: 'border-purple-500/20',
//     hoverGlow: 'hover:shadow-purple-500/10',
//     skills: [
//       { name: 'Leadership', icon: <HiOutlineLightBulb />, level: 90, color: '#A855F7' },
//       { name: 'Teamwork', icon: <HiOutlineUserGroup />, level: 92, color: '#EC4899' },
//       { name: 'Problem Solving', icon: <HiOutlinePuzzle />, level: 95, color: '#8B5CF6' },
//       { name: 'Time Management', icon: <HiOutlineClock />, level: 88, color: '#D946EF' },
//     ],
//   },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="relative py-4  overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

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
            What I work with
          </span>
          <h2 className="section-title">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
          <p className="section-subtitle mt-2">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6  mx-auto">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className={`glass-strong p-5 rounded-2xl card-hover ${category.hoverGlow} hover:shadow-2xl group`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.color}`} />
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className=" flex items-center flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: catIndex * 0.1 + skillIndex * 0.08 }}
                  >
                    <div className="flex items-center justify-between p-3 mb-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-lg" style={{ color: skill.color }}>
                          {skill.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      </div>
                      {/* <span className="text-xs font-mono text-gray-500">{skill.level}%</span> */}
                    </div>

                    {/* Progress Bar */}
                    {/* <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: catIndex * 0.1 + skillIndex * 0.1, ease: 'easeOut' }}
                      />
                    </div> */}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 overflow-hidden"
        >
          <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap">
            {[...skillCategories.flatMap(c => c.skills), ...skillCategories.flatMap(c => c.skills)].map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-400 flex-shrink-0"
              >
                <span style={{ color: skill.color }}>{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
