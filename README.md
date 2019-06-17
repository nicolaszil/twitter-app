# Dartagnan's Twitter App

### Pré-requis
- Node.js : https://nodejs.org/fr/ (JS Back-end)
- Yarn : https://yarnpkg.com/lang/fr/ (Package Manager)

### Gestion des dépendances:
Nous utilisons Yarn mais il est possible également d'utiliser Npm (attention aux droits selon l'OS).

Le fichier **package.json** liste l'ensemble des dépendances installées.  
Celles-ci sont installées dans le dossier **node_modules**.  

Toute manipulation est à faire depuis la racine du projet.  

* Installer toutes les dépendances (du package.json) :  ``` yarn ``` (raccourci pour yarn install)
* Installer une dépendance en particulier:  ``` yarn add nomDuPackage ``` => ``` yarn add react ```
* Supprimer une dépendance : ``` yarn remove nomDuPackage ``` => ``` yarn remove redux ```
* Dépendance uniquement dévelopment : ``` yarn add nomDuPackage --dev ``` => ``` yarn add webpack --dev ```
* Dépendance proposant un CLI natif : ``` yarn add nomDuPackage --global ``` => ``` yarn add webpack --global ```

**NB**: la liste officielle des packages disponibles se trouve sur **https://www.npmjs.com/**.

### Configuration

* Créer un fichier api.json dans /config
* Y copier le contenu de /config/api.common.json
* Ajouter le host souhaité devant chaque path d'API
* Ex: "/userinfo" => "http://localhost:3001/userinfo"

NB: en local l'application tourne sur localhost:8007, il peut être nécessaire d'utiliser des règles de réécriture (Apache/Nginx) pour gérer les appels cross-domain.

### Lancement du serveur

Le serveur est accessible via le host **http://localhost:3001**.

* **LOCAL** : ``` yarn start-server ```  
Execute un serveur local avec node.js exposant des routes en tant qu'API

### Lancement de l'app

NB: l'application n'est fonctionnelle que si elle est couplée à un serveur web dissocié.
Ce dernier est indispensable pour effectuer les requêtes cross-domain vers Twitter.
Il faut donc obligatoirement faire tourner le serveur pour faire tourner l'application.

L'application est accessible via **http://localhost:8007**.

* **LOCAL** : ``` yarn start-front ```  
Execute un serveur local avec node.js et en mémoire les fichiers de l'application.
* **PRODUCTION** : ``` yarn build ```  
Execute le process complet de compilation et extrait les fichiers.  
Les fichiers sont extraits dans /dist à la racine du projet.


### WEBPACK

C'est un outil de packaging/compilation multitâche permettant principalement de :

- configurer et charger les modules/plugins de l'application.
- faire communiquer et compiler/transpiler les extensions/languages (JS, ESx..) ou pseudo-languages (jsx/react)
- exécuter inteligemment l'ensemble des tâches de ces modules (transpilation, minification, injection css..)
- optimiser et extraire en sortie des fichiers utilisables en développement ou production

En développement, il est souvent couplé à un serveur local permettant d'executer l'application.  
En production, il extrait des fichiers (optimisés selon la config donnée) prêts à déployer.

- **Doc de référence** : https://webpack.js.org/concepts/

**NB**: il est nécessaire d'installer un module (via yarn) avant de pouvoir l'utiliser avec webpack.  

Les fichiers de configuration se trouvent dans **config/webpack**.  

- **base.config.js** : config globale commune à tous les environnements
- **dev.config.js** : config et modules/plugins utilisés uniquement en mode development
- **prod.config.js** : config et modules/plugins utilisés uniquement en mode production
- **opt.config.js** : config pour l'optimisation (mode production)

### JAVASCRIPT

15/06/2019 : Le projet est écrit en ES6 avec quelques évolutions ES7 et ES8.  
Nous utilisons [Babel.js](https://babeljs.io) avec [Webpack](#markdown-header-webpack)
pour transpiler le code ESx en ES5.

### PRINCIPALES LIBRAIRIES UTILISÉES

- UI Rendering Library : [React.js (v16.8.6)](https://reactjs.org)
- Data/State container : [Redux.js (v4.0.1)](https://redux.js.org)
- Side effects Manager : [Redux-Saga.js](https://redux-saga.js.org)
- Local Dev Server : [Express.js](https://expressjs.com)
- Javascript Compiler : [Babel.js](https://babeljs.io)
- Package Manager : [Yarn](#markdown-header-gestion-des-dépendances)
- Module Bundler : [Webpack](#markdown-header-webpack)
- HTTP Provider: [Axios](https://github.com/axios/axios)
- UI Components: [Semantic UI](https://react.semantic-ui.com/)
