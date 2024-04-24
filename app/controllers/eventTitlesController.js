// const User = require('../models/user');
// const Event = require('../models/event.js');
const Criticality = require('../models/criticalityLevel');
const EventNature = require('../models/eventNature');
const Risklevel1 = require('../models/riskLevel1');
// const Risklevel2 = require('../models/riskLevel2');
// const Risklevel3 = require('../models/riskLevel3');
const EventType = require('../models/eventType');
const EventOrigin = require('../models/eventOrigin');
const WorkPhase =  require('../models/workPhase.js');
const DetectionContext = require('../models/detectionContext');




const eventTitlesController = {

  getWorkPhaseTitles: async (req, res) => {
    try {
      // Récupérer tous les titres des phases de travail
      const workPhaseTitles = await WorkPhase.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = workPhaseTitles.map(phase => {
        return {
          id: phase.id,
          title: phase.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      // console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  getEventOriginTitles: async (req, res) => {
    try {
      // Récupérer tous les titres des phases de travail
      const eventOriginTitles = await EventOrigin.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = eventOriginTitles.map(origin => {
        return {
          id: origin.id,
          title: origin.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      // console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getDetectionContextTitles: async (req, res) => {
    try {
      // Récupérer tous les titres des phases de travail
      const detectionContextTitles = await DetectionContext.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = detectionContextTitles.map(origin => {
        return {
          id: origin.id,
          title: origin.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      // console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getEventTypeTitles: async (req, res) => {
    try {
      // Récupérer tous les titres des phases de travail
      const eventTypeTitles = await EventType.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = eventTypeTitles.map(eventType => {
        return {
          id: eventType.id,
          title: eventType.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      //console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  getCriticalityInfos : async (req, res) => {
    try {
      // Récupérer tous les titres des niveaux de criticité
      const criticalityTypeInfos = await Criticality.findAll({
        attributes: ['id','gravity','frequency','criticality_note'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const infosDetails = criticalityTypeInfos.map(criticality => {
        return {
          id: criticality.id,
          gravity: criticality.gravity,
          frequency: criticality.frequency,
          criticality_note: criticality.criticality_note,
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(infosDetails);
      // console.log(infosDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



  getEventNatureTitles : async (req, res) => {
    try {
      // Récupérer tous les titres de nature des évènement
      const eventNatureTitles = await EventNature.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = eventNatureTitles.map(eventNature => {
        return {
          id: eventNature.id,
          title: eventNature.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      // console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getRiskLevel1 : async (req, res) => {
    try {
      // Récupérer tous les titres des risques niveau 1 des évènements
      const getRiskLevel1 = await Risklevel1.findAll({
        attributes: ['id','title'] // Sélectionner les attributs pertinents
      });
      
      // Créer un tableau d'objets contenant les détails des titres
      const titleDetails = getRiskLevel1.map(riskLevel => {
        return {
          id: riskLevel.id,
          title: riskLevel.title,
             
        };
      });
                  
      // Renvoyer les titres avec les détails sous forme de tableau JSON
      res.status(200).json(titleDetails);
      // console.log(titleDetails);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  // Code pour une évolution à venir de l'application : pour l'instant pas de liste déroulante pour les risques niveau 2
  // getRiskLevel2 : async (req, res) => {
  //   try {
  //     // Récupérer tous les titres des risques niveau 2 des évènements
  //     const getRiskLevel2 = await Risklevel2.findAll({
  //       attributes: ['id','title'] // Sélectionner les attributs pertinents
  //     });
      
  //     // Créer un tableau d'objets contenant les détails des titres
  //     const titleDetails = getRiskLevel2.map(riskLevel => {
  //       return {
  //         id: riskLevel.id,
  //         title: riskLevel.title,
             
  //       };
  //     });
                  
  // Renvoyer les titres avec les détails sous forme de tableau JSON
  // res.status(200).json(titleDetails);
  // console.log(titleDetails);
  //   } 
  //   catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  


  // Code pour une évolution à venir de l'application : pour l'instant pas de liste déroulante pour les risques niveau 3
  // getRiskLevel3 : async (req, res) => {
  //   try {
  //     // Récupérer tous les titres des risques niveau 3 des évènements
  //     const getRiskLevel3 = await Risklevel3.findAll({
  //       attributes: ['id','title'] // Sélectionner les attributs pertinents
  //     });
      
  //     // Créer un tableau d'objets contenant les détails des titres
  //     const titleDetails = getRiskLevel3.map(riskLevel => {
  //       return {
  //         id: riskLevel.id,
  //         title: riskLevel.title,
             
  //       };
  //     });
                  
  // Renvoyer les titres avec les détails sous forme de tableau JSON
  // res.status(200).json(titleDetails);
  // console.log(titleDetails);
  //   } 
  //   catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }


};


module.exports = eventTitlesController;