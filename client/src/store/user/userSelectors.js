// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

// Selector to get user data
export const selectUser = (state) => state.user.user;

// Selector to check if user data is being loaded
export const selectUserLoading = (state) => state.user.loading;

// Selector to get any errors related to user actions
export const selectUserError = (state) => state.user.error;
