/* Experimental feature: Allow downloading of log */
const postEDI = function() {
    let c = document.getElementById('finalEDI').parentElement;
    let f = document.createElement('form');
    f.action = 'https://es7arl.carlnet.ee/ull/?p=saadalogi';
    f.method = 'POST';
    f.enctype = 'multipart/form-data';
    f.style = 'display:none';

    let l = document.createElement('textarea');
    l.name = 'logifailisisu';
    l.value = document.getElementById('finalEDI').value;

    let k = document.createElement('input');
    k.name = 'klass';
    k.type = 'hidden';
    k.value = document.getElementById('PSect').value;

    f.appendChild(l);
    f.appendChild(k);
    c.appendChild(f);

    f.submit();
};

document.getElementById('postEDI').addEventListener("click", postEDI);