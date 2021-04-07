describe('Promises', function() {
  it('should execute the call back given to then', function(done) {
    var promise = new Promise(function(resolve, reject) {
      resolve();
    })

    promise.then(function() {
      done();
    });
  });

  it('should fail when rejected', function(done) {
    var promise = new Promise(function(resolve,reject) {
      reject(Error('oh noes!'));
    });

    promise.then(function() {
      // success  
    }, function(error) {
      expect(error.message).toBe('oh noes!');
      done();
    })
  });

  it('should have a catch', function(done) {
    var promise = Promise.reject(Error('oh noes!'));
    
    promise.catch(function(error) {
      expect(error.message).toBe('oh noes!');
      done();
    });
  });

  it('should compose when resolved with a promise', function(done) {
    var previousPromise = Promise.resolve(3);
    var promise = Promise.resolve(previousPromise);

    promise.then(function(data){
      expect(data).toBe(3);
      done();
    });
  });

  it('should be async', function(done) {
    let async = false;

    var promise = Promise.resolve();

    promise.then(function() {
      expect(async).toBe(true);
      done();
    })

    async = true;
  });

  it('should chain sequentially using then', function(done) {
    getOrder(3)
    .then((order) => getUser(order.userId))
    .then((user) => getCompany(user.companyId))
    .then((company) => {
      expect(company.name).toBe('RoyTest');
      done();
    }).catch((error) => {
      // handle error
    });
  });

  it('should execute after all promises with all', function(done) {
    let courseIds = [1,2,3];
    let promises = [];
    for(let i=0; i<courseIds.length; i++) {
      promises.push(getCourse(courseIds[i]));
    }

    Promise.all(promises).then(function(values) {
      expect(values.length).toBe(3);
      done();
    });
  });

  it('should resolve after the first promise', function(done) {
    let courseIds = [1,2,3];
    let promises = [];
    for(let i=0; i<courseIds.length; i++) {
      promises.push(getCourse(courseIds[i]));
    }

    Promise.race(promises).then(function(firstValue) {
      //resolve after first promise
      expect(firstValue.name).toBeDefined();
      done();
    });
  });
});