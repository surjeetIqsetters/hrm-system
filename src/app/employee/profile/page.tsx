'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Building2, Calendar, Briefcase, Edit, Save, Upload } from 'lucide-react';
import { fetchEmployee } from '@/redux/slices/employeeSlice';
import { format } from 'date-fns';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: User },
  { name: 'Attendance', href: '/employee/attendance', icon: Calendar },
  { name: 'Leave', href: '/employee/leave', icon: Mail },
  { name: 'Payroll', href: '/employee/payroll', icon: Briefcase },
  { name: 'Performance', href: '/employee/performance', icon: Building2 },
  { name: 'Profile', href: '/employee/profile', icon: User },
];

export default function EmployeeProfile() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const employee = useAppSelector(state => state.employee);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchEmployee(auth.user.id));
    }
  }, [auth.user, dispatch]);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  if (!employee.employee) {
    return (
      <DashboardLayout title="My Profile" navigation={navigation}>
        <div className="text-center py-8 text-muted-foreground">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Profile"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {employee.employee.firstName[0]}{employee.employee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {employee.employee.firstName} {employee.employee.lastName}
                  </h2>
                  <p className="text-muted-foreground">{employee.employee.jobDetails.designation}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{employee.employee.jobDetails.department}</Badge>
                    <Badge>{employee.employee.role.toUpperCase()}</Badge>
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  defaultValue={employee.employee.personalDetails.dateOfBirth}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Input
                  defaultValue={employee.employee.personalDetails.gender}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Input
                  defaultValue={employee.employee.personalDetails.maritalStatus}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Input
                  defaultValue={employee.employee.personalDetails.bloodGroup}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Nationality</Label>
                <Input
                  defaultValue={employee.employee.personalDetails.nationality}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  defaultValue={employee.employee.contactDetails.phone}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Alternate Phone</Label>
                <Input
                  defaultValue={employee.employee.contactDetails.alternatePhone}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Personal Email</Label>
                <Input
                  type="email"
                  defaultValue={employee.employee.contactDetails.personalEmail}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  defaultValue={`${employee.employee.contactDetails.address.street}, ${employee.employee.contactDetails.address.city}, ${employee.employee.contactDetails.address.state} - ${employee.employee.contactDetails.address.zipCode}, ${employee.employee.contactDetails.address.country}`}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
              <CardDescription>Your employment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Employee ID</div>
                  <div className="font-medium">{employee.employee.jobDetails.employeeId}</div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Designation</div>
                  <div className="font-medium">{employee.employee.jobDetails.designation}</div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Department & Location</div>
                  <div className="font-medium">
                    {employee.employee.jobDetails.department} • {employee.employee.jobDetails.location}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Date of Joining</div>
                  <div className="font-medium">
                    {format(new Date(employee.employee.jobDetails.dateOfJoining), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Reporting To</div>
                  <div className="font-medium">{employee.employee.jobDetails.reportingTo}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">Employment Type</div>
                  <div className="font-medium capitalize">{employee.employee.jobDetails.employmentType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Work Mode</div>
                  <div className="font-medium capitalize">{employee.employee.jobDetails.workMode}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Your emergency contact details</CardDescription>
            </CardHeader>
            <CardContent>
              {employee.employee.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{contact.name}</h4>
                    <Badge>{contact.relationship}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Phone className="inline h-4 w-4 mr-1" />
                    {contact.phone}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bank Details */}
        {employee.employee.bankDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
              <CardDescription>Your banking information for payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">Bank Name</div>
                  <div className="font-medium">{employee.employee.bankDetails.bankName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Account Number</div>
                  <div className="font-medium">{employee.employee.bankDetails.accountNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">IFSC Code</div>
                  <div className="font-medium">{employee.employee.bankDetails.ifscCode}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Account Type</div>
                  <div className="font-medium capitalize">{employee.employee.bankDetails.accountType}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Your uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            {employee.employee.documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No documents uploaded yet
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {employee.employee.documents.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{doc.name}</span>
                      <Badge variant={doc.status === 'approved' ? 'default' : 'secondary'}>
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doc.type} • {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button variant="outline" className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
