let sizeObserver = new ResizeObserver(() => {
    let heightA = $("#main-colA").height()
    $("#main-colB").height(heightA)
    try{
        document.getElementById("log").scrollIntoView();
    }catch(error){
        console.log("Likely no initial object to scroll to");
    }
});
sizeObserver.observe($("#main-colA")[0])

