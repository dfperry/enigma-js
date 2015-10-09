var RotatingComponent = function(name, model, base, wiring, turnoverPositions, ring) {
    'use strict';

    var baseWiring = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var self = this;

    self.wiring = wiring.toUpperCase();
    self.ring = ring || 'A';
    self.ROTOR_SIZE = self.wiring.length;
    self.position = ko.observable(0);
    self.turnoverPositions = turnoverPositions ? turnoverPositions.toUpperCase() : '';
    self.name = name;
    self.model = model;
    self.base = base;
    self.type = 'unknown';

    self.state = ko.observable('');

    var initialPosition = ko.observable('A');
    self.initialPosition = ko.computed({
        read: function() {
            return initialPosition();
        },
        write: function(val) {
            if(val && val.length == 1 && (self.wiring.indexOf(val.toUpperCase()) > -1)) {
                initialPosition(val.toUpperCase());
            }
        }
    });

    self.isValid = ko.computed(function() {
        if( !self.wiring ) {
            return false;
        }
        else {
            // check that all letters are present in wiring string
            var sorted = self.wiring.split('').sort().join('');
            return sorted == baseWiring;
        }
    });

    self.reset = function() {
        self.move(self.initialPosition());
    };

    self.move = function(ch) {
        self.position(baseWiring.indexOf(ch));
    };

    self.advance = function(fromPrevious) {
        throw new Error('abstract method');
    };

    self.current = ko.computed({
        read:function () {
            return baseWiring[self.position()];
        },
        write: function(val) {
            self.move(val);
        }
    });

    self.previous = ko.computed(function(){
        return baseWiring[(self.position() -1 + self.ROTOR_SIZE) % self.ROTOR_SIZE];
    });

    self.next = ko.computed(function(){
        return baseWiring[(self.position() +1 + self.ROTOR_SIZE) % self.ROTOR_SIZE];
    });

    self.encode = function(c, forward) {
        throw new Error('abstract method');
    };

    self.clone = function() {
        throw new Error('abstract method');
    }

};
