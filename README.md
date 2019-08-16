# zhinpile
NodeJS HTTP server for serving a pile/sh\*tton/f\*ckload of images and videos.

---

## Features
+ Supports both images and videos
+ Auto-plays videos
+ Simple and free ([free as in freedom](https://en.wikipedia.org/wiki/Free_as_in_Freedom)) (you can learn from this project or build on it!)
+ Dynamic loading of items (no need to restart after adding photos)
+ Lazy loading using [Infinite scroll](https://infinite-scroll.com/)
+ Beautiful layout using [Masonry](https://masonry.desandro.com/)
+ Lightbox built-in (Make images and videos fullscreen by clicking them!) (Also look at these cute animations)

---

## Installation
### Step 1
Download this repo as a zip and unzip it or clone it using
```
git clone git@github.com:Zhincore/zhinpile.git
```
### Step 2
Install required libs using npm inside the directory
```
cd zhinpile
npm i
```
### Done
Also remove all example photos in `frontend/data/`

---

## Confguration
All options are on the top of the `index.js` file.
### Sample configuration
```
/****************/
/**** CONFIG ****/
/****************/

const PAGE_SIZE = 16;     // How many photos per page?
const TITLE = "Foxes";    // A pile of what?
const PORT = 8131;  
const HOST = "127.0.0.1"; // Localhost
const DESC = "Cute foxes I have found on the internet!" // Description of the pile
const TAGS = [ // Tags to be cool at Google Search
  "fox", "foxes", "cute", "ginger", "white", "adorable", "nature"
]
```

## Usage
Put all your photos and videos in the `frontend/data` directory and run node using 
```
node .
```
You can now view the photos at `http://localhost:8131/<anything>`.  
The `<anything>` is there because this repo is meant to be behind a proxy like Nginx.  
E. g. my setup is https://personal.zhincore.eu/ari

## Screenshot
![Screenshot](https://media.zhincore.eu/github_zhincore_zhinpile_screenshot0.png)
