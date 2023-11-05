import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice"; // Import your authSlice actions

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/user/login', 
        method: 'POST',
        body: { ...credentials },
      }),
      onQueryFulfilled: (data, query) => {
        // Assuming your API returns an access token
        setCredentials({ accessToken: data.accessToken });
        return data;
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryFulfilled: (_, __, { dispatch }) => {
        dispatch(logOut());
        dispatch(apiSlice.util.resetApiState());
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;

export default authApiSlice;
