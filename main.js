if (window.Worker) {
    const result = document.querySelector(".result");
    const entry = document.querySelector("#inputString");
    const textArea = document.getElementById("inputString");
    
    const selectedAlgorithm = document.getElementById("selectedAlgorithm");

    const vaderWorker = new Worker("./workers/vader-worker.js"  + '?' + Math.random());
    const afinnWorker = new Worker("./workers/afinn-worker.js"  + '?' + Math.random());
    const nrcWorker = new Worker("./workers/nrc-worker.js"  + '?' + Math.random());
    const bingWorker = new Worker("./workers/bing-worker.js"  + '?' + Math.random());
    

    selectedAlgorithm.addEventListener('change', () => {
        const selectedAlgorithm = document.getElementById("selectedAlgorithm").value;
        switch (selectedAlgorithm) {
            case "vader": processVader(vaderWorker, entry, result); break;
            case "afinn-165": processAfinn(afinnWorker, entry, result); break;
            case "nrc": processNRC(nrcWorker, entry, result); break;
            case "bing": processBing(bingWorker, entry, result); break;
        }
    })

    textArea.addEventListener('input', () => {
        const selectedAlgorithm = document.getElementById("selectedAlgorithm").value;
        switch (selectedAlgorithm) {
            case "vader": processVader(vaderWorker, entry, result); break;
            case "afinn-165": processAfinn(afinnWorker, entry, result); break;
            case "nrc": processNRC(nrcWorker, entry, result); break;
            case "bing": processBing(bingWorker, entry, result); break;
        }
    })
} else {
    console.log('Your browser doesn\'t support web workers.');
}

const processAfinn = (worker, entry, result) => {
     const verdict = document.querySelector(".verdict");

    if (entry.value == ""){
        verdict.innerHTML = "";
        result.innerHTML = "";
        return;
    }
    worker.postMessage(entry.value);

    worker.onmessage = function (e) {

        if(e.data < 0 ){
            verdict.innerHTML = '<div class="alert alert-warning" role="alert">Negative</div>';
        }

        if(e.data == 0 ){
            verdict.innerHTML = '<div class="alert alert-info" role="alert">Neutral</div>';
        }

        if(e.data > 0 ){
            verdict.innerHTML = '<div class="alert alert-success" role="alert">Positive</div>';
        }

        let tableHTML = '<table class="result-table table table-bordered table-striped mb-0"><thead><tr><th>Score</th></thead>';

        result.innerHTML = tableHTML + "<tr><td>" + e.data + "</td></tr></table>";
    }
}

const processVader = (worker, entry, result) => {

    const verdict = document.querySelector(".verdict");

    if (entry.value == ""){
        verdict.innerHTML = "";
        result.innerHTML = "";
        return;
    }
    worker.postMessage(entry.value);

    worker.onmessage = function (e) {

        if(e.data.compound <= 0.05 ){
            verdict.innerHTML = '<div class="alert alert-warning" role="alert">Negative</div>';
        }

        if(e.data.compound > -0.05 && e.data.compound < 0.05 ){
            verdict.innerHTML = '<div class="alert alert-info" role="alert">Neutral</div>';
        }

        if(e.data.compound >= 0.05 ){
            verdict.innerHTML = '<div class="alert alert-success" role="alert">Positive</div>';
        }

        if(e.data.compound >= 1 ){
            verdict.innerHTML = '<div class="alert alert-success" role="alert">Most extreme positive</div>';
        }

        if(e.data.compound <= -1 ){
            verdict.innerHTML = '<div class="alert alert-warning" role="alert">Most extreme negative</div>';
        }

        let tableHTML = '<table class="result-table table table-bordered table-striped mb-0"><thead><tr><th>Negative</th><th>Positive</th><th>Compound</th></tr></thead>';
        result.innerHTML = tableHTML + "<tr><td>" + e.data.neg + "</td><td>" + e.data.pos + "</td><td>" + e.data.compound + "</td></tr></table>";
    }
}

const processNRC = (worker, entry, result) => {
    const verdict = document.querySelector(".verdict");
    if (entry.value == ""){
        verdict.innerHTML = "";
        result.innerHTML = "";
        return;
    }
    worker.postMessage(entry.value);

    worker.onmessage = function (e) {
        verdict.innerHTML = "";
       
        let tableHTML = '<table class="result-table table table-bordered table-striped mb-0">';
        tableHTML +=  '<thead><tr><th>Emotion</th><th>Raw Emotion Score</th></tr></thead>';
        tableHTML += "<tbody>";
        tableHTML += "<tr><td>" + "Fear" + "</td><td>" + e.data.fear + "</td></tr>";
        tableHTML += "<tr><td>" + "Anger" + "</td><td>" + e.data.anger + "</td></tr>";
        tableHTML += "<tr><td>" + "Anticipation" + "</td><td>" + e.data.anticipation + "</td></tr>";
        tableHTML += "<tr><td>" + "Trust" + "</td><td>" + e.data.trust + "</td><tr>";
        tableHTML += "<tr><td>" + "Surprise" + "</td><td>" + e.data.surprise + "</td></tr>";
        tableHTML += "<tr><td>" + "Positive" + "</td><td>" + e.data.positive + "</td></tr>";
        tableHTML += "<tr><td>" + "Negative" + "</td><td>" + e.data.negative + "</td></tr>";
        tableHTML += "<tr><td>" + "Sadness" + "</td><td>" + e.data.sadness + "</td></tr>";
        tableHTML += "<tr><td>" + "Disgust" + "</td><td>" + e.data.disgust + "</td></tr>";
        tableHTML += "<tr><td>" + "Joy" + "</td><td>" + e.data.joy + "</td></tr>";
        tableHTML += "</tbody></table>"

        result.innerHTML = tableHTML;
    }
}

const processBing = (worker, entry, result) => {

    const verdict = document.querySelector(".verdict");
    if (entry.value == ""){
        verdict.innerHTML = "";
        result.innerHTML = "";
        return;
    }
    worker.postMessage(entry.value);

    worker.onmessage = function (e) {
        verdict.innerHTML = "";
       
        let tableHTML = '<table class="result-table table table-bordered table-striped mb-0">';
        tableHTML +=  '<thead><tr><th>Emotion</th><th>Raw Emotion Score</th></tr></thead>';
        tableHTML += "<tbody>";
        tableHTML += "<tr><td>" + "Positive" + "</td><td>" + e.data.positive + "</td></tr>";
        tableHTML += "<tr><td>" + "Negative" + "</td><td>" + e.data.negative + "</td></tr>";
        tableHTML += "</tbody></table>"

        result.innerHTML = tableHTML;
    }
}