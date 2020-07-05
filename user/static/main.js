let currentPage = 1;
let boolHadaChoose=false;
let screenWidth = screen.width;

function renderRecordsSelect(selectRecords) {
    let d = document.getElementById('dist');
    let t = document.getElementById('typObj');
    let sd = document.getElementById('admArea');
    let option;
    for (selectRecord of selectRecords) {
    option = document.createElement('option');
    option.innerHTML = selectRecord.district;
    option.value = selectRecord.district;
    d.append(option);
    option1 = document.createElement('option');
    option1.innerHTML = selectRecord.typeObject;
    option1.value = selectRecord.typeObject;
    t.append(option1);
    option2 = document.createElement('option');
    option2.innerHTML = selectRecord.admArea;
    option2.value = selectRecord.admArea;  
    sd.append(option2);
    }
}

function renderModal(record){

    document.getElementById('AdmArea').innerHTML=record.admArea;
    document.getElementById('name').innerHTML=record.name;
    document.getElementById('District').innerHTML=record.district;
    document.getElementById('address').innerHTML=record.address;
    document.getElementById('rating').innerHTML=record.rate;

}
function deleteBtnHandler(event) {
    
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'DELETE', function () {
        document.getElementById(this.response).remove();

    });


}

function addPositionBtn(event){
 let inc = document.getElementById(event.target.dataset.recordId);
 let price = document.getElementById(`p_${event.target.dataset.recordId}`);
 let temp = document.getElementById('checksum');
 if (inc.value>0){
    if(event.target.innerHTML=="+") {

        temp.innerHTML= Number(temp.innerHTML)+Number(price.innerHTML.substring(0,price.innerHTML.length-2));
        inc.value=+inc.value+1;
    }
    else{
        temp.innerHTML= Number(temp.innerHTML)-Number(price.innerHTML.substring(0,price.innerHTML.length-2));
        inc.value=+inc.value-1;
    }
 } else if (inc.value==0) {
    if(event.target.innerHTML=="+") {

        temp.innerHTML= Number(temp.innerHTML)+Number(price.innerHTML.substring(0,price.innerHTML.length-2));
        inc.value=+inc.value+1;
    }

 }


}
function myAlert(){
    let alerttrigger = document.getElementById('for-alerts');
    let alertElement =document.createElement('div');
    alertElement.classList.add('alert');
    alertElement.classList.add('alert-info');
    alertElement.innerHTML = `Спасибо спасибо спасибо спасибо спасибо спасибо. Вы заказали. Мы вам перезвоним, хотя вы нигде не указывали номер телефона. Честно перезвоним. да`;      

    alertElement.classList.add('my-0');
    alerttrigger.append(alertElement);
    setTimeout( () => alertElement.remove(), 5000)
}
function placeSelectedRecord(record) {
    document.getElementById('getOrder').dataset.recordId=record.id;
    let temp = document.getElementById('checksum');
    temp.dataset.checksum=0;
    temp.innerHTML="0";
    document.getElementById('choosenProp').hidden=false;
    for (let i =1; i<11; i++) {
        getCard(i).innerHTML='';
        let tit = document.createElement('h5');
        tit.classList.add("card-tilte");
        tit.classList.add("text-center");
        tit.innerHTML = `Cет ${i}`;                                     // <h5 class="card-title">Сет 3</h5>
        getCard(i).append(tit)
        let text =  document.createElement('p');
        text.classList.add('card-text');
        text.classList.add('text-center');
        text.innerHTML = `Сет №${i} заведения ${record.name}`;
        getCard(i).append(text);
        let price =  document.createElement('p');
        price.classList.add('card-text');
        price.classList.add('text-center');
        price.classList.add('font-italic');
        price.id=`p_${record.id}_${i}`;
        switch (i)   {
            case 1:
                price.innerHTML = `${record.set_1} &#8381;`
                price.value=record.set_1;
                break;
            case 2:
                price.innerHTML = `${record.set_2} &#8381;`
                price.value=record.set_2;
                break;
            case 3:
                price.innerHTML = `${record.set_3} &#8381;`
                price.value=record.set_3;
                break;
            case 4:
                price.innerHTML = `${record.set_4} &#8381;`
                price.value=record.set_3;
                break; 
            case 5:
                price.innerHTML = `${record.set_5} &#8381;`
                price.value=record.set_3;
                break;
            case 6:
                price.innerHTML = `${record.set_6} &#8381;`
                price.value=record.set_3;
                break;
            case 7:
                price.innerHTML = `${record.set_7} &#8381;`
                price.value=record.set_3;
                break;
            case 8:
                price.innerHTML = `${record.set_8} &#8381;`
                price.value=record.set_3;
                break;
            case 9:
                price.innerHTML = `${record.set_9} &#8381;`
                price.value=record.set_3;
                break;
            case 10:
                price.innerHTML = `${record.set_10} &#8381;`
                price.value=record.set_3;
                break;               
        }     
        getCard(i).append(price);
        row= document.createElement('div')
        row.classList.add('row')   
        let btn1 = document.createElement('div');
        let Count = document.createElement('input');              
        Count.classList.add('form-control');
        Count.classList.add('col-4');
        Count.value="0";
        Count.setAttribute("readonly","readonly");
        Count.id=`${record.id}_${i}`;  
        Count.dataset.recordId=i;             
        btn1.classList.add('btn');
        btn1.classList.add('col-4');
        btn1.classList.add('btn-secondary');
        btn1.innerHTML = "-";
        btn1.dataset.recordId=`${record.id}_${i}`;
        btn1.onclick=addPositionBtn;
        row.append(btn1);                         

        row.append(Count);
        let btn2 = document.createElement('div');               
        btn2.classList.add('btn');
        btn2.classList.add('col-4');
        btn2.classList.add('btn-secondary');
        btn2.innerHTML = "+";
        btn2.dataset.recordId=`${record.id}_${i}`;
        btn2.onclick = addPositionBtn;
        row.append(btn2);    
        getCard(i).append(row)                                         
    }
}
function getCard(number) {
    return document.getElementById(`card${number}`)
}
function dintinctRecords(records, Form){

    for (let [key,value] in Form){
        alert(key);
        alert(value);
    }

}
function chooseBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'GET', function () {
        placeSelectedRecord(this.response);
        renderModal(this.response)

     });



}


function checkOptions(){
    document.getElementById('forOptions').innerHTML="";
   if (document.getElementById('fastDelivery').checked){
    
      let row = document.createElement('div');
      row.classList.add('row');

      let delivery = document.createElement('h6');
      delivery.classList.add('col-9');
      delivery.innerHTML="Быстрая доставка";
      delivery.classList.add('customOption');
      let delivery1 = document.createElement('div');
      delivery1.classList.add('col-2');
      delivery1.innerHTML="+30%";
      delivery1.classList.add('customOption');
      row.append(delivery);
      row.append(delivery1);
      document.getElementById('forOptions').append(row);


   }
}
function renderRecord(record){
    let row;
    let td;
    let btn;
    row=document.createElement('tr');
    row.id=record.id;
    td = document.createElement('td');
    td.innerHTML = record.name;
    row.append(td);
    if (screenWidth>524) {
        td = document.createElement('td');
        td.innerHTML = record.typeObject;
        row.append(td);
        td = document.createElement('td');
        td.innerHTML = record.address;
        row.append(td);
        }
    td = document.createElement('td');
    btn = document.createElement('button');
    btn.dataset.recordId =record.id;
    btn.innerHTML = 'Выбрать';
    btn.classList.add('btn');
    btn.setAttribute("href","#choosenProp");
    btn.classList.add('btn-dark');
    btn.onclick = chooseBtnHandler;
    td.append(btn);

    row.append(td);

    return row;
}
function renderRecords(records, page){

    let t = document.getElementById('records').querySelector('tbody');
    t.innerHTML = '';
 
    for (let record = (page-1)*20; record<page*20; record++) {
         t.append(renderRecord(records[record]));
    }
}
function record_path(id){
    return `/api/data1/${id}`
}
function screenCheck(){
    if(screenWidth<525){
        document.getElementById('NotForMobile1').remove();
        document.getElementById('NotForMobile2').remove();
    }
}
function putPagination(key=1) {

    document.getElementById('firstPageElement').dataset.value=currentPage;
    document.getElementById('firstPageElement').innerHTML=currentPage;
    document.getElementById('secondPageElement').dataset.value=+currentPage+1;
    document.getElementById('secondPageElement').innerHTML=+currentPage+1;
    document.getElementById('thirdPageElement').dataset.value=+currentPage+2;
    document.getElementById('thirdPageElement').innerHTML=+currentPage+2;
    document.getElementById('previousElement').dataset.value=+currentPage-1;
    document.getElementById('nextElement').dataset.value=+currentPage+1;


}

function sendRequest(url, method, onloadHandler, params){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);

}
let host = "http://exam-2020-1-api.std-900.ist.mospolytech.ru";
let records_path = "/api/data1";


window.onload = function() {
    screenCheck();
    putPagination();
    document.getElementById('fastDelivery').onclick=function(){
       let temp =  document.getElementById('percent');
        this.checked ? temp.innerHTML="+30%" : temp.innerHTML="";
        
    }
    document.getElementById('moreButton').onclick = function(){
        document.getElementById('moreButtonRemove').remove()
    }
    document.getElementById('getOrder').onclick = function(){
        checkOptions();

    }
    let url = new URL(records_path, host);
        sendRequest(url, 'GET', function() {
        renderRecords(this.response,currentPage);
        renderRecordsSelect(this.response);
    });
    document.getElementById('downloadDataBtn').onclick = function (){
        let url = new URL(records_path, host);
        sendRequest(url,'GET', function () {
           let myForm = new FormData(document.getElementById('findForm'));
           dintinctRecords(this.response, myForm);

        });

    }

    document.getElementById('greatPaginations').onclick = function(){

        let tempTarget = event.target.dataset.value;
        sendRequest(url,'GET', function () {
            
            renderRecords(this.response, tempTarget);
            currentPage=Number(tempTarget);
            putPagination(key=2);
 
        });
    }
    document.getElementById('successFinally').onclick = function(){
        myAlert();
        document.getElementById('choosenProp').hidden=true;
    }
}