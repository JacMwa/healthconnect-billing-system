
import { motion } from 'framer-motion';
import { Doctor } from '@/data/doctors';
import DoctorCard from './DoctorCard';
import { containerVariants, itemVariants } from './AnimationVariants';

interface DoctorGridProps {
  doctors: Doctor[];
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors }) => {
  console.log('DoctorGrid received doctors:', doctors.length);
  
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <motion.div key={doctor.id} variants={itemVariants}>
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500 text-lg">No doctors found matching your search criteria.</p>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorGrid;
