var Stator = function(name, model, base, wiring) {
    RotatingComponent.apply(this, arguments);

    var self = this;
    self.type = 'Stator';

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

    self.advance = function() {
        // make the first rotor always advance
        return true;
    };

    self.encode = function(c, forward) {
        var i = AToI(c);
        var mapping = forward ? map : rev;
        var arrayVal = mapping[(self.position() + i < 0)
            ? (self.position() + i + self.ROTOR_SIZE )
            : (self.position() + i) % self.ROTOR_SIZE];
        return IToA((arrayVal - self.position() < 0) ? arrayVal - self.position() + self.ROTOR_SIZE : arrayVal - self.position() % self.ROTOR_SIZE);
    };

    self.reset();

    self.clone = function() {
        return new Stator(name, model, base, wiring);
    }
};

