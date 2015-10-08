var Reflector = function (name, model, base, wiring, turnoverPositions, ring) {
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
    self.type = 'Reflector';

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

    var map = {},
        turnoverMap = [];


    for( var i = 0, iLen = self.ROTOR_SIZE; i < iLen; i++ ) {
        map[i] = AToI(self.wiring.charAt(i));
    }

    for( var t = 0, tLen = self.turnoverPositions.length; t < tLen; t++) {
        turnoverMap.push(AToI(turnoverPositions[t]));
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
        self.position( (self.position() + 1 ) % self.wiring.length);
        return turnoverMap.indexOf(self.position()) > -1;
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

    self.encode = function(c) {
        var i = AToI(c);
        var arrayVal = map[(self.position() + i < 0)
            ? (self.position() + i + self.ROTOR_SIZE )
            : (self.position() + i) % self.ROTOR_SIZE];
        return IToA((arrayVal - self.position() < 0) ? arrayVal - self.position() + self.ROTOR_SIZE : arrayVal - self.position() % self.ROTOR_SIZE);
    };

    // initialize
    self.reset();

    self.clone = function() {
        return new Reflector(name, model, base, wiring, turnoverPositions, ring);
    }
};
