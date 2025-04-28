# Calculatrice UI5

Une application SAPUI5 simple permettant de réaliser des opérations arithmétiques et de gérer un historique des calculs.

## Fonctionnalités

- Réalisation d'opérations arithmétiques (+, -, *, /)
- Historique des opérations effectuées
- Possibilité de supprimer des opérations de l'historique
- Interface utilisateur responsive

## Technologies utilisées

- SAPUI5/OpenUI5
- OData Service
- SAP Gateway

## Installation

1. Clonez le repository
```bash
git clone [URL_DU_REPO]
```

2. Configurez votre destination SAP Gateway dans le fichier neo-app.json

3. Démarrez l'application en local
```bash
ui5 serve
```

## Structure du projet

```
webapp/
├── controller/         # Contrôleurs de l'application
├── view/              # Vues XML
├── model/             # Modèles de données
├── i18n/              # Fichiers d'internationalisation
└── manifest.json      # Configuration de l'application
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence ...... 