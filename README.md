# EventFire

Application web full-stack de gestion d'événements construite avec la stack **MERN** (MongoDB, Express, React, Node.js).

---

## Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Structure du projet](#structure-du-projet)
- [Lancer le projet](#lancer-le-projet)
  - [1. Démarrer la base de données (Docker)](#1-démarrer-la-base-de-données-docker)
  - [2. Lancer le Backend](#2-lancer-le-backend)
  - [3. Lancer le Frontend](#3-lancer-le-frontend)
- [Variables d'environnement](#variables-denvironnement)
- [API Backend](#api-backend)
- [Scripts disponibles](#scripts-disponibles)
- [Auteur](#auteur)

---

## Aperçu du projet

**EventFire** est une application permettant de créer, gérer et consulter des événements. Le projet adopte une architecture découplée :

- Un **backend REST API** en Node.js/Express qui gère la logique métier et communique avec MongoDB.
- Un **frontend React** qui consomme l'API via Axios.
- Une instance **MongoDB** isolée dans un conteneur Docker.

---

## Stack technique

| Couche          | Technologie                    | Version  |
|-----------------|--------------------------------|----------|
| Runtime         | Node.js                        | >= 18    |
| Backend         | Express.js                     | ^5.2.1   |
| Base de données | MongoDB (via Mongoose)         | ^9.3.0   |
| Auth            | JSON Web Tokens (jsonwebtoken) | ^9.0.3   |
| Chiffrement     | bcryptjs                       | ^3.0.3   |
| Frontend        | React                          | ^19.2.0  |
| Build tool      | Vite                           | ^7.3.1   |
| Routing         | React Router DOM               | ^7.13.1  |
| HTTP client     | Axios                          | ^1.13.6  |
| Container       | Docker + Docker Compose        | —        |

---

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé sur votre machine :

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (pour MongoDB)

---

## Structure du projet

```
Projet_full_stack_EventFire/
├── docker-compose.yml          # Orchestre le conteneur MongoDB
├── README.md
├── Projet dev full stack.pdf
└── EventFire/
    ├── backend/
    │   ├── src/
    │   │   ├── server.js       # Point d'entrée du serveur
    │   │   ├── app.js          # Configuration Express (middlewares, routes)
    │   │   ├── config/
    │   │   │   └── db.js       # Connexion MongoDB via Mongoose
    │   │   ├── controllers/    # Logique métier des routes
    │   │   ├── middleware/     # Middlewares (auth JWT, validation...)
    │   │   ├── models/         # Schémas Mongoose
    │   │   ├── routes/         # Définition des routes Express
    │   │   └── utils/          # Fonctions utilitaires
    │   ├── .env                # Variables d'environnement (ne pas commiter)
    │   ├── package.json
    │   └── package-lock.json
    └── frontend/
        ├── public/
        ├── src/
        │   ├── main.jsx        # Point d'entrée React
        │   ├── App.jsx         # Composant racine
        │   ├── App.css
        │   └── index.css
        ├── index.html
        ├── vite.config.js
        ├── eslint.config.js
        ├── package.json
        └── package-lock.json
```

---

## Lancer le projet

### 1. Démarrer la base de données (Docker)

Depuis la **racine du projet** (là où se trouve `docker-compose.yml`) :

```bash
docker compose up -d
```

Cette commande démarre un conteneur MongoDB v7 en arrière-plan :

| Paramètre         | Valeur            |
|-------------------|-------------------|
| Image             | `mongo:7`         |
| Nom du conteneur  | `eventfire_mongo` |
| Port exposé       | `27017`           |
| Volume persistant | `mongo_data`      |

Pour vérifier que le conteneur est bien lancé :

```bash
docker ps
```

Pour arrêter le conteneur :

```bash
docker compose down
```

Pour arrêter et supprimer les données (volume) :

```bash
docker compose down -v
```

---

### 2. Lancer le Backend

```bash
cd EventFire/backend
npm install
npm run dev
```

Le serveur démarre sur le port défini dans votre `.env` (ex : `http://localhost:<PORT>`)

- `npm run dev` utilise `nodemon` pour le rechargement automatique lors des modifications.
- `npm start` lance le serveur sans rechargement automatique (mode production).

> **Note :** Assurez-vous que le conteneur Docker MongoDB est démarré avant de lancer le backend.

---

### 3. Lancer le Frontend

Dans un **nouveau terminal** :

```bash
cd EventFire/frontend
npm install
npm run dev
```

L'application est accessible sur **http://localhost:5173** (port par défaut de Vite).

---

## Variables d'environnement

### Backend — `EventFire/backend/.env`

Créez un fichier `.env` dans `EventFire/backend/` avec les variables suivantes :

```env
# Port d'écoute du serveur Express
PORT=<port>

# URI de connexion MongoDB
MONGO_URI=mongodb://localhost:27017/<nom_base>

# Secret pour la signature des tokens JWT (chaîne longue et aléatoire)
JWT_SECRET=<votre_secret>
```

> **Important :** Ne commitez jamais le fichier `.env` dans Git. Ajoutez-le à votre `.gitignore`.

---

## API Backend

| Méthode | Endpoint | Description           |
|---------|----------|-----------------------|
| GET     | `/`      | Health check de l'API |

> Les routes métier (événements, utilisateurs, authentification) sont à implémenter dans `EventFire/backend/src/routes/`.

---

## Scripts disponibles

### Backend

| Commande      | Description                                |
|---------------|--------------------------------------------|
| `npm start`   | Lance le serveur en mode production        |
| `npm run dev` | Lance le serveur avec nodemon (hot-reload) |

### Frontend

| Commande           | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Lance le serveur de développement Vite       |
| `npm run build`    | Compile l'application pour la production     |
| `npm run preview`  | Prévisualise le build de production en local |
| `npm run lint`     | Analyse le code avec ESLint                  |

---

## Auteur

Projet Full Stack — 4A 2025/2026
