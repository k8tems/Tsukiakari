import assert from 'power-assert';
import handleActions from '../../../src/renderer/src/reducers/tweets';

describe('Tweets test', () => {
  const oldState = { columns: [{ id: '1', isConversationOpened: false }] };
  const action = { payload: { timelineId: '1' }, type: 'OPEN_CONVERSATION'};
  const newState = handleActions(oldState, action);

  it('`isConversationOpened` should be set to true', () => {
    assert.equal(false, oldState.columns[0].isConversationOpened);
    assert.equal(true, newState.columns[0].isConversationOpened);
  });

  it('Other properties are preserved', () => {
    assert.equal('1', oldState.columns[0].id);
    assert.equal('1', newState.columns[0].id);
  });
});
