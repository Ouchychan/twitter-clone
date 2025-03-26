import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../firebase";


const BASE_URL = "https://04158105-ba5b-456c-b2b8-8b44449fbfd7-00-3aws21y02db6k.sisko.replit.dev";

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
      try {
        const postsRef = collection(db, `users/${userId}/posts`);

        const querySnapshot = await getDocs(postsRef);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return docs;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
  
  export const savePost = createAsyncThunk(
    "posts/savePost",
    async ({userId, postContent}) => {
      try {
        const postsRef = collection(db, `users/${userId}/posts`);
        console.log(`users/${userId}/posts`);

        const newPostRef = doc(postsRef);
        console.log(postContent)
        await setDoc(newPostRef, {content: postContent, likes: []});
        const newPost = await getDoc(newPostRef);


        const post = {
          id: newPost.id,
          ...newPost.data(),
        };

        return post;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
  
  //like
  export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({userId, postId}) => {
      try {
        const postRef = doc(db, `users/${userId}/posts/${postId}`);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          const likes = [...postData.likes, userId];

          await setDoc(postRef, {...postData,likes});
        }

        return {userId, postId};
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );

  export const removeLikeFromPost = createAsyncThunk(
    "posts/removeLikeFromPost",
    async ({userId, postId}) => {
      try {
        const postRef = doc(db, `users/${userId}/posts/${postId}`);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          const likes = postData.likes.filter((id) => id !== userId);

          await setDoc(postRef, {...postData,likes});
        }

        return {userId, postId};
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
  // Slice
  const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(savePost.fulfilled, (state, action) => {
          state.posts = [action.payload, ...state.posts];
        })
      .addCase(likePost.fulfilled, (state, action) => {
        const {userId, postId} = action.payload;

        const postIndex = state.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.posts[postIndex].likes.push(userId);
        }
      })
      .addCase(removeLikeFromPost.fulfilled, (state, action) => {
        const {userId, postId} = action.payload;

        const postIndex = state.posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
            (id) => id !== userId
          );
        }
      });
    },
  });
  

  export default postsSlice.reducer;
  