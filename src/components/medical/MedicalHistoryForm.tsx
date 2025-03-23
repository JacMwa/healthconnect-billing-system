
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, AlertCircle, X, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface MedicalHistoryFormProps {
  onSave?: (data: any) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

const MedicalHistoryForm = ({ onSave }: MedicalHistoryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    
    // Contact Information
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Medical Information
    allergies: '',
    currentMedications: '',
    pastSurgeries: '',
    chronicConditions: '',
    familyHistory: '',
    
    // Lifestyle Information
    smoker: false,
    alcohol: '',
    exercise: '',
    diet: '',
    
    // Checkboxes for conditions
    conditions: [] as string[],
  });
  
  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Cancer',
    'Arthritis',
    'Kidney Disease',
    'Liver Disease',
    'Thyroid Disorder',
    'Mental Health Condition',
    'Stroke',
    'Epilepsy',
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };
  
  const handleConditionChange = (condition: string, checked: boolean) => {
    setFormData({
      ...formData,
      conditions: checked
        ? [...formData.conditions, condition]
        : formData.conditions.filter(c => c !== condition),
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Process each selected file
    Array.from(files).forEach(file => {
      // Create a new file record
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading',
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload progress
      simulateFileUpload(newFile.id, file);
    });
    
    // Reset the file input
    e.target.value = '';
  };
  
  const simulateFileUpload = (fileId: string, file: File) => {
    let progress = 0;
    
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    
    // Simulate upload progress with intervals
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update file status to completed after a delay
        setTimeout(() => {
          setUploadedFiles(prevFiles =>
            prevFiles.map(f =>
              f.id === fileId
                ? { ...f, progress: 100, status: 'completed', url: fileUrl }
                : f
            )
          );
        }, 500);
      }
      
      // Update progress
      setUploadedFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
        )
      );
    }, 300);
  };
  
  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };
  
  const validateForm = () => {
    const requiredFields = ['fullName', 'dateOfBirth', 'gender', 'email', 'phone'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields before submitting.",
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
    
    setIsSubmitting(true);
    
    try {
      // Combine form data with uploaded files
      const completeData = {
        ...formData,
        uploadedFiles: uploadedFiles
          .filter(file => file.status === 'completed')
          .map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.url,
          })),
        submittedAt: new Date().toISOString(),
      };
      
      // Simulate API call
      console.log('Medical history data:', completeData);
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Medical History Saved",
        description: "Your medical history has been successfully saved.",
      });
      
      if (onSave) {
        onSave(completeData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your medical history. Please try again.",
        variant: "destructive",
      });
      console.error('Error saving medical history:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-4 sm:p-6 border-b bg-healthcare-50">
          <h2 className="text-2xl font-semibold text-gray-900">Medical History Form</h2>
          <p className="text-gray-600">Please provide your medical information to help us provide better care</p>
        </div>
        
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleSelectChange('bloodType', value)}
                  >
                    <SelectTrigger id="bloodType">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Enter height in cm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter weight in kg"
                  />
                </div>
              </div>
            </section>
            
            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
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
                
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Name of emergency contact"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Phone number of emergency contact"
                  />
                </div>
              </div>
            </section>
            
            {/* Medical Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="List any allergies (medications, food, environmental)"
                    className="resize-none h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentMedications">Current Medications</Label>
                  <Textarea
                    id="currentMedications"
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    placeholder="List any medications you are currently taking, including dosage"
                    className="resize-none h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pastSurgeries">Past Surgeries</Label>
                  <Textarea
                    id="pastSurgeries"
                    name="pastSurgeries"
                    value={formData.pastSurgeries}
                    onChange={handleInputChange}
                    placeholder="List any previous surgeries and approximate dates"
                    className="resize-none h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                  <Textarea
                    id="chronicConditions"
                    name="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={handleInputChange}
                    placeholder="Describe any chronic conditions you have"
                    className="resize-none h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Family Medical History</Label>
                  <Textarea
                    id="familyHistory"
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleInputChange}
                    placeholder="Describe any significant family medical history"
                    className="resize-none h-20"
                  />
                </div>
              </div>
            </section>
            
            {/* Medical Conditions */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Conditions</h3>
              <p className="text-gray-600 mb-3">Select any conditions that you have been diagnosed with:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {medicalConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={formData.conditions.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleConditionChange(condition, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`condition-${condition}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Lifestyle Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smoker">Do you smoke?</Label>
                    <Switch
                      id="smoker"
                      checked={formData.smoker}
                      onCheckedChange={(checked) => handleSwitchChange('smoker', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alcohol">Alcohol Consumption</Label>
                  <Select
                    value={formData.alcohol}
                    onValueChange={(value) => handleSelectChange('alcohol', value)}
                  >
                    <SelectTrigger id="alcohol">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exercise">Exercise Frequency</Label>
                  <Select
                    value={formData.exercise}
                    onValueChange={(value) => handleSelectChange('exercise', value)}
                  >
                    <SelectTrigger id="exercise">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="occasionally">1-2 times per week</SelectItem>
                      <SelectItem value="regularly">3-4 times per week</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="diet">Diet</Label>
                  <Select
                    value={formData.diet}
                    onValueChange={(value) => handleSelectChange('diet', value)}
                  >
                    <SelectTrigger id="diet">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>
            
            {/* File Upload */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Records Upload</h3>
              <p className="text-gray-600 mb-4">Upload any relevant medical records, test results, or previous diagnosis documents.</p>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop files here</p>
                  <p className="text-sm text-gray-500 mb-3">or click to browse files</p>
                  <Button type="button" variant="outline" className="border-healthcare-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                </label>
                <p className="mt-3 text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (max 10MB per file)
                </p>
              </div>
              
              {/* File list */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="font-medium text-gray-900">Uploaded Files</p>
                  <ul className="divide-y divide-gray-100 border rounded-lg">
                    {uploadedFiles.map((file) => (
                      <li key={file.id} className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          {file.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : file.status === 'error' ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)} • {file.status === 'completed' ? 'Uploaded' : file.status === 'error' ? 'Failed' : `Uploading ${Math.round(file.progress)}%`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {file.status === 'uploading' && (
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-3">
                              <div
                                className="h-full bg-healthcare-500 rounded-full"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                          
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            
            {/* Submission */}
            <section>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Important Notice</p>
                    <p>
                      The information provided in this form will be kept confidential and used only for medical purposes. 
                      By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-healthcare-500 hover:bg-healthcare-600 min-w-32"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Medical History'}
                </Button>
              </div>
            </section>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalHistoryForm;
