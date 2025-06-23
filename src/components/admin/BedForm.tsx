import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormOperations } from '@/hooks/use-form-operations';

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

interface BedFormProps {
  bed?: Bed | null;
  onSubmit: (data: Omit<Bed, 'id'>) => void;
  onCancel: () => void;
}

const BedForm: React.FC<BedFormProps> = ({ bed, onSubmit, onCancel }) => {
  const initialValues = {
    number: bed?.number || '',
    room: bed?.room || '',
    department: bed?.department || '',
    type: bed?.type || '',
    status: bed?.status || 'available' as const,
    patientName: bed?.patientName || '',
    admissionDate: bed?.admissionDate || ''
  };

  const validationConfig = {
    number: { required: true, minLength: 3 },
    room: { required: true, minLength: 3 },
    department: { required: true },
    type: { required: true },
    status: { required: true }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormOperations(initialValues, validationConfig);

  const departments = [
    'Emergency',
    'Cardiology',
    'Pediatrics',
    'Surgery',
    'Neurology',
    'Dermatology',
    'Orthopedics',
    'Gynecology',
    'Psychiatry',
    'Radiology'
  ];

  const bedTypes = [
    'Standard',
    'Intensive Care',
    'Resuscitation',
    'Pediatric',
    'Maternity',
    'Surgical',
    'Emergency'
  ];

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Bed Number *</Label>
          <Input
            id="number"
            name="number"
            value={values.number}
            onChange={handleChange}
            placeholder="e.g., B001"
            className={errors.number ? 'border-red-500' : ''}
          />
          {errors.number && (
            <p className="text-sm text-red-500">{errors.number}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="room">Room *</Label>
          <Input
            id="room"
            name="room"
            value={values.room}
            onChange={handleChange}
            placeholder="e.g., Room 101"
            className={errors.room ? 'border-red-500' : ''}
          />
          {errors.room && (
            <p className="text-sm text-red-500">{errors.room}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select value={values.department} onValueChange={(value) => setFieldValue('department', value)}>
            <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select a department" />
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

        <div className="space-y-2">
          <Label htmlFor="type">Bed Type *</Label>
          <Select value={values.type} onValueChange={(value) => setFieldValue('type', value)}>
            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select a bed type" />
            </SelectTrigger>
            <SelectContent>
              {bedTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={values.status} onValueChange={(value) => setFieldValue('status', value as Bed['status'])}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(values.status === 'occupied' || values.status === 'reserved') && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              name="patientName"
              value={values.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admissionDate">Admission Date</Label>
            <Input
              id="admissionDate"
              name="admissionDate"
              type="date"
              value={values.admissionDate}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {bed ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};


export default BedForm;
