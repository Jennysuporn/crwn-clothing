import { createSelector } from 'reselect';

const selectUser = state => state.user; //select only user from many thing in the state

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);