
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Plus, Star, Clock, Phone, Mail, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  status: 'online' | 'offline' | 'busy';
  phone: string;
  email: string;
  patients: number;
  experience: string;
  avatar: string;
}

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Emily Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      status: 'online',
      phone: '+1 (555) 123-4567',
      email: 'e.johnson@mediqueue.com',
      patients: 12,
      experience: '15 years',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Emergency Medicine',
      rating: 4.9,
      status: 'busy',
      phone: '+1 (555) 234-5678',
      email: 'm.chen@mediqueue.com',
      patients: 8,
      experience: '12 years',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      specialty: 'Pediatrics',
      rating: 4.7,
      status: 'online',
      phone: '+1 (555) 345-6789',
      email: 's.williams@mediqueue.com',
      patients: 6,
      experience: '10 years',
      avatar: '👩‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. David Brown',
      specialty: 'Orthopedics',
      rating: 4.6,
      status: 'offline',
      phone: '+1 (555) 456-7890',
      email: 'd.brown@mediqueue.com',
      patients: 0,
      experience: '18 years',
      avatar: '👨‍⚕️'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Neurology',
      rating: 4.9,
      status: 'online',
      phone: '+1 (555) 567-8901',
      email: 'l.anderson@mediqueue.com',
      patients: 4,
      experience: '20 years',
      avatar: '👩‍⚕️'
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'Dermatology',
      rating: 4.5,
      status: 'busy',
      phone: '+1 (555) 678-9012',
      email: 'r.taylor@mediqueue.com',
      patients: 9,
      experience: '8 years',
      avatar: '👨‍⚕️'
    }
  ];

  const specialties = ['all', 'Cardiology', 'Emergency Medicine', 'Pediatrics', 'Orthopedics', 'Neurology', 'Dermatology'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case 'busy':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Busy</Badge>;
      case 'offline':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Offline</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Doctors Management</h1>
            <p className="text-muted-foreground">
              Manage doctor profiles, availability, and schedules
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctors.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <div className="h-4 w-4 bg-green-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {doctors.filter(d => d.status === 'online').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Busy</CardTitle>
              <div className="h-4 w-4 bg-orange-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {doctors.filter(d => d.status === 'busy').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <div className="h-4 w-4 bg-gray-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {doctors.filter(d => d.status === 'offline').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{doctor.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  {getStatusBadge(doctor.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>

                  {/* Current Patients */}
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {doctor.patients > 0 ? `${doctor.patients} patients in queue` : 'No patients in queue'}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{doctor.experience} experience</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-muted-foreground">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-muted-foreground">{doctor.email}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or add a new doctor.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;
