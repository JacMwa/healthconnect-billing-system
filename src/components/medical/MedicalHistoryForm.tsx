import React, { useState } from "react";

interface MedicalHistoryData {
  name: string;
  age: string;
  gender: string;
  allergies: string;
  medications: string;
  pastIllnesses: string;
  surgeries: string;
  familyHistory: string;
}

const initialFormState: MedicalHistoryData = {
  name: "",
  age: "",
  gender: "",
  allergies: "",
  medications: "",
  pastIllnesses: "",
  surgeries: "",
  familyHistory: "",
};

const MedicalHistoryForm: React.FC = () => {
  const [formData, setFormData] = useState<MedicalHistoryData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can send formData to your backend or API
    // Reset form if needed: setFormData(initialFormState);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Medical History Form</h2>
      {submitted ? (
        <div className="text-green-600 mb-4">Form submitted successfully!</div>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="List any allergies"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Current Medications</label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="List any medications"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Past Illnesses</label>
          <textarea
            name="pastIllnesses"
            value={formData.pastIllnesses}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="List any past illnesses"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Surgeries</label>
          <textarea
            name="surgeries"
            value={formData.surgeries}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="List any surgeries"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Family Medical History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="E.g. diabetes, hypertension"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;

