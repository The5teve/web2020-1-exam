let currentPage = 1;


function editRecord(selectRecord){

    let b = JSON.stringify(selectRecord);

   for (let prop in selectRecord) {
       //alert(prop + "=" + selectRecord[prop]);
     
      if (prop=="id" || prop=="created_at" || prop=="updated_at" || prop=="socialDiscount"|| prop=="isNetObject"|| prop=="socialPrivileges" || prop=="rate" ){
        continue;
      } else {
        let temp = document.getElementById(`${prop}`);
        temp.value= selectRecord[prop];
      }
      if (selectRecord.isNetObject==1){
        let isNetObject = document.getElementById('isNetTrue');
        isNetObject.checked= true;
      }  else if (selectRecord.isNetObject==0) {      
        let isNetObject = document.getElementById('isNetFalse');
        isNetObject.checked= true;
    }
    if (selectRecord.socialPrivileges==1){
        let socialPrivileges = document.getElementById('socialPrivilegesTrue');
        socialPrivileges.checked= true;
        } 
    else if (selectRecord.socialPrivileges==0) {     
        let socialPrivileges = document.getElementById('socialPrivilegesFalse');
        socialPrivileges.checked= true;
        }
    }
  
/*
    let name = document.getElementById('name');
    name.value= selectRecord.name;
    let address = document.getElementById('address');
    address.value= selectRecord.address;
    let admArea = document.getElementById('admArea');
    admArea.value= selectRecord.admArea;
    let district = document.getElementById('district');
    district.value= selectRecord.district;

    let operatingCompany = document.getElementById('OperatingCompany');
    operatingCompany.value= selectRecord.operatingCompany;
    let publicPhone = document.getElementById('publicPhone');
    publicPhone.value= selectRecord.publicPhone;
    let seatsCount = document.getElementById('SeatsCount');
    seatsCount.value= selectRecord.seatsCount;
    let typeObject = document.getElementById('typeObject');
    typeObject.value= selectRecord.typeObject;
    if (selectRecord.socialPrivileges==1){

        let socialPrivileges = document.getElementById('socialPrivilegesTrue');
        socialPrivileges.checked= true;
        } 
    else if (selectRecord.socialPrivileges==0) {
            
        let socialPrivileges = document.getElementById('socialPrivilegesFalse');
        socialPrivileges.checked= true;
        }
    let set_1 = document.getElementById(`set_1`);
    set_1.value= selectRecord.set_1;
    let set_2 = document.getElementById(`set_2`);
    set_2.value= selectRecord.set_2;
    let set_3 = document.getElementById(`set_3`);
    set_3.value= selectRecord.set_3;
    let set_4 = document.getElementById(`set_4`);
    set_4.value= selectRecord.set_4;
    let set_5 = document.getElementById(`set_5`);
    set_5.value= selectRecord.set_5;
    let set_6 = document.getElementById(`set_6`);
    set_6.value= selectRecord.set_6;
    let set_7 = document.getElementById(`set_7`);
    set_7.value= selectRecord.set_7;
    let set_8 = document.getElementById(`set_8`);
    set_8.value= selectRecord.set_8;
    let set_9 = document.getElementById(`set_9`);
    set_9.value= selectRecord.set_9;
    let set_10 = document.getElementById(`set_10`);
    set_10.value= selectRecord.set_10;
 */
    }
    
function editRecordTable(record){
    let td;
    let btn;
    let edit;
    let row = document.getElementById(record.id)
    row.innerHTML = '';
    td = document.createElement('td');
    td.innerHTML = record.name;
    row.append(td);
    td = document.createElement('td');
    td.innerHTML = record.typeObject;
    row.append(td);
    td = document.createElement('td');
    td.innerHTML = record.address;
    row.append(td);
    td = document.createElement('td');
    btn = document.createElement('button');
    btn.dataset.recordId =record.id;
    btn.innerHTML = 'Удалить';
    btn.classList.add('btn');
    btn.classList.add('btn-outline-danger');
    btn.classList.add('btn-sm');
    btn.setAttribute("data-target","#exampleModal");
    btn.setAttribute("data-toggle","modal");
    btn.onclick = deleteBtnHandler;
    td.append(btn);
    edit = document.createElement('i');
    edit.dataset.recordId = record.id;
    edit.classList.add('fas');
    edit.setAttribute("data-target","#staticBackdrop");
    edit.setAttribute("data-toggle","modal");
    edit.classList.add('fa-pen');
    edit.onclick = editBtnHandler;
    td.append(edit);
    row.append(td);



}
function AddOption(Set, idOfEl){
temp=document.getElementById(idOfEl);
let option;
    for (selectRecord of Set) {
        option = document.createElement('option');
        option.innerHTML = selectRecord;
        option.value = selectRecord;
        temp.append(option);  
    }

}
function renderRecordsSelect(selectRecords) {
    let myset = new Set();
    let myset1 = new Set();
    let myset2 = new Set();
    for (selectRecord of selectRecords) {
        myset.add(selectRecord.admArea);
        myset1.add(selectRecord.typeObject);
        myset2.add(selectRecord.district);
           
    }
    AddOption(myset, 'admArea1'); 
    AddOption(myset, 'admArea');
    AddOption(myset1, 'typObj1');
    AddOption(myset1, 'typeObject');
    AddOption(myset2, 'dist1'); 
    AddOption(myset2, 'district'); 
    myset.clear();
    myset1.clear();
    myset2.clear();

}

function prepareForm(Form) {
    let result=`?`;
    for(let [name, value] of Form) {
       result+=`${name}=${value}&`; // key1=value1, потом key2=value2
      }
    
      return result

}
function deleteBtnHandler(event) {

    document.getElementById('actuallyDeleteBtn').dataset.recordId=event.target.dataset.recordId;
    document.getElementById('areYouSure').innerHTML = `Вы уверены, что хотите удалить данные предприятия ${document.getElementById(event.target.dataset.recordId).firstChild.innerHTML}?`
        /*
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'DELETE', function () {                                      
        document.getElementById(this.response).remove();
        this.status==200 ? myAlert(1,`delete`,this.response.name) : myAlert(0,`delete`,this.response.name);
        

    });
 */

}
function putPagination() {

    document.getElementById('firstPageElement').dataset.value=currentPage;
    document.getElementById('firstPageElement').innerHTML=currentPage;
    document.getElementById('secondPageElement').dataset.value=+currentPage+1;
    document.getElementById('secondPageElement').innerHTML=+currentPage+1;
    document.getElementById('thirdPageElement').dataset.value=+currentPage+2;
    document.getElementById('thirdPageElement').innerHTML=+currentPage+2;
    document.getElementById('previousElement').dataset.value=+currentPage-1;

    document.getElementById('nextElement').dataset.value=+currentPage+1;




}

function editBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url, 'GET', function() {
        editRecord(this.response);
        
    })
    let adm = document.getElementById('staticBackdropLabel');
    adm.innerHTML = "Редактировать запись";
    document.getElementById('createBtn').hidden=true;
    
    let edit = document.getElementById('editBtn');
    edit.hidden=false;
    edit.dataset.recordId=event.target.dataset.recordId;

    



}
function renderRecord(record){
    let row;
    let td;
    let btn;
    let edit;
    row=document.createElement('tr');
    row.id=record.id;
    td = document.createElement('td');
    td.innerHTML = record.name;
    row.append(td);
    td = document.createElement('td');
    td.innerHTML = record.typeObject;
    row.append(td);
    td = document.createElement('td');
    td.innerHTML = record.address;
    row.append(td);
    td = document.createElement('td');
    btn = document.createElement('button');
    btn.dataset.recordId =record.id;
    btn.innerHTML = 'Удалить';
    btn.classList.add('btn');
    btn.classList.add('btn-outline-danger');
    btn.classList.add('btn-sm');
    btn.setAttribute("data-target","#exampleModal");
    btn.setAttribute("data-toggle","modal");
    btn.onclick = deleteBtnHandler;
    td.append(btn);
    edit = document.createElement('i');
    edit.dataset.recordId = record.id;
    edit.classList.add('fas');
    edit.setAttribute("data-target","#staticBackdrop");
    edit.setAttribute("data-toggle","modal");
    edit.classList.add('fa-pen');
    edit.onclick = editBtnHandler;
    td.append(edit);
    row.append(td);

    return row;
}
function renderRecords(records, page){

   let t = document.getElementById('records').querySelector('tbody');
   t.innerHTML = '';

   for (let record = (page-1)*10; record<page*10; record++) {
        t.append(renderRecord(records[record]));
   }
}
function record_path(id){
    return `/api/data1/${id}`
}

function sendRequest(url, method, onloadHandler, params){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);

}
let host = "http://exam-2020-1-api.std-400.ist.mospolytech.ru";
let records_path = "/api/data1";

function myAlert(result,type,name){
    let alerttrigger = document.getElementById('for-alerts');
    let alertElement =document.createElement('div');
    alertElement.classList.add('alert');

    if (result==1){
    alertElement.classList.add('alert-info')
    if (type == "add"){
    alertElement.innerHTML = `Заведение ${name} успешно добавлено`;     
    } else if (type == "edit"){
    alertElement.innerHTML = `Заведение ${name} успешно изменено`;      
    }else{
    alertElement.innerHTML = `Заведение ${name} успешно удалено`;      
    }
    } else {
    alertElement.classList.add('alert-danger');
    alertElement.innerHTML = `Ошибка. Повторите попытку позднее`    
    }
    alertElement.classList.add('my-0');
    alerttrigger.append(alertElement);
    setTimeout( () => alertElement.remove(), 5000)
}
document.getElementById('createNewBtn').onclick = function (){
    document.getElementById('createForm').reset();
}




window.onload = function() {
    putPagination();
    let url = new URL(records_path, host);
    sendRequest(url, 'GET', function() {
    renderRecords(this.response,currentPage);
    renderRecordsSelect(this.response);

});

    document.getElementById('createNewBtn').onclick = function(){
        let adm = document.getElementById('staticBackdropLabel');
        adm.innerHTML = "Добавить новую запись";
        document.getElementById('createBtn').hidden=false;
        document.getElementById('editBtn').hidden=true;
        document.getElementById('createForm').reset();
    }

    document.getElementById('actuallyDeleteBtn').onclick = function(){
        let url = new URL(record_path(this.dataset.recordId), host);
        sendRequest(url,'DELETE', function () {                                      
        document.getElementById(this.response).remove();
        this.status==200 ? myAlert(1,`delete`,this.response.name) : myAlert(0,`delete`,this.response.name);
        

    });
    }
    document.getElementById('downloadDataBtn').onclick = function (){
        let url = new URL(records_path, host);
        let params = new FormData(document.getElementById('findForm'));
        sendRequest(url,'GET', function () {
            renderRecords(this.response);

        }, params);
        
    }
    document.getElementById('greatPaginations').onclick = function(){
        
        let tempTarget = event.target.dataset.value;
        sendRequest(url,'GET', function () {
            
            renderRecords(this.response, tempTarget);
            currentPage=Number(tempTarget);
            putPagination();
        });
    }
    document.getElementById('editBtn').onclick = function (){ 
        let params = new FormData(document.getElementById('createForm'));
        let urlId = record_path(document.getElementById('editBtn').dataset.recordId)+prepareForm(params);
        let url = new URL(urlId, host);
        sendRequest(url,'PUT', function() {
            editRecordTable(this.response);
            this.status==200 ? myAlert(1,`edit`,this.response.name) : myAlert(0,`edit`,this.response.name);
        });

        document.getElementById('createForm').reset();
    }

    document.getElementById('createBtn').onclick = function (){

        let url = new URL(records_path, host);
        let params = new FormData(document.getElementById('createForm'));

        sendRequest(url,'POST', function () {
            document.getElementById('records').querySelector('tbody').append(renderRecord(this.response));
            this.status==200 ? myAlert(1,`add`,this.response.name) : myAlert(0,`add`,this.response.name);
            
        }, params );
 
        document.getElementById('createForm').reset();
    }

}