var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var UserInfoStore = require('../stores/UserInfoStore.js');

var _audio = WebAPIUtils.getListData('date');
var _user = {success: false};
var _currentSong = null;
var _isCurrentSongLiked = false;

function updateLike(info) {
  WebAPIUtils.updateLike(info);
  _user = UserInfoStore.getUser();
  let index = findSong(info.post);
  if (_audio[index].isLiked === true) {
    _audio[index].isLiked = false;
    let idex = _user.user.liked.indexOf(info.post);
    _user.user.liked.splice(idex, 1);
  } else {
    _audio[index].isLiked = true;
    _user.user.liked.push(info.post);
  };
}

function findSong(id) {
  for (var i = 0, len = _audio.length; i < len; i++) {
    if (_audio[i]._id === id) {
      return i;  
    } 
  };
}

function setCurrentSong(song, isLiked) {
  if (song === null) {
    _isCurrentSongLiked = isLiked;
  } else {
    _currentSong = song;
    _isCurrentSongLiked = isLiked;
  };
}

function checkIfLiked(audioList) {
  _user = UserInfoStore.getUser();
  if (_user.success === true && _user.user.liked.length >= 1) {
    let liked = _user.user.liked;
    for (var key in audioList) {
      for (var i = 0, len = liked.length; i < len; i++) {
        if (liked[i] === audioList[key]._id ) {
          console.log(liked[i], audioList[key]._id);
          audioList[key].isLiked = true;
          break;
        } else {
          continue;
        }
      }; 
    };
    _audio = audioList;
  };
    _audio = audioList;
}

var AudioStore = assign({}, EventEmitter.prototype, {
  getList: function () {
    return _audio;
  },

  getCurrentSong: function () {
    return _currentSong;
  },

  getIsLiked: function () {
    return _isCurrentSongLiked;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});


AppDispatcher.register(function(action) {
  switch (action.ActionType) {

    case 'update_likes':
      updateLike(action.data);
      AudioStore.emitChange();
      break;

    case 'new_list_data':
      checkIfLiked(action.data);
      AudioStore.emitChange();
      break;

    case 'set_current_song':
      setCurrentSong(action.data, action.isLiked);
      AudioStore.emitChange();
      break;


    default: //
  }
});

module.exports = AudioStore;
