var AppVM = function() {
    'use strict';

    var enigma = new Enigma(config),
        input = ko.observable(''),
        output = ko.observable(''),
        preserveWhitespace = ko.observable(true);

    var filteredInput = ko.computed(function() {
        var string = input().replace(/[^a-zA-Z\s]/gmi, '');
        if( !preserveWhitespace() ) {
            string = string.replace(/\W+/g, '');
        }

        return string;
    });

    var models = ko.observableArray(['1', '2', '3']);
    var selectedModel = ko.observable();

    var loadConfigurations = function(config){
        for( var s = 0, sLen = config.stators.length; s < sLen; s++ ) {

        }
    };

    var init = function() {
        enigma.init();
        enigma.testConfig();

        //loadConfigurations(config);

    };

    var run = ko.computed(function () {
        output(enigma.encode(filteredInput(), preserveWhitespace()));
    });

    return {
        init: init,
        input: input,
        preserveWhitespace: preserveWhitespace,
        output: output,
        enigma: enigma,

        models: models,
        selectedModel: selectedModel

    }
};
