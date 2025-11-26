const MODULES = [
  {key:'web-tech', name:'Tech Web', desc:'HTML, CSS, JavaScript & web basics'},
  {key:'cryptography', name:'Cryptography', desc:'Encryption, protocols and security'},
  {key:'wireless', name:'Réseaux sans fils', desc:'WiFi, LTE, wireless concepts'},
  {key:'video-audio', name:'Vidéo & Audio', desc:'Multimedia processing & streaming'},
  {key:'field-net', name:'Réseaux de terrain', desc:'On-site network deployment & cabling'},
  {key:'iot', name:'IoT', desc:'Internet of Things & sensor networks'},
  {key:'ai', name:'AI', desc:'Intro to Artificial Intelligence & ML'}
];

const grid = document.getElementById('modulesGrid');
MODULES.forEach(m=>{
  const div = document.createElement('div');
  div.className='module-card';
  div.innerHTML = `<h3>${m.name}</h3><p class="small">${m.desc}</p>`;
  div.style.cursor = 'pointer';
  div.addEventListener('click', ()=>{
    // ouvrir module.html avec paramètres
    window.location.href = `module.html?module=${m.key}&title=${encodeURIComponent(m.name)}`;
  });
  grid.appendChild(div);
});

// afficher info utilisateur
const user = localStorage.getItem('user_fullname');
const group = localStorage.getItem('user_group');
const uel = document.getElementById('userInfo');
if(user) uel.textContent = `Logged in as: ${user} — Group: ${group || '-'}`;

// =======================
// MODULE.HTML - afficher Cours / TD / TP selon PDF disponible
// =======================

function qs(name){ 
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// récupérer infos module
const moduleKey = qs('module') || 'web-tech';
const moduleTitle = qs('title') ? decodeURIComponent(qs('title')) : 'Module';

// afficher infos utilisateur
const userFull2 = localStorage.getItem('user_fullname');
const userInfo2 = document.getElementById('userInfo2');
if(userInfo2) userInfo2.textContent = userFull2 ? 'Logged in as: ' + userFull2 : '';

// afficher titre et key du module
const titleEl = document.getElementById('moduleTitle');
const keyEl = document.getElementById('moduleKey');
if(titleEl) titleEl.textContent = moduleTitle;
if(keyEl) keyEl.textContent = 'Module key: ' + moduleKey;

// définir cartes possibles
const cardsData = [
  {type:'Cours', icon:'📖', file:`${moduleKey}-course.pdf`},
  {type:'TD', icon:'📝', file:`${moduleKey}-td.pdf`},
  {type:'TP', icon:'🔧', file:`${moduleKey}-tp.pdf`}
];

const contentEl = document.getElementById('moduleContent');

if(contentEl){
  cardsData.forEach(c=>{
    // vérifier si le PDF existe avant d'ajouter la carte
    fetch(`pdfs/${c.file}`, {method:'HEAD'})
      .then(res=>{
        if(res.ok){
          const div = document.createElement('div');
          div.className = 'module-box';

          // couleurs par type
          let color = '#afd9f5ff'; // default bleu pour Cours
          if(c.type === 'TD') color = '#d091d6ff';
          if(c.type === 'TP') color = '#eea1dbff';
          div.style.backgroundColor = color;

          div.innerHTML = `
            <div class="box-icon">${c.icon}</div>
            <strong>${c.type}</strong>
            <a href="pdfs/${c.file}" target="_blank">Open ${c.type}</a>
          `;
          contentEl.appendChild(div);
        }
      }).catch(err=>{
        
      });
  });
}
