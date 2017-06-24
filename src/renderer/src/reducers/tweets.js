import { handleActions } from 'redux-actions';
import uuid from 'uuid';

const defaultState = {
  timeline: {},
  columns: [],
  filterQueries: [],
};

const iconSelector = {
  Home: 'lnr lnr-home',
  Favorite: 'lnr lnr-heart',
  Mention: 'fa fa-at',
  Search: 'lnr lnr-magnifier',
};

const createNewColumns = (state, results, key) => (
  state.columns.map(column => {
    const newColumn = { ...column };
    column.contents.forEach(content => {
      if (`${content.account.id}:${content.type}` === key
          || `${content.subTitle}:${content.type}` === key) {
        newColumn.results = results.map(result => ({ key, id: result }));
      }
    });
    return newColumn;
  })
);

/**
 * @param  {object}   state
 * @param  {object}   action
 * @return {object}
 */
const updateTweet = (state, action) => {
  const { account: { id }, tweet } = action.payload;
  const { timeline } = state;
  Object.keys(timeline).forEach(key => {
    if (key.indexOf(id) !== -1) {
      timeline[key].entities.tweets[tweet.id_str] = tweet;
    }
  });
  return {
    ...state,
    timeline: {
      ...timeline,
    },
  };
};

const updateTweetProperty = (accountId, tweetId, timeline, props) => {
  Object.keys(timeline).forEach(key => {
    if (key.indexOf(accountId) !== -1) {
      timeline[key].entities.tweets[tweetId] = {
        ...timeline[key].entities.tweets[tweetId],
        ...props,
      };
    }
  });
  return timeline;
};

const actions = {
  RECIEVE_TWEET: (state, action) => {
    // TODO: refactor
    let results;
    const { account: { id_str }, tweet, type, q } = action.payload;
    const key = type === 'Search' ? `${q}:${type}` : `${id_str}:${type}`;
    const contents = state.columns.filter(column => column.contents[0].key === key);
    if (contents.length === 0) return state;
    const timeline = state.timeline[key] || { entities: { tweets: { } } };

    if (!(timeline.entities && timeline.entities.tweets[tweet.result])) {
      const result = [tweet.result];
      Array.prototype.push.apply(result, timeline.results);
      results = result;
    } else {
      results = timeline.results || [];
    }
    const entities = { ...timeline.entities.tweets, ...tweet.entities.tweets };
    const columns = createNewColumns(state, results, key);
    return {
      ...state,
      timeline: {
        ...state.timeline,
        [key]: {
          results,
          entities: {
            tweets: entities,
          },
        },
      },
      columns,
    };
  },
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    // TODO: refactor
    const { account: { id }, tweets, type, params } = action.payload;
    const key = type === 'Search'
      ? `${params.q}:${type}`
      : `${id}:${type}`;
    const timeline = state.timeline[key] || { entities: {} };
    const results = tweets.result
      .filter(result => !(timeline.entities && timeline.entities[result]))
      .concat(state.timeline.results || []);
    const entities = { ...timeline.entities, ...tweets.entities };
    const columns = createNewColumns(state, results, key);
    return { ...state, timeline: { ...state.timeline, [key]: { results, entities } }, columns };
  },
  CREATE_FAVORITE_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          favorited: true,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  CREATE_FAVORITE_SUCCESS: updateTweet,
  DESTROY_FAVORITE_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          favorited: false,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  DESTROY_FAVORITE_SUCCESS: updateTweet,
  DESTROY_RETWEET_SUCCESS: updateTweet,
  CREATE_RETWEET_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          retweeted: true,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  CREATE_RETWEET_SUCCESS: updateTweet,
  REQUEST_DESTROY_RETWEET: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          retweeted: false,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type, params } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector[type];
    const key = type === 'Search'
      ? `${params.q}:${type}`
      : `${account.id}:${type}`;

    const timeline = state.timeline[key] || { results: [] }; // TODO: implement mixed timeline
    const { columns } = state;
    const subTitle = type === 'Search'
      ? params.q
      : `@${account.screen_name}`;
    columns.unshift({
      id,
      title,
      subTitle,
      icon,
      type,
      params,
      contents: [{ account, type, key, subTitle }],
      results: timeline.results.map(result => ({ key, id: result })),
      isConversationOpened: false,
    });
    return {
      ...state,
      columns: [...columns],
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id, type, params } = action.payload;
    const queries = [...state.filterQueries];
    console.log(params.q);
    if (type === 'Search') {
      for (let i = 0; i < queries.length; i++) {
        if (params.q === queries[i]) {
          queries.splice(i, 1);
          break;
        }
      }
    }
    const columns = state.columns.filter(column => column.id !== id);
    return {
      ...state,
      columns,
      filterQueries: queries || [],
    };
  },
  OPEN_CONVERSATION: (state, action) => {
    const columns = [];
    for (let i = 0; i < state.columns.length; i++)
      columns.push({...state.columns[i]});
    let col = columns.filter(column => column.id === action.payload.timelineId)[0];
    const newColumns = columns.filter(column => column.id !== action.payload.timelineId);
    newColumns.push(Object.assign({}, col, {isConversationOpened: true}));
    return {
      ...state,
      columns: newColumns,
    };
  },
  CONNECT_FILTER_STREAM: (state, action) => {
    const { params } = action.payload;
    return {
      ...state,
      filterQueries: state.filterQueries.concat([params.q]),
    };
  },
  SHOW_FULLSCREEN_VIDEO: (state, action) => {
    const { soueces, currentTime } = action.payload;
    return {
      ...state,

    };
  },
};

export default handleActions(actions, defaultState);
