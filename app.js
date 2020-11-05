'use strict';
(function () {
    /** Method to update the generated EDI log */
    const updateEDI = function () {
        var finalEDI = "[REG1TEST;1]\n" +
            "TName=ULL kv " + document.getElementById('PBand').value + "\n" +
            "TDate=" + document.getElementById('TDate').value.replaceAll('-', '') + ";" + document.getElementById('TDate').value.replaceAll('-', '') + "\n" +
            "PCall=" + document.getElementById('PCall').value.toUpperCase() + "\n" +
            "PWWLo=" + document.getElementById('PWWLo').value.toUpperCase() + "\n" +
            "PSect=" + document.getElementById('PSect').value + "\n" +
            "PBand=" + document.getElementById('PBand').value + "\n" +
            "RName=" + document.getElementById('RName').value + "\n" +
            "RCall=" + document.getElementById('PCall').value.toUpperCase() + "\n" +
            "RCoun=" + document.getElementById('RCoun').value + "\n" +
            "MOpe1=" + document.getElementById('PCall').value.toUpperCase() + "\n" +
            "STXEq=" + document.getElementById('STXEq').value + "\n" +
            "SPowe=" + document.getElementById('SPowe').value + "\n" +
            "SRXEq=" + document.getElementById('SRXEq').value + "\n" +
            "SAnte=" + document.getElementById('SAnte').value + "\n" +
            "SAntH=" + document.getElementById('SAntH').value + "\n" +
            "[Remarks]\n" +
            "[QSORecords;1]\n" +
            "201103;1800;ES1BBQ;6;59;;59;;;KO29IK;0;;N;N;";
        document.getElementById('finalEDI').value = finalEDI;
    };

    /** Method to generate tabs **/
    const tabify = function (e) {
        const header = e.querySelector('.tabs-header');
        const content = e.querySelector('.tabs');
        const tab_headers = [...header.children];
        const tab_contents = [...content.children];
        tab_contents.forEach(x => x.style.display = 'none');
        let current_tab_index = -1;

        function setTab(index) {
            if (current_tab_index > -1) {
                tab_headers[current_tab_index].classList.remove('active');
                tab_contents[current_tab_index].style.display = 'none';
            }
            tab_headers[index].classList.add('active');
            tab_contents[index].style.display = '';
            current_tab_index = index;
        }

        var default_tab_index = tab_headers.findIndex(x => {
            return [...x.classList].indexOf('default-tab') > -1;
        });

        default_tab_index = default_tab_index === -1 ? 0 : default_tab_index;
        setTab(default_tab_index);
        tab_headers.forEach((x, i) => x.onclick = event => setTab(i));
    };

    /** Method to store and restore input field values for EDI header */
    const inputSaveAndRestore = function (e) {
        if (localStorage[e.id]) e.value = localStorage[e.id]
        e.addEventListener('input', function () {
            localStorage[e.id] = e.value;
            updateEDI();
        });
    };

    /** Method to store and restore select field values for EDI header */
    const selectSaveAndRestore = function (e) {
        e.addEventListener('change', function () {
            localStorage[e.id] = e.value;
            updateEDI();
        });
        if (localStorage[e.id]) {
            let opts = e.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
                if (opt.value == localStorage[e.id]) {
                    e.selectedIndex = j;
                    break;
                }
            }
        }
    };

    /** Run all the scrips */
    document.querySelectorAll('.tabs-container').forEach(x => tabify(x));
    document.querySelectorAll('#edi_header input').forEach(x => inputSaveAndRestore(x));
    document.querySelectorAll('#edi_header select').forEach(x => selectSaveAndRestore(x));
    updateEDI();
})();