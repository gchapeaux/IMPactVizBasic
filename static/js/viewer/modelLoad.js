/**
 * viewer.ModelLoad() success callback.
 * Invoked after the model's SVF has been initially loaded.
 * It may trigger before any geometry has been downloaded and displayed on-screen.
 */
function onModelLoadSuccess(model) {
    console.log('onModelLoadSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log('Model :')
    console.log(model)
}

/**
 * viewer.ModelLoad() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onModelLoadError(viewerErrorCode) {
    console.error('onModelLoadError() - errorCode:' + viewerErrorCode);
}