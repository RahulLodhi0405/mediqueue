
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Hospital, User, Bell, Shield, Database, Mail, Phone } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const SettingsPage = () => {
  const [hospitalSettings, setHospitalSettings] = useState({
    name: 'MediQueue General Hospital',
    address: '123 Healthcare Ave, Medical City, MC 12345',
    phone: '+1 (555) 123-4567',
    email: 'admin@mediqueue.com',
    capacity: 150,
    emergencyEnabled: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    emergencyAlerts: true,
    bedAlerts: true,
    queueAlerts: true,
    systemMaintenance: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoRefresh: true,
    refreshInterval: 30,
    darkMode: false,
    language: 'en',
    timezone: 'UTC-5'
  });

  const [adminUsers] = useState([
    { id: 1, name: 'Dr. Admin Smith', role: 'Super Admin', email: 'admin@mediqueue.com', status: 'Active' },
    { id: 2, name: 'Nurse Manager Jones', role: 'Admin', email: 'nurse.manager@mediqueue.com', status: 'Active' },
    { id: 3, name: 'IT Support', role: 'Support', email: 'it@mediqueue.com', status: 'Active' }
  ]);

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Configure hospital settings, notifications, and system preferences
            </p>
          </div>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Hospital Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hospital className="w-5 h-5 mr-2 text-blue-600" />
              Hospital Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input
                  id="hospital-name"
                  value={hospitalSettings.name}
                  onChange={(e) => setHospitalSettings({...hospitalSettings, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-capacity">Bed Capacity</Label>
                <Input
                  id="hospital-capacity"
                  type="number"
                  value={hospitalSettings.capacity}
                  onChange={(e) => setHospitalSettings({...hospitalSettings, capacity: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hospital-address">Address</Label>
              <Input
                id="hospital-address"
                value={hospitalSettings.address}
                onChange={(e) => setHospitalSettings({...hospitalSettings, address: e.target.value})}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hospital-phone">Phone</Label>
                <Input
                  id="hospital-phone"
                  value={hospitalSettings.phone}
                  onChange={(e) => setHospitalSettings({...hospitalSettings, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-email">Email</Label>
                <Input
                  id="hospital-email"
                  type="email"
                  value={hospitalSettings.email}
                  onChange={(e) => setHospitalSettings({...hospitalSettings, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="emergency-mode"
                checked={hospitalSettings.emergencyEnabled}
                onCheckedChange={(checked) => setHospitalSettings({...hospitalSettings, emergencyEnabled: checked})}
              />
              <Label htmlFor="emergency-mode">Emergency Mode Enabled</Label>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                  <Switch
                    id="email-alerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <Switch
                    id="sms-alerts"
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                  <Switch
                    id="emergency-alerts"
                    checked={notificationSettings.emergencyAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emergencyAlerts: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bed-alerts">Bed Capacity Alerts</Label>
                  <Switch
                    id="bed-alerts"
                    checked={notificationSettings.bedAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, bedAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="queue-alerts">Queue Alerts</Label>
                  <Switch
                    id="queue-alerts"
                    checked={notificationSettings.queueAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, queueAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-maintenance">System Maintenance</Label>
                  <Switch
                    id="system-maintenance"
                    checked={notificationSettings.systemMaintenance}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemMaintenance: checked})}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-600" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <Switch
                    id="auto-refresh"
                    checked={systemSettings.autoRefresh}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoRefresh: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                  <Input
                    id="refresh-interval"
                    type="number"
                    value={systemSettings.refreshInterval}
                    onChange={(e) => setSystemSettings({...systemSettings, refreshInterval: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={systemSettings.darkMode}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, darkMode: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={systemSettings.language}
                    onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="UTC-5">UTC-5 (Eastern)</option>
                    <option value="UTC-6">UTC-6 (Central)</option>
                    <option value="UTC-7">UTC-7 (Mountain)</option>
                    <option value="UTC-8">UTC-8 (Pacific)</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Admin Users
              </CardTitle>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{user.email}</span>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-indigo-600" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Emergency Services</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-red-600" />
                    <span className="text-sm">911</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3 text-red-600" />
                    <span className="text-sm">emergency@mediqueue.com</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">IT Support</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">+1 (555) 123-4567 ext. 1001</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">it.support@mediqueue.com</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
