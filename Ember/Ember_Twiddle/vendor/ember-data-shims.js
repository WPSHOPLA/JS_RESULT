(function() {
  function generateLazyModule(namespace, name, globalName) {
    define(name, [], function() {
      'use strict';

      var exportObject = {};

      if (typeof globalName === 'object') {
        for (var i = 0, l = globalName.length; i < l; i++) {
          exportObject[globalName[i]] = window[namespace][globalName[i]];
        }
      } else {
        exportObject['default'] = (globalName !== '') ? window[namespace][globalName] : window[namespace];
      }

      return exportObject;
    });
  }

  function processEmberDataShims() {
    var shims = {
      'ember-data':                          '',
      'ember-data/model':                    'Model',
      'ember-data/serializers/rest':         'RESTSerializer',
      'ember-data/serializers/active-model': 'ActiveModelSerializer',
      'ember-data/serializers/json':         'JSONSerializer',
      'ember-data/serializers/json-api':     'JSONAPISerializer',
      'ember-data/adapters/json-api':        'JSONAPIAdapter',
      'ember-data/adapters/rest':            'RESTAdapter',
      'ember-data/adapter':                  'Adapter',
      'ember-data/adapters/active-model':    'ActiveModelAdapter',
      'ember-data/store':                    'Store',
      'ember-data/transform':                'Transform',
      'ember-data/attr':                     'attr',
      'ember-data/relationships':            ['hasMany', 'belongsTo']
    };

    for (var moduleName in shims) {
      generateLazyModule('DS', moduleName, shims[moduleName]);
    }
  }

  processEmberDataShims();
})();
