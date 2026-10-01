# Pointage chantier — version hors ligne (tablette Android)

Appli autonome : pas de compte Claude, pas d'internet sur le chantier.
Les pointages et signatures restent **uniquement sur la tablette**.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli |
| `sw.js` | Permet à l'appli de s'ouvrir sans réseau |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png` | Icône et installation sur l'écran d'accueil |

## 1. Mettre l'appli en ligne (une seule fois, depuis un PC)

L'hébergement ne sert qu'à **livrer l'appli** à la tablette. Aucune donnée de pointage n'y est envoyée.

Méthode simple, Netlify Drop (gratuit) :
1. Sur le PC, aller sur **app.netlify.com/drop** et créer un compte gratuit.
2. Glisser-déposer **le dossier entier** (les 5 fichiers) dans la page.
3. Netlify donne une adresse du type `https://nom-au-hasard.netlify.app`. La noter.

Alternative : GitHub Pages, ou un serveur web Ensio en HTTPS (demander au service informatique).

## 2. Installer sur la tablette (avec réseau, une seule fois)

1. Ouvrir **Chrome** sur la tablette et aller à l'adresse notée.
2. Menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
3. Ouvrir l'appli **depuis son icône**, puis la fermer et la rouvrir une fois.
4. Tester : mettre la tablette en **mode avion**, rouvrir l'appli → elle doit s'afficher normalement.

## 3. Utilisation au quotidien

- **Arrivée** : nom, prénom, société, signature.
- **Première arrivée d'une personne sur le chantier** : deux cases, **Accueil sécurité fait** et **Carte BTP vérifiée**. La case carte BTP n'apparaît qu'à cette première arrivée ; ensuite c'est mémorisé.
- Si l'accueil n'a pas été coché, il est redemandé aux arrivées suivantes. Si la carte n'a pas été cochée, un badge orange le rappelle dans le journal ; on régularise en touchant la ligne de la personne.
- Toujours ouvrir l'appli **depuis l'icône**, jamais en navigation privée.
- **Réglages** : sauvegarde, restauration, logos, et téléchargement direct du PDF du jour ou de l'Excel du mois dans *Téléchargements*.

## 3 bis. Envoyer les documents

Deux boutons dans le journal, un fichier chacun :
- **Envoyer la journée** : la feuille de présence signée du jour affiché, en PDF.
- **Envoyer le mois** : le tableau de bord du mois. Android ne laisse pas une appli web joindre un Excel : il part donc en **PDF** (indicateurs, graphiques, détail), et l'**Excel** complet est enregistré en même temps dans *Téléchargements*.

Toucher le bouton prépare le fichier, puis toucher **Envoyer** ouvre le menu de partage → choisir **Gmail**. Sans réseau, Gmail garde le mail dans la boîte d'envoi et l'envoie dès que la tablette capte.

**Envoi du soir** : à partir de 17 h, au dernier départ pointé, « Envoyer la journée » s'ouvre tout seul.

Astuce : configurer sur la tablette un compte Gmail dédié au chantier, et s'envoyer les mails à soi-même.

## 3 ter. Logos et tableau de bord

- **Réglages → Logos** : choisis le logo de ton entreprise et celui du client ou du chantier (image PNG ou JPG de la galerie). Ils apparaissent en haut de la feuille du jour, du tableau de bord PDF et de l'Excel. Ils sont gardés sur la tablette et inclus dans la sauvegarde.
- L'**Excel du mois** (et son équivalent PDF envoyé par « Envoyer le mois ») s'ouvre sur le **Tableau de bord** : 8 indicateurs (heures de présence du chantier, intervenants, jours d'activité, effectif moyen et pic, accueils sécurité du mois, cartes BTP vérifiées, départs non pointés, présence moyenne d'une société), un graphique des heures de présence par entreprise, un graphique de l'effectif par jour, puis le détail par entreprise et par jour. Les tuiles orange signalent ce qui est à régulariser.
- **Heures de présence** = pour une société, un jour donné : de l'arrivée de sa première personne au départ de sa dernière personne. Ce n'est pas la somme des heures de ses intervenants. Pour le chantier : de la première arrivée au dernier départ de la journée.
- Les onglets **Historique** (avec signatures) et **Synthèse sociétés** sont inchangés.

## 4. Sauvegardes (important) — bouton Réglages

Si la tablette est perdue, cassée ou réinitialisée, ou si les données de Chrome sont effacées, **tout est perdu** sans sauvegarde.

- **Réglages → Envoyer la sauvegarde** → Gmail : le fichier `sauvegarde_<chantier>_<date>.txt` part par mail. C'est la méthode conseillée.
- **Réglages → Télécharger** : le même contenu en `.json` dans *Téléchargements*, à copier sur un PC.
- Rythme conseillé : **chaque semaine**. L'appli affiche un rappel au-delà de 7 jours.

Restaurer (nouvelle tablette ou après effacement) : **Réglages → Restaurer** → choisir le fichier `.txt` ou `.json`.
⚠ La restauration **remplace** tout ce qui est sur la tablette.

## 5. Mettre à jour l'appli

1. Remplacer **tous les fichiers** du site (au minimum `index.html` et `sw.js`) par ceux du nouveau zip.
2. Attendre **10 minutes** (le temps que l'hébergeur publie).
3. Vérifier dans Chrome : ouvrir `https://…/sw.js` → la 3e ligne doit afficher la nouvelle version (ex. `pointage-v10`).
4. Sur la tablette, avec réseau : ouvrir l'appli, la **fermer complètement** (écran des applis récentes → glisser), la rouvrir. Répéter une fois.
5. Contrôle : **Réglages** → en bas, « Version de l'appli ».

Les données de la tablette ne sont pas touchées par une mise à jour. À partir de la v10, l'appli prend d'elle-même la dernière version dès qu'elle a du réseau.

## Limites

- Une tablette = un registre. Pas de synchronisation entre appareils.
- Stockage limité par l'espace libre de la tablette (largement suffisant pour plusieurs années sur un chantier courant).
- Les signatures sont des données personnelles : tablette verrouillée par code, sauvegardes rangées dans un espace non public.
