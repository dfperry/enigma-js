var Enigma = function(config) {
    'use strict';

    var self = this;

    var masterRotors = [];
    var masterReflectors = [];
    var masterStators = [];

    var selectedReflector = ko.observable(null);
    var selectedRotors = ko.observableArray([]);
    var selectedStator = ko.observable(null);

    var availableRotors = ko.observableArray([]);
    var availableReflectors = ko.observableArray([]);
    var availableStators = ko.observableArray([]);

    var plugboard = ko.observable(new Plugboard());

    var models = ko.observableArray([]);
    var selectedModel = ko.observable('', false);

    selectedModel.subscribe(function (val) {

        if( val) {
            // update rotors
            var rotors = [];
            var rotorModels = [];
            // first pass gets the matching rotors and names of base models
            for( var r = 0, rLen = masterRotors.length; r < rLen; r++) {
                var rotor = masterRotors[r];
                if( rotor.model == val || !rotor.model) {
                    rotors.push(rotor);

                    // grab base model names
                    for( var rm = 0, rmLen = rotor.base.length; rm < rmLen; rm++ ) {
                        if(rotorModels.indexOf(rotor.base[rm]) == -1) {
                            rotorModels.push(rotor.base[rm]);
                        }
                    }
                }
            }
            // second pass gets rotors matching the base models
            if( rotorModels.length > 0 ) {
                for( r = rLen-1; r >=0; r-- ) {
                    rotor = masterRotors[r];
                    if(rotorModels.indexOf(rotor.model) !== -1) {
                        rotors.unshift(rotor);
                    }
                }
            }
            availableRotors(rotors);
            // clear out the previous selection
            selectedRotors([]);
            // grab at most the last 3 rotors in the list
            for( r = rotors.length-1; (r >=0) && (r > rotors.length-4); r--) {
                selectedRotors.unshift(rotors[r].clone());
            }

            // update the stators
            var stators = [];
            var statorModels = [];
            // first pass gets the matching stators and names of base models
            for( var s = 0, sLen = masterStators.length; s < sLen; s++) {
                var stator = masterStators[s];
                if( stator.model == val || !stator.model) {
                    stators.push(stator);

                    // grab base model names
                    for( var sm = 0, smLen = stator.base.length; sm < smLen; sm++ ) {
                        if(statorModels.indexOf(stator.base[sm]) == -1) {
                            statorModels.push(stator.base[sm]);
                        }
                    }
                }
            }
            // second pass gets stators matching the base models
            if( statorModels.length > 0 ) {
                for( s = sLen-1; s >=0; s-- ) {
                    stator = masterStators[r];
                    if(statorModels.indexOf(stator.model) !== -1) {
                        stators.unshift(stator);
                    }
                }
            }
            availableStators(stators);
            selectedStator(stators[0]);

            // update the reflectors
            var reflectors = [];
            var reflectorModels = [];
            // first pass gets the matching reflectors and names of base models
            for( var f = 0, fLen = masterReflectors.length; f < fLen; f++) {
                var reflector = masterReflectors[f];
                if( reflector.model == val || !reflector.model) {
                    reflectors.push(reflector);

                    // grab base model names
                    for( var fm = 0, fmLen = reflector.base.length; fm < fmLen; fm++ ) {
                        if(reflectorModels.indexOf(reflector.base[fm]) == -1) {
                            reflectorModels.push(reflector.base[fm]);
                        }
                    }
                }
            }
            // second pass gets reflectors matching the base models
            if( reflectorModels.length > 0 ) {
                for( f = fLen-1; f >=0; f-- ) {
                    reflector = masterReflectors[f];
                    if(reflectorModels.indexOf(reflector.model) !== -1) {
                        reflectors.unshift(reflector);
                    }
                }
            }
            availableReflectors(reflectors);
            selectedReflector(reflectors[0]);
        }

    });

    var init = function() {
        for(var rot = 0, rotLen = config.rotors.length; rot < rotLen; rot++) {
            var rotor = config.rotors[rot];
            masterRotors.push(
                new Rotor(rotor.name, rotor.model, rotor.base, rotor.wiring, rotor.turnoverPositions));

            if(rotor.model && models.indexOf(rotor.model) == -1) {
                models.push(rotor.model);
            }
        }
        for(var ref = 0, refLen = config.reflectors.length; ref < refLen; ref++) {
            var reflector = config.reflectors[ref];
            masterReflectors.push(
                new Reflector(reflector.name, reflector.model, reflector.base, reflector.wiring, reflector.turnoverPositions));

            if(reflector.model && models.indexOf(reflector.model) == -1) {
                models.push(reflector.model);
            }
        }
        for(var sta = 0, staLen = config.stators.length; sta < staLen; sta++) {
            var stator = config.stators[sta];
            masterStators.push(new Stator(stator.name, stator.model, stator.base, stator.wiring));

            if(stator.model && models.indexOf(stator.model) == -1) {
                models.push(stator.model);
            }
        }

    };

    var styleRotor = function(rotor, state) {
        rotor.state(state);
        (function(rotor) {
            setTimeout(function() {
                rotor.state('');
            }, 500);
        })(rotor);
    };

    var addRotor = function(rotor) {
        var found = false;

        for( var i = 0, len = selectedRotors().length; i < len; i++ ) {
            if( selectedRotors()[i].name == rotor.name ) {
                found = true;
                styleRotor(rotor, 'bg-warning');
                styleRotor(selectedRotors()[i], 'bg-warning')
                break;
            }
        }

        if(!found) {
            var clone = rotor.clone();
            selectedRotors.push(clone);
            styleRotor(rotor, 'bg-success');
            styleRotor(clone, 'bg-success')
        }

    };

    var removeRotor = function(rotor) {
        selectedRotors.remove(rotor);
        for( var i = 0, len = availableRotors().length; i < len; i++ ) {
            if( availableRotors()[i].name == rotor.name ) {
                styleRotor(availableRotors()[i], 'bg-danger')
                break;
            }
        }

    };

    var reset = function () {
        if( selectedStator() ) {
            selectedStator().reset();
        }
        for( var i = 0, len = selectedRotors().length; i < len; i++ ) {
            selectedRotors()[i].reset();
        }
        if( selectedReflector() ) {
            selectedReflector().reset();
        }
    };

    var advanceRotors = function() {
        var rLen = selectedRotors().length;

        var advance = selectedStator().advance();

        for( var r = rLen-1; r >=0; r--) {
            advance = selectedRotors()[r].advance(advance);
        }
    };


    var encode = function(string, preserveWhitespace) {

        reset();

        // cleanup input
        string = string.replace(/[^a-zA-Z\W]/gmi, '');

        if( !preserveWhitespace) {
            string = string.replace(/\W+/g, '');
        }

        var message = '';
        for( var i = 0, len = string.length; i < len; i++) {

            var r = 0,
                rLen = selectedRotors().length,
                log = '';

            var c = string.charAt(i);

            if( preserveWhitespace && /\W/.test(c)) {
                message += c;
                continue;
            }

            advanceRotors();

            // print the current rotor positions
            log += '[' + selectedReflector().current() + ' ';
            for(r = rLen-1; r >=0; r--) {
                log += selectedRotors()[r].current();
            }
            log += ' ' + selectedStator().current() + '] ';

            log += c + ' > ';

            var encoded = '';
            // filter through the plugboard
            encoded = plugboard().map(c);

            // pass the message from stator to reflector
            encoded = selectedStator().encode(encoded, false);
            log += '[' + encoded + '] > ';

            for(r = rLen-1; r >=0; r--) {
                encoded = selectedRotors()[r].encode(encoded, false);
                log += encoded + ' > ';
            }

            // pass the message through the reflector
            encoded = selectedReflector().encode(encoded, false);
            log += '(' + encoded + ') > ';

            // pass the message back
            for(r = 0; r < rLen; r++) {
                encoded = selectedRotors()[r].encode(encoded, true);
                log += encoded + ' > ';
            }

            // pass the message back through the stator
            encoded = selectedStator().encode(encoded, true);
            log += '[' + encoded + ']';
            console.log(log);

            // filter through the plugboard
            encoded = plugboard().map(encoded);

            message += encoded;

            if( !preserveWhitespace ) {
                // group the message into 5-char parts
                if( i > 0 && (i+1) % 5 == 0 ) {
                    message += ' ';
                }
            }
        }

        return message;
    };
    
    return {
        availableReflectors: availableReflectors,
        availableRotors: availableRotors,
        availableStators: availableStators,
        encode: encode,
        models: models,
        selectedModel: selectedModel,
        init: init,
        plugboard: plugboard,
        selectedReflector: selectedReflector,
        selectedRotors: selectedRotors,
        selectedStator: selectedStator,
        addRotor: addRotor,
        removeRotor: removeRotor
    }
};
