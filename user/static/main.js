function renderRecordsSelect(selectRecords) {
    let d = document.getElementById('dist');
    let t = document.getElementById('typObj');
    let sd = document.getElementById('social');
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
    option2.innerHTML = selectRecord.socialPrivileges;
    option2.value = selectRecord.socialPrivileges;  
    sd.append(option2);
    }
}
function deleteBtnHandler(event) {
    let url = new URL(record_path(event.target.dataset.recordId), host);
    sendRequest(url,'DELETE', function () {
        document.getElementById(this.response).remove();

    });


}
function editBtnHandler(){}
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
    btn.innerHTML = 'Выбрать';
    btn.classList.add('btn');
    btn.classList.add('btn-dark');
    btn.onclick = deleteBtnHandler;
    td.append(btn);

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

}