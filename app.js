'use strict';

// Station content is a dated reference, not a verified final rule set.
const stations = [
  { name:'Burpees', value:'50', unit:'repeticiones', focus:'Trabajo de cuerpo completo', description:'La ficha de referencia indica 50 burpees. Combina el trabajo físico con la transición de vuelta a la carrera.', metrics:[], note:'El reparto de repeticiones y el criterio de ejecución en pareja están por confirmar.' },
  { name:'Wall Balls', value:'80', unit:'repeticiones', focus:'Coordinación y fuerza', description:'La ficha de referencia incluye 80 Wall Balls y diferencia la carga para hombre y mujer.', metrics:[['Hombre','9','kg'],['Mujer','6','kg']], note:'La inclusión de esta prueba, la altura del objetivo y el reparto del trabajo requieren validación definitiva.' },
  { name:'Thrusters', value:'60', unit:'repeticiones', focus:'Fuerza y resistencia', description:'La ficha de referencia indica 60 thrusters, con cargas diferenciadas para cada atleta.', metrics:[['Hombre','30','kg'],['Mujer','20','kg']], note:'El implemento, el estándar de movimiento y la forma de compartir las repeticiones están por confirmar.' },
  { name:'Walking Lunges', value:'100', unit:'metros', focus:'Desplazamiento y control', description:'La ficha de referencia indica 100 m de zancadas. Esta distancia forma parte de la estación y se muestra separada de los 3,2 km de carrera.', metrics:[['Hombre','20','kg'],['Mujer','10','kg']], note:'La carga y su posición deben validarse: existen versiones previas del ejercicio sin peso.' },
  { name:'Farmer Carry', value:'120', unit:'metros', focus:'Agarre y desplazamiento', description:'La ficha de referencia incluye un recorrido de 120 m con carga en cada mano. Los metros corresponden al trabajo de estación.', metrics:[['Hombre','2 × 24','kg'],['Mujer','2 × 16','kg']], note:'Confirmar su inclusión frente a la variante anterior de carga en pareja y definir los relevos.' },
  { name:'Goblet Squats', value:'80', unit:'repeticiones', focus:'Fuerza y control', description:'La ficha de referencia indica 80 sentadillas tipo goblet. La pieza no especifica el peso de esta estación.', metrics:[], note:'Faltan la carga, el estándar de ejecución y el reparto de repeticiones en pareja.' }
];

const steps=[{type:'opening',name:'Apertura',short:'Inicio',symbol:'↗'}];
stations.forEach((station,i)=>{
  steps.push({type:'station',name:station.name,stationIndex:i,symbol:String(i+1).padStart(2,'0')});
  if(i<stations.length-1)steps.push({type:'run',name:'Carrera',from:i+1,to:i+2,symbol:'↗'});
});
steps.push({type:'closing',name:'Cierre y meta',short:'Meta',symbol:'✓'});

const $=id=>document.getElementById(id);
const routeList=$('route-list');
let current=0;

steps.forEach((step,index)=>{
  const li=document.createElement('li');
  if(step.type==='run')li.className='run-step';
  const button=document.createElement('button');
  button.className='step-button';
  button.type='button';
  button.dataset.index=String(index);
  button.setAttribute('aria-controls','step-card');
  const stationPrefix=step.type==='station'?`Estación de referencia ${step.stationIndex+1}: `:'';
  const runSuffix=step.type==='run'?`, 400 metros entre estaciones ${step.from} y ${step.to}`:'';
  button.setAttribute('aria-label',`${stationPrefix}${step.name}${runSuffix}`);
  const node=document.createElement('span');node.className='node';node.setAttribute('aria-hidden','true');node.textContent=step.symbol;
  const label=document.createElement('span');label.className='step-label';label.textContent=step.type==='run'?'400 m carrera':step.name;
  const meta=document.createElement('span');meta.className='route-meta';meta.textContent=step.type==='station'?'Referencia':step.type==='run'?'Transición':'Metros por validar';
  const arrow=document.createElement('span');arrow.className='step-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
  button.append(node,label,meta,arrow);li.append(button);routeList.append(li);
  button.addEventListener('click',()=>selectStep(index));
  button.addEventListener('keydown',event=>{
    let target=null;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')target=Math.min(index+1,steps.length-1);
    if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=Math.max(index-1,0);
    if(event.key==='Home')target=0;
    if(event.key==='End')target=steps.length-1;
    if(target!==null){event.preventDefault();selectStep(target);routeList.querySelector(`[data-index="${target}"]`).focus();}
  });
});

function metric(label,value,unit){
  const div=document.createElement('div');div.className='metric';
  const small=document.createElement('small');small.textContent=label;
  const strong=document.createElement('strong');strong.textContent=value+' ';
  const suffix=document.createElement('span');suffix.textContent=unit;
  strong.append(suffix);div.append(small,strong);return div;
}

function selectStep(index){
  current=Math.max(0,Math.min(index,steps.length-1));
  const step=steps[current];
  routeList.querySelectorAll('button').forEach((button,i)=>{
    if(i===current)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
  });
  $('step-index').textContent=`ETAPA ${String(current+1).padStart(2,'0')} / ${steps.length}`;
  $('step-symbol').textContent=step.symbol;
  $('step-title').textContent=step.name;
  $('step-metrics').replaceChildren();
  if(step.type==='station'){
    const station=stations[step.stationIndex];
    $('step-type').textContent='Estación · referencia';
    $('step-kicker').textContent=station.focus;
    $('step-description').textContent=station.description;
    $('step-metrics').append(metric('VOLUMEN EN LA FICHA',station.value,station.unit));
    station.metrics.forEach(m=>$('step-metrics').append(metric(m[0].toUpperCase(),m[1],m[2])));
    $('step-context').textContent=`Por validar: ${station.note} Orden mostrado para consulta; pendiente confirmación oficial.`;
  }else if(step.type==='run'){
    $('step-type').textContent='Carrera · transición';
    $('step-kicker').textContent=`Entre las estaciones de referencia ${String(step.from).padStart(2,'0')} y ${String(step.to).padStart(2,'0')}`;
    $('step-title').textContent='Vuelve a la carrera.';
    $('step-description').textContent='El formato indica 400 m de carrera entre cada estación. Esta transición conecta el trabajo físico con la siguiente prueba.';
    $('step-metrics').append(metric('DISTANCIA ENTRE ESTACIONES','400','m'),metric('FORMATO','02','atletas'));
    $('step-context').textContent='La distancia entre estaciones está indicada en el material del evento. Los ejercicios a ambos lados se muestran en el orden de consulta de la ficha de referencia.';
  }else if(step.type==='opening'){
    $('step-type').textContent='Salida · por validar';
    $('step-kicker').textContent='El inicio del desafío';
    $('step-title').textContent='Todo empieza con una decisión.';
    $('step-description').textContent='La pareja toma la salida y afronta la apertura del recorrido antes de las estaciones. El total de carrera del evento es de 3,2 km.';
    $('step-metrics').append(metric('CARRERA TOTAL','3,2','km'),metric('ESTACIONES','06',''));
    $('step-context').textContent='Distancia de apertura pendiente: apertura y cierre deben sumar 1.200 m, además de las cinco transiciones de 400 m. Una pieza anterior mencionaba 800 m iniciales; falta validación final.';
  }else{
    $('step-type').textContent='Llegada · por validar';
    $('step-kicker').textContent='El cierre de la experiencia';
    $('step-title').textContent='La meta se cruza en pareja.';
    $('step-description').textContent='Después del trabajo de estaciones llega el cierre del recorrido. Los 3,2 km corresponden al total de carrera de la competencia.';
    $('step-metrics').append(metric('CARRERA TOTAL','3.200','m'),metric('ESTACIONES','06',''));
    $('step-context').textContent='Falta confirmar la distancia final y si se mantiene la prueba mental mencionada en versiones previas. No se incorpora un reto adicional como parte del reglamento sin su validación.';
  }
  $('previous').disabled=current===0;
  $('next').disabled=current===steps.length-1;
  $('step-counter').textContent=`${String(current+1).padStart(2,'0')} / ${steps.length}`;
  $('step-progress').style.width=`${current/(steps.length-1)*100}%`;
  $('step-body-link').hidden=step.type!=='station';
  if(step.type==='station')window.dispatchEvent(new CustomEvent('orvyx:station',{detail:step.stationIndex}));
  // Keep the active card visible within the horizontal mobile list without moving the page.
  if(window.matchMedia('(max-width: 600px)').matches){
    const active=routeList.querySelector('[aria-current="step"]');
    const left=active.parentElement.offsetLeft-routeList.offsetLeft;
    routeList.scrollLeft=left-(routeList.clientWidth-active.offsetWidth)/2;
  }
}
$('previous').addEventListener('click',()=>selectStep(current-1));
$('next').addEventListener('click',()=>selectStep(current+1));
selectStep(0);

const dialog=$('review-dialog');
document.querySelectorAll('.review-open').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
document.querySelectorAll('.close-dialog').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
