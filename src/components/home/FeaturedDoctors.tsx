
import { useState } from 'react';
import { doctors } from '@/data/doctors';
import SearchBar from './doctors/SearchBar';
import DoctorGrid from './doctors/DoctorGrid';
import ViewAllButton from './doctors/ViewAllButton';

const FeaturedDoctors = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display only the first 4 doctors initially, show all when showAll is true
  const displayedDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="py-16 md:py-24 bg-healthcare-50" id="doctors">
      <div className="container mx-auto px-4 md:px-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <DoctorGrid doctors={displayedDoctors} />
        <ViewAllButton 
          showAll={showAll} 
          toggleShowAll={toggleShowAll} 
          shouldShow={filteredDoctors.length > 4} 
        />
      </div>
    </section>
  );
};

export default FeaturedDoctors;
