import assert from 'power-assert';
import handleActions from '../../../src/renderer/src/reducers/tweets';

describe('Tweets test', () => {
  const oldState = { columns: [
    { id: '1', isConversationOpened: false, ex: 'ex' },
    { id: '2', isConversationOpened: false, ex: 'ex' },] };
  const action = { payload: { timelineId: '1' }, type: 'OPEN_CONVERSATION'};
  const newState = handleActions(oldState, action);

  function getColumnById(columns, id) {
    return columns.filter(c => c.id === id)[0];
  }

  it('`isConversationOpened` should be set to true', () => {
    assert.equal(false, getColumnById(oldState.columns, '1').isConversationOpened);
    assert.equal(true, getColumnById(newState.columns, '1').isConversationOpened);
  });

  it('Other properties are preserved', () => {
    assert.equal('ex', getColumnById(oldState.columns, '1').ex);
    assert.equal('ex', getColumnById(newState.columns, '1').ex);
  });

  it('Column order is preserved', () => {
  });
});
