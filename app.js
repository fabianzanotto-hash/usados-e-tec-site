'use strict';
// Filtro e busca sobre os produtos que já estão no HTML (o catálogo funciona sem JavaScript).
const cards=[...document.querySelectorAll('.product')],results=document.querySelector('#results');
let category='Todos',search='';
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function render(){let n=0;for(const c of cards){const ok=(category==='Todos'||c.dataset.category===category)&&norm(c.dataset.search).includes(norm(search));c.hidden=!ok;if(ok)n++;}
results.textContent=n+' '+(n===1?'produto':'produtos')+' no catálogo';
let vazio=document.querySelector('#products .empty');if(!n&&!vazio){vazio=document.createElement('p');vazio.className='empty';vazio.textContent='Nenhum produto com esse filtro. Tente outro modelo ou categoria.';document.querySelector('#products').append(vazio);}else if(n&&vazio)vazio.remove();}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{if(b.tagName!=='BUTTON')return;category=b.dataset.category;document.querySelectorAll('button[data-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();}));
document.querySelector('#search').addEventListener('input',e=>{search=e.target.value;render();});
