const TOP = 50;
const LEFT = 50;
const RIGHT = 100;
const MARGIN = 0;
let elevator = document.querySelector(".elevator");
let level = document.querySelector(".level");
let elevsPasitions = [];
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function createBuilding(elevCount, levelCount) {
  
  const minDiv = document.querySelector(".main") 
  minDiv.style.height = `${MARGIN + levelCount * TOP }px`;
  minDiv.style.width = `${MARGIN + elevCount * RIGHT}px`;

  function creatingDiv(prop) {
    let { node, append, index, clName, horizon } = prop;

    node.className = clName;
    node.dataIndex = index + 1;
    node.innerText = index + 1;
    append.appendChild(node);
    if (horizon) {
      let position = getRandomNumberBetween(0, levelCount - 1);
      elevsPasitions.push({
        id: node.dataIndex,
        position: levelCount - position,
        drag:true
      });
      node.style.top = `${MARGIN + TOP * position}px`;
      node.style.left = `${MARGIN + LEFT * index}px`;
    } else {
      node.style.top = `${MARGIN + TOP * (levelCount - index - 1)}px`;
      node.addEventListener("click", (ev) => {
        let randoms = [];
        let min = Infinity;
        for (let elev of elevsPasitions) {
          if (Math.abs(elev.position - ev.target.dataIndex) < min && elev.drag) {
            
            min = Math.abs(elev.position - ev.target.dataIndex);
            randoms = [elev.id];
          } else if (Math.abs(elev.position - ev.target.dataIndex) == min) {
            randoms.push(elev.id);
          }
          else if(elev.position - ev.target.dataIndex==0){
            return
          }
          elev.drag=true
        }
        
        if (min == 0) {
          return;
        } else {
          let id = getRandomNumberBetween(0, randoms.length - 1);
          let dragible = document.querySelectorAll(".elev")[randoms[id] - 1];
          dragible.style.top = `${MARGIN + TOP * (levelCount - index - 1)}px`; 
          elevsPasitions[randoms[id] - 1].position = ev.target.dataIndex;
          elevsPasitions[randoms[id] - 1].drag = false;

          
        }
      });
    }
  }
  for (let i = 0; i < elevCount; i++) {
    let elev = document.createElement("div");
    creatingDiv({
      node: elev,
      append: elevator,
      index: i,
      clName: "elev",
      horizon: true,
    });
  }
  for (let i = 0; i < levelCount; i++) {
    let lev = document.createElement("div");
    creatingDiv({
      node: lev,
      append: level,
      index: i,
      clName: "lev",
      vertical: true,
    });
  } 
}

createBuilding(3, 20);
