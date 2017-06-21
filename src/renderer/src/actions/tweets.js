import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';
import log from '../lib/log';

export const recieveTweet = createAction('RECIEVE_TWEET');

export type TweetActionType =
  { type: 'LOAD_FREINDS', payload: { friends: Object } };

export const fetchHome = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchHomeTimeline({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

export const fetchFavorites = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchFavorites({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

export const createFavorite = (account, tweet) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.createFavorite({ id: tweet.id_str })
    .then(res => {
      const action = createAction('CREATE_FAVORITE_SUCCESS');
      dispatch(action({ account, tweet: res }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('CREATE_FAVORITE_FAIL');
      dispatch(action({ error }));
    });
  const action = createAction('CREATE_FAVORITE_REQUEST');
  dispatch(action({ account, tweet }));
};

export const destroyFavorite = (account, tweet) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.destroyFavorite({ id: tweet.id_str })
    .then(res => {
      const action = createAction('DESTROY_FAVORITE_SUCCESS');
      dispatch(action({ account, tweet: res }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('DESTROY_FAVORITE_FAIL');
      dispatch(action({ error }));
    });
  const action = createAction('DESTROY_FAVORITE_REQUEST');
  dispatch(action({ account, tweet }));
};

export const createRetweet = (account, tweet) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.createRetweet({ id: tweet.id_str })
    .then(res => {
      const action = createAction('CREATE_RETWEET_SUCCESS');
      dispatch(action({ account, tweet: res }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('CREATE_RETWEET_FAIL');
      dispatch(action({ error }));
    });
  const action = createAction('CREATE_RETWEET_REQUEST');
  dispatch(action({ account, tweet }));
};

export const destroyRetweet = (account, tweet) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.destroyRetweet({ id: tweet.id_str })
    .then(res => {
      const action = createAction('DESTROY_RETWEET_SUCCESS');
      dispatch(action({ account, tweet: res }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('DESTROY_RETWEET_FAIL');
      dispatch(action({ error }));
    });
  const action = createAction('DESTROY_RETWEET_REQUEST');
  dispatch(action({ account, tweet }));
};

export const requestDestroyRetweet = createAction('REQUEST_DESTROY_RETWEET');

export const successDestroyRetweet = createAction('SUCCESS_DESTROY_RETWEET');

export const failureDestroyRetweet = createAction('FAILURE_DESTROY_RETWEET');

export const connectStream = createAction('CONNECT_STREAM');

export const connectFilterStream = createAction('CONNECT_FILTER_STREAM');

export const reply = createAction('REPLY');

export const postTweet = (account, status, replyTweet) => (dispatch, getState) => {
  if (status === '') return;
  const media = getState().tweetWindow.media;
  const mediaIds = media.map(m => m.id).join(',');
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  const replyId = ~status.indexOf(`@${replyTweet.user.screen_name}`)
          ? replyTweet.id_str
          : null;
  const params = { status };
  if (replyId) params.in_reply_to_status_id = replyId;
  if (mediaIds) params.media_ids = mediaIds;
  dispatch(createAction('POST_TWEET_REQUEST')());
  twitter.postTweet(params)
    .then(tweet => {
      const action = createAction('POST_TWEET_SUCCESS');
      dispatch(action({ account, tweet }));
    })
    .catch(error => {
      log.error(error);
      const action = createAction('POST_TWEET_FAIL');
      dispatch(action({ error }));
    });
};

export const uploadMedia = createAction('UPLOAD_MEDIA');

export const successUploadMedia = createAction('SUCCESS_UPLOAD_MEDIA');

export const failUploadMedia = createAction('FAIL_UPLOAD_MEDIA');

export const loadFriends = createAction('LOAD_FREINDS');

export const openConversation = () => dispatch => {
  console.log('Open conversation');
  dispatch(createAction('OPEN_CONVERSATION'));
};
