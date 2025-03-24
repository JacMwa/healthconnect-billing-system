
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Avenue Healthcare. These Terms of Service govern your use of our website and services. 
                  By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Eligibility</h2>
                <p className="text-gray-600 mb-4">
                  Our services are available to anyone who is at least 18 years of age and capable of forming a binding contract. 
                  If you are accessing our services on behalf of a business entity, you represent that you have the authority to bind such entity.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide accurate and complete information. 
                  You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Healthcare Services</h2>
                <p className="text-gray-600 mb-4">
                  Our platform connects you with healthcare providers. However, the information provided on our website is not a substitute for professional medical advice. 
                  Always consult with a qualified healthcare provider for medical concerns.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  We strive to provide reliable information and services, but we do not guarantee accuracy or availability. 
                  We are not liable for any damages resulting from your use of our services or inability to access them.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
