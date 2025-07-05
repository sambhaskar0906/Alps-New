import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Create Ticket
export const createTicket = createAsyncThunk(
  'ticket/create',
  async (ticketData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/ticket`, ticketData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Tickets
export const getAllTickets = createAsyncThunk(
  'ticket/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/ticket/all-tickets`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Ticket by ID
export const getTicketById = createAsyncThunk(
  'ticket/getById',
  async (ticket_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/ticket/${ticket_id}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Ticket
export const updateTicket = createAsyncThunk(
  'ticket/update',
  async ({ ticket_id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/ticket/${ticket_id}`, updatedData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Ticket
export const deleteTicket = createAsyncThunk(
  'ticket/delete',
  async (ticket_id, { rejectWithValue }) => {
    try {
      await axios.delete(`/ticket/${ticket_id}`, {
        withCredentials: true,
      });
      return ticket_id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Change Ticket Status
export const changeTicketStatus = createAsyncThunk(
  'ticket/changeStatus',
  async ({ ticket_id, newStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/ticket/status/${ticket_id}?newStatus=${newStatus}`,
        {},
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial state
const initialState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
};

// Slice
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    clearCurrentTicket: (state) => {
      state.currentTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTicketById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tickets.findIndex(t => t.ticket_id === action.payload.ticket_id);
        if (index !== -1) state.tickets[index] = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = state.tickets.filter(t => t.ticket_id !== action.payload);
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changeTicketStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tickets.findIndex(t => t.ticket_id === action.payload.ticket_id);
        if (index !== -1) state.tickets[index] = action.payload;
      })
      .addCase(changeTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
