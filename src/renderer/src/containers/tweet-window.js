import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TweetWindow from '../components/tweet-window';
import * as tweets from '../actions/tweets';
import * as sidemenu from '../actions/sidemenu';

function mapStateToProps(state: State): Object {
  return {
    isOpen: state.sidemenu.isTweetWindowOpen,
    accounts: state.accounts.accounts,
    media: state.tweetWindow.media,
    replyTweet: state.tweetWindow.replyTweet,
    replyAccount: state.tweetWindow.replyAccount,
    isPosting: state.tweetWindow.isPosting,
    isMediaUploading: state.tweetWindow.isMediaUploading,
    mentions: state.tweetWindow.mentions,
  };
}

function mapDispatchToProps(dispatch: Dispatch): Object {
  return {
    post: bindActionCreators(tweets.postTweet, dispatch),
    close: bindActionCreators(sidemenu.closeTweetWindow, dispatch),
    uploadMedia: bindActionCreators(tweets.uploadMedia, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetWindow);
