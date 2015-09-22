var Connection = function(c1, c2) {
    var self = this;

    self.left = c1;
    self.right = c2;

    self.matches = function(conn) {
        if( conn ) {
            if( self.left.toUpperCase() == conn.toUpperCase() ||
                self.right.toUpperCase() == conn.toUpperCase() ) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    self.isValid = function() {
        return self.left && self.right && self.left !== self.right;
    }
};

var Plugboard = function() {
    'use strict';

    var self = this;

    self.connections = ko.observableArray([]);

    self.newConnection = ko.observable(new Connection());

    self.addConnection = function() {

        if( self.newConnection() || self.newConnection().isValid() ) {
            var connection = new Connection(
                self.newConnection().left.toUpperCase(),
                self.newConnection().right.toUpperCase());

            // check to see if either ch is already saved, remove any existing pairs
            var filtered = [];
            for( var i = 0, len = self.connections().length; i < len; i++ ) {
                var tmp = self.connections()[i];
                if( !tmp.matches(connection.left) && !tmp.matches(connection.right) ) {
                    filtered.push(tmp);
                }
            }
            filtered.push(connection);

            self.connections(filtered);
            self.newConnection(new Connection());
        }
    };

    self.removeConnection = function() {
        self.connections.remove(this)
    };

    self.clear = function() {
        self.connections([]);
    };

    self.map = function(ch) {
        var match = null;
        for(var i = 0, len = self.connections().length; i < len; i++ ) {
            var tmp = self.connections()[i];
            if( tmp.matches(ch) ) {
                match = tmp;
                break;
            }
        }
        if( match ) {
            return (match.left == ch ? match.right : match.left);
        }
        else {
            return ch;
        }
    };
    
    self.connectionString = ko.computed({
        read: function() {
            var s = '';
            for(var i = 0, len = self.connections().length; i < len; i++ ) {
                var tmp = self.connections()[i];
                s += tmp.left + tmp.right + ' ;'
            }
            return s.trim();
        },
        write: function(val) {
            self.clear();
            if( val ) {
                var pairs = val.split(' ');
                for( var i = 0, len = pairs.length; i < len; i++ ) {
                    if( pairs[i].length === 2 ) {
                        self.addConnection(pairs[i][0], pairs[i][1]);
                    }
                }
            }
        }
    })
};
