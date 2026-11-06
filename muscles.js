'use strict';

// Qualitative educational synthesis of the linked primary sources.
// These are functional roles, never measured activation percentages or pain targets.
const muscleZones={
  quads:{label:'Cuádriceps',location:'Parte anterior de los muslos. Ayudan a extender las rodillas al subir, saltar o dar una zancada.'},
  glutes:{label:'Glúteos',location:'Parte posterior de la cadera. Participan en la extensión de cadera y en el control de la pelvis.'},
  chest:{label:'Pecho',location:'Parte anterior del tórax. Participa especialmente en la fase de empuje de una flexión.'},
  shoulders:{label:'Hombros',location:'Zona de los deltoides, alrededor de la articulación del hombro. Participa en elevar y controlar los brazos.'},
  triceps:{label:'Tríceps',location:'Parte posterior de los brazos, entre hombro y codo. Ayudan a extender los codos al empujar.'},
  core:{label:'Zona media',location:'Abdominales y musculatura estabilizadora del tronco. Ayudan a mantener la postura y a transferir fuerza.'},
  grip:{label:'Antebrazos / agarre',location:'Entre los codos y las muñecas. El trabajo de agarre permite sostener las cargas con las manos.'},
  hamstrings:{label:'Isquiotibiales',location:'Parte posterior de los muslos. Participan en el trabajo de cadera y en el control de las piernas.'},
  calves:{label:'Pantorrillas',location:'Parte posterior de la pierna, debajo de la rodilla. Participan en el impulso y en el control del tobillo.'},
  upperBack:{label:'Espalda alta',location:'Parte superior de la espalda. Ayuda a sostener la posición de los hombros y a controlar las cargas.'}
};
const muscleProfiles=[
  {name:'Burpees',primary:['quads','glutes','chest'],support:['shoulders','triceps','core'],description:'En la variante con flexión y salto, las piernas impulsan el cuerpo y el pecho participa en el empuje desde el suelo. La zona media ayuda a controlar el tronco.'},
  {name:'Wall Balls',primary:['quads','glutes','shoulders'],support:['triceps','core','upperBack'],description:'Las piernas y la cadera generan el impulso desde la sentadilla. Hombros y brazos lo continúan en el lanzamiento; el tronco estabiliza el movimiento.'},
  {name:'Thrusters',primary:['quads','glutes','shoulders','triceps'],support:['core','upperBack','hamstrings'],description:'La sentadilla y el empuje sobre la cabeza unen el trabajo de piernas, cadera, hombros y tríceps. La zona media mantiene el control del tronco.'},
  {name:'Walking Lunges',primary:['quads','glutes'],support:['core'],description:'Cuádriceps y glúteos trabajan en cada zancada para descender y avanzar. La zona media ayuda a mantener el equilibrio. La posición de la carga o de los brazos puede añadir otras demandas.'},
  {name:'Farmer Carry',primary:['grip','core'],support:['upperBack','shoulders','glutes'],description:'El agarre sostiene las cargas mientras la zona media ayuda a mantener el tronco estable. Espalda alta, hombros y cadera colaboran en el control de la postura al caminar.'},
  {name:'Goblet Squats',primary:['quads','glutes'],support:['core','hamstrings'],description:'Las piernas y los glúteos producen la mayor parte del movimiento al levantarte de la sentadilla. La zona media estabiliza el tronco con el peso sostenido frente al pecho.'}
];

const svgNS='http://www.w3.org/2000/svg';
function svgNode(tag,attributes={}){const element=document.createElementNS(svgNS,tag);for(const [key,value] of Object.entries(attributes))element.setAttribute(key,value);return element;}
const outline='M98 57 L98 68 L77 73 C62 75 52 86 48 105 L35 151 L25 204 L27 229 L38 230 L45 208 L55 168 L66 139 L70 182 L65 215 L68 253 L72 291 L79 345 L78 389 L94 391 L102 343 L105 296 L110 254 L115 296 L118 343 L126 391 L142 389 L141 345 L148 291 L152 253 L155 215 L150 182 L154 139 L165 168 L175 208 L182 230 L193 229 L195 204 L185 151 L172 105 C168 86 158 75 143 73 L122 68 L122 57';
const regionPaths={
  front:[
    ['shoulders','M77 80 C65 82 59 89 55 103 L69 112 L79 96 Z'],
    ['chest','M81 81 L106 86 L106 118 C94 126 81 122 74 112 L76 95 Z'],
    ['core','M86 130 L106 132 L106 192 L91 197 L81 167 Z'],
    ['grip','M47 166 L58 173 L47 205 L39 218 L31 214 L37 191 Z'],
    ['quads','M75 218 L105 217 L101 266 L94 295 L80 293 L73 260 Z']
  ],
  back:[
    ['shoulders','M77 80 C65 82 59 89 55 103 L69 112 L79 96 Z'],
    ['upperBack','M82 81 L106 86 L106 153 L91 148 L76 115 Z'],
    ['core','M92 155 L106 161 L106 197 L87 195 Z'],
    ['triceps','M59 116 L71 124 L64 157 L55 165 L48 154 Z'],
    ['grip','M47 169 L57 175 L47 206 L39 218 L31 214 L37 192 Z'],
    ['glutes','M76 203 L106 202 L107 232 L79 239 L72 221 Z'],
    ['hamstrings','M79 246 L105 241 L101 284 L96 305 L82 303 L76 276 Z'],
    ['calves','M82 315 L98 314 L97 347 L91 370 L83 367 L79 343 Z']
  ]
};
function createBody(view,label){
  const figure=document.createElement('figure');figure.className='anatomy-figure';
  const svg=svgNode('svg',{viewBox:'0 0 220 418',role:'img','aria-labelledby':`body-${view}-title body-${view}-description`});
  const title=svgNode('title',{id:`body-${view}-title`});title.textContent=`Zonas musculares: ${label.toLowerCase()}`;
  const desc=svgNode('desc',{id:`body-${view}-description`});
  svg.append(title,desc,svgNode('ellipse',{cx:110,cy:32,rx:19,ry:24,class:'body-base'}),svgNode('path',{d:outline,class:'body-base'}));
  svg.append(svgNode('path',{d:'M78 388 L94 390 L95 403 L72 403 L72 398 Z M126 390 L142 388 L148 398 L148 403 L125 403 Z',class:'body-base'}));
  svg.append(svgNode('path',{d:view==='front'?'M110 85V199 M91 142H129 M89 157H131 M90 173H130 M86 199L110 216L134 199':'M110 82V200 M86 195L110 203L134 195 M110 204V233',class:'body-seam'}));
  for(const [zone,path] of regionPaths[view]){
    for(const mirror of [false,true]){
      const region=svgNode('path',{d:path,class:'muscle-region','data-muscle-zone':zone,...(mirror?{transform:'translate(220 0) scale(-1 1)'}:{})});
      const hint=svgNode('title');hint.textContent=muscleZones[zone].label;region.append(hint);svg.append(region);
    }
  }
  const caption=document.createElement('figcaption');caption.textContent=label;
  figure.append(svg,caption);return figure;
}
document.getElementById('muscle-figures').append(createBody('front','VISTA FRONTAL'),createBody('back','VISTA POSTERIOR'));

const exercisePicker=document.getElementById('muscle-exercises');
let activeProfile=0;
let selectedZone=null;
muscleProfiles.forEach((profile,index)=>{
  const button=document.createElement('button');button.type='button';button.className='muscle-select';button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','muscle-figures muscle-exercise-name muscle-primary muscle-support');button.setAttribute('aria-label',`Ver zonas de ${profile.name}`);button.dataset.profile=String(index);
  const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
  const name=document.createElement('strong');name.textContent=profile.name;
  const arrow=document.createElement('b');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');button.append(number,name,arrow);exercisePicker.append(button);
  button.addEventListener('click',()=>selectStep(1+index*2));
  button.addEventListener('keydown',event=>{
    let nextIndex=null;
    if(event.key==='ArrowDown'||event.key==='ArrowRight')nextIndex=(index+1)%muscleProfiles.length;
    if(event.key==='ArrowUp'||event.key==='ArrowLeft')nextIndex=(index+muscleProfiles.length-1)%muscleProfiles.length;
    if(event.key==='Home')nextIndex=0;
    if(event.key==='End')nextIndex=muscleProfiles.length-1;
    if(nextIndex!==null){event.preventDefault();selectStep(1+nextIndex*2);exercisePicker.querySelector(`[data-profile="${nextIndex}"]`).focus();}
  });
});

function focusZone(zone){
  selectedZone=zone;
  document.querySelectorAll('[data-muscle-zone]').forEach(region=>region.classList.toggle('is-focused',region.dataset.muscleZone===zone));
  document.querySelectorAll('.zone-chip').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.zone===zone)));
  const insight=document.getElementById('zone-insight');const strong=document.createElement('strong');strong.textContent=muscleZones[zone].label+'. ';insight.replaceChildren(strong,document.createTextNode(muscleZones[zone].location));
}
function renderProfile(index){
  if(!Number.isInteger(index)||!muscleProfiles[index])return;
  activeProfile=index;const profile=muscleProfiles[index];
  exercisePicker.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  document.getElementById('muscle-exercise-index').textContent=`EJERCICIO DE REFERENCIA ${String(index+1).padStart(2,'0')} / 06`;
  document.getElementById('muscle-exercise-name').textContent=profile.name;
  document.getElementById('muscle-explanation').textContent=profile.description;
  document.querySelectorAll('[data-muscle-zone]').forEach(region=>{
    region.classList.toggle('is-primary',profile.primary.includes(region.dataset.muscleZone));
    region.classList.toggle('is-support',profile.support.includes(region.dataset.muscleZone));
  });
  for(const type of ['primary','support']){
    const container=document.getElementById(`muscle-${type}`);container.replaceChildren();
    profile[type].forEach(zone=>{
      const button=document.createElement('button');button.type='button';button.className='zone-chip';button.dataset.zone=zone;button.textContent=muscleZones[zone].label;button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','zone-insight muscle-figures');button.addEventListener('click',()=>focusZone(zone));container.append(button);
    });
  }
  const description=`${profile.name}. Trabajo principal: ${profile.primary.map(z=>muscleZones[z].label).join(', ')}. Apoyo y estabilidad: ${profile.support.map(z=>muscleZones[z].label).join(', ')}. Mapa orientativo sin porcentajes de activación.`;
  for(const view of ['front','back'])document.getElementById(`body-${view}-description`).textContent=description;
  focusZone(profile.primary[0]);
}
window.addEventListener('orvyx:station',event=>renderProfile(event.detail));
renderProfile(0);
