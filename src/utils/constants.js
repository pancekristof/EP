import { Heart, Eye, Stethoscope } from 'lucide-react';

export const STATIONS = [
  { 
    id: 'urology', 
    name: 'Urológia', 
    icon: Heart, 
    color: 'bg-blue-500' 
  },
  { 
    id: 'eye', 
    name: 'Szemészet', 
    icon: Eye, 
    color: 'bg-green-500' 
  },
  { 
    id: 'skincare', 
    name: 'Bőrgyógyászat', 
    icon: Stethoscope, 
    color: 'bg-purple-500' 
  }
];

export const PATIENT_STATUS = {
  WAITING: 'waiting',
  CALLED: 'called',
  COMPLETED: 'completed'
};

export const VIEW_TYPES = {
  PATIENT: 'patient',
  ADMIN: 'admin',
  DISPLAY: 'display'
};