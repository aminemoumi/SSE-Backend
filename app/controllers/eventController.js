const User = require('../models/user');
const Event = require('../models/event.js');

const eventController = {
  getEventPage: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [
          {model: User, as: 'user'}
        ]
      });
      res.status(200).json({ message: 'Evénements transmis', events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getOneEvent: async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) {
        return res.status(400).json({ error: "Please provide ID type integer" });
      }
      const event = await Event.findByPk(eventId, {
        include: [
          {model: User, as: 'user'}
        ]
      });
      if (!event) {
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
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Please provide ID type integer" });
      }
      const events = await Event.findAll({
        where: { user_id: userId },
        include: [
          {model: User, as: 'user'}
        ]
      });
      if (!events) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json({ message: 'Evénements transmis', events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const {
        site_name,
        site_number,
        site_town,
        witness,
        event_description,
        info_sse_description
      } = req.body;

      const requiredFields = ['site_name', 'site_number', 'site_town', 'event_description'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Les champs suivants sont obligatoires : ${missingFields.join(', ')}` });
      }

      const userId = req.user.userId;

      const eventData = {
        site_name,
        site_number,
        site_town,
        witness,
        event_description,
        info_sse_description,
        user_id: userId
      };

      await Event.create(eventData);
      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'événement' });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const body = req.body;
      if (isNaN(eventId)) {
        return res.status(400).json({ error: "please provide valid ID" });
      }

      const eventToModify = await Event.findByPk(eventId);
      if (!eventToModify) {
        return res.status(404).json({ error: "Event not found" });
      }

      const updatedEvent = await Event.update({
        site_name: body.site_name || eventToModify.site_name,
        site_number: body.site_number || eventToModify.site_number,
        site_town: body.site_town || eventToModify.site_town,
        witness: body.witness || eventToModify.witness,
        event_description: body.event_description || eventToModify.event_description,
        info_sse_description: body.info_sse_description || eventToModify.info_sse_description,
        user_id: body.user_id
      },
      {
        where: {
          id: eventId
        }
      });

      if (updatedEvent[0] === 1) {
        res.json({ message: "L'événement a été mis à jour avec succès" });
      } else {
        res.status(404).json({ error: "L'événement n'a pas été trouvé ou n'a pas été mis à jour" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) {
        return res.status(400).json({error: "Please provide an integer type ID"});
      }
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      await event.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = eventController;
