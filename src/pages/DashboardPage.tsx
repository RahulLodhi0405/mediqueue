
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Bed, Clock, Bell, Activity, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/badge';

const DashboardPage = () => {
  // Mock data for the dashboard
  const dashboardStats = {
    totalDoctors: 45,
    activeDoctors: 32,
    totalBeds: 150,
    availableBeds: 23,
    occupiedBeds: 127,
    currentQueue: 18,
    emergencyQueue: 3,
    avgWaitTime: 25
  };

  const recentNotifications = [
    { id: 1, type: 'emergency', message: 'Emergency patient in ER', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Dr. Smith scheduled for surgery', time: '10 min ago' },
    { id: 3, type: 'warning', message: 'ICU bed capacity at 90%', time: '15 min ago' },
    { id: 4, type: 'success', message: 'New doctor onboarded', time: '1 hour ago' }
  ];

  const activeQueues = [
    { doctor: 'Dr. Emily Johnson', specialty: 'Cardiology', patients: 5, avgWait: 30 },
    { doctor: 'Dr. Michael Chen', specialty: 'Emergency', patients: 8, avgWait: 15 },
    { doctor: 'Dr. Sarah Williams', specialty: 'Pediatrics', patients: 3, avgWait: 20 },
    { doctor: 'Dr. David Brown', specialty: 'Orthopedics', patients: 4, avgWait: 35 }
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
<div>
  <div className="flex flex-col items-center space-y-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6 ">
    <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex items-center text-black">
     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
  <path d="M3 21V3h18v18H3Zm2-2h14V5H5v14Zm8-7v3h-2v-3H8v-2h3V9h2v3h3v2h-3Z" />
</svg>

      <h1 className="text-2xl font-semibold tracking-wide">
        Apollo Hospital, Katara Hills, Bhopal
      </h1>
    </div>

    <a
      href="https://www.google.com/maps/place/Apollo+Hospital,+Katara+Hills,+Bhopal/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full shadow-md transition duration-300"
    >
      📍 View Location
    </a>
  </div>
</div>


            <h1 className="pt-5 text-2xl font-bold tracking-tight text-black">Hospital Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time overview of hospital operations
            </p>
          </div>
          
        </div>
        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
          </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalDoctors}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{dashboardStats.activeDoctors} active</span> • 
                <span className="text-gray-500"> {dashboardStats.totalDoctors - dashboardStats.activeDoctors} offline</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
              <Bed className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats.availableBeds}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.occupiedBeds}/{dashboardStats.totalBeds} occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Queue</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.currentQueue}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">{dashboardStats.emergencyQueue} emergency</span> • 
                <span className="text-gray-500"> {dashboardStats.avgWaitTime}min avg wait</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentNotifications.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">1 urgent</span> • <span className="text-gray-500">3 normal</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Active Queues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Active Doctor Queues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeQueues.map((queue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{queue.doctor}</p>
                      <p className="text-sm text-muted-foreground">{queue.specialty}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {queue.patients} patients
                      </Badge>
                      <p className="text-xs text-muted-foreground">{queue.avgWait}min wait</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-red-600" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'emergency' ? 'bg-red-500' :
                      notification.type === 'warning' ? 'bg-orange-500' :
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Hospital Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-lg font-bold text-green-600">{dashboardStats.activeDoctors}</p>
                <p className="text-sm text-muted-foreground">Doctors Available</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Bed className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-lg font-bold text-blue-600">{dashboardStats.availableBeds}</p>
                <p className="text-sm text-muted-foreground">Beds Available</p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-lg font-bold text-orange-600">{dashboardStats.emergencyQueue}</p>
                <p className="text-sm text-muted-foreground">Emergency Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
