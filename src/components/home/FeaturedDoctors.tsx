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
        name: 'Dr.Allan Thiongo',
        image: 'images/doc1.jpg',
        experience: '15 years',
        education: 'MBBS, MD (Surgery)',
      },
      {
        id: 2,
        name: 'Dr. Andrew 	Romell',
        specialty: 'Cardiology',
        image: 'images/doctor-thumb-06.jpg',
        experience: '12 years',
        education: 'MBBS, MD (Cardiologist)',
      },
      {
        id: 3,
        name: 'Dr. Jackline 	Matindi',
        specialty: 'Neurologist',
        image: 'images/doctor-thumb-07.jpg',
        experience: '10 years',
        education: 'MBBS, MD (Neurology)',
      },
      {
        id: 4,
        name: 'Dr. Fatuma 	Onyango',
        specialty: 'Pediatrician',
        image: 'images/doctor-thumb-08.jpg',
        experience: '14 years',
        education: 'MBBS, MS (Pediatrician)',
      },
      // Additional doctors (hidden by default)
      { id: 5,
        name: 'Dr. Patrick 	Wekesa',
        specialty: 'Orthopedist',
       
        image: 'images/doc02.jpg',
        experience: '13 years',
        education: 'MBBS, MS (Orthopedist)',
    },
    {   id: 6,
        name: 'Dr.Lilian 	Koech',
        specialty: 'Gynecologist',
        image: 'images/doctor-thumb-10.jpg',
        experience: '15 years',
        education: 'MBBS, MS (Gynecologist)',
    },
    {   id: 7,
        name: 'Dr. Moses 	Muriithi',
        specialty: 'Endocrinologist',
        image: 'images/doctor-thumb-11.jpg',
        experience: '18 years',
        education: 'MBBS, MS (Endocrinologist)',
    },
    {   id: 8,
        name: 'Dr. Beatrice 	Chepkwon',
        specialty: 'Internist',
      
        image: 'images/fdoc4.jpg',
        experience: '11 years',
        education: 'MBBS, MS (internist)',
      },
      {   id: 9,
          name: 'Dr. Daniel 	Karanja',
          specialty: 'Cardiologist',
          
          image: 'images/doc04.jpg',
          experience: '14 years',
          education: 'MBBS, MS (Cardiologist)',
      },
      {   id: 10,
          name: 'Dr. Hellen 	Muthoni',
          specialty: 'Neurologist',
          
          image: 'images/fdoc5.jpg',
          experience: '17 years',
          education: 'MBBS, MS (Neurologist)',
      },
      {   id: 11,
          name: 'Dr. Joseph 	Kiptoo',
          specialty: 'Urologist',
          
          image: 'images/doc05.jpeg',
          experience: '18 years',
          education: 'MBBS, MS (Urologist)',
      },
      {   id: 12,
          name: 'Dr. Caroline 	Nyambura',
          specialty: 'Dermatologist',
          image: 'images/fdoc7.jpeg',
          experience: '16 years',
          education: 'MBBS, MS (Dermatology)',
      
  }  ];

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
