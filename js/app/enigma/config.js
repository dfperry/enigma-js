var config = {
    rotors: [
        {
            name: 'IC',
            model: 'Commercial',
            base: [],
            wiring: 'DMTWSILRUYQNKFEJCAZBPGXOHV',
            turnoverPositions: 'Q'
        },
        {
            name: 'IIC',
            model: 'Commercial',
            base: [],
            wiring: 'HQZGPJTMOBLNCIFDYAWVEUSRKX',
            turnoverPositions: 'E'
        },
        {
            name: 'IIIC',
            model: 'Commercial',
            base: [],
            wiring: 'UQNTLSZFMREHDPXKIBVYGJCWOA',
            turnoverPositions: 'V'
        },
        {
            name: 'I',
            model: 'German Railway',
            base: [],
            wiring: 'JGDQOXUSCAMIFRVTPNEWKBLZYH',
            turnoverPositions: 'Q'
        },
        {
            name: 'II',
            model: 'German Railway',
            base: [],
            wiring: 'NTZPSFBOKMWRCJDIVLAEYUXHGQ',
            turnoverPositions: 'E'
        },
        {
            name: 'III',
            model: 'German Railway',
            base: [],
            wiring: 'JVIUBHTCDYAKEQZPOSGXNRMWFL',
            turnoverPositions: 'V'
        },
        {
            name: 'I-K',
            model: 'Swiss K',
            base: [],
            wiring: 'PEZUOHXSCVFMTBGLRINQJWAYDK',
            turnoverPositions: 'Q'
        },
        {
            name: 'II-K',
            model: 'Swiss K',
            base: [],
            wiring: 'ZOUESYDKFWPCIQXHMVBLGNJRAT',
            turnoverPositions: 'E'
        },
        {
            name: 'III-K',
            model: 'Swiss K',
            base: [],
            wiring: 'EHRVXGAOBQUSIMZFLYNWKTPDJC',
            turnoverPositions: 'V'
        },
        {
            name: 'I',
            model: 'Enigma I',
            base: [],
            wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
            turnoverPositions: 'Q'
        },
        {
            name: 'II',
            model: 'Enigma I',
            base: [],
            wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
            turnoverPositions: 'E'
        },
        {
            name: 'III',
            model: 'Enigma I',
            base: [],
            wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
            turnoverPositions: 'V'
        },
        {
            name: 'IV',
            model: 'M3 Army',
            base: ['Enigma I'],
            wiring: 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
            turnoverPositions: 'J'
        },
        {
            name: 'V',
            model: 'M3 Army',
            base: ['Enigma I'],
            wiring: 'VZBRGITYUPSDNHLXAWMJQOFECK',
            turnoverPositions: 'Z'
        },
        {
            name: 'VI',
            model: 'M3 / M4 Naval',
            base: ['Enigma I', 'M3 Army'],
            wiring: 'JPGVOUMFYQBENHZRDKASXLICTW',
            turnoverPositions: 'ZM'
        },
        {
            name: 'VII',
            model: 'M3 / M4 Naval',
            base: ['Enigma I', 'M3 Army'],
            wiring: 'NZJHGRCXMYSWBOUFAIVLPEKQDT',
            turnoverPositions: 'ZM'
        },
        {
            name: 'VIII',
            model: 'M3 / M4 Naval',
            base: ['Enigma I', 'M3 Army'],
            wiring: 'FKQHTLXOCBJSPDZRAMEWNIUYGV',
            turnoverPositions: 'ZM'
        },
        {
            name: 'Beta',
            model: 'M4 R2',
            base: ['Enigma I'],
            wiring: 'LEYJVCNIXWPBQMDRTAKZGFUHOS',
            turnoverPositions: 'Q'
        },
        {
            name: 'Gamma',
            model: 'M4 R2',
            base: ['Enigma I'],
            wiring: 'FSOKANUERHMBTIYCWLQPZXVGJD',
            turnoverPositions: 'E'
        }
    ],
    reflectors: [ // UKW
        {
            name: 'UKW',
            model: 'German Railway',
            base: [],
            wiring: 'QYHOGNECVPUZTFDJAXWMKISRBL',
            turnoverPositions: ''
        },
        {
            name: 'UKW-K',
            model: 'Swiss K',
            base: [],
            wiring: 'IMETCGFRAYSQBZXWLHKDVUPOJN',
            turnoverPositions: ''
        },
        {
            name: 'Reflector A',
            model: '',
            base: [],
            wiring: 'EJMZALYXVBWFCRQUONTSPIKHGD',
            turnoverPositions: ''
        },
        {
            name: 'Reflector B',
            model: '',
            base: [],
            wiring: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
            turnoverPositions: ''
        },
        {
            name: 'Reflector C',
            model: '',
            base: [],
            wiring: 'FVPJIAOYEDRZXWGCTKUQSBNMHL',
            turnoverPositions: ''
        },
        {
            name: 'Reflector B Thin (M4 R1)',
            model: 'M3 / M4 Naval',
            base: ['Enigma I', 'M3 Army'],
            wiring: 'ENKQAUYWJICOPBLMDXZVFTHRGS',
            turnoverPositions: ''
        },
        {
            name: 'Reflector C Thin (M4 R1)',
            model: 'M3 / M4 Naval',
            base: ['Enigma I', 'M3 Army'],
            wiring: 'RDOBJNTKVEHMLFCWZAXGYIPSUQ',
            turnoverPositions: ''
        }
    ],
    stators: [ // ETW
        {
            name: 'ETW',
            model: 'German Railway',
            base: [],
            wiring: 'QWERTZUIOASDFGHJKPYXCVBNML'
        },
        {
            name: 'ETW-K',
            model: 'Swiss K',
            base: [],
            wiring: 'QWERTZUIOASDFGHJKPYXCVBNML'
        },
        {
            name: 'ETW',
            model: '',
            base: [],
            wiring: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }
    ]
};
