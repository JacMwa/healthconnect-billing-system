
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/data/doctors';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group h-full"
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
    </div>
  );
};

export default DoctorCard;
