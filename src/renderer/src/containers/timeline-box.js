import { connect } from 'react-redux';
import TimelineBox from '../components/timeline-box';

function mapStateToProps(state) {
  return {
    isConversationOpened: state.timeline.isConversationOpened,
  };
}

export default connect(
  mapStateToProps,
)(TimelineBox);

