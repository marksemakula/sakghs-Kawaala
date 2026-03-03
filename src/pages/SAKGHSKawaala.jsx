import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuMapPin, LuPhone, LuMail, LuUsers, LuAward, LuBookOpen, LuCalendar, LuArrowRight, LuExternalLink, LuStar, LuTarget } from 'react-icons/lu';
import SAKHeader from '../components/layout/SAKHeader';
import SAKFooter from '../components/layout/SAKFooter';

const SAKGHSKawaala = () => {
  const brandColors = {
    primary: '#FFD700', // Yellow
    secondary: '#800E13', // Burgundy
  };

  const stats = [
    { icon: LuUsers, label: 'Students', value: '550+', color: 'text-yellow-500' },
    { icon: LuAward, label: 'Pass Rate', value: '97%', color: 'text-yellow-600' },
    { icon: LuBookOpen, label: 'Subjects', value: '20+', color: 'text-yellow-500' },
    { icon: LuTarget, label: 'University Admissions', value: '94%', color: 'text-yellow-600' },
  ];

  const programs = [
    {
      title: 'Sciences Program',
      description: 'Comprehensive science education covering Physics, Chemistry, Biology, and Mathematics',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'ICT'],
      image: '/images/science.avif',
    },
    {
      title: 'Arts Program',
      description: 'Liberal arts education focusing on languages, humanities, and social sciences',
      subjects: ['Literature', 'History', 'Geography', 'Economics', 'Languages'],
      image: '/images/ARTS.jpg',
    },
    {
      title: 'Technical Program',
      description: 'Practical skills development in technical and vocational subjects',
      subjects: ['Technical Drawing', 'Computer Science', 'Agriculture', 'Business Studies'],
      image: '/images/TD.jpg',
    }
  ];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'St. Andrew Kaggwa Gombe HS - Kawaala';

    const ensureIcon = (rel) => {
      const existing = document.querySelector(`link[rel='${rel}']`);
      const prevHref = existing?.getAttribute('href');
      let linkEl = existing;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', rel);
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', '/images/Gombe High logo.png');
      return { linkEl, prevHref };
    };

    const fav = ensureIcon('icon');
    const shortcut = ensureIcon('shortcut icon');

    return () => {
      document.title = prevTitle;
      if (fav.linkEl && fav.prevHref) fav.linkEl.setAttribute('href', fav.prevHref);
      if (shortcut.linkEl && shortcut.prevHref) shortcut.linkEl.setAttribute('href', shortcut.prevHref);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" style={{ viewTransitionName: 'institution-sakghs-kawaala' }}>
      <SAKHeader />
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden text-white py-32" style={{ backgroundColor: brandColors.secondary }}>
        <div className="absolute inset-0">
          <img 
            src="/images/annie-spratt-V-XM4kkWpng-unsplash.jpg" 
            alt="St. Andrew Kaggwa Gombe High School - Kawaala" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="h-[21rem] w-[21rem] flex items-center justify-center overflow-hidden">
                <img src="/images/Gombe High logo.png" alt="St. Andrew Kaggwa Gombe HS" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="inline-flex items-center rounded-full px-6 py-2 mb-6" style={{ backgroundColor: `${brandColors.primary}40` }}>
              <LuExternalLink className="w-4 h-4 mr-2" style={{ color: brandColors.primary }} />
              <span className="text-sm font-medium">sakghs-kawaala.ges.ac.ug</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              St. Andrew Kaggwa Gombe High School
            </h1>
            <p className="text-xl mb-4" style={{ color: brandColors.primary }}>
              Kawaala Campus
            </p>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Excellence in Secondary Education • Established 1995
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced secondary education with focus on sciences and humanities, preparing students for higher education and global opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: brandColors.secondary }}>
              Academic Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed for excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-0"
                style={{ overflow: 'hidden' }}
              >
                <div className="w-full h-40 md:h-48" style={{ flex: '0 0 50%' }}>
                  <img
                    src={program.image}
                    alt={program.title + ' image'}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="flex-1 flex flex-col p-8">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: brandColors.secondary }}>{program.title}</h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <div className="space-y-2">
                    {program.subjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColors.primary }}></div>
                        <span className="text-gray-700">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 text-white" style={{ backgroundColor: brandColors.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Discover excellence in education at St. Andrew Kaggwa Gombe High School - Kawaala Campus
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2">
                <LuMapPin className="w-5 h-5" style={{ color: brandColors.primary }} />
                <span>Kawaala, Kampala</span>
              </div>
              <div className="flex items-center space-x-2">
                <LuPhone className="w-5 h-5" style={{ color: brandColors.primary }} />
                <span>+256 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <LuMail className="w-5 h-5" style={{ color: brandColors.primary }} />
                <span>info@sakghs-kawaala.ges.ac.ug</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-lg"
              style={{ backgroundColor: brandColors.primary, color: brandColors.secondary }}
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </section>
      <SAKFooter />
    </div>
  );
};

export default SAKGHSKawaala;
