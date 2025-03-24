
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  education: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '15 years',
    education: 'MBBS, MD (Cardiology)',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '12 years',
    education: 'MBBS, MD (Pediatrics)',
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '10 years',
    education: 'MBBS, MD (Dermatology)',
  },
  {
    id: 4,
    name: 'Dr. David Ouma',
    specialty: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '14 years',
    education: 'MBBS, MS (Orthopedics)',
  },
  // Additional doctors (hidden by default)
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialty: 'Neurology',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '16 years',
    education: 'MBBS, MD (Neurology)',
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    specialty: 'Oncology',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '18 years',
    education: 'MBBS, MD (Oncology)',
  },
  {
    id: 7,
    name: 'Dr. Sofia Rodriguez',
    specialty: 'Gynecology',
    image: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '11 years',
    education: 'MBBS, MD (Gynecology)',
  },
  {
    id: 8,
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatry',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '13 years',
    education: 'MBBS, MD (Psychiatry)',
  },
  {
    id: 9,
    name: 'Dr. Lisa Thompson',
    specialty: 'Ophthalmology',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '9 years',
    education: 'MBBS, MS (Ophthalmology)',
  },
  {
    id: 10,
    name: 'Dr. Mohammed Al-Farsi',
    specialty: 'Endocrinology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '14 years',
    education: 'MBBS, MD (Endocrinology)',
  },
  {
    id: 11,
    name: 'Dr. Jennifer Lee',
    specialty: 'Rheumatology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '12 years',
    education: 'MBBS, MD (Rheumatology)',
  },
  {
    id: 12,
    name: 'Dr. Carlos Mendez',
    specialty: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '15 years',
    education: 'MBBS, MD (Gastroenterology)',
  },
  {
    id: 13,
    name: 'Dr. Nina Patel',
    specialty: 'Pulmonology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '11 years',
    education: 'MBBS, MD (Pulmonology)',
  },
  {
    id: 14,
    name: 'Dr. Kevin Johnson',
    specialty: 'Urology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '13 years',
    education: 'MBBS, MS (Urology)',
  },
  {
    id: 15,
    name: 'Dr. Olivia Nguyen',
    specialty: 'Hematology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '10 years',
    education: 'MBBS, MD (Hematology)',
  },
  {
    id: 16,
    name: 'Dr. Richard Clark',
    specialty: 'Nephrology',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '16 years',
    education: 'MBBS, MD (Nephrology)',
  },
  {
    id: 17,
    name: 'Dr. Aisha Mohammad',
    specialty: 'Immunology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '14 years',
    education: 'MBBS, MD (Immunology)',
  },
  {
    id: 18,
    name: 'Dr. Daniel Taylor',
    specialty: 'Infectious Disease',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    experience: '15 years',
    education: 'MBBS, MD (Infectious Disease)',
  },
];
