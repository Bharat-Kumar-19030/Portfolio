import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp, FiMapPin } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const quickLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'GitHub', to: 'github' },
  { name: 'Contact', to: 'contact' },
];

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/bharatkumar19030', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/bharatkumar19030/', label: 'LinkedIn' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/bharatkumar19030', label: 'LeetCode' },
  { icon: <SiGeeksforgeeks />, href: 'https://geeksforgeeks.org/user/bharatkumar19030', label: 'GFG' },
  { icon: <FiMail />, href: 'mailto:bharatkumar19030@gmail.com', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:p-6 lg:p-8 ">
        <div className="grid md:grid-cols-3 gap-12 ">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-lg font-bold text-gray-300 font-mono">BK</span>
              </div>
              <span className="text-xl font-bold text-gray-300">
                Bharat Kumar
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Full Stack Developer passionate about building scalable web applications 
              with the MERN stack. Always learning, always building.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 text-sm"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider ">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-sm text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-blue-400 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:bharatkumar19030@gmail.com" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FiMail className="text-xs text-blue-400" />
                  bharatkumar19030@gmail.com
                </a>
              </li>
              <li className="text-sm text-gray-400 flex items-center gap-2">
                <FiMapPin className="text-xs text-teal-400 flex-shrink-0" />
                Phagwara, Punjab, India
              </li>
              <li className="pt-2">
                <a download="Bharat_Kumar_Resume"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-blue-500/30 transition-all"
                >
                  📄 Download Resume
                </a>
              </li>
            </ul>
            {/* Back to top */}
          <Link to="home" smooth duration={800}>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex mt-10 ml-auto items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors cursor-pointer group"
            >
              Back to top
              <span className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                <FiArrowUp className="text-xs" />
              </span>
            </motion.button>
          </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
