
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';

const FeaturedDoctors = () => {
  const [showAll, setShowAll] = useState(false);

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

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '15 years',
      education: 'MBBS, MD (Cardiology)',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '12 years',
      education: 'MBBS, MD (Pediatrics)',
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Dermatology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '10 years',
      education: 'MBBS, MD (Dermatology)',
    },
    {
      id: 4,
      name: 'Dr. David Ouma',
      specialty: 'Orthopedics',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '14 years',
      education: 'MBBS, MS (Orthopedics)',
    },
    // Additional doctors (hidden by default)
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      specialty: 'Neurology',
      image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '16 years',
      education: 'MBBS, MD (Neurology)',
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'Oncology',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '18 years',
      education: 'MBBS, MD (Oncology)',
    },
    {
      id: 7,
      name: 'Dr. Sofia Rodriguez',
      specialty: 'Gynecology',
      image: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '11 years',
      education: 'MBBS, MD (Gynecology)',
    },
    {
      id: 8,
      name: 'Dr. Robert Kim',
      specialty: 'Psychiatry',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '13 years',
      education: 'MBBS, MD (Psychiatry)',
    },
    {
      id: 9,
      name: 'Dr. Lisa Thompson',
      specialty: 'Ophthalmology',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '9 years',
      education: 'MBBS, MS (Ophthalmology)',
    },
    {
      id: 10,
      name: 'Dr. Mohammed Al-Farsi',
      specialty: 'Endocrinology',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '14 years',
      education: 'MBBS, MD (Endocrinology)',
    },
    {
      id: 11,
      name: 'Dr. Jennifer Lee',
      specialty: 'Rheumatology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '12 years',
      education: 'MBBS, MD (Rheumatology)',
    },
    {
      id: 12,
      name: 'Dr. Carlos Mendez',
      specialty: 'Gastroenterology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '15 years',
      education: 'MBBS, MD (Gastroenterology)',
    },
    {
      id: 13,
      name: 'Dr. Nina Patel',
      specialty: 'Pulmonology',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '11 years',
      education: 'MBBS, MD (Pulmonology)',
    },
    {
      id: 14,
      name: 'Dr. Kevin Johnson',
      specialty: 'Urology',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '13 years',
      education: 'MBBS, MS (Urology)',
    },
    {
      id: 15,
      name: 'Dr. Olivia Nguyen',
      specialty: 'Hematology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '10 years',
      education: 'MBBS, MD (Hematology)',
    },
    {
      id: 16,
      name: 'Dr. Richard Clark',
      specialty: 'Nephrology',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '16 years',
      education: 'MBBS, MD (Nephrology)',
    },
    {
      id: 17,
      name: 'Dr. Aisha Mohammad',
      specialty: 'Immunology',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '14 years',
      education: 'MBBS, MD (Immunology)',
    },
    {
      id: 18,
      name: 'Dr. Daniel Taylor',
      specialty: 'Infectious Disease',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      experience: '15 years',
      education: 'MBBS, MD (Infectious Disease)',
    },
  ];

  // Display only the first 4 doctors initially, show all when showAll is true
  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="py-16 md:py-24 bg-healthcare-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Specialists</h2>
          <p className="text-xl text-gray-600">
            Our team of experienced doctors is dedicated to providing the highest quality of care to all our patients.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{doctor.specialty}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-gray-500 mb-3">{doctor.education}</p>
                <p className="text-gray-600 mb-4">Experience: {doctor.experience}</p>
                <Link to="/appointments">
                  <Button 
                    className="w-full bg-healthcare-500 hover:bg-healthcare-600"
                    size="sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button
            onClick={toggleShowAll}
            variant="outline"
            className="inline-flex items-center gap-2 border-healthcare-500 text-healthcare-600 hover:bg-healthcare-50"
          >
            {showAll ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View All Doctors <ChevronDown className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
