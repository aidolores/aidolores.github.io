const Food = {

 container: null,

 init(id){
   this.container = document.getElementById(id);
   this.container.innerHTML = ""; // Clear container
 },

 render(data){

   if(typeof data === "string") return this.renderText(data);

   switch(data.type){

     case "text": this.renderText(data.content); break;
     case "code": this.renderCode(data.language, data.code, data.run || false); break;
     case "project": this.renderProject(data.files); break;
     case "image": this.renderImage(data.prompt); break;
     case "table": this.renderTable(data.table); break;
     case "chart": this.renderChart(data.chartType, data.data); break;
     case "markdown": this.renderMarkdown(data.md); break;
     case "game": this.renderGame(data.code); break;
     case "3d": this.render3DScene(data.scene); break;
     default: console.warn("Unknown type:", data.type);
   }
 },

 // --- Renderers ---
 renderText(text){
   const div = document.createElement("div");
   div.className = "food-text";
   div.innerText = text;
   this.container.appendChild(div);
 },

 renderCode(lang, code, run=false){
   const box = document.createElement("div");
   box.className = "food-code";

   const title = document.createElement("div");
   title.className = "food-code-title";
   title.innerText = lang;

   const pre = document.createElement("pre");
   pre.innerText = code;

   box.appendChild(title);
   box.appendChild(pre);
   this.container.appendChild(box);

   if(run && lang==="javascript"){
     try { eval(code); }
     catch(e){ console.error(e); }
   }
 },

 renderProject(files){
   for(const name in files){
     const card = document.createElement("div");
     card.className = "food-file";

     const header = document.createElement("div");
     header.className = "food-file-name";
     header.innerText = name;

     const pre = document.createElement("pre");
     pre.innerText = files[name];

     card.appendChild(header);
     card.appendChild(pre);
     this.container.appendChild(card);
   }
 },

 renderImage(prompt){
   const img = document.createElement("img");
   img.src = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt);
   img.className = "food-image";
   this.container.appendChild(img);
 },

 renderTable(table){
   const tbl = document.createElement("table");
   tbl.className = "food-table";
   table.forEach((row,i)=>{
     const tr = document.createElement("tr");
     row.forEach(cell=>{
       const td = document.createElement(i===0 ? "th" : "td");
       td.innerText = cell;
       tr.appendChild(td);
     });
     tbl.appendChild(tr);
   });
   this.container.appendChild(tbl);
 },

 renderChart(type, data){
   // Requires Chart.js included in page
   const canvas = document.createElement("canvas");
   this.container.appendChild(canvas);
   new Chart(canvas, { type, data });
 },

 renderMarkdown(md){
   if(typeof marked !== "undefined"){
     const div = document.createElement("div");
     div.innerHTML = marked(md);
     div.className = "food-markdown";
     this.container.appendChild(div);
   } else {
     this.renderText(md);
   }
 },

 renderGame(jsCode){
   const iframe = document.createElement("iframe");
   iframe.className = "food-game";
   iframe.srcdoc = `<html><body><script>${jsCode}<\/script></body></html>`;
   this.container.appendChild(iframe);
 },

 render3DScene(scene){
   // Using Three.js (three.min.js must be included)
   const div = document.createElement("div");
   div.className = "food-3d";
   this.container.appendChild(div);

   const scene3d = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, div.clientWidth/div.clientHeight, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer({antialias:true});
   renderer.setSize(div.clientWidth, div.clientHeight);
   div.appendChild(renderer.domElement);

   if(scene.mesh){
     scene.mesh.forEach(m=>{
       const geometry = new THREE.BoxGeometry(...(m.size||[1,1,1]));
       const material = new THREE.MeshBasicMaterial({color:m.color||0x00ff00});
       const cube = new THREE.Mesh(geometry, material);
       cube.position.set(...(m.pos||[0,0,0]));
       scene3d.add(cube);
     });
   }

   camera.position.z = 5;

   function animate(){ requestAnimationFrame(animate); renderer.render(scene3d,camera);}
   animate();
 }

};
