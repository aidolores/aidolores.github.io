const Food = {

 container:null,

 init(id){
  this.container=document.getElementById(id)
 },

 render(data){

  if(typeof data==="string"){
   this.renderText(data)
   return
  }

  if(data.type==="project"){
   this.renderProject(data.files)
   return
  }

  if(data.type==="image"){
   this.renderImage(data.prompt)
   return
  }

  if(data.type==="code"){
   this.renderCode(data.language,data.code)
   return
  }

 },

 renderText(text){

  const div=document.createElement("div")
  div.className="food-text"
  div.innerText=text

  this.container.appendChild(div)

 },

 renderCode(lang,code){

  const box=document.createElement("div")
  box.className="food-code"

  const title=document.createElement("div")
  title.className="food-code-title"
  title.innerText=lang

  const pre=document.createElement("pre")
  pre.innerText=code

  box.appendChild(title)
  box.appendChild(pre)

  this.container.appendChild(box)

 },

 renderProject(files){

  for(const name in files){

   const card=document.createElement("div")
   card.className="food-file"

   const header=document.createElement("div")
   header.className="food-file-name"
   header.innerText=name

   const pre=document.createElement("pre")
   pre.innerText=files[name]

   card.appendChild(header)
   card.appendChild(pre)

   this.container.appendChild(card)

  }

 },

 renderImage(prompt){

  const img=document.createElement("img")

  img.src=
   "https://image.pollinations.ai/prompt/"
   + encodeURIComponent(prompt)

  img.className="food-image"

  this.container.appendChild(img)

 }

}
