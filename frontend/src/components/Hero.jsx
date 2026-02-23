import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiX, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { HiOutlineDownload } from 'react-icons/hi';
import API from '../utils/api';
import img from '/pic.jpeg'

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/Bharat-Kumar-19030', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/bharatkumar19030/', label: 'LinkedIn' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/bharatkumar19030/', label: 'LeetCode' },
  { icon: <SiGeeksforgeeks />, href: 'https://www.geeksforgeeks.org/profile/bharatkumsdro', label: 'GFG' },
  { icon: <FiMail />, href: 'mailto:bharatkumar19030@gmail.com', label: 'Email' },
];

const Hero = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      // Verify password by hitting a protected endpoint
      const res = await API.get('/manage/messages', {
        headers: { 'x-admin-password': password },
      });
      if (res.data.success) {
        onLogin(password);
        setShowModal(false);
        setPassword('');
        navigate('/manage');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthError('Incorrect password. Try again.');
      } else {
        setAuthError('Backend unreachable. Make sure the server is running.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Side Social Links - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-5 z-30"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-purple-400 text-xl transition-colors duration-300"
            title={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
        <div className="w-px h-24 bg-gradient-to-b from-purple-500/50 to-transparent mt-2" />
      </motion.div>

      {/* Main Content */}
      <div className="relative flex flex-col gap-5 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row  items-center md:items-start justify-between gap-6  lg:gap-8">
          {/* Left - Text Content */}
          <motion.div
            className="flex flex-col text-center  gap-5 md:gap-8 lg:text-left max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div>
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center  gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              {/* <span className="text-2xl">👋</span> */}
              <span className="text-sm text-gray-300 font-medium">Welcome to my portfolio</span>
            </motion.div>

            {/* Admin access — hidden button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => { setShowModal(true); setAuthError(''); setPassword(''); }}
              className="ml-2 w-2 h-2 rounded-full bg-purple-500/30 hover:bg-purple-500/60 transition-colors"
              title=""
            />
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl  md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-gradient relative">
                Bharat Kumar  
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            <div className=' flex flex-col gap-3 items-center text-white text-2xl md:text-3xl text-center'>
              Full Stack Web Developer
              <div className='text-sm text-gray-500 dark:text-white' >
                Transforming Complexity Into Simplicity
              </div>
            </div>

            {/* Typing Animation */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-12"
            >
              I'm a{' '}
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'MERN Stack Developer',
                  2000,
                  'BTech CSE Student',
                  2000,
                  'Problem Solver',
                  2000,
                  'Tech Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-gradient font-bold"
                repeat={Infinity}
              />
            </motion.div> */}

            {/* Description */}
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              A passionate 3rd-year B.Tech CSE student at Lovely Professional University, 
              specializing in building scalable web applications with the MERN stack. 
              Dean's List scholar with a 9.30 CGPA and 500+ DSA problems solved.
            </motion.p> */}

            {/* Mobile Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center lg:justify-start gap-4 mt-8 xl:hidden"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Avatar / Illustration */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative overflow-hidden sm:overflow-visible">
              {/* Animated rings */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-purple-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-cyan-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-12 rounded-full border border-violet-500/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />

              {/* Profile avatar */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-cyan-500 animate-gradient bg-300%" />
                <div className="absolute inset-1 bg-dark-900 rounded-full flex items-center justify-center">
                  {/* <div className="text-center">
                    <span className="text-7xl sm:text-8xl font-bold text-gradient">BK</span>
                    <p className="text-gray-400 text-sm mt-2 font-mono">&lt;developer /&gt;</p>
                  </div> */}
                  <img src={img} className='rounded-full' alt="BK" />
                </div>
              </div>

              {/* Floating tech badges */}
              {/* <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 glass rounded-full text-xs font-semibold text-purple-300"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚛️ React
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1.5 glass rounded-full text-xs font-semibold text-green-300"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                🟢 Node.js
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 px-3 py-1.5 glass rounded-full text-xs font-semibold text-cyan-300"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                🍃 MongoDB
              </motion.div>*/}
            </div>
          </motion.div> 
        </div>
        {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-row items-center gap-6 justify-center "
            >
              <Link to="contact" smooth duration={500} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <FiMail className="text-lg" />
                  Get in Touch
                </motion.button>
              </Link>
              <Link to="projects" smooth duration={500} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <FiGithub className="text-lg" />
                  Explore Projects
                </motion.button>
              </Link>
            </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link to="about" smooth duration={500} offset={-80} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors"
          >
            <span className="text-xs font-mono tracking-widest">SCROLL DOWN</span>
            <FiArrowDown className="text-lg" />
          </motion.div>
        </Link>
      </motion.div> */}
      {/* Admin Login Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-strong w-full max-w-sm rounded-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                    <FiLock className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Welcome, Bharat</h3>
                    <p className="text-[10px] text-gray-500">Enter your admin password</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="text-xs" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAdminLogin} className="p-5 space-y-4">
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoFocus
                    required
                    className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPwd ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-red-400 text-center">{authError}</p>
                )}

                <button
                  type="submit"
                  disabled={authLoading || !password}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : 'Enter Dashboard'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
