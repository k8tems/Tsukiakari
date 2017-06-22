import { connect } from 'react-redux';
import TimelineBox from '../components/timeline-box';

function mapStateToProps(state) {
  return {
    is_conversation_opened: state.timeline.is_conversation_opened,
  };
}

export default connect(
  mapStateToProps,
)(TimelineBox);

