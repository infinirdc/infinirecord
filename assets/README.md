# Guide des Assets Infinirecord

## Structure des dossiers

### Images
- `images/studio/` : Photos du studio et de l'équipement
  - `original/` : Images sources haute résolution
  - `compressed/` : Images optimisées pour le web
- `images/products/` : Images des produits
  - `original/` : Images sources haute résolution
  - `compressed/` : Images optimisées pour le web

### Audio
- `audio/samples/` : Sample packs à vendre
  - `previews/` : Versions courtes (30s max) pour écoute
  - `full/` : Versions complètes protégées
- `audio/beats/` : Instrumentales à vendre
  - `previews/` : Versions courtes avec tag
  - `full/` : Versions complètes sans tag
- `audio/portfolio/` : Extraits de projets réalisés
  - `previews/` : Versions courtes pour le site
  - `full/` : Versions complètes pour démonstration

## Règles de nommage

### Images
- Utiliser des noms descriptifs en minuscules
- Séparer les mots par des tirets
- Inclure les dimensions dans le nom des versions compressées
- Exemple : `studio-control-room.jpg` → `studio-control-room-800w.webp`

### Audio
- Format : `[categorie]-[nom]-[version].[extension]`
- Exemple : `beat-midnight-dreams-preview.mp3`
- Exemple : `sample-pack-urban-vibes-vol1-full.zip`

## Formats et spécifications

### Images
- Format original : JPG/PNG haute résolution
- Format web : WebP
- Tailles recommandées :
  - Mobile : 640px de large
  - Tablette : 1024px de large
  - Desktop : 1920px de large

### Audio
- Previews :
  - Format : MP3 320kbps
  - Durée : 30 secondes max
  - Watermark audio obligatoire
- Versions complètes :
  - Format : WAV 24bit/48kHz
  - Pas de watermark
  - Nommer clairement les stems/multitracks