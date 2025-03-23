
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Smartphone, Building2, Info, AlertCircle, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface PaymentFormProps {
  onPaymentSuccess?: (data: any) => void;
}

interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
}

const generateInvoice = (appointmentData: any) => {
  const items: InvoiceItem[] = [
    {
      id: '1',
      description: `Appointment with ${appointmentData?.specialist || 'Specialist'}`,
      amount: 2500,
    },
  ];
  
  // Add registration fee for new patients
  if (appointmentData?.isNewPatient === 'yes') {
    items.push({
      id: '2',
      description: 'New Patient Registration',
      amount: 500,
    });
  }
  
  // Calculate total
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + tax;
  
  return {
    items,
    subtotal,
    tax,
    total,
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`,
    date: new Date(),
  };
};

const PaymentForm = ({ onPaymentSuccess }: PaymentFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const [formData, setFormData] = useState({
    // Card payment fields
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    
    // M-Pesa fields
    phoneNumber: '',
    
    // Bank transfer fields
    accountName: '',
    bankName: '',
    transactionRef: '',
  });
  
  const { appointmentData } = location.state || {};
  
  useEffect(() => {
    // Generate invoice if appointment data is available
    if (appointmentData) {
      const generatedInvoice = generateInvoice(appointmentData);
      setInvoice(generatedInvoice);
    } else {
      // If no appointment data, create a default invoice
      const defaultInvoice = {
        items: [
          {
            id: '1',
            description: 'Medical Consultation',
            amount: 2500,
          }
        ],
        subtotal: 2500,
        tax: 400,
        total: 2900,
        invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`,
        date: new Date(),
      };
      setInvoice(defaultInvoice);
    }
  }, [appointmentData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all required card details",
          variant: "destructive",
        });
        return false;
      }
    } else if (paymentMethod === 'mpesa') {
      if (!formData.phoneNumber) {
        toast({
          title: "Missing information",
          description: "Please enter your phone number",
          variant: "destructive",
        });
        return false;
      }
    } else if (paymentMethod === 'bank') {
      if (!formData.accountName || !formData.bankName || !formData.transactionRef) {
        toast({
          title: "Missing information",
          description: "Please fill in all required bank transfer details",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Create payment data
    const paymentData = {
      method: paymentMethod,
      amount: invoice.total,
      currency: 'KES',
      invoiceNumber: invoice.invoiceNumber,
      formData,
      timestamp: new Date().toISOString(),
    };
    
    try {
      // Simulate API call
      console.log('Payment data:', paymentData);
      
      // Simulate delay for processing payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you'd get the transaction ID from the payment processor
      const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Show success message
      toast({
        title: "Payment Successful!",
        description: `Your payment of KES ${invoice.total.toFixed(2)} has been processed successfully.`,
      });
      
      // Set success state to show confirmation
      setIsSuccess(true);
      
      // Simulate delay before showing invoice
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            ...paymentData,
            transactionId,
            status: 'completed',
          });
        }
      }, 1500);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
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
        className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        variants={successVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-6 text-center bg-green-50 border-b border-green-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Invoice Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Invoice Number:</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{format(invoice.date, 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">{formatCurrency(invoice.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === 'card' && 'Credit/Debit Card'}
                  {paymentMethod === 'mpesa' && 'M-Pesa'}
                  {paymentMethod === 'bank' && 'Bank Transfer'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">What's Next?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>An email confirmation has been sent to your registered email address.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>You can view your appointment details and invoice in your account dashboard.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Please arrive 15 minutes before your scheduled appointment time.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="border-healthcare-200 hover:bg-healthcare-50 text-gray-700"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button
              className="bg-healthcare-500 hover:bg-healthcare-600"
              onClick={() => {
                // In a real application, you would generate a PDF invoice
                toast({
                  title: "Invoice Downloaded",
                  description: "Your invoice has been downloaded successfully.",
                });
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-4 sm:p-6 border-b bg-healthcare-50">
          <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>
          <p className="text-gray-600">Complete your payment to confirm your appointment</p>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left column: Invoice summary */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Invoice Summary</h3>
                
                {invoice && (
                  <>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Invoice Number:</span>
                        <span>{invoice.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span>{format(invoice.date, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                      <ul className="space-y-2 mb-4">
                        {invoice.items.map((item: InvoiceItem) => (
                          <li key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-800">{item.description}</span>
                            <span>{formatCurrency(item.amount)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>{formatCurrency(invoice.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">VAT (16%):</span>
                        <span>{formatCurrency(invoice.tax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base pt-2">
                        <span>Total:</span>
                        <span className="text-healthcare-700">{formatCurrency(invoice.total)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex gap-2">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Payment Note</p>
                    <p>Payment is required to confirm your appointment. Your slot will be reserved for 30 minutes to complete the payment.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column: Payment form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value)}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card" className="flex items-center justify-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="mpesa" className="flex items-center justify-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      M-Pesa
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex items-center justify-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Bank
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder">Cardholder Name</Label>
                      <Input
                        id="cardHolder"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          type="password"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mpesa" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 254712345678"
                      />
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">M-Pesa Payment Instructions</p>
                          <ol className="list-decimal ml-4 space-y-1">
                            <li>Enter your M-Pesa registered phone number above.</li>
                            <li>Click on the "Pay Now" button.</li>
                            <li>You will receive a prompt on your phone to enter your M-Pesa PIN.</li>
                            <li>Enter your PIN to complete the payment.</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <div className="flex gap-2">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Bank Transfer Details</p>
                          <p className="mb-2">Please make a transfer to the following account:</p>
                          <div className="space-y-1">
                            <p><span className="font-medium">Bank Name:</span> Avenue Healthcare Bank</p>
                            <p><span className="font-medium">Account Name:</span> Avenue Healthcare Ltd</p>
                            <p><span className="font-medium">Account Number:</span> 1234567890</p>
                            <p><span className="font-medium">Branch:</span> Main Branch</p>
                            <p><span className="font-medium">Reference:</span> {invoice?.invoiceNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Holder Name</Label>
                      <Input
                        id="accountName"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleInputChange}
                        placeholder="Enter the name on your account"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="Enter your bank name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transactionRef">Transaction Reference</Label>
                      <Input
                        id="transactionRef"
                        name="transactionRef"
                        value={formData.transactionRef}
                        onChange={handleInputChange}
                        placeholder="Enter the transaction reference/number"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <RadioGroup defaultValue="agree" className="mb-4">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="agree" id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the <a href="#" className="text-healthcare-600 hover:underline">terms and conditions</a> and <a href="#" className="text-healthcare-600 hover:underline">privacy policy</a>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <Button
                    type="submit"
                    className="w-full bg-healthcare-500 hover:bg-healthcare-600 text-lg py-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay ${invoice ? formatCurrency(invoice.total) : ''}`}
                    {!isProcessing && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
