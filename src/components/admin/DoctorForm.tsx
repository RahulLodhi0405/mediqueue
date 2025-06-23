
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormOperations } from '@/hooks/use-form-operations';

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

interface DoctorFormProps {
  doctor?: Doctor | null;
  onSubmit: (data: Omit<Doctor, 'id'>) => void;
  onCancel: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ doctor, onSubmit, onCancel }) => {
  const initialValues = {
    firstName: doctor?.firstName || '',
    lastName: doctor?.lastName || '',
    speciality: doctor?.speciality || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    department: doctor?.department || '',
    status: doctor?.status || 'active' as const
  };

  const validationConfig = {
    firstName: { required: true, minLength: 2 },
    lastName: { required: true, minLength: 2 },
    speciality: { required: true },
    email: { required: true, isEmail: true },
    phone: { required: true, minLength: 10 },
    department: { required: true },
    status: { required: true }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormOperations(initialValues, validationConfig);

  const specialities = [
    'Cardiologie',
    'Pédiatrie',
    'Chirurgie',
    'Neurologie',
    'Dermatologie',
    'Orthopédie',
    'Gynécologie',
    'Psychiatrie',
    'Radiologie',
    'Anesthésie'
  ];

  const departments = [
    'Urgences',
    'Cardiologie',
    'Pédiatrie',
    'Chirurgie',
    'Neurologie',
    'Dermatologie',
    'Orthopédie',
    'Gynécologie',
    'Psychiatrie',
    'Radiologie'
  ];

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="speciality">Speciality *</Label>
        <Select value={values.speciality} onValueChange={(value) => setFieldValue('speciality', value)}>
          <SelectTrigger className={errors.speciality ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select speciality" />
          </SelectTrigger>
          <SelectContent>
            {specialities.map((speciality) => (
              <SelectItem key={speciality} value={speciality}>
                {speciality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.speciality && (
          <p className="text-sm text-red-500">{errors.speciality}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={values.department} onValueChange={(value) => setFieldValue('department', value)}>
          <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-sm text-red-500">{errors.department}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Mobile</Label>
          <Input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status} onValueChange={(value) => setFieldValue('status', value as 'active' | 'inactive')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Submit
        </Button>
        <Button type="submit">
          {doctor ? 'Modifier' : 'Modify'}
        </Button>
      </div>
    </form>
  );
};

export default DoctorForm;
