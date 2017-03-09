import Ember from 'ember';

const { inject, $ } = Ember;

const CONFIRM_MSG = "Unsaved changes will be lost.";

export default Ember.Route.extend({
  notify: inject.service('notify'),
  app: inject.service(),
  fastboot: inject.service(),

  titleToken: Ember.computed.readOnly('controller.model.description'),

  beforeModel () {
    return this.session.fetch('github-oauth2').catch(function() {
      // Swallow error for now
    });
  },

  activate() {
    if (this.get('fastboot.isFastBoot')) {
      return;
    }
    this.set('boundConfirmUnload', this.confirmUnload.bind(this));
    $(window).on('beforeunload', this.get('boundConfirmUnload'));
  },

  deactivate() {
    var gist = this.controller.get('model');
    if (gist.get('isNew')) {
      this.get('store').unloadRecord(gist);
    }
    if (!this.get('fastboot.isFastBoot')) {
      $(window).off('beforeunload', this.get('boundConfirmUnload'));
    }
  },

  confirmUnload(event) {
    if (this.get('controller.unsaved') === true) {
      if (!window.confirm(CONFIRM_MSG)) {
        event.preventDefault();
      }
      return CONFIRM_MSG; // for Chrome
    }
  },

  actions: {
    saveGist (gist) {
      var newGist = gist.get('isNew');
      if (!newGist && gist.get('ownerLogin') !== this.get('session.currentUser.login')) {
        this.send('fork', gist);
        return;
      }
      gist.save().then(() => {
        this.get('notify').info(`Saved to Gist ${gist.get('id')} on Github`);
        this.send('setSaved');
        if(newGist) {
          gist.set('gistId', gist.get('id'));
          this.transitionTo('gist.edit', gist);
        }
      }).catch((this.catchSaveError.bind(this)));
    },

    deleteGist (gist) {
      if(confirm(`Are you sure you want to remove this gist from Github?\n\n${gist.get('description')}`)) {
        gist.destroyRecord();
        this.transitionTo('gist.new').then(() => {
          this.get('notify').info(`Gist ${gist.get('id')} was deleted from Github`);
        });
      }
    },

    setSaved () {
      this.get('controller').set('unsaved', false);
    },

    fork (gist) {
      gist.fork().then((response) => {
        this.get('store').find('gist', response.id).then((newGist) => {
          gist.get('files').toArray().forEach((file) => {
            file.set('gist', newGist);
          });
          newGist.set('gistId', response.id);
          return newGist.save().then(() => {
            this.send('setSaved');
            return this.transitionTo('gist.edit', newGist);
          });
        });
      }).catch(this.catchForkError.bind(this));
    },

    copy () {
      this.transitionTo('gist.new', {
        queryParams: {
          copyCurrentTwiddle: true
        }
      });
    },

    signInViaGithub () {
      this.session.open('github-oauth2').catch(function(error) {
        if (alert) {
          alert('Could not sign you in: ' + error.message);
        }
        throw error;
      });
    },

    signOut () {
      this.session.close();
    },

    showTwiddles: function() {
      this.transitionTo('twiddles');
    },

    urlChanged: function(newUrl) {
      this.get('app').postMessage({ newUrl });
    }
  },

  catchForkError(error) {
    if (error && error.errors) {
      let firstError = error.errors[0];
      if (firstError.code === "unprocessable" && firstError.field === "forks") {
        this.get('notify').error("You already own this gist.");
        return;
      }
    }
    this.get('notify').error("Something went wrong. The gist was not forked.");
    throw error;
  },

  catchSaveError(error) {
    if (error && error.errors) {
      let firstError = error.errors[0];
      if (firstError.code === "unprocessable") {
        this.get('notify').error("The gist is invalid, and could not be saved.");
        return;
      }
      if (firstError.code === "missing_field") {
        this.get('notify').error("The contents of a file is completely empty, so the gist could not be saved.");
        return;
      }
    }
    this.get('notify').error("Something went wrong. The gist was not saved.");
    throw error;
  }
});
