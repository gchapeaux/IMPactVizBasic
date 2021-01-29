var isTreeVisible = true;
var models;

function toggleTreeVisibility() {
    if (isTreeVisible) {
        isTreeVisible = false;
        $(".treeCol").removeClass("col-sm-4").hide();
        $(".viewerCol").removeClass("col-sm-8").addClass("col-sm-12")
        $("#toggleButton").html("Show explorer")
    } else {
        isTreeVisible = true;
        $(".treeCol").addClass("col-sm-4").show();
        $(".viewerCol").addClass("col-sm-8").removeClass("col-sm-12")
        $("#toggleButton").html("Hide explorer")
    }
}

function refreshViewer() {
    models = viewer.impl.modelQueue().getModels();
    for (var model of models) {
        viewer.impl.unloadModel(model);
    }
}