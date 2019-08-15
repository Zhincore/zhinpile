/****************/
/**** CONFIG ****/
/****************/

const PAGE_SIZE = 16;     // How many photos per page?
const TITLE = "Foxes";    // A pile of what?
const PORT = 8131;  
const HOST = "127.0.0.1";


/*************/
/**** APP ****/
/*************/

const express = require('express');
const Twig = require('twig');
const fs = require('fs');

const app = express();
const twig = Twig.twig;


const FRONTEND = "frontend/";
const PATH = "data"; // path/to/the/images inside of FRONTEND


app.set("twig options", {
    strict_variables: true
});


app.all("/([a-zA-Z0-9]+)/([0-9])?", (req, res)=>{
  const url = getMyURL(req.url);

  const page = (url != "" ? Number(url) : 0);

  let dir = fs.readdirSync(FRONTEND+PATH);
  const pages = Math.ceil(dir.length / PAGE_SIZE);

  let data = [];

  dir.forEach((file)=>{
    const stats = fs.statSync(FRONTEND+PATH+"/"+file);

    data.push({
      type: fileType(file.split('.').pop()),
      file: file,
      time: stats.mtimeMs
    })
  });

  data.sort(timeSort);
  data = data.slice(PAGE_SIZE*page, PAGE_SIZE*(page+1));

  res.render("index.twig", {data: data, path: PATH, page: page, pages: pages, title: TITLE});
});

app.all("/*", (req,res)=>{
  const url = getMyURL(req.url);
  if(url != "" && fs.existsSync(FRONTEND+url)){
    res.sendFile(__dirname+"/"+FRONTEND+url);

  }else if(url == "" && req.url[req.url.length-1] != "/"){
    res.redirect(req.url+"/");

  }else{
    res.status(404).send("404 Not found");
  }
});

app.listen(PORT, HOST);


function fileType(ext){
  let type = "image";

  switch(ext){
    case "mp4":
    case "wemb":
    case "mkv":
    case "avi":
    case "flv":
      type = "video";
      break;
  }

  return type;
}

function getMyURL(url){
  return url.replace(/^\//, '').replace(/\/$/, '').split("/").slice(1).join("/");
}

function timeSort(a, b){
  if(a.time > b.time){
    return -1;
  }else if(a.time < b.time){
    return 1
  }
  return 0;
}
