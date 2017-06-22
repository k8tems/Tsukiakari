import { handleActions } from 'redux-actions';

const defaultState = {
  is_conversation_opened: false,
};

export default handleActions({
  OPEN_CONVERSATION: (state, action) => ({
    is_conversation_opened: true,
  }),
}, defaultState);
