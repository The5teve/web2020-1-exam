
function renderRecordsSelect(selectRecords) {
    let adm = document.getElementById('admArea1');
    let typ = document.getElementById('typObj1');
    let dist = document.getElementById('dist1');
    let option;
    let option1;
    let option2;

    for (selectRecord of selectRecords) {
    if (!(selectRecord.admArea in myset)){
        option = document.createElement('option');
        option.innerHTML = selectRecord.admArea;
        option.value = selectRecord.admArea;
        adm.append(option);
        myset.add(selectRecord.admArea);
    } 
    if (!(selectRecord.typeObject in myset)){
        option1 = document.createElement('option');
        option1.innerHTML = selectRecord.typeObject;
        option1.value = selectRecord.typeObject;
        typ.append(option1);
        myset.add(selectRecord.typeObject);
    } 
    if (!(selectRecord.district in myset)){
        option2 = document.createElement('option');
        option2.innerHTML = selectRecord.district;
        option2.value = selectRecord.district;
        dist.append(option2);
        myset.add(selectRecord.district); 
    } 
    
    }

}
function deleteBtnHandler(event) {
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'DELETE', function () {
        document.getElementById(this.response).remove();
        

    });


}
function editBtnHandler(event){
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url, 'GET', function() {
 
        
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
let myset = new Set();
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

        }, params);

    }
}