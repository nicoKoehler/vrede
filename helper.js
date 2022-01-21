let sizeObserver = new ResizeObserver(() => {
    let heightA = $("#main-colA").height()
    console.log(`Element was resized. NEW SIZE: ${heightA}`);
    $("#main-colB").height(heightA)
});
sizeObserver.observe($("#main-colA")[0])

