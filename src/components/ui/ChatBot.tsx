
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m the Avenue Healthcare virtual assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const botResponses: Record<string, string[]> = {
  appointment: [
    'You can book an appointment through our online booking system on the Appointments page.',
    'Would you like me to guide you to the appointments page?',
  ],
  billing: [
    'We accept various payment methods including M-Pesa, PayPal, Credit/Debit cards, and bank transfers.',
    'You can view and pay your bills on the Billing page.',
  ],
  doctor: [
    'Our hospital has specialists in various fields including cardiology, pediatrics, orthopedics, and more.',
    'You can view our doctors\' profiles on our website under the "Our Doctors" section.',
  ],
  service: [
    'We offer a wide range of services including general consultations, specialist care, diagnostics, vaccinations, and emergency services.',
    'You can find more details on our Services page.',
  ],
  emergency: [
    'For emergencies, please call our emergency hotline at 1-800-AVENUE or visit our emergency department immediately.',
    'Our emergency services are available 24/7.',
  ],
  insurance: [
    'We accept most major insurance providers. Please contact our billing department for specific insurance-related queries.',
    'You can check insurance coverage on our Billing page.',
  ],
  location: [
    'We are located at 123 Healthcare Avenue, Medical District, Nairobi, Kenya.',
    'You can find directions on our Contact page.',
  ],
  default: [
    'I\'m not sure I understand. Could you please rephrase your question?',
    'For more specific assistance, you may want to contact our customer service team directly.',
  ],
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = (userMessage: string): string[] => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('schedule')) {
      return botResponses.appointment;
    } else if (lowerCaseMessage.includes('bill') || lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('pay') || lowerCaseMessage.includes('mpesa') || lowerCaseMessage.includes('paypal')) {
      return botResponses.billing;
    } else if (lowerCaseMessage.includes('doctor') || lowerCaseMessage.includes('specialist') || lowerCaseMessage.includes('physician')) {
      return botResponses.doctor;
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('offering') || lowerCaseMessage.includes('provide')) {
      return botResponses.service;
    } else if (lowerCaseMessage.includes('emergency') || lowerCaseMessage.includes('urgent') || lowerCaseMessage.includes('immediate')) {
      return botResponses.emergency;
    } else if (lowerCaseMessage.includes('insurance') || lowerCaseMessage.includes('coverage')) {
      return botResponses.insurance;
    } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address') || lowerCaseMessage.includes('where')) {
      return botResponses.location;
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponses = generateBotResponse(newUserMessage.text);
      
      botResponses.forEach((response, index) => {
        setTimeout(() => {
          const newBotMessage: Message = {
            id: `bot-${Date.now() + index}`,
            text: response,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, newBotMessage]);
          
          if (index === botResponses.length - 1) {
            setIsTyping(false);
          }
        }, index * 1000); // Stagger bot responses for a more natural feel
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Chat bubble variants for animation
  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
  };

  // Chat window variants for animation
  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 200 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      transition: { 
        duration: 0.3 
      } 
    },
  };

  // Minimized chat window variants
  const minimizedChatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="bg-healthcare-500 text-white p-4 rounded-full shadow-lg hover:bg-healthcare-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleChat}
            />

            {/* Minimized Chat Header */}
            {isMinimized ? (
              <motion.div
                className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-between w-72"
                variants={minimizedChatVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center">
                  <div className="bg-healthcare-100 p-2 rounded-full">
                    <Bot className="w-5 h-5 text-healthcare-600" />
                  </div>
                  <p className="ml-2 font-medium">Chat with us</p>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={toggleMinimize}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-500" />
                  </button>
                  <button 
                    onClick={toggleChat}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white rounded-lg shadow-lg w-full max-w-sm md:w-96 h-[500px] max-h-[80vh] flex flex-col glass-strong"
                variants={chatWindowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Chat header */}
                <div className="p-4 border-b flex items-center justify-between bg-healthcare-500 text-white rounded-t-lg">
                  <div className="flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">Avenue Healthcare Assistant</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={toggleMinimize}
                      className="p-1 rounded-full hover:bg-healthcare-400/50 transition-colors"
                      aria-label="Minimize chat"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={toggleChat}
                      className="p-1 rounded-full hover:bg-healthcare-400/50 transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={chatBubbleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className={`mb-3 flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg py-2 px-4 max-w-[80%] ${
                            message.sender === 'user'
                              ? 'bg-healthcare-500 text-white'
                              : 'bg-white border border-gray-200 text-gray-700'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Bot typing indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex items-center space-x-1 mt-2 ml-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="p-3 border-t flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-healthcare-500 hover:bg-healthcare-600 transition-colors"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
