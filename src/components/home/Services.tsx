
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Users, Microscope, Syringe, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const services = [
    {
      id: 'general-consultation',
      icon: <Stethoscope className="w-8 h-8 text-healthcare-500" />,
      title: 'General Consultation',
      description: 'Comprehensive medical consultations with our experienced general practitioners.'
    },
    {
      id: 'specialist-care',
      icon: <Users className="w-8 h-8 text-healthcare-500" />,
      title: 'Specialist Care',
      description: 'Access to a wide range of specialist consultations across various medical fields.'
    },
    {
      id: 'diagnostics',
      icon: <Microscope className="w-8 h-8 text-healthcare-500" />,
      title: 'Diagnostics & Laboratory',
      description: 'State-of-the-art diagnostic services and laboratory tests for accurate diagnosis.'
    },
    {
      id: 'vaccination',
      icon: <Syringe className="w-8 h-8 text-healthcare-500" />,
      title: 'Vaccination Services',
      description: 'Complete range of vaccinations for children and adults as per international guidelines.'
    },
    {
      id: 'preventive',
      icon: <Heart className="w-8 h-8 text-healthcare-500" />,
      title: 'Preventive Health',
      description: 'Comprehensive health check-ups and preventive care services for early detection.'
    },
    {
      id: 'emergency',
      icon: <Activity className="w-8 h-8 text-healthcare-500" />,
      title: 'Emergency Services',
      description: '24/7 emergency medical services with quick response and expert care.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
          <p className="text-xl text-gray-600">
            We provide a wide range of medical services to meet all your healthcare needs with excellence and compassion.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-healthcare-100 card-hover"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-healthcare-50">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={`/services#${service.id}`} 
                className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 font-medium"
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
