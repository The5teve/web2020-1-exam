function editRecord(selectRecord){

    let name = document.getElementById('name');
    name.value= selectRecord.name;
    let address = document.getElementById('address1');
    address.value= selectRecord.address;

    let admArea = document.getElementById('admArea1');
    admArea.value= selectRecord.admArea;

    let district = document.getElementById('dist1');
    district.value= selectRecord.district;

    if (selectRecord.isNetObject==1){

    let isNetObject = document.getElementById('isNetTrue');
    isNetObject.checked= true;
    } 
    else {
        
        let isNetObject = document.getElementById('isNetFalse');
        isNetObject.checked= true;
    }
    let operatingCompany = document.getElementById('OperatingCompany');
    operatingCompany.value= selectRecord.operatingCompany;

    let publicPhone = document.getElementById('publicPhone');
    publicPhone.value= selectRecord.publicPhone;

    let seatsCount = document.getElementById('SeatsCount');
    seatsCount.value= selectRecord.seatsCount;

    let typeObject = document.getElementById('typObj1');
    typeObject.value= selectRecord.typeObject;
    if (selectRecord.socialPrivileges==1){

        let socialPrivileges = document.getElementById('socialPrivilegesTrue');
        socialPrivileges.checked= true;
        } 
    else {
            
            let socialPrivileges = document.getElementById('socialPrivilegesFalse');
            socialPrivileges.checked= true;
        }
/*
    let name = document.getElementById('name');
    name.value= selectRecord.name;
    let name = document.getElementById('name');
    name.value= selectRecord.name;
    */
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
    /* 
    for (selectRecord of myset){
        option = document.createElement('option');
        option.innerHTML = selectRecord;
        option.value = selectRecord;
        adm.append(option);
    } */

    
}

function deleteBtnHandler(event) {

    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'DELETE', function () {                                      //////////////////////////////////////////////////////
        document.getElementById(this.response).remove();
        

    });


}

function editBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url, 'GET', function() {
        editRecord(this.response);
        
    })
    let adm = document.getElementById('staticBackdropLabel');
    adm.innerHTML = "Редактировать запись";


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
function renderRecords(records){
   let t = document.getElementById('records').querySelector('tbody');
   t.innerHTML = '';

   for (record of records) {
        t.append(renderRecord(record));
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

function Success(msg){
    let alerttrigger = document.getElementById('for-alerts');
    let succalert = document.createElement('div');
    succalert.classList.add('alert');
    succalert.classList.add('alert-info');
    succalert.classList.add('my-0');
    succalert.innerHTML = msg;
    alerttrigger.append(succalert);
    setTimeout( () => succalert.remove(), 5000)
}
document.getElementById('createNewBtn').onclick = function (){

    document.getElementById('createForm').reset();
}
window.onload = function() {

    let url = new URL(records_path, host);
    sendRequest(url, 'GET', function() {
    renderRecordsSelect(this.response);
});

    document.getElementById('downloadDataBtn').onclick = function (){
        let url = new URL(records_path, host);
        let params = new FormData(document.getElementById('findForm'));
        sendRequest(url,'GET', function () {
            renderRecords(this.response);

        }, params);

    }
  
    document.getElementById('createBtn').onclick = function (){

        let url = new URL(records_path, host);
        let params = new FormData(document.getElementById('createForm'));
        sendRequest(url,'POST', function () {
            document.getElementById('records').querySelector('tbody').append(renderRecord(this.response));

        }, params );
        Success(`Заведение успешно добавлено`);
        document.getElementById('createForm').reset();
    }

}