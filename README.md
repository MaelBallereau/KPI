# AI Technology Watch — KPI Dashboard

Dashboard de suivi de veille IA construit avec **Next.js 15** et **Tailwind CSS v4**.

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Déploiement Vercel

```bash
# Depuis la racine du projet
vercel
```

Ou connecte le repo GitHub à [vercel.com](https://vercel.com) pour un déploiement automatique.

## Ajouter / modifier des données

Toutes les données sont dans **`data/kpis.js`**.

### Renseigner la valeur actuelle d'un KPI

Cherche le KPI par son `id` et modifie le champ `current` (valeur entre 0 et 100) :

```js
{
  id: "KPI_H1_OUTILS",
  name: "Outils AI testés",
  // ...
  current: 72, // ← valeur en % (null = non renseigné)
},
```

### Ajouter un KPI

Dans le tableau `kpis` de l'horizon concerné, ajoute un objet en suivant la structure existante.

### Modifier les métadonnées

```js
export const meta = {
  author: "Mael Ballereau",
  title: "AI Technology Watch",
  subtitle: "KPI Dashboard · 8 indicateurs · 3 horizons temporels",
};
```

## Structure du projet

```
├── app/
│   ├── layout.js       # Layout global + métadonnées
│   ├── page.js         # Dashboard complet (Overview, Fiches, Tableau)
│   └── globals.css     # Variables CSS, polices, reset
├── data/
│   └── kpis.js         # ← Fichier de données à modifier
├── next.config.mjs
└── package.json
```
