'use strict';
(function () {

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

    /** Turn locator to nato fonetic */
    const ch2nato = function(ch) {
        switch (ch.toLowerCase()) {
            case "a": return "ALPHA";
            case "b": return "BRAVO";
            case "c": return "CHARLIE";
            case "d": return "DELTA";
            case "e": return "ECHO";
            case "f": return "FOXTROT";
            case "g": return "GOLF";
            case "h": return "HOTEL";
            case "i": return "INDIA";
            case "j": return "JULIET";
            case "k": return "KILO";
            case "l": return "LIMA";
            case "m": return "MIKE";
            case "n": return "NOVEMBER";
            case "o": return "OSCAR";
            case "p": return "PAPA";
            case "q": return "QUEBEC";
            case "r": return "ROMEO";
            case "s": return "SIERRA";
            case "t": return "TANGO";
            case "u": return "UNIFORM";
            case "v": return "VICTOR";
            case "w": return "WHISKEY";
            case "x": return "RAY";
            case "y": return "YANKEE";
            case "z": return "ZULU";
        }
        return ch;
    }

    /** Method to generate/update EDI log */
    const updateEDI = function () {
        /** Update locator value */
        let loc='';
        for (var i = 0; i < localStorage['PWWLo'].length; i++) {
            loc = loc.concat( (i==0) ? '' : ' ', ch2nato(localStorage['PWWLo'].toLowerCase().charAt(i)) )
        }
        document.getElementById('locator').value = loc;

        const listQSORecords = function(i) {
            finalEDI = finalEDI.concat("\n201103;1800;ES1BBQ;6;59;;59;;;KO29IK;0;;N;N;");
        };
        var finalEDI = "[REG1TEST;1]\n" +
            "TName=ULL kv " + document.getElementById('PBand').value + "\n" +
            "TDate=" + localStorage['TDate'].replaceAll('-', '') + ";" + localStorage['TDate'].replaceAll('-', '') + "\n" +
            "PCall=" + localStorage['PCall'].toUpperCase() + "\n" +
            "PWWLo=" + localStorage['PWWLo'].toUpperCase() + "\n" +
            "PSect=" + localStorage['PSect'] + "\n" +
            "PBand=" + localStorage['PBand'] + "\n" +
            "RName=" + localStorage['RName'] + "\n" +
            "RCall=" + localStorage['PCall'].toUpperCase() + "\n" +
            "RCoun=" + localStorage['RCoun'] + "\n" +
            "MOpe1=" + localStorage['PCall'].toUpperCase() + "\n" +
            "STXEq=" + localStorage['STXEq'] + "\n" +
            "SPowe=" + localStorage['SPowe'] + "\n" +
            "SRXEq=" + localStorage['SRXEq'] + "\n" +
            "SAnte=" + localStorage['SAnte'] + "\n" +
            "SAntH=" + localStorage['SAntH'] + "\n";
            finalEDI = finalEDI.concat( "[Remarks]\n", (localStorage['remarks'] && localStorage['remarks'].length>1) ? localStorage['remarks'] + "\n" : "" );
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        finalEDI = finalEDI + "[QSORecords;" + QSORecords.length + "]";
        QSORecords.forEach(x => listQSORecords(x));
        document.getElementById('finalEDI').value = finalEDI;
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