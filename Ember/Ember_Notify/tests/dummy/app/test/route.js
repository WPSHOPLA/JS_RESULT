import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    notifyFromRoute: function() {
      this.notify.success('It worked!');
    }
  }
});
