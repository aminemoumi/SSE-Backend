const User = require('../models/user');
const Event = require('../models/event.js');
const Criticality = require('../models/criticalityLevel');
const EventNature = require('../models/eventNature');
const Risklevel1 = require('../models/riskLevel1');
const Risklevel2 = require('../models/riskLevel2');
const Risklevel3 = require('../models/riskLevel3');
const EventType = require('../models/eventType');
const EventOrigin = require('../models/eventOrigin');
const WorkPhase =  require('../models/workPhase.js');
const DetectionContext = require('../models/detectionContext');

const eventController = 
{
  //Cette methode pour récupérer tous les événements
  
  /**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupération de tous les événements
 *     description: Récupère une liste de tous les événements, y compris les détails.
 *     responses:
 *       200:
 *         description: Une liste de tous les événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Erreur interne du serveur
 */
  getEventPage : async (req, res) => {
    try {
      const events = await Event.findAll({
        include:[
          {model: User, as : 'user'},
          {model: Criticality, as : 'criticality'},
          {model: EventNature, as : 'event_nature' },
          {model: Risklevel1, as : 'risk_level1' },
          {model: Risklevel2 , as : 'risk_level2' },
          {model: Risklevel3, as : 'risk_level3' },
          {model: EventType, as : 'event_type' },
          {model: EventOrigin, as : 'event_origin' },
          {model: WorkPhase, as : 'work_phase' },
          {model: DetectionContext, as : 'detection_context' }
        ]
      }
      );
      // Renvoyer les evenements au client au format JSON
      res.status(200).json({ message: 'Evénements transmis', events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //----------------------------------------------------------------------
  //Cette methode pour récupérer un seul evenement grâce à son ID.

  /**
 * @swagger
 *   /api/events/{id}:
 *     get:
 *       summary: Récupère un événement spécifique
 *       description: Récupère un événement spécifique par son ID, y compris les détails de l'utilisateur, la criticité, la nature de l'événement, les niveaux de risque, le type d'événement, l'origine de l'événement, la phase de travail et le contexte de détection.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: L'ID de l'événement à récupérer
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Un événement spécifique
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Event'
 *         400:
 *           description: Vous devez fournir un id de type integer
 *         404:
 *           description: Événement pas trouvé
 *         500:
 *           description: Erreur interne du serveur
 */
  getOneEvent : async (req, res) => {
    try {
      const eventId = parseInt(req.params.id); // Récupérer l'ID de l'evenement à trouver
      if (isNaN(eventId)) { // Si c'est pas un nombre => rejette 400
        return res.status(400).json({ error: "Please provide ID type integer" });
      }
      const event = await Event.findByPk(eventId, {
        include:[
          {model: User, as : 'user'},
          {model: Criticality, as : 'criticality'},
          {model: EventNature, as : 'event_nature' },
          {model: Risklevel1, as : 'risk_level1' },
          {model: Risklevel2 , as : 'risk_level2' },
          {model: Risklevel3, as : 'risk_level3' },
          {model: EventType, as : 'event_type' },
          {model: EventOrigin, as : 'event_origin' },
          {model: WorkPhase, as : 'work_phase' },
          {model: DetectionContext, as : 'detection_context' }
        ]
      }); // On récupère l'evenement dans la db); // On récupère l'evenement dans la db
      if (!event) { // Si elle existe pas ==> 404
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json({ message: 'Evénement transmis', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  getEventsByUserId: async (req, res) => {
    try {
      const userId = parseInt(req.params.id); // Récupérer l'ID de l'utilisateur
      if (isNaN(userId)) { // Si c'est pas un nombre => rejette 400
        return res.status(400).json({ error: "Please provide ID type integer" });
      }
      const events = await Event.findAll({ where: { user_id: userId },
        include:[
          {model: User, as : 'user'},
          {model: Criticality, as : 'criticality'},
          {model: EventNature, as : 'event_nature' },
          {model: Risklevel1, as : 'risk_level1' },
          {model: Risklevel2 , as : 'risk_level2' },
          {model: Risklevel3, as : 'risk_level3' },
          {model: EventType, as : 'event_type' },
          {model: EventOrigin, as : 'event_origin' },
          {model: WorkPhase, as : 'work_phase' },
          {model: DetectionContext, as : 'detection_context' }
        ] 
      }); // On récupère l'evenement dans la db
      if (!events) { // Si elle existe pas ==> 404
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json({ message: 'Evénements transmis', events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //------------------------------------------------------------------------------------
  createEvent: async (req, res) => {
    try {
      // Récupérer les données de la requête
      const {
        site_name,
        site_number,
        site_town,
        witness,
        event_description,
        info_sse_description,
        criticality_id,
        event_nature_id,
        risk_level_1_id,
        risk_level_2_id,
        risk_level_3_id,
        event_type_id,
        detection_context_id,
        event_origin_id,
        work_phase_id,
        status_event,
        action_status,
        corrective_action,
        deadline_action,
        action_pilot,
      } = req.body;
  
      // Vérifier si les champs obligatoires (not null) sont bien présents
      const requiredFields = ['site_name', 'site_number', 'site_town', 'event_description', 'event_nature_id', 'detection_context_id', 'work_phase_id'];
  
      // Vérifier si les champs obligatoires sont présents dans la requête
      const missingFields = requiredFields.filter(field => !req.body[field]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Les champs suivants sont obligatoires : ${missingFields.join(', ')}` });
      }
  
      const userId = req.user.userId;
      
      // Créer un objet contenant uniquement les champs obligatoires
      const eventData = {
        site_name,
        site_number,
        site_town,
        event_description,
        user_id: userId,
        event_nature_id,
        detection_context_id,
        work_phase_id,
        status_event,
        action_status,
        event_type_id,
        
      };
  
      // Ajouter les champs facultatifs s'ils sont définis dans la requête
      if (typeof risk_level_1_id !== 'undefined') {
        eventData.risk_level_1_id = risk_level_1_id;
      }
  
      if (typeof risk_level_2_id !== 'undefined') {
        eventData.risk_level_2_id = risk_level_2_id;
      }
  
      if (typeof risk_level_3_id !== 'undefined') {
        eventData.risk_level_3_id = risk_level_3_id;
      }
  
      if (typeof criticality_id !== 'undefined') {
        eventData.criticality_id = criticality_id;
      }
  
      if (typeof witness !== 'undefined') {
        eventData.witness = witness;
      }
  
      if (typeof info_sse_description !== 'undefined') {
        eventData.info_sse_description = info_sse_description;
      }
  
      if (typeof event_type_id !== 'undefined') {
        eventData.event_type_id = event_type_id;
      }

      if (typeof corrective_action !== 'undefined') {
        eventData.corrective_action = corrective_action;
      }
      
      if (deadline_action !== null) {
        eventData.deadline_action = deadline_action;
      }
      
      if (typeof action_pilot !== 'undefined') {
        eventData.action_pilot = action_pilot;
      }

      if (typeof event_origin_id !== 'undefined') {
        eventData.event_origin_id = event_origin_id;
      }
  
      // Créer l'événement dans la base de données
      await Event.create(eventData);
  
      // Envoyer la réponse avec l'événement créé
      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'événement' });
    }
  },
  
  //-------------------------------------------------------------------------

  //Cette methode pour mettre à jour un événement.
  updateEvent : async (req, res) => {
    try {
      const eventId = parseInt(req.params.id); // Récupérer l'ID de l'evement à update
      const body = req.body;
      if (isNaN(eventId)) { // Si ID non valide => 400
        return res.status(400).json({ error: "please " });
      }
           
      const eventToModify = await Event.findByPk(eventId); // On récupère l'evenement dans la db
      if (!eventToModify) { // Si elle existe pas ==> 404
        return res.status(404).json({ error: "Event not found" });
      }
    
      // Méthode pour update() = set() + save()
      const updatedEvent = await Event.update({ 
  

        site_name : body.site_name || eventToModify.site_name,
        site_number: body.site_number || eventToModify.site_number,
        town: body.town || eventToModify.town,
        witness: body.witness || eventToModify.witness,
        event_description: body.event_description || eventToModify.event_description,
        info_sse_description: body.info_sse_description || eventToModify.info_sse_description,
        status_event: body.status_event || eventToModify.status_event,
        corrective_action: body.corrective_action || eventToModify.corrective_action,
        deadline_action: body.deadline_action || eventToModify.deadline_action,
        action_pilot: body.action_pilot || eventToModify.action_pilot,
        action_status: body.action_status || eventToModify.action_status,
        user_id: body.user_id,
        criticality_id: body.criticality_id || eventToModify.criticality,
        event_nature_id: body.event_nature_id || eventToModify.event_nature,
        risk_level_1_id: body.risk_level_1_id || eventToModify.risk_level_1,
        risk_level_2_id: body.risk_level_2_id || eventToModify.risk_level_2,
        risk_level_3_id: body.risk_level_3_id || eventToModify.risk_level_3,
        event_type_id: body.event_type_id || eventToModify.event_type,
        detection_context_id: body.detection_context_id || eventToModify.detection_context,
        event_origin_id: body.event_origin_id || eventToModify.event_origin,
        work_phase_id: body.work_phase_id || eventToModify.work_phase

      },
      {
        where: {
          id: eventId
        }
      }
      );
    
      // Si l'événement a été mis à jour avec succès
      if (updatedEvent[0] === 1) {
      // Message de confirmation dans la réponse
        res.json({ message: "L'événement a été mis à jour avec succès" });
      } else {
      // Evénement non mis à jour = erreur 404
        res.status(404).json({ error: "L'événement n'a pas été trouvé ou n'a pas été mis à jour" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  //--------------------------------------------------------------------------
  //Cette methode pour supprimer un seul evenement grâce à son ID.
  deleteEvent : async (req, res) => {
    try{
      //Récupérer l'ID dans les params
      const eventId = parseInt(req.params.id); 

      // Récuperer l'ID de l'evenement a trouver dans la db
      if (isNaN(eventId)){ //Si  ce n'est pas un nombre, alors on rejette avec une 400
        return res.status(400).json({error : "Please provide an integer type ID"});
      }
      // On récupere l'evenement dans la DB
      const event = await Event.findByPk(eventId); 
      if (!event) {
        return res.status(404).json({ error: "Votre evenement ne figure pas dans notre base" });
      }
      // Si l'Id de l'evenement est bien present en DB, alors on supprime ce dernier.      
      await event.destroy(); 
      // On termine la requête sans envoyer de body. 
      res.status(204).end();   
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = eventController; 
