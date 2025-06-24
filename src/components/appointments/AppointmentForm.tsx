
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, FileText, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const specialists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Dermatology' },
  { id: 4, name: 'Dr. David Ouma', specialty: 'Orthopedics' },
  { id: 5, name: 'Dr. John Kamau', specialty: 'General Medicine' },
  { id: 6, name: 'Dr. Lisa Wong', specialty: 'Gynecology' },
  { id: 7, name: 'Dr. Robert Smith', specialty: 'Neurology' },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

const departments = [
  'Cardiology', 'Pediatrics', 'Dermatology', 'Orthopedics', 'General Medicine',
  'Gynecology', 'Neurology', 'Psychiatry', 'Ophthalmology', 'Dental',
];

interface AppointmentFormProps {
  onAppointmentBooked?: (appointmentData: any) => void;
}

const AppointmentForm = ({ onAppointmentBooked }: AppointmentFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    department: '',
    specialist: '',
    reason: '',
    isNewPatient: 'no',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateStep1 = () => {
    if (!formData.department || !formData.specialist || !formData.reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleStepNavigation = (step: number) => {
    if (step > currentStep) {
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !validateStep2()) return;
    }
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsSubmitting(true);
    
    // Create appointment data
    const appointmentData = {
      ...formData,
      appointmentDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      appointmentTime: selectedTime,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Simulate API call
    try {
      // In a real app, you would send this data to your backend
      console.log('Appointment data:', appointmentData);
      
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been scheduled for ${format(selectedDate!, 'MMMM dd, yyyy')} at ${selectedTime}`,
      });
      
      if (onAppointmentBooked) {
        onAppointmentBooked(appointmentData);
      }
      
      // Navigate to billing page for payment
      navigate('/billing', { 
        state: { 
          appointmentData,
          fromAppointment: true
        } 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get next 14 days for the calendar
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = getDates();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Progress steps */}
        <div className="p-4 sm:p-6 border-b bg-gray-50">
          <div className="flex justify-between relative">
            <div className="w-full absolute top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`relative z-10 flex flex-col items-center ${
                  step < currentStep ? 'cursor-pointer' : ''
                }`}
                onClick={() => step < currentStep && handleStepNavigation(step)}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step === currentStep
                      ? "bg-healthcare-500 text-white"
                      : step < currentStep
                      ? "bg-healthcare-700 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                <div className="mt-2 text-xs font-medium text-center">
                  {step === 1 && "Service"}
                  {step === 2 && "Schedule"}
                  {step === 3 && "Details"}
                  {step === 4 && "Confirm"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Select Service</h2>
                  <p className="text-gray-600 mb-6">Choose the department and specialist for your appointment</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.department} 
                        onValueChange={(value) => handleSelectChange('department', value)}
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="specialist">Specialist <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.specialist} 
                        onValueChange={(value) => handleSelectChange('specialist', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialist" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialists.map((specialist) => (
                            <SelectItem key={specialist.id} value={specialist.name}>
                              {specialist.name} - {specialist.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        placeholder="Please describe your symptoms or reason for the appointment"
                        className="resize-none h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="isNewPatient">Are you a new patient?</Label>
                      <Select 
                        value={formData.isNewPatient} 
                        onValueChange={(value) => handleSelectChange('isNewPatient', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => validateStep1() && nextStep()}
                    className="bg-healthcare-500 hover:bg-healthcare-600"
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date and Time Selection */}
            {currentStep === 2 && (
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Select Date & Time</h2>
                  <p className="text-gray-600 mb-6">Choose your preferred appointment date and time</p>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Select Date <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                        {availableDates.map((date) => (
                          <Button
                            key={date.toISOString()}
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-auto py-2 px-1 flex flex-col items-center justify-center border",
                              selectedDate && date.toDateString() === selectedDate.toDateString()
                                ? "bg-healthcare-100 border-healthcare-500 text-healthcare-700"
                                : "hover:bg-gray-50"
                            )}
                            onClick={() => handleDateSelect(date)}
                          >
                            <span className="text-xs font-normal">
                              {format(date, 'EEE')}
                            </span>
                            <span className="text-lg font-medium">
                              {format(date, 'd')}
                            </span>
                            <span className="text-xs font-normal">
                              {format(date, 'MMM')}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label className="mb-3 block">Select Time <span className="text-red-500">*</span></Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant="outline"
                              className={cn(
                                "h-auto py-2",
                                selectedTime === time
                                  ? "bg-healthcare-100 border-healthcare-500 text-healthcare-700"
                                  : "hover:bg-gray-50"
                              )}
                              onClick={() => handleTimeSelect(time)}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => validateStep2() && nextStep()}
                    className="bg-healthcare-500 hover:bg-healthcare-600"
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Your Details</h2>
                  <p className="text-gray-600 mb-6">Please provide your contact information</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => validateStep3() && nextStep()}
                    className="bg-healthcare-500 hover:bg-healthcare-600"
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Confirm Appointment</h2>
                  <p className="text-gray-600 mb-6">Please review your appointment details before confirming</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
                    <div className="flex items-start border-b border-gray-200 pb-3">
                      <User className="w-5 h-5 text-healthcare-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Patient Name</div>
                        <div className="font-medium">{formData.firstName} {formData.lastName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start border-b border-gray-200 pb-3">
                      <Calendar className="w-5 h-5 text-healthcare-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Appointment Date & Time</div>
                        <div className="font-medium">
                          {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Not selected'} at {selectedTime || 'Not selected'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start border-b border-gray-200 pb-3">
                      <FileText className="w-5 h-5 text-healthcare-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Service Details</div>
                        <div className="font-medium">{formData.department}</div>
                        <div>{formData.specialist}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start border-b border-gray-200 pb-3">
                      <Mail className="w-5 h-5 text-healthcare-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Contact Information</div>
                        <div>{formData.email}</div>
                        <div>{formData.phone}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> After confirming your appointment, you will be redirected to the payment page. Payment is required to complete your booking.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-healthcare-500 hover:bg-healthcare-600"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentForm;