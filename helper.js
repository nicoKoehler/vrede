let sizeObserver = new ResizeObserver(() => {
    let heightA = $("#main-colA").height()
    $("#main-colB").height(heightA)

});
sizeObserver.observe($("#main-colA")[0])

$(document).ready(function(){
    try{
        $("#btn-fight").click(function() {
            let logsTop = $("#log").offset().top;
            let bodyHeight = $(document.body).height();
            let addHeight = 200;
            
            $(document).scrollTop(logsTop - bodyHeight + addHeight)
        })
    }catch(error){
        console.log("Like no Element yet");
    }
})