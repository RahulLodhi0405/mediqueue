
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bed, Search, Plus, Filter, User, Calendar, MapPin } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

interface BedData {
  id: number;
  number: string;
  room: string;
  floor: number;
  department: string;
  type: 'Standard' | 'ICU' | 'Emergency' | 'Private';
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  patient?: {
    name: string;
    admissionDate: string;
    condition: string;
  };
}

const BedsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock beds data
  const beds: BedData[] = [
    {
      id: 1,
      number: 'B001',
      room: 'Room 101',
      floor: 1,
      department: 'General',
      type: 'Standard',
      status: 'occupied',
      patient: {
        name: 'John Doe',
        admissionDate: '2024-01-15',
        condition: 'Post-surgery recovery'
      }
    },
    {
      id: 2,
      number: 'B002',
      room: 'Room 102',
      floor: 1,
      department: 'General',
      type: 'Standard',
      status: 'available'
    },
    {
      id: 3,
      number: 'ICU001',
      room: 'ICU 1',
      floor: 2,
      department: 'Intensive Care',
      type: 'ICU',
      status: 'occupied',
      patient: {
        name: 'Jane Smith',
        admissionDate: '2024-01-20',
        condition: 'Critical monitoring'
      }
    },
    {
      id: 4,
      number: 'E001',
      room: 'Emergency 1',
      floor: 0,
      department: 'Emergency',
      type: 'Emergency',
      status: 'cleaning'
    },
    {
      id: 5,
      number: 'P001',
      room: 'Private 1',
      floor: 3,
      department: 'Private',
      type: 'Private',
      status: 'available'
    },
    {
      id: 6,
      number: 'B003',
      room: 'Room 103',
      floor: 1,
      department: 'General',
      type: 'Standard',
      status: 'maintenance'
    },
    {
      id: 7,
      number: 'ICU002',
      room: 'ICU 2',
      floor: 2,
      department: 'Intensive Care',
      type: 'ICU',
      status: 'available'
    },
    {
      id: 8,
      number: 'E002',
      room: 'Emergency 2',
      floor: 0,
      department: 'Emergency',
      type: 'Emergency',
      status: 'occupied',
      patient: {
        name: 'Mike Johnson',
        admissionDate: '2024-01-22',
        condition: 'Emergency treatment'
      }
    }
  ];

  const departments = ['all', 'General', 'Intensive Care', 'Emergency', 'Private'];
  const statuses = ['all', 'available', 'occupied', 'cleaning', 'maintenance'];

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || bed.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case 'occupied':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Occupied</Badge>;
      case 'cleaning':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cleaning</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getBedTypeColor = (type: string) => {
    switch (type) {
      case 'ICU':
        return 'border-red-200 bg-red-50';
      case 'Emergency':
        return 'border-orange-200 bg-orange-50';
      case 'Private':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const statsData = {
    total: beds.length,
    available: beds.filter(b => b.status === 'available').length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    outOfOrder: beds.filter(b => ['cleaning', 'maintenance'].includes(b.status)).length
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bed Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage hospital bed allocation and availability
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Bed
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <Bed className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <div className="h-4 w-4 bg-green-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statsData.available}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((statsData.available / statsData.total) * 100)}% capacity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <div className="h-4 w-4 bg-red-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{statsData.occupied}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((statsData.occupied / statsData.total) * 100)}% occupancy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Order</CardTitle>
              <div className="h-4 w-4 bg-orange-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{statsData.outOfOrder}</div>
              <p className="text-xs text-muted-foreground">Cleaning/Maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search beds by number, room, patient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beds Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBeds.map((bed) => (
            <Card key={bed.id} className={`hover:shadow-lg transition-shadow ${getBedTypeColor(bed.type)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">{bed.number}</CardTitle>
                    <p className="text-sm text-muted-foreground">{bed.room}</p>
                  </div>
                  {getStatusBadge(bed.status)}
                </div>
                <Badge variant="outline" className="w-fit">
                  {bed.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Location Info */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Floor {bed.floor} • {bed.department}</span>
                  </div>

                  {/* Patient Info (if occupied) */}
                  {bed.patient && (
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">{bed.patient.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-muted-foreground">
                          Admitted: {new Date(bed.patient.admissionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{bed.patient.condition}</p>
                    </div>
                  )}

                  {bed.status === 'available' && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 dark:text-green-300 text-center">
                        Ready for new patient
                      </p>
                    </div>
                  )}

                  {bed.status === 'cleaning' && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
                        Being sanitized
                      </p>
                    </div>
                  )}

                  {bed.status === 'maintenance' && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800 dark:text-orange-300 text-center">
                        Under maintenance
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    {bed.status === 'available' && (
                      <Button size="sm" className="flex-1">
                        Assign Patient
                      </Button>
                    )}
                    {bed.status === 'occupied' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Discharge
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBeds.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Bed className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No beds found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default BedsPage;
