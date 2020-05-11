import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  (userId, thunkAPI) => {
    return new Promise((r) => {
      setTimeout(() => {
        r("12");
      }, 1000);
    });
  }
);

export const conditionsListSlice = createSlice({
  name: "conditionsList",
  initialState: {
    initialized: false,
    items: null,
    selectedId: 0,
    test: 0,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    initialize: (state, action) => {
      state.initialized = true;
      if (action.payload) {
        state.items = action.payload.map((item, index) => {
          item.id = index;
          return item;
        });
      }
    },
    selectId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.fulfilled]: (state, action) => {
      // Add user to the state array
      state.test = action.payload;
    },
  },
});

export const { initialize, selectId } = conditionsListSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadData = () => async (dispatch) => {
  dispatch(initialize());
  try {
    // the url will be configurable in real-world scenarious
    const response = await fetch(window.API_URL);
    if (response.status !== 200) {
      dispatch(initialize([]));
      console.error(response);
    }
    const data = await response.json();
    dispatch(initialize(data.conditions));
  } catch (error) {
    dispatch(initialize([]));
    console.error(error);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectInitialized = (state) => state.conditionsList.initialized;
export const selectItems = (state) => state.conditionsList.items;
export const selectSelectedId = (state) => state.conditionsList.selectedId;
export const selectTest = (state) => state.conditionsList.test;

export default conditionsListSlice.reducer;
