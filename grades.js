Grades = new Meteor.Collection('grades');

if (Meteor.isClient) {
  Template.grades.grades = function() {
    return Grades.find({}, {sort: {'_id': -1}});
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
