import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create departments
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { name: 'Engineering' },
      update: {},
      create: {
        name: 'Engineering',
        description: 'Software development and technical operations'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Human Resources' },
      update: {},
      create: {
        name: 'Human Resources',
        description: 'People operations and talent management'
      }
    }),
    prisma.department.upsert({
      where: { name: 'IT' },
      update: {},
      create: {
        name: 'IT',
        description: 'Information technology and system administration'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Marketing' },
      update: {},
      create: {
        name: 'Marketing',
        description: 'Marketing and brand management'
      }
    })
  ]);

  // Create designations
  const designations = await Promise.all([
    prisma.designation.upsert({
      where: { title: 'Software Engineer' },
      update: {},
      create: {
        title: 'Software Engineer',
        description: 'Develops and maintains software applications',
        level: 2
      }
    }),
    prisma.designation.upsert({
      where: { title: 'Senior Software Engineer' },
      update: {},
      create: {
        title: 'Senior Software Engineer',
        description: 'Senior developer with leadership responsibilities',
        level: 3
      }
    }),
    prisma.designation.upsert({
      where: { title: 'HR Manager' },
      update: {},
      create: {
        title: 'HR Manager',
        description: 'Manages human resources operations',
        level: 4
      }
    }),
    prisma.designation.upsert({
      where: { title: 'HR Director' },
      update: {},
      create: {
        title: 'HR Director',
        description: 'Senior HR leadership role',
        level: 5
      }
    }),
    prisma.designation.upsert({
      where: { title: 'System Administrator' },
      update: {},
      create: {
        title: 'System Administrator',
        description: 'Manages IT infrastructure and systems',
        level: 3
      }
    })
  ]);

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 12);
  const hashedAdminPassword = await bcrypt.hash('admin123', 12);

  // Create users with profiles
  const users = [
    {
      email: 'john.doe@company.com',
      password: hashedPassword,
      role: 'EMPLOYEE',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        employeeId: 'EMP001',
        departmentId: departments[0].id, // Engineering
        designationId: designations[0].id, // Software Engineer
        joinDate: new Date('2023-01-15'),
        salary: 75000,
        phone: '+1-555-0101',
        address: '123 Main St, San Francisco, CA'
      }
    },
    {
      email: 'jane.smith@company.com',
      password: hashedPassword,
      role: 'HR',
      profile: {
        firstName: 'Jane',
        lastName: 'Smith',
        employeeId: 'EMP002',
        departmentId: departments[1].id, // Human Resources
        designationId: designations[2].id, // HR Manager
        joinDate: new Date('2022-05-10'),
        salary: 85000,
        phone: '+1-555-0102',
        address: '456 Oak Ave, San Francisco, CA'
      }
    },
    {
      email: 'admin@company.com',
      password: hashedAdminPassword,
      role: 'ADMIN',
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        employeeId: 'EMP003',
        departmentId: departments[2].id, // IT
        designationId: designations[4].id, // System Administrator
        joinDate: new Date('2022-01-01'),
        salary: 95000,
        phone: '+1-555-0103',
        address: 'Remote'
      }
    },
    {
      email: 'mike.johnson@company.com',
      password: hashedPassword,
      role: 'EMPLOYEE',
      profile: {
        firstName: 'Mike',
        lastName: 'Johnson',
        employeeId: 'EMP004',
        departmentId: departments[0].id, // Engineering
        designationId: designations[1].id, // Senior Software Engineer
        joinDate: new Date('2022-08-20'),
        salary: 90000,
        phone: '+1-555-0104',
        address: '789 Pine St, New York, NY'
      }
    },
    {
      email: 'sarah.williams@company.com',
      password: hashedPassword,
      role: 'HR',
      profile: {
        firstName: 'Sarah',
        lastName: 'Williams',
        employeeId: 'EMP005',
        departmentId: departments[1].id, // Human Resources
        designationId: designations[3].id, // HR Director
        joinDate: new Date('2021-03-15'),
        salary: 110000,
        phone: '+1-555-0105',
        address: '321 Elm St, San Francisco, CA'
      }
    }
  ];

  // Create users and profiles
  for (const userData of users) {
    const { profile, ...userInfo } = userData;
    
    const user = await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: {
        ...userInfo,
        profile: {
          create: profile
        }
      }
    });

    // Create leave balances for current year
    const currentYear = new Date().getFullYear();
    const leaveTypes = [
      { type: 'CASUAL', totalDays: 12 },
      { type: 'SICK', totalDays: 10 },
      { type: 'EARNED', totalDays: 20 }
    ];

    for (const leaveType of leaveTypes) {
      await prisma.leaveBalance.upsert({
        where: {
          userId_type_year: {
            userId: user.id,
            type: leaveType.type,
            year: currentYear
          }
        },
        update: {},
        create: {
          userId: user.id,
          type: leaveType.type,
          year: currentYear,
          totalDays: leaveType.totalDays,
          usedDays: 0,
          pendingDays: 0
        }
      });
    }
  }

  // Create some holidays
  const holidays = [
    { name: 'New Year\'s Day', date: new Date('2025-01-01'), type: 'PUBLIC' },
    { name: 'Independence Day', date: new Date('2025-07-04'), type: 'PUBLIC' },
    { name: 'Christmas Day', date: new Date('2025-12-25'), type: 'PUBLIC' },
    { name: 'Company Foundation Day', date: new Date('2025-06-15'), type: 'COMPANY' }
  ];

  for (const holiday of holidays) {
    await prisma.holiday.upsert({
      where: { date: holiday.date },
      update: {},
      create: holiday
    });
  }

  // Create a sample announcement
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@company.com' }
  });

  if (adminUser) {
    await prisma.announcement.upsert({
      where: { id: 'welcome-announcement' },
      update: {},
      create: {
        id: 'welcome-announcement',
        title: 'Welcome to HRM System',
        content: 'Welcome to our new Human Resource Management System! This platform will help streamline all HR processes including attendance, leave management, payroll, and performance tracking.',
        type: 'GENERAL',
        priority: 'HIGH',
        authorId: adminUser.id,
        publishedAt: new Date()
      }
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📊 Created:');
  console.log(`  - ${departments.length} departments`);
  console.log(`  - ${designations.length} designations`);
  console.log(`  - ${users.length} users with profiles`);
  console.log(`  - ${users.length * 3} leave balances`);
  console.log(`  - ${holidays.length} holidays`);
  console.log('  - 1 announcement');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });