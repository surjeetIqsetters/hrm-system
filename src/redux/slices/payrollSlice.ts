import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Payslip, SalaryStructure, TaxDeclaration, TaxProof } from '@/types';

interface PayrollState {
  payslips: Payslip[];
  currentPayslip: Payslip | null;
  salaryStructures: SalaryStructure[];
  taxDeclarations: TaxDeclaration[];
  taxProofs: TaxProof[];
  loading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payslips: [],
  currentPayslip: null,
  salaryStructures: [],
  taxDeclarations: [],
  taxProofs: [],
  loading: false,
  error: null,
};

export const fetchPayslips = createAsyncThunk<Payslip[], string>(
  'payroll/fetchPayslips',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payroll/payslips/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch payslips');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPayslip = createAsyncThunk<Payslip, { employeeId: string; payslipId: string }>(
  'payroll/fetchPayslip',
  async ({ employeeId, payslipId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payroll/payslip/${employeeId}/${payslipId}`);
      if (!response.ok) throw new Error('Failed to fetch payslip');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSalaryOverview = createAsyncThunk<any, string>(
  'payroll/fetchSalaryOverview',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payroll/overview/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch salary overview');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaxDeclarations = createAsyncThunk<TaxDeclaration[], string>(
  'payroll/fetchTaxDeclarations',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payroll/tax-declarations/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch tax declarations');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitTaxDeclaration = createAsyncThunk<TaxDeclaration, any>(
  'payroll/submitTaxDeclaration',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payroll/tax-declaration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit tax declaration');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadTaxProof = createAsyncThunk<TaxProof, any>(
  'payroll/uploadTaxProof',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payroll/tax-proof', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload proof');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSalaryStructures = createAsyncThunk<SalaryStructure[], void>(
  'payroll/fetchSalaryStructures',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payroll/salary-structures');
      if (!response.ok) throw new Error('Failed to fetch salary structures');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayslips.fulfilled, (state, action) => {
        state.payslips = action.payload;
      })
      .addCase(fetchPayslip.fulfilled, (state, action) => {
        state.currentPayslip = action.payload;
      })
      .addCase(fetchTaxDeclarations.fulfilled, (state, action) => {
        state.taxDeclarations = action.payload;
      })
      .addCase(submitTaxDeclaration.fulfilled, (state, action) => {
        state.taxDeclarations.push(action.payload);
      })
      .addCase(uploadTaxProof.fulfilled, (state, action) => {
        state.taxProofs.push(action.payload);
      })
      .addCase(fetchSalaryStructures.fulfilled, (state, action) => {
        state.salaryStructures = action.payload;
      });
  },
});

export default payrollSlice.reducer;
