describe('async generators', function() {

    it('should be easier to read with generators', function(done) {
      function* main() {
        console.log('start');
        yield pause(100);
        console.log('middle');
        yield pause(100);
        console.log('end');

        done();
      }

      async.run(main);
    });
});