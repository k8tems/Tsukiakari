import { combineReducers } from 'redux';
import accounts from './accounts';
import tweets from './tweets';
import sidemenu from './sidemenu';
import tweetWindow from './tweet-window';
import lightbox from './lightbox';
import notification from './notification';
import addColumnMenu from './add-column-menu';
import video from './video';
import timeline from './timeline';

const rootReducer = combineReducers({
  accounts,
  tweets,
  sidemenu,
  lightbox,
  notification,
  tweetWindow,
  addColumnMenu,
  video,
  timeline,
});

export default rootReducer;
