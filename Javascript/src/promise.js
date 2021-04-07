function getOrder(orderId) {
  return Promise.resolve({userId:35});
}

function getUser(userId) {
  return Promise.resolve({companyId:18});
}

function getCompany(companyId) {
  return Promise.resolve({name:'RoyTest'});
}

function getCourse(courseId) {
  const courses = {
    1: {name: "course 1"},
    2: {name: "course 2"},
    3: {name: "course 3"}
  }
  
  return Promise.resolve(courses[courseId]);
}

(function() {
  var sequence;
  var run = function(generator) {
    sequence = generator();
    var next = sequence.next();
  }

  var resume = function() {
    sequence.next();
  }

  window.async = {
    run: run,
    resume: resume
  }
}());

function pause(delay) {
  setTimeout(function() {
    console.log('paused for ' + delay + 'ms');
    async.resume();
  }, delay);
}