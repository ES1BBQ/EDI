/* Experimental feature: Allow downloading of log */
const downloadEDI = function() {
    let date = (localStorage['TDate'] && localStorage['TDate'].length > 0) ? ''.concat('_',localStorage['TDate'].replace(/-/g, '')) : '';
    let call = (localStorage['PCall'] && localStorage['PCall'].length > 0) ? ''.concat('_',localStorage['PCall'].toLowerCase()) : '';
    let filename = ''.concat('log',call,date,'.edi')
    this.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( document.getElementById('finalEDI').value ));
    this.setAttribute('download', filename);
};

document.getElementById('downloadEDI').addEventListener("click", downloadEDI);