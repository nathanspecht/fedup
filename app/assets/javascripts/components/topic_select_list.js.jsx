TopicSelectList = React.createClass({

    getInitialState: function() {
      return { topics: FeedStore.allTopics() };
    },

    _updateTopics: function() {
      this.setState({topics: FeedStore.allTopics()});
    },

    componentDidMount: function() {
      FeedStore.addChangeListener(this._updateTopics);
    },

    componentWillUnmount: function() {
      FeedStore.removeChangeListener(this._updateTopics);
    },

    selectTopic: function(topicName) {
      ApiActions.selectTopic(topicName);
    },

    deselectTopic: function(topicName) {
      ApiActions.deselectTopic(topicName);
    },

    render: function() {
      var imgClass;
      var clickAction;

      return (
        <div className="collection-select">
            { Object.keys(this.state.topics).map(function(topicName) {
              if (FeedStore.isSelectedTopic(topicName)) {
                imgClass = "check-icon";
                clickAction = this.deselectTopic.bind(this, topicName);
              } else {
                imgClass = "hidden";
                clickAction = this.selectTopic.bind(this, topicName);
              }
              return(
                <div className="collection-option"
                     key={topicName}
                     onClick={clickAction}>
                  {topicName}
                <img className={imgClass} src="checkmark.png" />
                </div>
              );
            }.bind(this)) }
        </div>
      );
    }
});
