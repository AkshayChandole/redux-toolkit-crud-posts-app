import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

export const deletePost = createAsyncThunk("/posts/deletePost", async (id) => {
  await fetch("https://jsonplaceholder.typicode.com/posts/${id}", {
    method: "DELETE",
  });
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.items = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
