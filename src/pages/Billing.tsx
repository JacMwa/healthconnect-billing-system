
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import PaymentForm from '@/components/billing/PaymentForm';
import ChatBot from '@/components/ui/ChatBot';

const Billing = () => {
  const location = useLocation();
  const { appointmentData, fromAppointment } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <PageTransition>
        <div className="bg-gradient-to-b from-healthcare-50 to-transparent py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {fromAppointment ? 'Complete Your Payment' : 'Billing & Payments'}
              </h1>
              <p className="text-xl text-gray-600">
                {fromAppointment 
                  ? 'Please complete your payment to confirm your appointment booking.'
                  : 'Manage your medical bills and make payments securely.'}
              </p>
            </div>

            <PaymentForm />
          </div>
        </div>
      </PageTransition>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Billing;
