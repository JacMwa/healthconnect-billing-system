
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Appointments", path: "/appointments" },
        { name: "Billing", path: "/billing" },
        { name: "Medical History", path: "/medical-history" },
        { name: "Feedback", path: "/feedback" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "General Consultation", path: "/services#general-consultation" },
        { name: "Specialist Care", path: "/services#specialist-care" },
        { name: "Diagnostics & Laboratory", path: "/services#diagnostics" },
        { name: "Vaccination Services", path: "/services#vaccination" },
        { name: "Preventive Health", path: "/services#preventive" },
        { name: "Emergency Services", path: "/services#emergency" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Doctors", path: "/#doctors" },
        { name: "Testimonials", path: "/#testimonials" },
      ],
    },
  ];

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
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Sitemap</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path} 
                          className="text-healthcare-600 hover:text-healthcare-700 hover:underline transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
