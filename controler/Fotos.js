var codigo = $("#resp").attr("codigo");
$.get("model/index.php?class=ListarFotos&id="+codigo, function(model){
	var model = JSON.parse(model);
	if(model == 0){
		$("#modal-fotos .modal-body").html("<h3 class=\"text-center\">Nenhuma foto foi inserida para este imóvel</h3>");
	} else {
		var tabela = "<table width=\"100%\" class=\"table table-striped\">";
		$.each(model, function(index, value){
			tabela += "<tr>";
			tabela += "	<td>";
			tabela += "		<img src=\"img/fotos/300x180/"+value.id+"."+value.tipo+"\">";
			tabela += "	</td>";
			tabela += "	<td codigo=\""+value.id+"\">";
			tabela += "		<div class=\"btn-group\">";
			tabela += "			<button type=\"button\" class=\"btn btn-success botao-fotos\" botao=\"principal\"><span class=\"glyphicon glyphicon-ok\"></span></button>";
			tabela += "			<button type=\"button\" class=\"btn btn-danger botao-fotos\" botao=\"excluir\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
			tabela += "		</div>";
			tabela += "	</td>";
			tabela += "</tr>";	
		});
		tabela += "</table>";
		$("#modal-fotos .modal-body").html(tabela);
	}
	BotoesFotos();
});