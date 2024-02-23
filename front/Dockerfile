# Utilisez l'image Node.js en tant qu'image de base
FROM node:21-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers du front-end dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Commande par défaut à exécuter lorsque le conteneur démarre
CMD ["npm", "run dev"]
