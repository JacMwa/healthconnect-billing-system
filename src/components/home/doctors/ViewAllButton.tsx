
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViewAllButtonProps {
  showAll: boolean;
  toggleShowAll: () => void;
  shouldShow: boolean;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ showAll, toggleShowAll, shouldShow }) => {
  if (!shouldShow) return null;
  
  return (
    <motion.div 
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
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
    </motion.div>
  );
};

export default ViewAllButton;
