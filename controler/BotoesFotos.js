function BotoesFotos(){
	$(".botao-fotos").on("click", function(){
		var botao = $(this).attr("botao");
		var imovel = $("#resp").attr("codigo");
		var codigo = $(this).parent().parent().attr("codigo");
		switch(botao){
			case "principal":
				AlertaCarregando();
				$.get("model/index.php?class=FotoPrincipal&imovel="+imovel+"&id="+codigo, function(model){
					var model = JSON.parse(model);
					Alerta(model.resp, model.msg);
					if($("a[menu='inicio']").hasClass("active")){
						$("#modal-fotos").modal("hide");
						$("a[menu='inicio']").removeClass("active").click();
					}
				});
				break;	
			case "excluir":
				AlertaCarregando();
				$.get("model/index.php?class=ExcluirFoto&imovel="+imovel+"&id="+codigo, function(model){
					var model = JSON.parse(model);
					if(model.erro == 0){
						$("td[codigo='"+codigo+"']").parent().remove();
						if($("a[menu='inicio']").hasClass("active")){
							$("a[menu='inicio']").removeClass("active").click();
						}
					}
					Alerta(model.resp, model.msg);
				});
				break;
			case "add":
				AlertaCarregando();
				$("#modal-fotos").modal("hide");
				$('.modal-backdrop').remove();
				AlertaCarregando();
				$.get("view/admin/enviar-foto.html", function(view){
					$("#resp").html(view);
					$("#modal-enviar-foto form").attr("codigo", imovel);
					FechaAlerta();
					$("#modal-enviar-foto").modal("show");
				});			
				break;
		}
	});
}