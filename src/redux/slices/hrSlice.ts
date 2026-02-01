import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Employee,
  DashboardStats,
  JobRequisition,
  JobApplication,
  Candidate,
  LeavePolicy,
  EmployeeLifecycle,
  Announcement,
  Survey,
  Ticket
} from '@/types';

interface HRState {
  employees: Employee[];
  dashboardStats: DashboardStats | null;
  jobRequisitions: JobRequisition[];
  applications: JobApplication[];
  candidates: Candidate[];
  leavePolicies: LeavePolicy[];
  employeeLifecycles: EmployeeLifecycle[];
  announcements: Announcement[];
  surveys: Survey[];
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: HRState = {
  employees: [],
  dashboardStats: null,
  jobRequisitions: [],
  applications: [],
  candidates: [],
  leavePolicies: [],
  employeeLifecycles: [],
  announcements: [],
  surveys: [],
  tickets: [],
  loading: false,
  error: null,
};

export const fetchAllEmployees = createAsyncThunk<Employee[], void>(
  'hr/fetchAllEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHRDashboardStats = createAsyncThunk<DashboardStats, void>(
  'hr/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobRequisitions = createAsyncThunk<JobRequisition[], void>(
  'hr/fetchJobRequisitions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/job-requisitions');
      if (!response.ok) throw new Error('Failed to fetch job requisitions');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createJobRequisition = createAsyncThunk<JobRequisition, Partial<JobRequisition>>(
  'hr/createJobRequisition',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/job-requisitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create job requisition');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchApplications = createAsyncThunk<JobApplication[], void>(
  'hr/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/applications');
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk<JobApplication, { id: string; status: string }>(
  'hr/updateApplicationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/hr/applications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeavePolicies = createAsyncThunk<LeavePolicy[], void>(
  'hr/fetchLeavePolicies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/leave-policies');
      if (!response.ok) throw new Error('Failed to fetch leave policies');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLeavePolicy = createAsyncThunk<LeavePolicy, Partial<LeavePolicy>>(
  'hr/createLeavePolicy',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/leave-policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create leave policy');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeLifecycles = createAsyncThunk<EmployeeLifecycle[], string>(
  'hr/fetchEmployeeLifecycles',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/hr/employee-lifecycles/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch lifecycles');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAnnouncement = createAsyncThunk<Announcement, Partial<Announcement>>(
  'hr/createAnnouncement',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create announcement');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnnouncements = createAsyncThunk<Announcement[], void>(
  'hr/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/announcements');
      if (!response.ok) throw new Error('Failed to fetch announcements');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTicket = createAsyncThunk<Ticket, Partial<Ticket>>(
  'hr/createTicket',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create ticket');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTickets = createAsyncThunk<Ticket[], void>(
  'hr/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/hr/tickets');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchHRDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      })
      .addCase(fetchJobRequisitions.fulfilled, (state, action) => {
        state.jobRequisitions = action.payload;
      })
      .addCase(createJobRequisition.fulfilled, (state, action) => {
        state.jobRequisitions.push(action.payload);
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.applications.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      })
      .addCase(fetchLeavePolicies.fulfilled, (state, action) => {
        state.leavePolicies = action.payload;
      })
      .addCase(createLeavePolicy.fulfilled, (state, action) => {
        state.leavePolicies.push(action.payload);
      })
      .addCase(fetchEmployeeLifecycles.fulfilled, (state, action) => {
        state.employeeLifecycles = action.payload;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.announcements.unshift(action.payload);
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      });
  },
});

export default hrSlice.reducer;
