How to set up a JS & p5.js enviroment in zed?

1. npm init -y
2. npm install -D vite
3. p5 lib
  1. CDN `<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.min.js"></script>; <script src="./src/sketch.js"></script>`
  2. ES Module `<script type="module" src="sketch.js">; </script> & import p5 from 'https://cdn.skypack.dev/p5';`
  3. `npm install p5`, `import p5 from 'p5'`
  4. or download the files into the project, https://p5js.org/download/, `<script src="js/p5.js">`; `<script src="sketch.js">;`
 

add - "scripts": {
    "dev": "vite"
  },
to package.json

to use p5 in js script import it like all js/code libraries

then `npm run dev` to see code changes
