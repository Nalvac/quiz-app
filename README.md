Voici une version améliorée de votre fichier `README.md` :

```markdown
# Nom du Projet

Ce projet a été réalisé par Amine Fajry, Nalvac Atinhounon et Nadia Schwaller (Pairprogramming 99% du temps suite à un problème de pc).

## Configuration

Pour configurer le projet, créez un fichier `.env` à la racine du dossier du serveur avec le contenu suivant :

```env
OPENAI_API_KEY=your_openai_api_key
```
```
Dans notre projet de défi quiz, vous avez la possibilité de créer une salle de jeux privée dans laquelle vous pouvez participer en tant 
qu'administrateur, ou une salle publique. En tant qu'administrateur de la salle, vous êtes le seul à pouvoir lancer le jeu. Dans la salle publique, le jeu démarre dès qu'il y a au moins deux joueurs.
Veuillez noter qu'en raison d'éventuels problèmes de stabilité, il peut parfois être nécessaire de rafraîchir la page.
```

## Comment exécuter le projet avec docker compose

```
docker-compose up --build
```

### Frontend

Pour exécuter le frontend, suivez les étapes suivantes :

1. Installez les dépendances avec la commande suivante :

```bash
npm install
```

2. Lancez le serveur de développement avec la commande suivante :

```bash
npm run dev
```

### GameInterface

Dans le dossier, Installez les dépendances avec la commande suivante :

```bash
npm install
```

### Backend

Pour exécuter le backend, suivez les étapes suivantes :

1. Installez les dépendances avec la commande suivante :

```bash
npm install
```

2. Lancez le serveur avec la commande suivante :

```bash
npm run start
```

### Docker

Alternativement, vous pouvez exécuter le projet avec Docker en utilisant la commande suivante :

```bash
docker-compose up
```
