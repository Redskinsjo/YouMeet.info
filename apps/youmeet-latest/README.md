# YouMeet.info

## Description

YouMeet.info est une plateforme d'informations professionnelles et fiables sur les chercheurs d'emploi en France.
Elle récupère via FranceTravail les expériences professionnelles passées des utilisateurs, ainsi que leur vidéo de motivation.
Les recruteurs sont invités à consulter ces informations gratuitement.

## Démarrer

Commencer par clôner le dépôt avec `git clone *url*`, puis installer les dépendances avec `yarn install`.
Le plus dur reste à lancer le serveur de développement: `turbo dev`
Et vous êtes tout bon !
(Tous les workspaces se lancent sans erreur)

## Deux applications

**_youmeet-latest_** est l'application proposée aux chercheur d'emplois. Elle rassemble le page vitrine, les profils publics, les fonctionnalités de création de profil de chercheur d'emploi (informations personnelles, vidéo) et **_youmeetpro-latest_** est l'application proposée aux entreprises. Elle rassemble seulement la connexion au compte utilisateur pro, ainsi donc les fonctionnalités de recherche et de filtres des profils de chercheurs d'emplois, de chat et d'analyse vidéo par intelligence artificielle.

## @youmeet/competencies

est un package centralise les titres de compétences. Obtenez rapidement des compétences uniques dans tous les secteurs (principalement pour les entreprises de recrutement). Aide à trouver la compétence qui a été dérivée. Par exemple, vous avez react, ReactjS ou ReAct js, obtenez toujours React.js. Peut être utilisé dans le frontend ou le backend.
