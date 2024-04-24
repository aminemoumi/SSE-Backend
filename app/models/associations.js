
//Muriel.
const User = require('./user');
const Role = require('./role');
const Event = require('./event.js');
const Criticality = require('./criticalityLevel');
const EventNature = require('./eventNature');
//Pierre.
const RiskLevel1 = require('./riskLevel1');
const RiskLevel2 = require('./riskLevel2');
const RiskLevel3 = require('./riskLevel3');
//Kumar.
const EventType = require('./eventType');
const EventOrigin = require('./eventOrigin');
const WorkPhase =  require('./workPhase.js');
const DetectionContext = require('./detectionContext');








//Association user-role
// un user a un rôle 
User.belongsTo(Role, 
  { 
    foreignKey: 'role_id', 
    as: 'role' 
  });

//La réciproque : un role a plusieurs utilisateurs
Role.hasMany(User, 
  { 
    foreignKey: 'role_id', 
    as: 'users' 
  });


//Association user-evenement
// un evenement à un déclarant 
Event.belongsTo(User, 
  { 
    as: 'user' 
  });


// La réciproque: Un déclarant a plusieurs évènements,c'est le même lien que la liaison précédente
User.hasMany(Event,
  {
    foreignKey:"user_id",
    as: "events"
  });



// Associations event-criticality
// Un événement a un seul niveau de criticité
Event.belongsTo(Criticality,
  {
    foreignKey:"criticality_id",
    as: "criticality"
  });

// La réciproque: un niveau de criticité a plusieurs évènements
Criticality.hasMany(Event,
  {
    foreignKey:"criticality_id",
    as: "events"
  });

// Associations event-event_nature
// Un événement a une seule nature d'évènement
Event.belongsTo(EventNature,
  {
    foreignKey:"event_nature_id",
    as: "event_nature"
  });
// La réciproque : une nature d'événement peut avoir plusieurs évènements
EventNature.hasMany(Event,
  {
    foreignKey:"event_nature_id",
    as: "events"
  });

// Associations évènement-niveau de rique 1
// Un événement a un seul niveau de risque 1
Event.belongsTo(RiskLevel1, 
  { 
    foreignKey: "risk_level_1_id",
    as: "risk_level1"
  });

// La réciproque: un niveau de risque a plusieurs événements
RiskLevel1.hasMany(Event, 
  { 
    foreignKey: "risk_level_1_id",
    as: "events"
  });

// Associations évènement-niveau de rique 2
// Un événement a un seul niveau de risque 2
Event.belongsTo(RiskLevel2,
  {
    foreignKey: "risk_level_2_id",
    as: "risk_level2"
  });

// la réciproque : Un niveau de risque a plusieurs événements
RiskLevel2.hasMany(Event,
  {
    foreignKey: "risk_level_2_id",
    as: "events"
  });


// Associations évènement-niveau de rique 3
// Un événement a un seul niveau de risque 3
Event.belongsTo(RiskLevel3,
  {
    foreignKey: "risk_level_3_id",
    as: "risk_level3"
  });

// la réciproque : Un niveau de risque a plusieurs événements
RiskLevel3.hasMany(Event,
  {
    foreignKey: "risk_level_3_id",
    as: "events"
  });

  
// Event <-> EventType
// Un événement a un eventType
Event.belongsTo(EventType, {
  foreignKey: "event_type_id",
  as: "event_type",
});
// la réciproque : Un eventType peut-être associé à plusieurs événements
EventType.hasMany(Event, {
  foreignKey: "event_type_id",
  as: "events",
});



// Event <-> DetectionContext
// Un événement a une qualification DetectionContext
Event.belongsTo(DetectionContext, {
  foreignKey: "detection_context_id",
  as: "detection_context",
});
// la réciproque : Une qualification DetectionContext peut-être associé à plusieurs événements
DetectionContext.hasMany(Event, {
  foreignKey: "detection_context_id",
  as: "events",
});



// Event <-> EventOrigin
// Un événement a une qualification EventOrigin
Event.belongsTo(EventOrigin, {
  foreignKey: "event_origin_id",
  as: "event_origin",
});
// la réciproque : Une qualification EventOrigin peut-être associé à plusieurs événements
EventOrigin.hasMany(Event, {
  foreignKey: "event_origin_id",
  as: "events",
});


// Event <-> WorkPhase
// Un événement a une qualification WorkPhase
Event.belongsTo(WorkPhase, {
  foreignKey: "work_phase_id",
  as: "work_phase",
});
// la réciproque : Une qualification WorkPhase peut-être associé à plusieurs événements
WorkPhase.hasMany(Event, {
  foreignKey: "work_phase_id",
  as: "events",
});


module.exports = { User, Role, Event, Criticality, EventNature, EventType, EventOrigin, DetectionContext, WorkPhase, RiskLevel3, RiskLevel2, RiskLevel1  }; 


  