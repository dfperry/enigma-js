var Stator = function (name, model, wiring) {
    'use strict';

    var baseWiring = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var self = this;

    self.wiring = wiring.toUpperCase();
    self.ring = 'A';
    self.ROTOR_SIZE = self.wiring.length;
    self.position = ko.observable(0);
    self.turnoverPositions = '';
    self.name = name;
    self.model = model;
    self.type = 'Stator';

    self.initialPosition = ko.observable('A');

    var map = {},
        rev = {};

    for( var i = 0, iLen = self.ROTOR_SIZE; i < iLen; i++ ) {
        map[i] = AToI(self.wiring.charAt(i));
    }
    for( i = 0; i < iLen; i++ ) {
        rev[map[i]] = i;
    }

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

    self.advance = function() {
        // make the first rotor always advance
        return true;
    };

    self.current = ko.computed(function () {
        return baseWiring[self.position()];
    });

    self.previous = ko.computed(function(){
        return baseWiring[(self.position() -1 + self.ROTOR_SIZE) % self.ROTOR_SIZE];
    });

    self.next = ko.computed(function(){
        return baseWiring[(self.position() +1 + self.ROTOR_SIZE) % self.ROTOR_SIZE];
    });

    self.encode = function(c, forward) {
        var i = AToI(c);
        var mapping = forward ? map : rev;
        var arrayVal = mapping[(self.position() + i < 0)
            ? (self.position() + i + self.ROTOR_SIZE )
            : (self.position() + i) % self.ROTOR_SIZE];
        return IToA((arrayVal - self.position() < 0) ? arrayVal - self.position() + self.ROTOR_SIZE : arrayVal - self.position() % self.ROTOR_SIZE);

    };

    // initialize
    self.reset();
};
