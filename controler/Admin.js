function CliqueMenuAdmin(){
	$(".menu-admin").click(function(e){
		e.preventDefault();
		var menu = $(this).attr("menu");
		switch(menu){
			case "listar":
				$.get("view/admin/"+menu+".html", function(view){
					$("#resp").html(view);
					$("#modal-listar").modal("show");
				});
				break;
			case "cadastrar":
				$.get("view/admin/"+menu+".html", function(view){
					$("#resp").html(view);
					$("#modal-cadastrar").modal("show");
				});
			break;
			case "cadastrar-usuario":
				$.get("view/admin/"+menu+".html", function(view){
					$("#resp").html(view);
					$("#modal-cadastrar-usuario").modal("show");
				});
				break;
			case "ajuda":
				$.get("view/admin/"+menu+".html", function(view){
					$("#resp").html(view);
					$("#modal-ajuda").modal("show");
				});
				break;
			case "editar-senha":
				$.get("view/admin/"+menu+".html", function(view){
					$("#resp").html(view);
					$("#modal-editar-senha").modal("show");
				});
				break;
			case "sair":
				$.get("model/index.php?class=Logout", function(model){
					Alerta("success","Você saiu com sucesso!");
					MenuAdmin("hide");
					$("#link-admin").show();
				});
				break;
		}
	});	

}	