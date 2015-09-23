var Enigma = function(config) {
    'use strict';

    var self = this;

    self.availableRotors = ko.observableArray([]);
    self.availableReflectors = ko.observableArray([]);
    self.availableStators = ko.observableArray([]);

    self.selectedReflector = ko.observable(null);
    self.selectedRotors = ko.observableArray([]);
    self.selectedStator = ko.observable(null);

    self.plugboard = new Plugboard();

    self.init = function() {
        for(var rot = 0, rotLen = config.rotors.length; rot < rotLen; rot++) {
            var rotor = config.rotors[rot];
            self.availableRotors.push(
                new Rotor(rotor.name, rotor.model, rotor.wiring, rotor.turnoverPositions));
        }
        for(var ref = 0, refLen = config.reflectors.length; ref < refLen; ref++) {
            var reflector = config.reflectors[ref];
            self.availableReflectors.push(
                new Reflector(reflector.name, reflector.model, reflector.wiring, reflector.turnoverPositions));
        }
        for(var sta = 0, staLen = config.stators.length; sta < staLen; sta++) {
            var stator = config.stators[sta];
            self.availableStators.push(new Stator(stator.name, stator.model, stator.wiring));
        }

    };

    self.testConfig = function() {
        self.selectedStator(self.availableStators()[2]);
        self.selectedReflector(self.availableReflectors()[3]);
        self.selectedRotors.push(self.availableRotors()[9]);
        self.selectedRotors.push(self.availableRotors()[10]);
        self.selectedRotors.push(self.availableRotors()[11]);
    };

    var reset = function () {
        if( self.selectedStator() ) {
            self.selectedStator().reset();
        }
        for( var i = 0, len = self.selectedRotors().length; i < len; i++ ) {
            self.selectedRotors()[i].reset();
        }
        if( self.selectedReflector() ) {
            self.selectedReflector().reset();
        }
    };


    self.encode = function(string) {

        reset();

        // cleanup input
        string = string.replace(/[^a-zA-Z]/gmi, '').replace(/\W+/g, '');

        var message = '';
        for( var i = 0, len = string.length; i < len; i++) {

            var r = 0,
                rLen = self.selectedRotors().length,
                log = '';

            // advance the rotors
            var advance = true;
            for( r = 0; r < rLen && advance; r++) {
                if( advance ) {
                    advance = self.selectedRotors()[r].advance();
                }
            }

            // print the current rotor positions
            log += '[' + self.selectedReflector().current() + ' ';
            for(r = rLen-1; r >=0; r--) {
                log += self.selectedRotors()[r].current();
            }
            log += ' ' + self.selectedStator().current() + '] ';

            var c = string.charAt(i);
            log += c + ' > ';

            var encoded = '';
            // filter through the plugboard
            encoded = self.plugboard.map(c);

            // pass the message from stator to reflector
            encoded = self.selectedStator().encode(encoded, false);
            log += '[' + encoded + '] > ';

            for(r = 0; r < rLen;r++) {
                encoded = self.selectedRotors()[r].encode(encoded, false);
                log += encoded + ' > ';
            }

            // pass the message through the reflector
            encoded = self.selectedReflector().encode(encoded, false);
            log += '(' + encoded + ') > ';

            // pass the message back
            for(r = rLen-1; r >=0; r--) {
                encoded = self.selectedRotors()[r].encode(encoded, true);
                log += encoded + ' > ';
            }

            // pass the message back through the stator
            encoded = self.selectedStator().encode(encoded, true);
            log += '[' + encoded + ']';
            console.log(log);

            // filter through the plugboard
            encoded = self.plugboard.map(encoded);

            message += encoded;

            // group the message into 5-char parts
            if( i > 0 && (i+1) % 5 == 0 ) {
                message += ' ';
            }
        }

        return message;
    };
};
