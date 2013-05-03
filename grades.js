Grades = new Meteor.Collection('grades');
Grades.allow({
  insert: function (userId, doc) {
    return (userId && doc.score);
  }
});

if (Meteor.isServer) {
  Meteor.publish('avgGrade', function() {
    var scoreWeight = {'A': 100, 'B': 90, 'C': 80, 'D': 70, 'F': 60};
    var invWeight = {'100': 'A', '90': 'B', '80': 'C', '70': 'D', '60': 'F'};
    var initializing = true,
        self = this,
        total = 0,
        count = 0,
        avg = 0;
  
    var handle = Grades.find().observeChanges({
      added: function (id, fields) {
        total += scoreWeight[fields.score];
        count++;
        if (!initializing) {
          var newAvg = Math.round((total / count) / 10) * 10;
          if (avg != newAvg) {
            avg = newAvg;
            self.changed('avgGrade', 'score', {score: invWeight[avg.toString()]});
          }
        }
      }
    });
  
    avg = Math.round((total / count) / 10) * 10;
    initializing = false;
    self.added('avgGrade', 'score', {score: invWeight[avg.toString()]});
    self.ready();
  
    self.onStop(function() {
      handle.stop();
    });
  });
}

if (Meteor.isClient) {
  AvgGrade = new Meteor.Collection('avgGrade');
  Meteor.subscribe('avgGrade');

  Template.grades.grades = function() {
    return Grades.find({});
  };

  Template.grades.avgGrade = function() {
    var avg = AvgGrade.find().fetch()[0];
    if (avg)
      return avg.score;
  };

  Template.grades.events({
    'submit #grade-form': function(event) {
      event.preventDefault();
      Grades.insert({
        score: $('#grade-score').val(),
        comment: $('#grade-comment').val()
      });
    }
  });
}
