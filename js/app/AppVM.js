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

    var init = function() {
        enigma.init();
        enigma.testConfig();
    };

    var run = ko.computed(function () {
        output(enigma.encode(filteredInput(), preserveWhitespace()));
    });

    return {
        init: init,
        input: input,
        preserveWhitespace: preserveWhitespace,
        output: output,
        enigma: enigma

    }
};
