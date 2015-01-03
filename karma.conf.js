module.exports = function(config){
  config.set({

    basePath : './',

    exclude: [
      'test/server/**',
      'test/**/*e2e*'
    ],

    files : [
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/views/**/*.js',
      'client/auth/**/*.js',
      'client/models/**/*.js',
      'test/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-beep-reporter'
    ],

    reporters: [
      'progress',
//      'beep',
//      'junit'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
