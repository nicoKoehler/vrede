let sizeObserver = new ResizeObserver(() => {
    let heightA = $("#main-colA").height()
    $("#main-colB").height(heightA)
});
sizeObserver.observe($("#main-colA")[0])

