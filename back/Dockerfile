FROM node:18

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json
COPY package*.json ./

# Installez les dépendances
# RUN npm cache clean --force
# RUN npm install

# # Recompilez les modules natifs
# RUN npm rebuild

# Copiez tout le contenu de votre projet dans le conteneur
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
