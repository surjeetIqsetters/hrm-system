import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Role,
  Permission,
  Department,
  Designation,
  AttendanceRule,
  AuditLog,
  ApiKey,
  Integration,
  NotificationTemplate
} from '@/types';

interface AdminState {
  roles: Role[];
  permissions: Permission[];
  departments: Department[];
  designations: Designation[];
  attendanceRules: AttendanceRule[];
  auditLogs: AuditLog[];
  apiKeys: ApiKey[];
  integrations: Integration[];
  notificationTemplates: NotificationTemplate[];
  systemHealth: any;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  roles: [],
  permissions: [],
  departments: [],
  designations: [],
  attendanceRules: [],
  auditLogs: [],
  apiKeys: [],
  integrations: [],
  notificationTemplates: [],
  systemHealth: null,
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk<Role[], void>(
  'admin/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRole = createAsyncThunk<Role, Partial<Role>>(
  'admin/createRole',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create role');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRole = createAsyncThunk<Role, { id: string; data: Partial<Role> }>(
  'admin/updateRole',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update role');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRole = createAsyncThunk<void, string>(
  'admin/deleteRole',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete role');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDepartments = createAsyncThunk<Department[], void>(
  'admin/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/departments');
      if (!response.ok) throw new Error('Failed to fetch departments');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDepartment = createAsyncThunk<Department, Partial<Department>>(
  'admin/createDepartment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create department');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDesignations = createAsyncThunk<Designation[], void>(
  'admin/fetchDesignations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/designations');
      if (!response.ok) throw new Error('Failed to fetch designations');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDesignation = createAsyncThunk<Designation, Partial<Designation>>(
  'admin/createDesignation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/designations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create designation');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAttendanceRules = createAsyncThunk<AttendanceRule[], void>(
  'admin/fetchAttendanceRules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/attendance-rules');
      if (!response.ok) throw new Error('Failed to fetch attendance rules');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAttendanceRule = createAsyncThunk<AttendanceRule, Partial<AttendanceRule>>(
  'admin/createAttendanceRule',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/attendance-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create attendance rule');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAuditLogs = createAsyncThunk<AuditLog[], { limit?: number }>(
  'admin/fetchAuditLogs',
  async ({ limit = 100 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/audit-logs?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch audit logs');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createApiKey = createAsyncThunk<ApiKey, Partial<ApiKey>>(
  'admin/createApiKey',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create API key');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchApiKeys = createAsyncThunk<ApiKey[], void>(
  'admin/fetchApiKeys',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/api-keys');
      if (!response.ok) throw new Error('Failed to fetch API keys');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchIntegrations = createAsyncThunk<Integration[], void>(
  'admin/fetchIntegrations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/integrations');
      if (!response.ok) throw new Error('Failed to fetch integrations');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNotificationTemplates = createAsyncThunk<NotificationTemplate[], void>(
  'admin/fetchNotificationTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/notification-templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSystemHealth = createAsyncThunk<any, void>(
  'admin/fetchSystemHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/admin/system-health');
      if (!response.ok) throw new Error('Failed to fetch system health');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.roles[index] = action.payload;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(r => r.id !== action.meta.arg);
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.designations = action.payload;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.designations.push(action.payload);
      })
      .addCase(fetchAttendanceRules.fulfilled, (state, action) => {
        state.attendanceRules = action.payload;
      })
      .addCase(createAttendanceRule.fulfilled, (state, action) => {
        state.attendanceRules.push(action.payload);
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.auditLogs = action.payload;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.apiKeys = action.payload;
      })
      .addCase(createApiKey.fulfilled, (state, action) => {
        state.apiKeys.push(action.payload);
      })
      .addCase(fetchIntegrations.fulfilled, (state, action) => {
        state.integrations = action.payload;
      })
      .addCase(fetchNotificationTemplates.fulfilled, (state, action) => {
        state.notificationTemplates = action.payload;
      })
      .addCase(fetchSystemHealth.fulfilled, (state, action) => {
        state.systemHealth = action.payload;
      });
  },
});

export default adminSlice.reducer;
