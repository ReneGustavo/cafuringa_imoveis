$(".imovel-lista").on("click", function(){
	alert("teste");
	AlertaCarregando();
	$(".link-menu").removeClass("active");
	$("#corpo").hide("slow");
	$.get("view/imovel.html", function(view){
		$("#corpo").html(view);
		$("#corpo").show("slow");
		FechaAlerta();
	});
});