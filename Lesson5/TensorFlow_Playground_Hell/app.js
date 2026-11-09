// Fərqli arxitektura: məlumat, görünüş və saxlama funksiyaları ayrıdır.
const FIELD_NAMES = ['Training loss','Test loss','100 epoch loss','Loss < 0.05 epoch','Screenshot adı','Müşahidə'];
const LABELS = ['ID','Dataset','Features','Qat','LR','Activation','Epoch','Qeyd',...FIELD_NAMES];
const KEY = 'tfplay_';
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (id,index) => localStorage.getItem(`${KEY}${id}_${index}`) || '';
const save = (id,index,value) => localStorage.setItem(`${KEY}${id}_${index}`,value);
let dataset = [];
let currentTab = 0;

function buildRow(item){
  const [id,...rest] = item;
  const fixed = [id,...rest].map(x=>`<td>${safe(x)}</td>`).join('');
  const inputs = FIELD_NAMES.map((name,i)=>`<td><input aria-label="${safe(id+' '+name)}" data-id="${safe(id)}" data-index="${i}" value="${safe(load(id,i))}"></td>`).join('');
  return `<tr>${fixed}${inputs}</tr>`;
}
function showTab(index){
  currentTab=index;
  const [heading,items]=dataset[index];
  $('#tabs').innerHTML=dataset.map(([name],i)=>`<button data-tab="${i}" class="${i===index?'active':''}">${safe(name)}</button>`).join('');
  $('#content').innerHTML=`<section class="card"><h2>${safe(heading)}</h2><p class="meta">Nəticələri daxil etdikdə avtomatik saxlanılır.</p><div class="table-wrap"><table><thead><tr>${LABELS.map(x=>`<th>${safe(x)}</th>`).join('')}</tr></thead><tbody>${items.map(buildRow).join('')}</tbody></table></div></section>`;
}
function csvQuote(v){return '"'+String(v??'').replace(/"/g,'""')+'"'}
function exportResults(){
 const rows=[LABELS,...dataset.flatMap(([,items])=>items.map(item=>[...item,...FIELD_NAMES.map((_,i)=>load(item[0],i))]))];
 const csv='\ufeff'+rows.map(row=>row.map(csvQuote).join(',')).join('\r\n');
 const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));link.download='tensorflow_neticeler.csv';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);
}
function init(data){
 dataset=data;
 $('#tabs').addEventListener('click',event=>{const b=event.target.closest('[data-tab]');if(b)showTab(Number(b.dataset.tab))});
 $('#content').addEventListener('input',event=>{const el=event.target.closest('[data-id]');if(el)save(el.dataset.id,el.dataset.index,el.value)});
 $('#bonus').value=localStorage.getItem('tfplay_bonus')||'';
 $('#bonus').addEventListener('input',e=>localStorage.setItem('tfplay_bonus',e.target.value));
 $('#export').addEventListener('click',exportResults);
 $('#print').addEventListener('click',()=>window.print());
 showTab(0);
}
// file:// ünvanında da işləsin deyə məlumat ayrıca JS faylında saxlanır.
init(window.EXPERIMENT_GROUPS);
