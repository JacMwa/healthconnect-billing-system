
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ShieldCheck, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const featureItems = [
    {
      icon: <Calendar className="w-5 h-5 text-healthcare-500" />,
      text: "Easy Appointment Booking",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-healthcare-500" />,
      text: "Quality Patient Care",
    },
    {
      icon: <Clock className="w-5 h-5 text-healthcare-500" />,
      text: "24/7 Emergency Services",
    },
    {
      icon: <Heart className="w-5 h-5 text-healthcare-500" />,
      text: "Patient-centered Approach",
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-healthcare-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-healthcare-pattern opacity-50" />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.span
              className="inline-block px-3 py-1 bg-healthcare-100 text-healthcare-700 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              Welcome to Healthcare
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
              variants={itemVariants}
            >
              <span className="block">Expert Healthcare</span>
              <span className="block">
                For <span className="text-healthcare-600">Your Family</span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-xl"
              variants={itemVariants}
            >
              Experience top-quality medical services with a patient-centered approach. Our team of experts is dedicated to providing exceptional care for you and your loved ones.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              variants={itemVariants}
            >
              <Link to="/appointments">
                <Button 
                  size="lg" 
                  className="bg-healthcare-500 hover:bg-healthcare-600 transition-colors text-base"
                >
                  Book an Appointment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-healthcare-200 hover:bg-healthcare-50 text-gray-700 hover:text-healthcare-700 text-base"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-6"
              variants={itemVariants}
            >
              {featureItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {item.icon}
                  <span className="text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative hidden lg:block"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-healthcare-400 to-healthcare-600 opacity-50 blur-xl"
              animate={{ 
                boxShadow: ['0 0 20px 5px rgba(14, 165, 233, 0.3)', '0 0 30px 5px rgba(14, 165, 233, 0.5)', '0 0 20px 5px rgba(14, 165, 233, 0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="images/aa.jpg"
                alt="Doctor with patient"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
