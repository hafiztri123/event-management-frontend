import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService, { LoginCredentials, LoginResponse, RegisterCredentials } from '../../services/authService';

interface LoginState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface RegisterState {
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
}


const initialLoginState: LoginState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const initialRegisterState: RegisterState = {
  isRegistered: false,
  isLoading: false,
  error: null
}  

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || 'Failed to login');
    }
    return rejectWithValue('Network error occurred');
  }
});

export  const registerUser = createAsyncThunk<
    void,
    RegisterCredentials,
    { rejectValue: string}
>('auth/register', async (credentials, { rejectWithValue }) => {
    try {
        await authService.register(credentials)
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message || 'Failed to register')
        }
        return rejectWithValue('Network error occurred')
    }
})

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearLoginError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const registerSlice = createSlice({
  name: 'register',
  initialState: initialRegisterState,
  reducers: {
    clearRegisterError: (state) => {
      state.error = null
    },
    resetState : (state) => {
      state.isRegistered = false
      state.isLoading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.isRegistered = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const { logout, clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;

export const { resetState, clearRegisterError } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;