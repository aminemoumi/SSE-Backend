# Image de production de l'API SUIVI SSE
FROM node:20-alpine
WORKDIR /app

# On copie d'abord les fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./
RUN npm ci --omit=dev

COPY app ./app
COPY index.js ./

ENV NODE_ENV=production
EXPOSE 4000

# Lancement direct avec node (nodemon n'est utile qu'en développement)
CMD ["node", "index.js"]
