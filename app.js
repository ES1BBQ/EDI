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
    const ch2nato = function (ch) {
        switch (ch.toLowerCase()) {
            case "a":
                return "ALPHA";
            case "b":
                return "BRAVO";
            case "c":
                return "CHARLIE";
            case "d":
                return "DELTA";
            case "e":
                return "ECHO";
            case "f":
                return "FOXTROT";
            case "g":
                return "GOLF";
            case "h":
                return "HOTEL";
            case "i":
                return "INDIA";
            case "j":
                return "JULIET";
            case "k":
                return "KILO";
            case "l":
                return "LIMA";
            case "m":
                return "MIKE";
            case "n":
                return "NOVEMBER";
            case "o":
                return "OSCAR";
            case "p":
                return "PAPA";
            case "q":
                return "QUEBEC";
            case "r":
                return "ROMEO";
            case "s":
                return "SIERRA";
            case "t":
                return "TANGO";
            case "u":
                return "UNIFORM";
            case "v":
                return "VICTOR";
            case "w":
                return "WHISKEY";
            case "x":
                return "RAY";
            case "y":
                return "YANKEE";
            case "z":
                return "ZULU";
        }
        return ch;
    }

    /** Method to generate/update EDI log */
    const updateEDI = function () {
        /** Update locator value */
        if (localStorage['PWWLo'] && localStorage['PWWLo'].length > 1) {
            let loc = '';
            for (var i = 0; i < localStorage['PWWLo'].length; i++) {
                loc = loc.concat((i === 0) ? '' : ' ', ch2nato(localStorage['PWWLo'].toLowerCase().charAt(i)))
            }
            document.getElementById('locator').value = loc;
        }

        const listQSORecords = function (i) {
            finalEDI = finalEDI.concat("\n" + i[0] + ";" + i[1] + ";" + i[2] + ";" + i[3] + ";" + i[4] + ";;" + i[6] + ";;;" + i[5] + ";0;;N;N;");
        };
        var finalEDI = "[REG1TEST;1]\n";
        finalEDI = finalEDI.concat("TName=ULL kv ", (localStorage['PBand']) ? localStorage['PBand'] : '', "\n");
        finalEDI = finalEDI.concat("TDate=", (localStorage['TDate']) ? localStorage['TDate'].replaceAll('-', '') : '', ";", (localStorage['TDate']) ? localStorage['TDate'].replaceAll('-', '') : '', "\n");
        finalEDI = finalEDI.concat("PCall=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("PWWLo=", (localStorage['PWWLo']) ? localStorage['PWWLo'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("PSect=", (localStorage['PSect']) ? localStorage['PSect'] : '', "\n");
        finalEDI = finalEDI.concat("PBand=", (localStorage['PBand']) ? localStorage['PBand'] : '', "\n");
        finalEDI = finalEDI.concat("RName=", (localStorage['RName']) ? localStorage['RName'] : '', "\n");
        finalEDI = finalEDI.concat("RCall=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("RCoun=", (localStorage['RCoun']) ? localStorage['RCoun'] : '', "\n");
        finalEDI = finalEDI.concat("ROpe1=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("STXEq=", (localStorage['STXEq']) ? localStorage['STXEq'] : '', "\n");
        finalEDI = finalEDI.concat("SPowe=", (localStorage['SPowe']) ? localStorage['SPowe'] : '', "\n");
        finalEDI = finalEDI.concat("SRXEq=", (localStorage['SRXEq']) ? localStorage['SRXEq'] : '', "\n");
        finalEDI = finalEDI.concat("SAnte=", (localStorage['SAnte']) ? localStorage['SAnte'] : '', "\n");
        finalEDI = finalEDI.concat("SAntH=", (localStorage['SAntH']) ? localStorage['SAntH'] : '', "\n");
        finalEDI = finalEDI.concat("[Remarks]\n", (localStorage['remarks'] && localStorage['remarks'].length > 1) ? localStorage['remarks'] + "\n" : "");
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        finalEDI = finalEDI + "[QSORecords;" + QSORecords.length + "]";
        QSORecords.forEach(x => listQSORecords(x));
        document.getElementById('finalEDI').value = finalEDI;
    };

    /** Logs */

    /** Method to clear logs */
    const clearLog = function () {
        localStorage['QSORecords'] = JSON.stringify([]);
        updateLog();
        updateEDI();
    }
    document.getElementById('log_reset').addEventListener('click', clearLog);

    /** Method to update logs */
    const updateLog = function () {
        document.getElementById('log').innerHTML = '';
        const genQSORecords = function (j) {
            let row = document.createElement('div');
            row.className = "logRow"
            for (var i = 1; i < j.length; i++) {
                let cell = document.createElement('div');
                cell.innerHTML = j[i];
                row.appendChild(cell);
            }
            let cell = document.createElement('div');
            row.appendChild(cell);
            document.getElementById('log').appendChild(row);
        };
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        QSORecords.forEach(x => genQSORecords(x));
    }

    /** Method to add logs */
    const addLog = function () {
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");

        if (
            document.getElementById('TDate').value.length>0 &&
            document.getElementById('log_time').value.length>0 &&
            document.getElementById('log_callsign').value.length>0 &&
            document.getElementById('log_mode').value.length>0 &&
            document.getElementById('log_tx_rst').value.length>0 &&
            document.getElementById('log_loc').value.length>0 &&
            document.getElementById('log_rx_rst').value.length>0
        ) {
            QSORecords.push([
                document.getElementById('TDate').value.substr(2).replaceAll('-', ''),
                document.getElementById('log_time').value.replaceAll(':', ''),
                document.getElementById('log_callsign').value.toUpperCase(),
                document.getElementById('log_mode').value,
                document.getElementById('log_tx_rst').value,
                document.getElementById('log_loc').value.toUpperCase(),
                document.getElementById('log_rx_rst').value
            ]);
            localStorage['QSORecords'] = JSON.stringify(QSORecords);

            /* Reset form values */
            document.getElementById('log_time').value = '';
            document.getElementById('log_callsign').value = '';
            document.getElementById('log_mode').value = '';
            document.getElementById('log_tx_rst').value = '';
            document.getElementById('log_loc').value = '';
            document.getElementById('log_rx_rst').value = '';
            document.getElementById('log_callsign').focus();
        }

        updateLog();
        updateEDI();
    }
    document.getElementById('log_write').addEventListener('click', addLog)

    /** Log input enter magic */
    document.getElementById('log_callsign').addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if(this.value.length>0) document.getElementById("log_mode").focus();
        }
    });
    document.getElementById('log_mode').addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if(this.value.length>0) document.getElementById("log_tx_rst").focus();
        }
    });
    document.getElementById('log_tx_rst').addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if(this.value.length>0) document.getElementById("log_loc").focus();
        }
    });
    document.getElementById('log_loc').addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if(this.value.length>0) document.getElementById("log_rx_rst").focus();
        }
    });
    document.getElementById('log_rx_rst').addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addLog();
        }
    });

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

    /** Clock */
    const startClock = function () {
        var ct = new Date();
        document.getElementById('log_time').value = ct.toISOString().match(/\d\d:\d\d/);
        var t = setTimeout(startClock, 500);
    };

    /** Run all the scrips */
    document.querySelectorAll('.tabs-container').forEach(x => tabify(x));
    document.querySelectorAll('#edi_header input').forEach(x => inputSaveAndRestore(x));
    document.querySelectorAll('#edi_header select').forEach(x => selectSaveAndRestore(x));
    updateLog();
    updateEDI();
    startClock();
})();