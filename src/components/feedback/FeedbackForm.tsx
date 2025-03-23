
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface FeedbackFormProps {
  onSubmit?: (data: any) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    visitDate: '',
    doctor: '',
    department: '',
    recommendation: '',
    feedback: '',
    improvements: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  
  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };
  
  const handleStarHoverLeave = () => {
    setHoverRating(null);
  };
  
  const validateForm = () => {
    if (!formData.name || !formData.email || !rating) {
      toast({
        title: "Missing Required Fields",
        description: "Please provide your name, email, and rating before submitting.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Combine form data with rating
      const completeData = {
        ...formData,
        rating,
        submittedAt: new Date().toISOString(),
      };
      
      // Simulate API call
      console.log('Feedback data:', completeData);
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! Your opinion helps us improve our services.",
      });
      
      // Set success state
      setIsSuccess(true);
      
      if (onSubmit) {
        onSubmit(completeData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const departments = [
    'Cardiology', 'Pediatrics', 'Dermatology', 'Orthopedics', 'General Medicine',
    'Gynecology', 'Neurology', 'Psychiatry', 'Ophthalmology', 'Dental',
  ];
  
  const doctors = [
    'Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Williams', 'Dr. David Ouma',
    'Dr. John Kamau', 'Dr. Lisa Wong', 'Dr. Robert Smith', 'Other',
  ];
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      } 
    },
  };
  
  if (isSuccess) {
    return (
      <motion.div
        className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        variants={successVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been successfully submitted. We appreciate you taking the time to share your experience with us.
          </p>
          
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= (rating || 0)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button 
            className="bg-healthcare-500 hover:bg-healthcare-600"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                email: '',
                visitDate: '',
                doctor: '',
                department: '',
                recommendation: '',
                feedback: '',
                improvements: '',
              });
              setRating(null);
            }}
          >
            Submit Another Response
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-4 sm:p-6 border-b bg-healthcare-50">
          <h2 className="text-2xl font-semibold text-gray-900">Patient Feedback</h2>
          <p className="text-gray-600">We value your feedback. Please share your experience with us.</p>
        </div>
        
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <section>
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How would you rate your experience?</h3>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarHoverLeave}
                      className="p-1"
                    >
                      <Star
                        className={`w-10 h-10 transition-all duration-200 ${
                          star <= (hoverRating || rating || 0)
                            ? 'text-yellow-400 fill-yellow-400 scale-110'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              </div>
            </section>
            
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </section>
            
            {/* Visit Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitDate">Date of Visit</Label>
                  <Input
                    id="visitDate"
                    name="visitDate"
                    type="date"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department Visited</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange('department', value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor Seen</Label>
                  <Select
                    value={formData.doctor}
                    onValueChange={(value) => handleSelectChange('doctor', value)}
                  >
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc} value={doc}>
                          {doc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendation">Would you recommend us?</Label>
                  <RadioGroup
                    value={formData.recommendation}
                    onValueChange={(value) => handleSelectChange('recommendation', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="recommendation-yes" />
                      <Label htmlFor="recommendation-yes" className="font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="recommendation-no" />
                      <Label htmlFor="recommendation-no" className="font-normal">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="recommendation-maybe" />
                      <Label htmlFor="recommendation-maybe" className="font-normal">Maybe</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>
            
            {/* Detailed Feedback */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Feedback</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Please share your experience</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience at Avenue Healthcare"
                    className="resize-none h-24"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="improvements">How can we improve our services?</Label>
                  <Textarea
                    id="improvements"
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleInputChange}
                    placeholder="Please suggest any improvements we can make"
                    className="resize-none h-24"
                  />
                </div>
              </div>
            </section>
            
            {/* Submit Button */}
            <section>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-healthcare-500 hover:bg-healthcare-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </section>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
