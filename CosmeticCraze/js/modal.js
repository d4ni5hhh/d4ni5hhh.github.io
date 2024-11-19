

function clearTopProduct() {
  console.log('clear')
  var table = document.getElementById('top-product').querySelector('table');
  var tbody = table.querySelector('tbody');
  while (tbody.childNodes[1]) {
    tbody.removeChild(tbody.childNodes[1]);
    console.log('del')
  }
}

function update(data){
  fs.writeFile(fileTopProduct,data,(err)=>{
    if(err){
      console.log(err)
    }
  })
}

function showEdit(num){
  document.querySelector('input[name="'+num+'"]').removeAttribute('disabled')
}
function hideEdit(num){
  document.querySelector('input[name="'+num+'"]').setAttribute('disabled','true')
}

async function addTopProduct(addData){
  
  var data = await topProductData()
  data.push(addData)
  var newData = data.join(',')
  update(newData)
  reload()
  /*modalProductClose()
  clearTopProduct()
  showTopProduct()
  modalToggle()*/
}

async function editTopProduct(num){
  var data = await topProductData()
  data[num] = document.querySelector('input[name="'+num+'"]').value
  var newData = data.join(',')
  update(newData)
  hideEdit(num)
}

async function deleteTopProduct(num){
  var data = await topProductData()
  data.splice(num,1)
  var newData = data.join(',')
  update(newData)
  clearTopProduct()
  showTopProduct()
}

/*   fs.readFile(fileTopProduct, 'utf-8', (err, data) => {
    let i = 0
      if (err) throw err;
      line = data.split('\n')
      for(var data of line){
        
      }
  }) */


var btn = document.getElementById('modal-btn');
var modal = document.getElementById('modal');
var main = document.querySelector('div.main');

btn.addEventListener('click', modalToggle)
//modal.addEventListener('click', modalClose)
window.onclick = modalClose()
function modalToggle() {
  modal.classList.add('show')
  main.classList.add('blur')
}
function modalClose(){
  modal.classList.remove('show');
  main.classList.remove('blur')
}


var modalProduct = document.getElementById('modal-product');
function modalProductOpen(name,desc,image,link,price) {
  console.log(link)
  modalProduct.classList.add('show')
  main.classList.add('blur')
  document.querySelector('div#top-desc h3#name').textContent = name
  //document.querySelector('div#top-desc h3#price').textContent = price
  document.querySelector('div#body-desc').textContent = desc
  document.querySelector('div#image-container img').src = image
  document.getElementById('add').addEventListener('click',function(){
    addTopProduct(name)
  })
  document.getElementById('shop').addEventListener('click',function(){
    window.location.href = link
  })
}
function modalProductClose(){
  modalProduct.classList.remove('show');
  main.classList.remove('blur')
}

window.onclick = function(event) {
  if(modalProduct.className == 'show'){
    if (event.target === modalProduct) {
      modalProductClose(); 
    }
  }else{
    if (event.target === modal) {
      modalClose(); 
    }
  }
};
