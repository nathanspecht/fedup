ApiUtil = {
  fetchFeeds: function(params) {
    $.ajax({
      url: 'api/feeds/index',
      type: 'get',
      dataType: 'json',
      data: { params: params },
      success: function(feeds) {
        ApiActions.receiveAll(feeds);
      }
    });
  }
};
