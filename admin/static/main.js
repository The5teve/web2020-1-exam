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
    btn.innerHTML = 'Удалить';
    btn.classList.add('btn');
    btn.classList.add('btn-outline-danger');
    btn.classList.add('btn-sm');
    btn.onclick = deleteBtnHandler;
    td.append(btn);
    edit = document.createElement('i');
    edit.classList.add('fas')
    edit.classList.add('fa-pen')
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

window.onload = function() {
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