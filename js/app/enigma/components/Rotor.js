var Rotor = function(name, model, base, wiring, turnoverPositions, ring) {
    RotatingComponent.apply(this, arguments);

    var self = this;
    self.type = 'Rotor';

    var map = {},
        rev = {},
        turnoverMap = [];

    for( var i = 0, iLen = self.ROTOR_SIZE; i < iLen; i++ ) {
        map[i] = AToI(self.wiring.charAt(i));
    }
    for( i = 0; i < iLen; i++ ) {
        rev[map[i]] = i;
    }

    for( var t = 0, tLen = self.turnoverPositions.length; t < tLen; t++) {
        turnoverMap.push(AToI(turnoverPositions[t]));
    }

    self.advance = function(fromPrevious) {
        var advanceNext = false;
        if( fromPrevious || turnoverMap.indexOf(self.position()) > -1) {
            advanceNext = turnoverMap.indexOf(self.position()) > -1;
            self.position( (self.position() + 1 ) % self.wiring.length);
        }

        return advanceNext;
    };

    self.encode = function(c, forward) {
        var i = AToI(c);
        var mapping = forward ? map : rev;
        var arrayVal = mapping[(self.position() + i < 0)
            ? (self.position() + i + self.ROTOR_SIZE )
            : (self.position() + i) % self.ROTOR_SIZE];
        return IToA((arrayVal - self.position() < 0) ? arrayVal - self.position() + self.ROTOR_SIZE : arrayVal - self.position() % self.ROTOR_SIZE);
    };

    self.clone = function() {
        return new Rotor(name, model, base, wiring, turnoverPositions, ring);
    }
};
