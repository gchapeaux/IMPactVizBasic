var viewer; /* L'instance du viewer */
var ldDoc; /* Le document natif chargé */
var geometries; /* Les géométries du document */
var indexDoc = 0; /* L'index du document chargé dans la liste de documents */
var indexGeom = 0; /* L'index de la géométrie chargée parmi les géométries du document */
var expireTimeSeconds = 60 * 30; /* La durée de validité du token */

// Récupère le token depuis Forge.
var getToken = function (onGetAccessToken, errHandler) {
    var xhr = new window.XMLHttpRequest();
    xhr.open('GET', '/forge/oauth/token');
    xhr.onload = function () {
        onGetAccessToken(xhr.responseText, expireTimeSeconds);
    };
    xhr.onerror = function () {
        (errHandler || window.alert)('Failed to get token: ' + xhr.response);
    };
    xhr.overrideMimeType("text/plain");
    xhr.send();
};

// Options du viewer
var options = {
    env: 'AutodeskProduction',
    getAccessToken: getToken,
    refreshToken: getToken,
    api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    globalOffset: {
        x: 0,
        y: 0,
        z: 0
    }
};

// // Modèles mixtes
// var docIds = [
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZHZpbXBjdGJ1Y2tldC9hcmMucnZ0',
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0aWZjL0FNUC1QUk8tQklNLVIxOS1NRVAuaWZj'
// ]; 

// // Modèles RVT
// var docIds = [
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZHZpbXBjdGJ1Y2tldC9hcmMucnZ0',
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZHZpbXBjdGJ1Y2tldC9tZXAucnZ0'
// ];

// // Modèles IFC
// var docIds = [
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0aWZjL0FNUC1QUk8tQklNLVIxOS1BUkMuaWZj',
//     'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0aWZjL0FNUC1QUk8tQklNLVIxOS1NRVAuaWZj'
// ]; 


Autodesk.Viewing.Initializer(options, function onInitialized() {

    // Initialisation du Viewer
    var viewerDiv = document.getElementById('MyViewerDiv');
    var config = {
        extensions: ['HandleSelectionExtension']
    };
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config);
    viewer.start();
});

// // Affiche la géométrie suivante d'un modèle RVT
// function callNext() {
//     // Next geometry index. Loop back to 0 when overflown.
//     indexGeom = (indexGeom + 1) % geometries.length;
//     var nextGeom = geometries[indexGeom];
//     viewer.tearDown();
//     loadInViewer(ldDoc, nextGeom)
// }

// // Superpose un nouveau modèle
// function callNew() {
//     indexDoc = (indexDoc + 1) % docIds.length;
//     Autodesk.Viewing.Initializer(options, function onInitialized() {
//         Autodesk.Viewing.Document.load(docIds[indexDoc], onDocumentLoadSuccess, onDocumentLoadFailure);
//     });
// }

// Superpose un nouveau modèle avec l'urn
function callByUrn(urn) {
    console.log(urn)
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function loadInViewer(doc, geom) {

    svfUrl = doc.getViewablePath(geom)
    var modelOptions = {
        applyRefPoint: true,
        globalOffset: {
            x: 0,
            y: 0,
            z: 0
        },
        sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    viewer.loadModel(svfUrl, modelOptions, onModelLoadSuccess, onModelLoadError)
}

function getForgeToken(callback) {
    jQuery.ajax({
        url: '/api/forge/oauth/token',
        success: function (res) {
            callback(res.access_token, res.expires_in)
        }
    });
}