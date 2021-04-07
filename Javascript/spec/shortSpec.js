describe('MISC tests', function() {
  describe('is function', function() {
    it('should consider positive and negative zero to be different', function() {
      expect(0 === -0).toBe(true);
      expect(Object.is(0,-0)).toBe(false);
    })

    it('should consider NaN to be NaN', function() {
      expect(NaN === NaN).toBe(false);
      expect(Object.is(NaN,NaN)).toBe(true);
    })
  })

  describe('assign function', function() {
    it('should apply mixins to objects', function() {
      const shark = {
        bite: function(target) {
          target.hurt = true;
        }
      };

      const person = {};

      const laser = {
        pewpew: function(target) {
          target.exploded = true;
        }
      };

      Object.assign(shark, laser);

      shark.pewpew(person);
      expect(person.exploded).toBe(true);
    });
  });

  describe('shorthand', function () {
    it('should create properties from local variables', function() {
      const model = 'Ford', year = 1969;

      const Classic = {model,year};

      expect(Classic.model).toBe('Ford');
      expect(Classic.year).toBe(1969);
    });

    it('should create methods using shorthand', function() {
      const server = {
        getPort() {  //getPort: function() {}
          return 8000;
        }
      }

      expect(server.getPort()).toBe(8000);
    });

    it('should support concatenation', function() {
      function createTriumvirate(first, second, third) {
        return {
          ['member_' + first.name]: first,
          ['member_' + second.name]: second,
          ['member_' + third.name]: third
        };
      }

      const Joe = {name: 'Joe'}, Ralph = {name: 'Ralph'}, Harry = {name: 'Harry'};

      const tri = createTriumvirate(Joe,Ralph,Harry);
      expect(tri.member_Joe).toBe(Joe);
    });
  });

  describe('Proxies', function(){
    it('should let you intercept gets', function() {
      const unicorn = { legs: 4, color: 'brown', horn: true};

      const proxyUnicorn = new Proxy(unicorn, {
        get(target, property) {
          if(property === 'color') {
            return 'awesome ' + target[property];
          } else {
            return target[property];
          }
        }
      });

      expect(proxyUnicorn.legs).toBe(4);
      expect(proxyUnicorn.color).toBe('awesome brown');
    });

    it('should let you intercept sets', function() {
      const unicorn = { legs: 4, color: 'brown', horn: true};

      const proxyUnicorn = new Proxy(unicorn, {
        set(target, property, value) {
          if(property === 'horn' && value === false) {
            console.log('unicorn cannot ever lose its horn!');
          } else {
            target[property] = value;
          }
        }
      });

      proxyUnicorn.color = 'white';
      proxyUnicorn.horn = false;
      expect(proxyUnicorn.color).toBe('white');
      expect(proxyUnicorn.horn).toBe(true);
    });

    it('should let you proxy functions', function(){
      const unicorn = { 
        legs: 4, 
        color: 'brown', 
        horn: true,
        hornAttack: function(target) {
          return target.name + ' was obliterated!';
        }
      };
      unicorn.hornAttack = new Proxy(unicorn.hornAttack, {
        apply: function(target, context, args) {
          if(context !== unicorn) {
            return 'nobody can use unicorn horn but unicorn!';
          } else {
            return target.apply(context, args);
          }
        }
      });

      const thief = {name: 'Rupert'};
      thief.hornAttack = unicorn.hornAttack;
      expect(thief.hornAttack()).toBe('nobody can use unicorn horn but unicorn!');
      expect(unicorn.hornAttack(thief)).toBe('Rupert was obliterated!');
    });
  });

  describe('string extraction', function() {
    it('regex', function() {
      const originalString = `https://farm4.staticflickr.com - - [01/jul/1995:00:00:12 -0400] "GET /3894/15008518202_c265dfa55f_h.gif http/1.0" 200 40310`;

      const hasValidGifRegex = new RegExp('GET (.)*\\.gif (.)*\" 200', 'i');
      const fileNameRegex = new RegExp("([^/])*\\.gif", 'i');

      if (originalString.match(hasValidGifRegex).length) {
        expect(fileNameRegex.exec(originalString)[0]).toBe('15008518202_c265dfa55f_h.gif');
        console.log(originalString.split(' '));
      }
    });
  });
});