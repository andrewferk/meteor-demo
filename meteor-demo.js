if (Meteor.isClient) {
  Session.set('currentStep', 4);
  
  var currentStep = function() {
    return Session.get('currentStep');
  };
  
  var nextStep = function() {
    return Session.get('currentStep') + 1;
  };
  
  var prevStep = function() {
    return Session.get('currentStep') - 1;
  };

  Template.currentStep.renderedStep = function() {
    return Template['step' + currentStep()]();
  };

  Template.nav.isNotFirst = function() {
    return currentStep() !== 0;
  };
  
  Template.nav.isNotLast = function() {
    return Template['step' + nextStep()] !== undefined;
  };
  
  Template.nav.nextStep = function() {
    return nextStep();
  };
  
  Template.nav.prevStep = function() {
    return prevStep();
  }

  Template.nav.events({
    'click #next-step': function(event) {
      Session.set('currentStep', nextStep());
    },
    'click #prev-step': function(event) {
      Session.set('currentStep', prevStep());
    }
  });
}
