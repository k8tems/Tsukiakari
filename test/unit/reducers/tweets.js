import assert from 'power-assert';
import actions from '../../../src/renderer/src/reducers/tweets';

describe('Tweets test', () => {
  it('`isConversationOpened` should be set to true', () => {

    const oldState = { columns: [{ id: '1', isConversationOpened: false }] };
    const action = { payload: { timelineId: '1' } };
    const newState = actions.OPEN_CONVERSATION(oldState, action);
    assert.equal(false, oldState.columns[0].isConversationOpened);
    assert.equal(true, newState.columns[0].isConversationOpened);
  });
});
