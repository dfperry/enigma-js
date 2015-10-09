var Reflector = function(name, model, base, wiring, turnoverPositions, ring) {
    RotatingComponent.apply(this, arguments);

    var self = this;
    self.type = 'Reflector';

    var map = {},
        turnoverMap = [];

    for( var i = 0, iLen = self.ROTOR_SIZE; i < iLen; i++ ) {
        map[i] = AToI(self.wiring.charAt(i));
    }

    for( var t = 0, tLen = self.turnoverPositions.length; t < tLen; t++) {
        turnoverMap.push(AToI(turnoverPositions[t]));
    }

    self.advance = function() {
        self.position( (self.position() + 1 ) % self.wiring.length);
        return turnoverMap.indexOf(self.position()) > -1;
    };

    self.encode = function(c) {
        var i = AToI(c);
        var arrayVal = map[(self.position() + i < 0)
            ? (self.position() + i + self.ROTOR_SIZE )
            : (self.position() + i) % self.ROTOR_SIZE];
        return IToA((arrayVal - self.position() < 0) ? arrayVal - self.position() + self.ROTOR_SIZE : arrayVal - self.position() % self.ROTOR_SIZE);
    };

    self.reset();

    self.clone = function() {
        return new Reflector(name, model, base, wiring, turnoverPositions, ring);
    }
};

