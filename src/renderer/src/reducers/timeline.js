import { handleActions } from 'redux-actions';

const defaultState = {
  isConversationOpened: false,
};

export default handleActions({
  OPEN_CONVERSATION: (state, action) => ({
    isConversationOpened: true,
  }),
}, defaultState);
