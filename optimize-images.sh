#!/bin/bash

# Script d'optimisation des images pour Infinirecord
# Nécessite : ImageMagick

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Fonction pour convertir une image
convert_image() {
    local input=$1
    local filename=$(basename -- "$input")
    local name="${filename%.*}"
    
    # Créer les versions WebP
    echo -e "${BLUE}Converting${NC} $filename..."
    
    # Version mobile (640px)
    convert "$input" -resize 640x -quality 85 -strip "assets/images/compressed/${name}-640w.webp"
    
    # Version tablette (1024px)
    convert "$input" -resize 1024x -quality 85 -strip "assets/images/compressed/${name}-1024w.webp"
    
    # Version desktop (1920px)
    convert "$input" -resize 1920x -quality 85 -strip "assets/images/compressed/${name}-1920w.webp"
    
    echo -e "${GREEN}✓${NC} Created 3 versions of $filename"
}

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "ImageMagick n'est pas installé. Installation..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Parcourir tous les fichiers images originaux
echo "🔍 Recherche des images à optimiser..."
find assets/images/original -type f \( -iname "*.jpg" -o -iname "*.png" \) | while read file; do
    convert_image "$file"
done

echo -e "\n${GREEN}✨ Optimisation terminée !${NC}"