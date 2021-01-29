/**
 * Autodesk.Viewing.Document.load() success callback.
 * Proceeds with model initialization.
 */
function onDocumentLoadSuccess(doc) {

    console.log("onDocumentLoadSuccess()!")
    // A document contains references to 3D and 2D geometries.
    console.log("Doc : ")
    console.log(doc)

    geometries = doc.getRoot().search({
        'type': 'geometry'
    });
    if (geometries.length === 0) {
        console.error('Document contains no geometries.');
        return;
    }
    console.log("Geometries : ")
    console.log(geometries)

    ldDoc = doc;

    // Choose any of the avialable geometries
    initGeom = geometries[0];

    loadInViewer(ldDoc, initGeom)
}

/**
 * Autodesk.Viewing.Document.load() failure callback.
 */
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}