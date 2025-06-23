
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, AlertTriangle, RefreshCw, User, Calendar, Timer } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

interface QueueItem {
  id: number;
  patientName: string;
  priority: 'low' | 'normal' | 'high' | 'emergency';
  doctor: string;
  department: string;
  estimatedWait: number;
  arrivalTime: string;
  reason: string;
  patientAge: number;
}

const QueuePage = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock queue data
  const queueData: QueueItem[] = [
    {
      id: 1,
      patientName: 'Alice Johnson',
      priority: 'emergency',
      doctor: 'Dr. Michael Chen',
      department: 'Emergency',
      estimatedWait: 5,
      arrivalTime: '14:30',
      reason: 'Chest pain',
      patientAge: 45
    },
    {
      id: 2,
      patientName: 'Bob Smith',
      priority: 'high',
      doctor: 'Dr. Emily Johnson',
      department: 'Cardiology',
      estimatedWait: 15,
      arrivalTime: '14:45',
      reason: 'Follow-up consultation',
      patientAge: 62
    },
    {
      id: 3,
      patientName: 'Carol Wilson',
      priority: 'normal',
      doctor: 'Dr. Sarah Williams',
      department: 'Pediatrics',
      estimatedWait: 25,
      arrivalTime: '15:00',
      reason: 'Routine checkup',
      patientAge: 8
    },
    {
      id: 4,
      patientName: 'David Brown',
      priority: 'normal',
      doctor: 'Dr. David Brown',
      department: 'Orthopedics',
      estimatedWait: 30,
      arrivalTime: '15:15',
      reason: 'Knee examination',
      patientAge: 35
    },
    {
      id: 5,
      patientName: 'Eve Davis',
      priority: 'low',
      doctor: 'Dr. Lisa Anderson',
      department: 'Neurology',
      estimatedWait: 45,
      arrivalTime: '15:30',
      reason: 'Headache consultation',
      patientAge: 28
    },
    {
      id: 6,
      patientName: 'Frank Miller',
      priority: 'high',
      doctor: 'Dr. Robert Taylor',
      department: 'Dermatology',
      estimatedWait: 20,
      arrivalTime: '15:45',
      reason: 'Skin condition',
      patientAge: 54
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Emergency</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'normal':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Normal</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'normal':
        return 'border-blue-500 bg-blue-50';
      case 'low':
        return 'border-gray-500 bg-gray-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  // Group queue by department
  const queueByDepartment = queueData.reduce((acc, item) => {
    if (!acc[item.department]) {
      acc[item.department] = [];
    }
    acc[item.department].push(item);
    return acc;
  }, {} as Record<string, QueueItem[]>);

  // Calculate stats
  const stats = {
    total: queueData.length,
    emergency: queueData.filter(q => q.priority === 'emergency').length,
    high: queueData.filter(q => q.priority === 'high').length,
    avgWait: Math.round(queueData.reduce((sum, q) => sum + q.estimatedWait, 0) / queueData.length)
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Queue Monitor</h1>
            <p className="text-muted-foreground">
              Real-time patient queue management and monitoring
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={autoRefresh ? "default" : "secondary"} className="mr-2">
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Toggle Auto-refresh
            </Button>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total in Queue</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.emergency}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <div className="h-4 w-4 bg-orange-600 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgWait}min</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Queue - All Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Current Queue - All Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queueData
                .sort((a, b) => {
                  const priorityOrder = { emergency: 0, high: 1, normal: 2, low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((patient, index) => (
                  <div 
                    key={patient.id} 
                    className={`p-4 rounded-lg border-2 ${getPriorityColor(patient.priority)} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-gray-600 bg-white rounded-full w-10 h-10 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{patient.patientName}</h3>
                            <span className="text-sm text-gray-500">({patient.patientAge} years old)</span>
                            {getPriorityBadge(patient.priority)}
                          </div>
                          <p className="text-sm text-gray-600">{patient.reason}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{patient.doctor}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Arrived: {patient.arrivalTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Timer className="w-4 h-4 text-gray-400" />
                          <span className="text-lg font-bold">{patient.estimatedWait}min</span>
                        </div>
                        <p className="text-xs text-gray-500">{patient.department}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Call Next
                          </Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Queue by Department */}
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(queueByDepartment).map(([department, patients]) => (
            <Card key={department}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{department} Department</span>
                  <Badge variant="outline">{patients.length} patients</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patients.map((patient, index) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                          <span className="font-medium">{patient.patientName}</span>
                          {getPriorityBadge(patient.priority)}
                        </div>
                        <p className="text-sm text-gray-600">{patient.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{patient.estimatedWait}min</p>
                        <p className="text-xs text-gray-500">{patient.arrivalTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QueuePage;
