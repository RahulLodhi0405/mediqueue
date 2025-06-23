import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BedForm from './BedForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Bed {
  id: number;
  number: string;
  room: string;
  department: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  patientName?: string;
  admissionDate?: string;
}

const BedManagement = () => {
  const [beds, setBeds] = useState<Bed[]>([
    {
      id: 1,
      number: 'B001',
      room: 'Room 101',
      department: 'Cardiology',
      type: 'Standard',
      status: 'occupied',
      patientName: 'John Doe',
      admissionDate: '2024-01-15'
    },
    {
      id: 2,
      number: 'B002',
      room: 'Room 102',
      department: 'Cardiology',
      type: 'Standard',
      status: 'available'
    },
    {
      id: 3,
      number: 'B003',
      room: 'Room 103',
      department: 'Pediatrics',
      type: 'Pediatric',
      status: 'occupied',
      patientName: 'Marie Smith',
      admissionDate: '2024-01-20'
    },
    {
      id: 4,
      number: 'B004',
      room: 'Room 104',
      department: 'Surgery',
      type: 'Intensive Care',
      status: 'maintenance'
    },
    {
      id: 5,
      number: 'B005',
      room: 'Room 105',
      department: 'Emergency',
      type: 'Standard',
      status: 'reserved'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBed, setEditingBed] = useState<Bed | null>(null);

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = 
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patientName && bed.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddBed = (bedData: Omit<Bed, 'id'>) => {
    const newBed = {
      ...bedData,
      id: Math.max(...beds.map(b => b.id)) + 1
    };
    setBeds([...beds, newBed]);
    setIsDialogOpen(false);
  };

  const handleEditBed = (bedData: Omit<Bed, 'id'>) => {
    if (editingBed) {
      setBeds(beds.map(bed =>
        bed.id === editingBed.id
          ? { ...bedData, id: editingBed.id }
          : bed
      ));
      setEditingBed(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteBed = (id: number) => {
    setBeds(beds.filter(bed => bed.id !== id));
  };

  const openEditDialog = (bed: Bed) => {
    setEditingBed(bed);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingBed(null);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: Bed['status']) => {
    const variants = {
      available: { variant: 'default' as const, label: 'Available' },
      occupied: { variant: 'destructive' as const, label: 'Occupied' },
      maintenance: { variant: 'secondary' as const, label: 'Maintenance' },
      reserved: { variant: 'outline' as const, label: 'Reserved' }
    };
    
    const { variant, label } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bed Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add a Bed
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingBed ? 'Edit Bed' : 'Add a New Bed'}
                </DialogTitle>
              </DialogHeader>
              <BedForm
                bed={editingBed}
                onSubmit={editingBed ? handleEditBed : handleAddBed}
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
            placeholder="Search for a bed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeds.map((bed) => (
              <TableRow key={bed.id}>
                <TableCell className="font-medium">{bed.number}</TableCell>
                <TableCell>{bed.room}</TableCell>
                <TableCell>{bed.department}</TableCell>
                <TableCell>{bed.type}</TableCell>
                <TableCell>{getStatusBadge(bed.status)}</TableCell>
                <TableCell>{bed.patientName || '-'}</TableCell>
                <TableCell>{bed.admissionDate || '-'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(bed)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBed(bed.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BedManagement;
