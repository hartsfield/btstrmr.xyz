var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AudioStore = require('../stores/AudioStore.js');

const WebAPIUtils = {
  getInitialData: function () {
    $.ajax({
      url: '/api/getInitialData',
      type: 'GET',
      dataType: 'json',
      data: {"hello":"world"},
      success: function (data, textStatus, jqXHR) {
        AppDispatcher.dispatch({
          ActionType: 'newList',
          data: data,
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // error callback
      }
    }); 
  },

    updateLike: function (key) {
     $.post('/api/updateLikes',
       { key: key },
       function (data, textStatus, jqXHR) {
         //
       }
     );
    },
};

module.exports = WebAPIUtils;






