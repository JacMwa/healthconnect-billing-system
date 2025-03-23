
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import PageTransition from '@/components/layout/PageTransition';
import ChatBot from '@/components/ui/ChatBot';

const Appointments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <PageTransition>
        <div className="bg-gradient-to-b from-healthcare-50 to-transparent py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
                <p className="text-xl text-gray-600">
                  Schedule an appointment with our healthcare professionals for quality medical care.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AppointmentForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Appointment Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-healthcare-50 rounded-lg">
                  <Clock className="w-10 h-10 text-healthcare-500 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Working Hours</h3>
                  <ul className="text-center text-gray-600 space-y-1">
                    <li>Monday to Friday: 8:00 AM - 8:00 PM</li>
                    <li>Saturday: 9:00 AM - 6:00 PM</li>
                    <li>Sunday: 10:00 AM - 4:00 PM</li>
                  </ul>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-healthcare-50 rounded-lg">
                  <Calendar className="w-10 h-10 text-healthcare-500 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Policy</h3>
                  <ul className="text-center text-gray-600 space-y-1">
                    <li>Please arrive 15 minutes early</li>
                    <li>Bring your medical records</li>
                    <li>Reschedule 24 hours in advance</li>
                  </ul>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-healthcare-50 rounded-lg">
                  <MapPin className="w-10 h-10 text-healthcare-500 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Our Location</h3>
                  <address className="text-center text-gray-600 not-italic">
                    123 Healthcare Avenue,<br />
                    Medical District,<br />
                    Nairobi, Kenya
                  </address>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Appointments;
