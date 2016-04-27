var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var AudioActions = {
  updateLikes: function(key) {
    AppDispatcher.dispatch({
      ActionType: 'update_likes',
      data: key,
    });
  },

  changeSort: function (order, user) {
    WebAPIUtils.getListData(order, user);
  },

  getNextPage: function (order, page, user) {
    WebAPIUtils.getNextPage(order, page, user);
  },

  setCurrentSong: function (song, isLiked) {
    AppDispatcher.dispatch({
      ActionType: 'set_current_song',
      data: song,
      isLiked: isLiked,
    });
  },

}

module.exports = AudioActions;
