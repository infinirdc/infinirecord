# Infini Record — Cahier des charges et plan de développement

## 1. Vision du projet

**Nom :** Infini Record
**Adresse actuelle :** [www.infinirecord.vercel.app](http://www.infinirecord.vercel.app)

### Concept

Infini Record est une **plateforme numérique dédiée à l'art congolais et africain**.

Elle permet au public de :

* découvrir des artistes ;
* écouter de la musique ;
* regarder des clips et performances ;
* découvrir des œuvres artistiques ;
* acheter des œuvres numériques ;
* télécharger les contenus achetés ;
* soutenir directement les artistes ;
* suivre ses artistes préférés ;
* créer une bibliothèque personnelle.

Elle permet aux artistes de :

* créer leur profil ;
* publier leurs œuvres ;
* publier des chansons, albums, vidéos ou performances ;
* définir le prix de leurs œuvres ;
* suivre les ventes ;
* voir leurs statistiques ;
* recevoir leurs revenus.

Elle permet à l'administration de :

* gérer les utilisateurs ;
* gérer les artistes ;
* valider les œuvres ;
* gérer les catégories ;
* consulter les ventes ;
* consulter les statistiques ;
* gérer les paiements ;
* modérer les contenus.

---

# 2. Positionnement

Infini Record doit avoir une identité différente de Spotify ou Deezer.

Spotify = principalement plateforme de streaming.

Infini Record = **streaming + galerie artistique + marketplace + soutien aux artistes.**

Le concept central peut être :

> **Découvre. Écoute. Regarde. Achète. Soutiens l'art.**

L'objectif est de mettre particulièrement en avant :

* la musique congolaise ;
* les artistes de Kinshasa ;
* les performances live ;
* les artistes émergents ;
* les albums indépendants ;
* les clips ;
* les spectacles ;
* les œuvres numériques ;
* éventuellement la photographie, peinture, danse et autres formes artistiques.

---

# 3. Les trois types d'utilisateurs

## A. Visiteur

Le visiteur n'a pas besoin de compte pour :

* consulter l'accueil ;
* découvrir les artistes ;
* écouter les extraits gratuits ;
* regarder les contenus gratuits ;
* rechercher une œuvre ;
* consulter les profils.

Pour acheter, télécharger, soutenir ou sauvegarder une œuvre, il devra créer un compte.

---

## B. Artiste

L'artiste possède un espace personnel :

**Tableau de bord artiste**

Il peut :

* créer son profil ;
* ajouter une photo ;
* ajouter une biographie ;
* ajouter ses réseaux sociaux ;
* publier une chanson ;
* publier un album ;
* publier une vidéo ;
* publier une performance ;
* ajouter une pochette ;
* définir un prix ;
* choisir gratuit/payant ;
* consulter ses ventes ;
* consulter ses écoutes ;
* consulter ses téléchargements ;
* consulter ses revenus.

---

## C. Administrateur

L'administrateur possède un espace séparé :

**Admin Dashboard**

Il peut :

* voir le nombre d'utilisateurs ;
* voir le nombre d'artistes ;
* voir le nombre d'œuvres ;
* voir les écoutes ;
* voir les ventes ;
* voir les revenus ;
* approuver/refuser les œuvres ;
* gérer les artistes ;
* gérer les utilisateurs ;
* supprimer une œuvre ;
* gérer les catégories ;
* gérer les signalements ;
* voir les transactions.

---

# 4. Architecture générale du site

La navigation principale doit être simple.

### Desktop

Barre latérale :

* Accueil
* Découvrir
* Musique
* Vidéos
* Performances
* Artistes
* Boutique
* Bibliothèque

En bas :

* Profil
* Paramètres

Lecteur audio permanent en bas de l'écran.

### Mobile

Navigation inférieure :

**Accueil | Découvrir | Boutique | Bibliothèque | Profil**

Le lecteur audio apparaît au-dessus de cette barre.

---

# 5. Écran 1 — Landing Page

URL :

`/`

C'est la première page que voit l'utilisateur.

### Hero

Grand visuel artistique de Kinshasa.

Texte :

**L'art congolais n'a pas de limite.**

Sous-titre :

**Découvrez, écoutez, regardez et soutenez les artistes.**

Boutons :

**Découvrir maintenant**

**Devenir artiste**

### Sections

#### Tendances

* chansons populaires ;
* artistes populaires ;
* vidéos populaires.

#### Artistes à découvrir

Cartes d'artistes.

#### Nouvelles sorties

Albums et singles récemment publiés.

#### Performances

Vidéos de performances.

#### Boutique

Œuvres disponibles à l'achat.

#### Appel aux artistes

> Votre art mérite d'être entendu.

Bouton :

**Publier mon œuvre**

---

# 6. Écran 2 — Inscription

URL :

`/auth/register`

Deux choix :

### Je suis un fan

Compte utilisateur classique.

Champs :

* nom ;
* email ;
* mot de passe.

### Je suis un artiste

Compte artiste.

Champs :

* nom artistique ;
* nom ;
* email ;
* mot de passe.

Possibilité future de connexion Google.

Supabase Auth est particulièrement adapté à cette partie et possède une intégration officielle avec Next.js.

---

# 7. Écran 3 — Connexion

URL :

`/auth/login`

Champs :

* email ;
* mot de passe.

Boutons :

**Se connecter**

**Créer un compte**

Lien :

**Mot de passe oublié ?**

---

# 8. Écran 4 — Accueil connecté

URL :

`/home`

L'accueil personnalisé affiche :

### Bonjour, [nom]

Puis :

**Reprendre l'écoute**

**Recommandé pour vous**

**Nouvelles sorties**

**Artistes populaires**

**Performances populaires**

**Pour vous**

Le système pourra progressivement utiliser l'historique d'écoute pour personnaliser les recommandations.

---

# 9. Écran 5 — Découvrir

URL :

`/discover`

Cette page permet d'explorer tout Infini Record.

Catégories :

* Musique
* Albums
* Singles
* Clips
* Performances
* Artistes
* Œuvres
* Nouveautés
* Tendances

Filtres :

* plus récent ;
* plus populaire ;
* prix ;
* genre ;
* artiste.

---

# 10. Écran 6 — Musique

URL :

`/music`

Affichage :

### Singles

Cartes avec :

* pochette ;
* titre ;
* artiste ;
* durée ;
* bouton lecture ;
* prix éventuel.

### Albums

Carte :

* pochette ;
* nom ;
* artiste ;
* nombre de morceaux ;
* prix.

---

# 11. Écran 7 — Page album

URL :

`/album/[id]`

Exemple :

`/album/album-id`

Contenu :

* pochette ;
* nom de l'album ;
* artiste ;
* description ;
* année ;
* nombre de titres ;
* prix ;
* bouton Acheter ;
* bouton Soutenir ;
* bouton Lecture.

Liste des morceaux :

1. Morceau 1 — ▶
2. Morceau 2 — ▶
3. Morceau 3 — ▶
4. Morceau 4 — ▶

Si l'utilisateur possède l'album :

**Télécharger**

---

# 12. Écran 8 — Lecteur audio

Le lecteur doit être présent sur presque tout le site.

En bas :

**← Morceau précédent**

**▶ Play/Pause**

**→ Morceau suivant**

Barre de progression.

Volume.

Pochette.

Titre.

Artiste.

Sur mobile :

mini-player.

Lorsqu'on clique dessus :

lecteur plein écran.

---

# 13. Écran 9 — Lecteur plein écran

Contenu :

Grande pochette.

Titre :

**Nom de la chanson**

Artiste :

**Nom de l'artiste**

Commandes :

* précédent ;
* lecture ;
* suivant ;
* répétition ;
* aléatoire.

Actions :

* ❤️ Ajouter aux favoris
* ➕ Ajouter à la bibliothèque
* ↗ Partager
* Soutenir l'artiste

---

# 14. Écran 10 — Vidéos

URL :

`/videos`

Présentation sous forme de grille.

Chaque carte :

* miniature ;
* titre ;
* artiste ;
* durée ;
* nombre de vues.

Catégories :

* Clips
* Live
* Performances
* Interviews
* Documentaires

---

# 15. Écran 11 — Performance

URL :

`/performances`

Cette section constitue une différence importante avec Spotify.

Elle met en avant :

* concerts ;
* danse ;
* théâtre ;
* poésie ;
* performances artistiques ;
* showcases ;
* sessions live.

Chaque contenu possède :

* vidéo ;
* artiste ;
* description ;
* date ;
* prix éventuel ;
* bouton Acheter ;
* bouton Soutenir.

---

# 16. Écran 12 — Artistes

URL :

`/artists`

Grille :

[Photo] Nom artiste

[Photo] Nom artiste

[Photo] Nom artiste

Filtres :

* musique ;
* danse ;
* peinture ;
* vidéo ;
* théâtre ;
* photographie ;
* autres.

---

# 17. Écran 13 — Profil artiste

URL :

`/artist/[username]`

Exemple :

`/artist/fally-ipupa`

Contenu :

Grande couverture.

Photo.

Nom.

Biographie.

Réseaux sociaux.

Bouton :

**Suivre**

Sections :

* Musique
* Albums
* Vidéos
* Performances
* Boutique

Statistiques publiques :

* œuvres ;
* abonnés ;
* popularité.

---

# 18. Écran 14 — Boutique

URL :

`/store`

C'est le cœur commercial d'Infini Record.

Catégories :

* Albums
* Singles
* Vidéos
* Performances
* Œuvres numériques
* Packs
* Contenus exclusifs

Chaque produit possède :

* image ;
* nom ;
* artiste ;
* prix ;
* bouton Acheter.

---

# 19. Écran 15 — Page produit

URL :

`/product/[id]`

Exemple :

`/product/123`

Contenu :

Grande image.

Nom du produit.

Artiste.

Description.

Format :

* MP3 ;
* WAV ;
* MP4 ;
* PDF ;
* image ;
* autre.

Prix.

Bouton :

**Acheter maintenant**

Bouton secondaire :

**Soutenir l'artiste**

---

# 20. Écran 16 — Panier

URL :

`/cart`

Contenu :

Produit 1 — prix

Produit 2 — prix

Total.

Bouton :

**Passer au paiement**

---

# 21. Écran 17 — Paiement

URL :

`/checkout`

Résumé :

Produit :

Album X

Prix :

$X

Total :

$X

Le système doit être conçu pour intégrer ensuite des moyens de paiement adaptés au marché congolais.

Important :

**Ne pas construire soi-même un système bancaire.**

Le paiement doit passer par un prestataire de paiement compatible.

---

# 22. Écran 18 — Confirmation d'achat

URL :

`/purchase/success`

Message :

## Merci pour votre achat !

Votre œuvre est maintenant disponible.

Boutons :

**Télécharger**

**Écouter**

**Voir ma bibliothèque**

---

# 23. Écran 19 — Bibliothèque

URL :

`/library`

L'utilisateur retrouve tout ce qu'il possède.

### Ma musique

Albums achetés.

### Mes vidéos

Vidéos achetées.

### Mes œuvres

Œuvres achetées.

### Favoris

Contenus sauvegardés.

---

# 24. Écran 20 — Téléchargements

URL :

`/downloads`

Liste :

Nom du fichier

Format

Date d'achat

Bouton :

**Télécharger**

Le téléchargement doit être protégé afin qu'une personne non autorisée ne puisse pas récupérer directement les fichiers.

---

# 25. Écran 21 — Soutenir un artiste

Le soutien est différent de l'achat.

Exemple :

## Soutenir [Artiste]

Montants :

* $1
* $5
* $10
* $20
* Montant personnalisé

Message :

> Votre soutien permet à cet artiste de continuer à créer.

Bouton :

**Soutenir**

---

# 26. Écran 22 — Profil utilisateur

URL :

`/profile`

Contenu :

* photo ;
* nom ;
* email ;
* date d'inscription.

Sections :

* Bibliothèque ;
* Favoris ;
* achats ;
* téléchargements ;
* artistes suivis.

---

# 27. Écran 23 — Paramètres

URL :

`/settings`

Options :

### Compte

Modifier nom.

Modifier email.

Modifier mot de passe.

### Préférences

Langue.

Notifications.

### Confidentialité

Gestion des données.

### Sécurité

Sessions.

Déconnexion.

---

# 28. ESPACE ARTISTE

URL générale :

`/artist/dashboard`

---

# 29. Écran artiste — Dashboard

L'artiste voit immédiatement :

### Revenus

`$XXX`

### Écoutes

`XX XXX`

### Ventes

`XXX`

### Téléchargements

`XXX`

### Abonnés

`XXX`

Graphique :

**Évolution des écoutes**

Graphique :

**Évolution des ventes**

---

# 30. Écran artiste — Mes œuvres

URL :

`/artist/dashboard/works`

Liste :

* titre ;
* type ;
* statut ;
* prix ;
* ventes ;
* écoutes.

Statuts :

**Brouillon**

**En attente**

**Publié**

**Refusé**

---

# 31. Écran artiste — Publier

URL :

`/artist/dashboard/upload`

Formulaire :

### Informations

Titre.

Description.

Catégorie.

Genre.

Tags.

### Fichier

Audio / vidéo / image.

### Pochette

Image.

### Commercialisation

Gratuit ou payant.

Prix.

### Droits

L'artiste confirme qu'il possède les droits nécessaires.

Bouton :

**Soumettre**

---

# 32. Écran artiste — Modifier une œuvre

URL :

`/artist/dashboard/works/[id]/edit`

L'artiste peut modifier :

* titre ;
* description ;
* pochette ;
* prix ;
* catégorie ;
* informations.

Le fichier peut être remplacé selon les règles de la plateforme.

---

# 33. Écran artiste — Revenus

URL :

`/artist/dashboard/earnings`

Afficher :

Revenus totaux.

Revenus disponibles.

Revenus en attente.

Historique.

Exemple :

| Date  | Vente    | Montant | Statut |
| ----- | -------- | ------: | ------ |
| 20/08 | Album X  |      $5 | Payé   |
| 22/08 | Single Y |      $2 | Payé   |

---

# 34. Écran artiste — Retrait

URL :

`/artist/dashboard/payouts`

L'artiste voit :

**Solde disponible**

Bouton :

**Demander un retrait**

Le système devra intégrer les moyens de paiement disponibles dans le pays.

Cette partie peut rester désactivée pendant le MVP et être activée lorsque le système de paiement est prêt.

---

# 35. Écran artiste — Statistiques

URL :

`/artist/dashboard/analytics`

Statistiques :

* écoutes ;
* vues ;
* ventes ;
* téléchargements ;
* revenus ;
* abonnés.

Filtres :

* 7 jours ;
* 30 jours ;
* 3 mois ;
* 12 mois.

---

# 36. ESPACE ADMINISTRATION

URL :

`/admin`

Cette partie doit être inaccessible aux utilisateurs ordinaires.

---

# 37. Dashboard administrateur

Cartes :

### Utilisateurs

12 500

### Artistes

430

### Œuvres

3 240

### Ventes

$12 450

### Revenus artistes

$9 000

### Commission plateforme

$3 450

Graphiques :

* utilisateurs ;
* ventes ;
* écoutes ;
* revenus.

---

# 38. Admin — Gestion des artistes

URL :

`/admin/artists`

Tableau :

Nom.

Email.

Nombre d'œuvres.

Ventes.

Statut.

Actions :

* voir ;
* modifier ;
* suspendre ;
* supprimer.

---

# 39. Admin — Validation des œuvres

URL :

`/admin/moderation`

Lorsqu'un artiste publie une œuvre :

**En attente de validation**

L'administrateur peut :

### Approuver

L'œuvre devient publique.

### Refuser

L'administrateur donne une raison.

Exemple :

> Fichier non conforme.

---

# 40. Admin — Gestion des œuvres

URL :

`/admin/works`

Filtres :

* toutes ;
* publiées ;
* en attente ;
* refusées ;
* signalées.

Actions :

* modifier ;
* masquer ;
* supprimer ;
* consulter.

---

# 41. Admin — Utilisateurs

URL :

`/admin/users`

Informations :

* nom ;
* email ;
* date d'inscription ;
* achats ;
* statut.

Actions :

* consulter ;
* suspendre ;
* réactiver.

---

# 42. Admin — Transactions

URL :

`/admin/transactions`

Informations :

* acheteur ;
* artiste ;
* produit ;
* montant ;
* commission ;
* date ;
* statut.

---

# 43. Admin — Statistiques

URL :

`/admin/analytics`

Statistiques générales :

### Acquisition

Nombre de nouveaux utilisateurs.

### Engagement

Écoutes.

Vues.

Temps d'écoute.

### Commerce

Ventes.

Panier moyen.

Produits populaires.

### Artistes

Artistes les plus performants.

---

# 44. Parcours utilisateur principal

## Parcours découverte

Accueil

↓

Découvrir

↓

Artiste

↓

Album

↓

Lecture

↓

Ajouter à la bibliothèque

---

# 45. Parcours achat

Accueil

↓

Boutique

↓

Produit

↓

Acheter

↓

Connexion/Inscription

↓

Paiement

↓

Confirmation

↓

Bibliothèque

↓

Téléchargement

---

# 46. Parcours artiste

Accueil

↓

Devenir artiste

↓

Inscription artiste

↓

Dashboard artiste

↓

Publier une œuvre

↓

Upload

↓

Validation

↓

Publication

↓

Ventes/écoutes

↓

Revenus

↓

Retrait

---

# 47. Parcours administration

Connexion admin

↓

Dashboard

↓

Œuvres en attente

↓

Vérification

↓

Approuver

↓

Publication

↓

Statistiques

---

# 48. Technologies recommandées

## Frontend + Backend

### Next.js

Utiliser :

**Next.js App Router + TypeScript**

Next.js fournit un système de routing basé sur les fichiers et permet d'utiliser des Server Components et Server Functions.

---

## UI

### Tailwind CSS

Pour construire rapidement l'interface.

### shadcn/ui

Pour les composants :

* boutons ;
* modales ;
* formulaires ;
* tableaux ;
* menus ;
* cards ;
* dashboard.

Le starter officiel Vercel/Supabase combine déjà Next.js, TypeScript, Tailwind et shadcn/ui.

---

# 49. Base de données

### Supabase PostgreSQL

C'est le choix recommandé pour le MVP.

Il fournit :

* PostgreSQL ;
* authentification ;
* API ;
* Storage ;
* Row Level Security.

Supabase documente directement l'utilisation de PostgreSQL, Auth et Storage avec Next.js.

---

# 50. Authentification

### Supabase Auth

Utilisateurs :

`fan`

Artistes :

`artist`

Administrateurs :

`admin`

La sécurité doit être basée sur les rôles.

---

# 51. Sécurité

Utiliser :

### Row Level Security

Exemple :

Un artiste peut voir :

**ses propres œuvres**

mais pas celles des autres artistes.

Un utilisateur peut voir :

**sa bibliothèque**

mais pas celle d'un autre utilisateur.

Un administrateur peut gérer l'ensemble.

Supabase recommande justement RLS pour contrôler l'accès aux données.

---

# 52. Stockage des fichiers

Il faut distinguer :

### Petites données

* profils ;
* descriptions ;
* pochettes ;
* métadonnées.

→ Supabase.

### Gros fichiers

* MP3 ;
* WAV ;
* MP4 ;
* performances ;
* vidéos.

→ stockage objet.

Pour commencer, Supabase Storage peut servir au MVP.

Lorsque le catalogue vidéo/audio devient important, migrer les gros fichiers vers **Cloudflare R2**.

R2 offre actuellement un niveau gratuit de 10 GB/mois en stockage standard, 1 million d'opérations Class A et 10 millions d'opérations Class B, avec egress gratuit.

---

# 53. Hébergement

### Vercel

Déploiement :

GitHub

↓

Vercel

↓

Infini Record

Le plan Hobby de Vercel est actuellement gratuit et inclut notamment HTTPS, CI/CD et CDN.

---

# 54. Architecture technique

```text
                    INFini Record
                         |
                     Next.js
                         |
              ---------------------
              |                   |
          Frontend             Backend
              |                   |
              -------- Next.js -----
                         |
                      Supabase
              -----------------------
              |          |          |
          PostgreSQL    Auth      Storage
              |
        ----------------
        |       |      |
     Users   Artists  Works
        |       |      |
        ------- Orders
                  |
               Payments
```

Pour les gros médias :

```text
Next.js
   |
Supabase
   |
Metadata
   |
Cloudflare R2
   |
Audio / Video / Files
```

---

# 55. Base de données

Tables principales.

## profiles

* id
* user_id
* name
* avatar
* role
* created_at

## artists

* id
* user_id
* stage_name
* biography
* avatar
* cover
* verified
* created_at

## works

* id
* artist_id
* title
* description
* type
* category
* cover_url
* file_url
* price
* status
* created_at

## albums

* id
* artist_id
* title
* description
* cover_url
* price

## tracks

* id
* album_id
* title
* audio_url
* duration
* track_number

## videos

* id
* artist_id
* title
* description
* video_url
* thumbnail_url
* price

## purchases

* id
* user_id
* product_id
* amount
* status
* created_at

## library

* id
* user_id
* work_id
* purchased_at

## follows

* id
* user_id
* artist_id

## likes

* id
* user_id
* work_id

## plays

* id
* user_id
* work_id
* played_at

## supports

* id
* user_id
* artist_id
* amount
* created_at

## payouts

* id
* artist_id
* amount
* status
* created_at

## notifications

* id
* user_id
* title
* message
* read

---

# 56. Système économique

Infini Record peut prendre une commission.

Exemple initial :

**Artiste : 80 %**

**Infini Record : 20 %**

Exemple :

Une œuvre coûte :

$5

Artiste :

$4

Plateforme :

$1

Ces pourcentages doivent être configurables par l'administration.

---

# 57. Système de streaming

Il faut distinguer :

### Streaming gratuit

L'utilisateur peut écouter un contenu autorisé gratuitement.

### Contenu premium

L'utilisateur doit acheter le contenu.

### Extrait

Par exemple :

30 secondes gratuites.

Puis :

**Acheter pour écouter/télécharger la version complète.**

Cela permet de protéger les œuvres commerciales.

---

# 58. Protection des fichiers

Ne jamais mettre simplement :

`/uploads/song.mp3`

pour les contenus payants.

Utiliser des URLs temporaires/signées.

Le serveur vérifie :

```text
Utilisateur connecté ?
        |
        ↓
Possède le produit ?
        |
     Oui → URL temporaire
        |
        ↓
Téléchargement
```

---

# 59. Recherche

La barre de recherche doit pouvoir chercher :

* artistes ;
* chansons ;
* albums ;
* vidéos ;
* performances ;
* œuvres.

Exemple :

Recherche :

**Fally**

Résultats :

Artistes

Albums

Chansons

Vidéos

---

# 60. Notifications

Notifications :

* nouvel album d'un artiste suivi ;
* achat réussi ;
* œuvre approuvée ;
* œuvre refusée ;
* paiement reçu ;
* demande de retrait traitée.

---

# 61. Design

Je recommande une identité :

### Noir + blanc + couleur accent

Interface sombre inspirée des plateformes musicales modernes.

Mais ne pas copier Spotify.

Infini Record doit avoir sa propre identité visuelle.

Éléments graphiques :

* motifs inspirés de l'art congolais ;
* photos d'artistes ;
* grandes pochettes ;
* typographie moderne ;
* animations légères.

---

# 62. Responsive design

Le site doit fonctionner sur :

* smartphone Android ;
* iPhone ;
* tablette ;
* ordinateur.

La priorité doit être :

**Mobile first**

car une grande partie du public utilisera probablement un smartphone.

---

# 63. MVP — première version

Ne pas essayer de construire tout Spotify immédiatement.

La première version doit contenir :

### Public

* accueil ;
* inscription ;
* connexion ;
* artistes ;
* musique ;
* albums ;
* lecteur ;
* boutique ;
* achat ;
* bibliothèque ;
* téléchargement.

### Artiste

* dashboard ;
* profil ;
* upload ;
* œuvres ;
* statistiques basiques.

### Admin

* dashboard ;
* artistes ;
* œuvres ;
* validation ;
* utilisateurs ;
* ventes.

---

# 64. Fonctionnalités à repousser

Pour économiser du temps et de l'argent :

Ne pas commencer par :

* algorithme complexe de recommandation ;
* applications Android/iOS natives ;
* podcasts ;
* livestreaming ;
* IA musicale ;
* système social complet ;
* commentaires complexes ;
* playlists collaboratives ;
* publicité ;
* haute qualité vidéo adaptative ;
* système de royalties extrêmement complexe.

Ces fonctionnalités peuvent venir plus tard.

---

# 65. Plan de développement

## Phase 1 — Fondations

Créer :

* repository GitHub ;
* projet Next.js ;
* TypeScript ;
* Tailwind ;
* Supabase ;
* Vercel.

Structure :

```text
app/
components/
lib/
public/
types/
```

---

# 66. Phase 2 — Design

Créer :

* couleurs ;
* logo ;
* typographie ;
* navbar ;
* sidebar ;
* player ;
* cards ;
* boutons ;
* formulaires.

Créer d'abord les pages sans backend.

---

# 67. Phase 3 — Authentification

Développer :

* inscription ;
* connexion ;
* déconnexion ;
* récupération mot de passe ;
* profil ;
* rôles.

---

# 68. Phase 4 — Base de données

Créer les tables :

* profiles ;
* artists ;
* works ;
* albums ;
* tracks ;
* videos ;
* purchases ;
* library ;
* likes ;
* follows ;
* plays ;
* supports ;
* payouts.

---

# 69. Phase 5 — Catalogue

Créer :

* artistes ;
* albums ;
* chansons ;
* vidéos ;
* performances ;
* boutique.

---

# 70. Phase 6 — Player

Développer le lecteur :

* play ;
* pause ;
* suivant ;
* précédent ;
* volume ;
* progression ;
* mini-player ;
* lecteur plein écran.

---

# 71. Phase 7 — Espace artiste

Développer :

* dashboard ;
* profil ;
* publication ;
* gestion des œuvres ;
* statistiques ;
* revenus.

---

# 72. Phase 8 — Administration

Développer :

* dashboard ;
* gestion artistes ;
* gestion utilisateurs ;
* modération ;
* gestion œuvres ;
* transactions ;
* statistiques.

---

# 73. Phase 9 — Boutique

Développer :

* produits ;
* panier ;
* checkout ;
* commandes ;
* bibliothèque ;
* téléchargements.

---

# 74. Phase 10 — Paiements

Intégrer un prestataire de paiement adapté à la RDC.

Architecture :

```text
Client
 ↓
Checkout
 ↓
Payment Provider
 ↓
Confirmation
 ↓
Webhook
 ↓
Supabase
 ↓
Bibliothèque
 ↓
Revenu artiste
```

Ne jamais considérer le paiement comme réussi uniquement parce que le navigateur revient sur la page de succès.

Le serveur doit vérifier la confirmation du paiement.

---

# 75. Phase 11 — Sécurité

Tester :

* permissions ;
* accès admin ;
* accès artiste ;
* fichiers privés ;
* téléchargements ;
* URLs ;
* achats ;
* manipulations de prix ;
* accès aux données.

---

# 76. Phase 12 — Déploiement

```text
GitHub
   ↓
Vercel
   ↓
www.infinirecord.vercel.app
```

Puis éventuellement :

```text
infinirecord.cd
```

ou un autre domaine officiel.

---

# 77. Plan de développement recommandé

## Semaine 1

Architecture + design.

## Semaine 2

Authentification + base de données.

## Semaine 3

Artistes + catalogue.

## Semaine 4

Player musical.

## Semaine 5

Espace artiste.

## Semaine 6

Administration.

## Semaine 7

Boutique + bibliothèque.

## Semaine 8

Paiements + sécurité + tests.

---

# 78. Version 1.0

Objectif :

Un utilisateur peut :

```text
Arriver
 ↓
Découvrir
 ↓
Écouter
 ↓
Découvrir un artiste
 ↓
Acheter
 ↓
Payer
 ↓
Obtenir son œuvre
 ↓
Télécharger
 ↓
Soutenir l'artiste
```

Un artiste peut :

```text
Créer son compte
 ↓
Créer son profil
 ↓
Publier
 ↓
Être validé
 ↓
Vendre
 ↓
Voir ses statistiques
 ↓
Recevoir ses revenus
```

L'administration peut :

```text
Gérer
 ↓
Modérer
 ↓
Analyser
 ↓
Administrer
```

---

# 79. Principe fondamental du projet

Il faut construire **Infini Record par petites briques**.

Ne pas chercher à coder tout le site en une seule fois.

Ordre recommandé :

**1. Design**

↓

**2. Auth**

↓

**3. Database**

↓

**4. Catalogue**

↓

**5. Player**

↓

**6. Artiste**

↓

**7. Admin**

↓

**8. Boutique**

↓

**9. Paiement**

↓

**10. Sécurité**

↓

**11. Déploiement**

---

# 80. Stack finale recommandée

| Fonction        | Technologie                |
| --------------- | -------------------------- |
| Frontend        | Next.js                    |
| Langage         | TypeScript                 |
| UI              | Tailwind CSS               |
| Composants      | shadcn/ui                  |
| Backend         | Next.js                    |
| Base de données | Supabase PostgreSQL        |
| Auth            | Supabase Auth              |
| Sécurité DB     | Supabase RLS               |
| Storage MVP     | Supabase Storage           |
| Gros médias     | Cloudflare R2              |
| Hébergement     | Vercel                     |
| Code            | GitHub                     |
| Lecteur audio   | HTML5 Audio / React        |
| Graphiques      | Recharts                   |
| Icônes          | Lucide                     |
| Paiement        | flexpaie                   |
| Analytics       | Analytics simple au départ |

---

# 81. Coût de départ

L'objectif est de rester **à 0 $ pour le développement/MVP**, autant que les limites des offres gratuites le permettent.

Vercel propose actuellement un plan Hobby à $0.

Supabase propose actuellement un plan Free à $0, avec notamment une base PostgreSQL de 500 MB par projet.

Pour les médias volumineux, Cloudflare R2 possède actuellement un quota gratuit mensuel de 10 GB de stockage standard et des quotas d'opérations gratuits.

**Attention :** « 100 % gratuit » ne peut pas être garanti lorsque le site aura beaucoup d'utilisateurs, beaucoup de vidéos et beaucoup de téléchargements. Les quotas gratuits finiront par être dépassés. L'objectif réaliste est donc :

> **0 €/$ pour construire et lancer le MVP, puis payer uniquement lorsque l'utilisation réelle dépasse les quotas gratuits.**

---

# 82. Vision à long terme

Infini Record pourrait évoluer vers :

### Infini Music

Musique.

### Infini Live

Performances et concerts.

### Infini Art

Peinture, photographie, œuvres numériques.

### Infini Studio

Outils pour artistes.

### Infini Events

Événements artistiques.

### Infini Originals

Contenus exclusifs produits par Infini Record.

---

# 83. Vision finale

Infini Record doit devenir une plateforme où un jeune artiste de Kinshasa peut passer de :

**« Je crée une œuvre dans ma chambre »**

à :

**« Je publie mon œuvre »**

↓

**« Des personnes la découvrent »**

↓

**« Elles l'écoutent ou la regardent »**

↓

**« Elles l'achètent »**

↓

**« Je reçois mon argent »**

↓

**« Je peux continuer à créer »**

C'est cette boucle qui doit être au centre du produit.

**Infini Record n'est donc pas seulement un lecteur de musique.**

C'est une **infrastructure numérique permettant à l'art congolais d'être découvert, consommé et monétisé.**
