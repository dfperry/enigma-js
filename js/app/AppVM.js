var AppVM = function() {
    'use strict';

    var enigma = new Enigma(config),
        filteredInput = ko.observable(),
        input = ko.observable(),
        changed = ko.observable(false),
        output = ko.observable();

    input.subscribe(function (val) {
        val = val.replace(/[^a-zA-Z]/gmi, '').replace(/\W+/g, '');
        changed(changed() || (val != filteredInput()));
        filteredInput(val);
        input(val);
    });

    var init = function() {
        enigma.init();
        enigma.testConfig();
    };



    var run = function() {
        if( changed() ) {
            changed(false);
            output(enigma.encode(filteredInput()));
        }
    };

    return {
        init: init,
        input: input,
        output: output,
        enigma: enigma,
        run: run

    }
};
