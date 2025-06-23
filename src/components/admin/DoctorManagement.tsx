import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DoctorForm from './DoctorForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
}

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      speciality: 'Cardiology',
      email: 'j.smith@hospital.com',
      phone: '1234567890',
      department: 'Cardiology',
      status: 'active'
    },
    {
      id: 2,
      firstName: 'Mary',
      lastName: 'Johnson',
      speciality: 'Pediatrics',
      email: 'm.johnson@hospital.com',
      phone: '0987654321',
      department: 'Pediatrics',
      status: 'active'
    },
    {
      id: 3,
      firstName: 'Peter',
      lastName: 'Brown',
      speciality: 'Surgery',
      email: 'p.brown@hospital.com',
      phone: '1122334455',
      department: 'Surgery',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id'>) => {
    const newDoctor = {
      ...doctorData,
      id: Math.max(...doctors.map(d => d.id)) + 1
    };
    setDoctors([...doctors, newDoctor]);
    setIsDialogOpen(false);
  };

  const handleEditDoctor = (doctorData: Omit<Doctor, 'id'>) => {
    if (editingDoctor) {
      setDoctors(doctors.map(doctor =>
        doctor.id === editingDoctor.id
          ? { ...doctorData, id: editingDoctor.id }
          : doctor
      ));
      setEditingDoctor(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingDoctor(null);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Doctor Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add a Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Edit Doctor' : 'Add a New Doctor'}
                </DialogTitle>
              </DialogHeader>
              <DoctorForm
                doctor={editingDoctor}
                onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">
                  {doctor.firstName} {doctor.lastName}
                </TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>
                  <Badge variant={doctor.status === 'active' ? 'default' : 'secondary'}>
                    {doctor.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(doctor)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No doctors found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorManagement;
