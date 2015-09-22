var AppVM = function() {
    'use strict';

    var enigma = new Enigma(config),
        input = ko.observable(),
        output = ko.observable();

    var init = function() {
        enigma.init();
        enigma.testConfig();
    };

    var run = function() {
        output(enigma.encode(input()));
    };

    return {
        init: init,
        input: input,
        output: output,
        enigma: enigma,
        run: run

    }
};
