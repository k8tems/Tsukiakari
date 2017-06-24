import { connect } from 'react-redux';
import TimelineBox from '../components/timeline-box';

function mapStateToProps(state) {
  return {
    columns: state.tweets.columns,
  };
}

export default connect(
  mapStateToProps,
)(TimelineBox);

