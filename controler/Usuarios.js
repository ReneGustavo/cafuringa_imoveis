AlertaCarregando();
$.get("model/index.php?class=Usuarios", function(model){
	var model = JSON.parse(model);
	var html = "";
	if(model == 0 || model == 1){
		if(model == 0){
			FechaAlerta();
			html = "<h3 class=\"text-center\">Não há usuários cadastrados</h3>";
		}
		else{
			Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");
		}
	}
	else{
		FechaAlerta();
		var tabela = "<table width=\"100%\" class=\"table table-striped\">";
		tabela += "<tr>";
		tabela += "	<th width=\"5%\"></th>";
		tabela += "	<th width=\"90%\"></th>";
		tabela += "	<th width=\"5%\"></th>";
		tabela += "</tr>";
		$.each(model, function(index, value){
			cont = index+1;
			
			tabela += "<tr codigo=\""+value.id+"\">";
			tabela += "	<td>"+cont+"</td>";
			tabela += "	<td>"+value.login+"</td>";
			tabela += "	<td>";
			tabela += "		<button type=\"button\" class=\"btn btn-danger\" botao=\"excluir\" title=\"Excluir\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
			tabela += "	</td>";
			tabela += "</tr>";
		});
		tabela += "</table>";
		html = tabela;
	}
	$("#modal-usuarios .modal-body").html(html);
	
	$("button[botao='excluir']").on("click", function(){
		var codigo = $(this).parent().parent().attr("codigo");
		$.get("view/confirma.html", function(view){
			$("#modal-usuarios").modal("hide");
			$('.modal-backdrop').remove();
			$("#resp").html(view);
			$("#modal-confirma").attr("codigo", codigo);
			$("#modal-confirma").modal("show");
			$(".btn-escolha").on("click", function(){
				var escolha = $(this).attr("escolha");
				if(escolha == "nao"){
					$("#modal-confirma").modal("hide");
					$('.modal-backdrop').remove();
					AlertaCarregando();
					$.get("view/admin/usuarios.html", function(view){
						$("#resp").html(view);
						$("#modal-usuarios").modal("show");
					});
				}
				if(escolha == "sim"){
					AlertaCarregando();
					$.post("model/index.php?class=ExcluirUsuario", "id="+codigo, function(model){
						if(model == 0){
							$("#modal-confirma").modal("hide");
							Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");
						}
						if(model == 1){
							$("#modal-confirma").modal("hide");
							$('.modal-backdrop').remove();
							Alerta("success","Usuário removido com sucesso!");
							$.get("view/admin/usuarios.html", function(view){
								$("#resp").html(view);
								$("#modal-usuarios").modal("show");
								if($("a[menu='inicio']").hasClass("active")){
									$("a[menu='inicio']").removeClass("active").click();
								}
							});
						}
					});
				}
			});
		});
	});
});
