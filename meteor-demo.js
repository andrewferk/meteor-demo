if (Meteor.isClient) {
  Session.set('currentStep', 'step2');

  Template.currentStep.renderedStep = function() {
    return Template[Session.get('currentStep')]();
  };

  Template.step1.events({
    'click #next-step': function(event) {
      Session.set('currentStep', 'step2');
    }
  });

  Template.step2.events({
    'click #next-step': function(event) {
      Session.set('currentStep', 'step3');
    }
  });
}
