const { Op } = require('sequelize');
const Event = require('../models/event.js');
const User = require('../models/user');
const Criticality = require('../models/criticalityLevel');
const EventNature = require('../models/eventNature');
const Risklevel1 = require('../models/riskLevel1');
const Risklevel2 = require('../models/riskLevel2');
const Risklevel3 = require('../models/riskLevel3');
const EventType = require('../models/eventType');
const EventOrigin = require('../models/eventOrigin');
const WorkPhase =  require('../models/workPhase.js');
const DetectionContext = require('../models/detectionContext');


// Récuperer du front, le nom de l'entreprise concernée et  l'intervalle du temps
const statController = {
    
  getAllEventsInTimeIntervall : async (req, res) => {
    try {
      const {endDate, startDate, enterpriseName} = req.body;
      const referenceDate = new Date();

      let year = referenceDate.getFullYear(); // Récupère l'année
      let month = String(referenceDate.getMonth() + 1).padStart(2, '0'); // Récupère le mois et le formate en 2 chiffres
      let day = String(referenceDate.getDate()).padStart(2, '0'); // Récupère le jour du mois et le formate en 2 chiffres
      
      const today = `${year}-${month}-${day}`; // Formate la date en 'YYYY-MM-DD'
      console.log(req.body);
      console.log(enterpriseName);
      
      if (startDate > today) {
        return res.status(400).json({ error: "La date de début est postérieure à la date d'aujourd'hui" });
      }
      
      if (endDate > today) {
        return res.status(400).json({ error: "La date de fin est postérieure à la date d'aujourd'hui" });
      }

      if (!enterpriseName) {
        return res.status(400).json({ error: "Le nom de l'entreprise n'est pas fourni" });
      }

      // Récuperer les évèvenements crées dans le laps de temps définit pour l'entreprise nomée
      const AllEventsInTimeIntervall = await Event.findAll({
      
        include:[
          {model: User, 
            as : 'user', 
            where: {enterprise: enterpriseName}, 
            attributes: ['enterprise', 'firstname','lastname','position', 'process']},
          {model: Criticality, as : 'criticality', attributes:['frequency', 'gravity', 'criticality_note']},
          {model: EventNature, as : 'event_nature',attributes:['title'] },
          {model: Risklevel1, as : 'risk_level1', attributes:['title']},
          {model: Risklevel2 , as : 'risk_level2',attributes:['title'] },
          {model: Risklevel3, as : 'risk_level3',attributes:['title'] },
          {model: EventType, as : 'event_type',attributes:['title'] },
          {model: EventOrigin, as : 'event_origin',attributes: ['title'] },
          {model: WorkPhase, as : 'work_phase',attributes:['title'] },
          {model: DetectionContext, as : 'detection_context',attributes: ['title'] }
        ],
        where:{
          created_at:{[Op.between] : [endDate, startDate]}
        },
      });

      // transmettre la liste des évènements concernés avec seulement les intitulés au Front
      const allEventTitlesInTimeIntervall = AllEventsInTimeIntervall.map(titleEvent => {
        return {
          user: titleEvent.user.enterprise + ',' + titleEvent.user.firstname + ',' + titleEvent.user.lastname + ',' + titleEvent.user.position + ',' + titleEvent.user.process,
          criticality: titleEvent.criticality.frequency + ', ' + titleEvent.criticality.gravity + ', ' + titleEvent.criticality.criticality_note,
          event_nature: titleEvent.event_nature.title,
          risk_level1: titleEvent.risk_level1.title,
          risk_level2: titleEvent.risk_level2.title,
          risk_level3: titleEvent.risk_level3.title,
          event_type: titleEvent.event_type.title,
          event_origin: titleEvent.event_origin.title,
          work_phase: titleEvent.work_phase.title,
          detection_context: titleEvent.detection_context.title
        };
      } );

      // Doc MDN :
      //   var tableauFormaté = tableauOrig.map((obj) => {
      //     var rObj = {};
      //     rObj[obj.clé] = obj.valeur;
      //     return rObj;


      res.status(200).json({ message: "affichage de la liste d'évènements", allEventTitlesInTimeIntervall});
      
    
    } catch (error) {
      console.error(error);
      res.status(500).send("Une erreur s'est produite lors de la récupération des événements");
    }

  },

  getnumberEventsInTimeIntervall: async (req, res) => {
    try {
      const { endDate, startDate, enterpriseName } = req.body;
      const referenceDate = new Date();
      let year = referenceDate.getFullYear();
      let month = String(referenceDate.getMonth() + 1).padStart(2, '0');
      let day = String(referenceDate.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;

      if (startDate > today) {
        return res.status(400).json({ error: "La date de début est postérieure à la date d'aujourd'hui" });
      }
      if (endDate > today) {
        return res.status(400).json({ error: "La date de fin est postérieure à la date d'aujourd'hui" });
      }
      if (!enterpriseName) {
        return res.status(400).json({ error: "Le nom de l'entreprise n'est pas fourni" });
      }

      const eventCount = await Event.count({
        include: [
          {
            model: User,
            as: 'user',
            where: { enterprise: enterpriseName },
            attributes: [],
          },
        ],
        where: {
          created_at: { [Op.between]: [endDate, startDate] },
        },
      });

      res.status(200).json({ message: "Nombre d'événements dans l'intervalle de temps", count: eventCount });
    } catch (error) {
      console.error(error);
      res.status(500).send("Une erreur s'est produite lors de la récupération du nombre d'événements");
    }
  }
};


module.exports = statController;

// requête sql : 
// 'SELECT "Event"."id", "Event"."site_name", "Event"."site_number", "Event"."site_town", "Event"."witness", "Event"."event_description", "Event"."info_sse_description",
// "Event"."status_event", "Event"."corrective_action", "Event"."deadline_action", "Event"."action_pilot", "Event"."action_status", "Event"."user_id", "Event"."created_at", 
//"Event"."updated_at", "Event"."user_id" AS "userId", "Event"."criticality_id", "Event"."event_nature_id", "Event"."risk_level_1_id", "Event"."risk_level_2_id", 
//"Event"."risk_level_3_id", "Event"."event_type_id", "Event"."detection_context_id", "Event"."event_origin_id", "Event"."work_phase_id", "user"."id" AS "user.id", 
//"user"."enterprise" AS "user.enterprise", "user"."email" AS "user.email", "user"."password" AS "user.password", "user"."password_changed" AS "user.password_changed", 
//"user"."firstname" AS "user.firstname", "user"."lastname" AS "user.lastname", "user"."position" AS "user.position", "user"."process" AS "user.process", 
//"user"."role_id" AS "user.roleId", "user"."role_id" AS "user.role_id", "criticality"."id" AS "criticality.id", "criticality"."frequency" AS "criticality.frequency",
// "criticality"."gravity" AS "criticality.gravity", "criticality"."criticality_note" AS "criticality.criticality_note", "event_nature"."id" AS "event_nature.id", 
//"event_nature"."title" AS "event_nature.title", "risk_level1"."id" AS "risk_level1.id", "risk_level1"."title" AS "risk_level1.title", "risk_level2"."id" AS "risk_level2.id",
// "risk_level2"."title" AS "risk_level2.title", "risk_level3"."id" AS "risk_level3.id", "risk_level3"."title" AS "risk_level3.title", "event_type"."id" AS "event_type.id",
// "event_type"."title" AS "event_type.title", "event_origin"."id" AS "event_origin.id", "event_origin"."title" AS "event_origin.title", "work_phase"."id" AS "work_phase.id", 
//"work_phase"."title" AS "work_phase.title", "detection_context"."id" AS "detection_context.id", 
//"detection_context"."title" AS "detection_context.title" FROM "statement" AS "Event" LEFT OUTER JOIN "user" AS "user" ON "Event"."user_id" = "user"."id" 
// LEFT OUTER JOIN "criticality" AS "criticality" ON "Event"."criticality_id" = "criticality"."id" LEFT OUTER JOIN "event_nature" AS "event_nature" 
// ON "Event"."event_nature_id" = "event_nature"."id" LEFT OUTER JOIN "risk_level_1" AS "risk_level1" ON "Event"."risk_level_1_id" = "risk_level1"."id" 
//LEFT OUTER JOIN "risk_level_2" AS "risk_level2" ON "Event"."risk_level_2_id" = "risk_level2"."id" LEFT OUTER JOIN "risk_level_3" AS "risk_level3" 
// ON "Event"."risk_level_3_id" = "risk_level3"."id" LEFT OUTER JOIN "event_type" AS "event_type" ON "Event"."event_type_id" = "event_type"."id" 
// LEFT OUTER JOIN "event_origin" AS "event_origin" ON "Event"."event_origin_id" = "event_origin"."id" LEFT OUTER JOIN "work_phase" AS "work_phase" 
// ON "Event"."work_phase_id" = "work_phase"."id" LEFT OUTER JOIN "detection_context" AS "detection_context" 
//ON "Event"."detection_context_id" = "detection_context"."id";',