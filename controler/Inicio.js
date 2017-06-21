$.get("model/index.php?class=BuscaCidades", function(model){
	var model = JSON.parse(model);
	var option = "<option>-</option>";
	$.each(model, function(index, value){
		option += "<option>"+value.cidade+"</option>";
	});
	$("select[name='cidade']").html(option);
});
$.get("model/index.php?class=ListaImoveis", function(model){
	var model = JSON.parse(model);
	if(model == ""){
		$("#corpo").html("<h3 class=\"text-center\" style=\"margin: 100px 0;\">Desculpe! Não há imóveis inseridos.</h3>");
	} else {
		var cont = 1;
		var tabela = "";
		var modo = "";
		var tipo = "";
		var situacao = "";
		var preco = "";
		var imagem = "";
		$.each(model, function(index, value){
			if(value.modo == 1) modo = "Aluguel";
			if(value.modo == 2) modo = "Temporada";
			if(value.modo == 3) modo = "Venda";
			
			if(value.tipo == 1) tipo = "Apartamento";
			if(value.tipo == 2) tipo = "Casa";
			if(value.tipo == 3) tipo = "Rural";
			
			if(value.situacao == 1) situacao = "novo(a)";
			if(value.situacao == 2) situacao = "usado(a)";
			
			preco = number_format(value.preco, 2, ',', '.');
			
			imagem = value.id_foto+"."+value.extensao;
			
			if(cont == 1)
				tabela = tabela + " <tr>";
				
				tabela += "		<td align=";
			if(cont == 1)
				tabela += "\"left\"";
			if(cont == 2)
				tabela += "\"center\"";
			if(cont == 3)
				tabela += "\"right\"";
			tabela += " valign=\"top\">";
			tabela += "			<div class=\"imovel-lista\" codigo=\""+value.id+"\">";
			tabela += "				<img src=\"img/fotos/300x180/"+imagem+"\" class=\"foto-lista\">";
			tabela += "				<div class=\"imoveis-lista-info\">";
			tabela += 					tipo+" "+situacao+" para "+modo+"<br>"+value.cidade+" - "+value.estado+" ("+value.bairro+")<br>Preço: R$"+preco;
			tabela +=				"</div>";
			tabela +=			"</div>";
			tabela +=		"</td>";
			if(cont == 3){
				tabela +=	"</tr>";
				cont = 1;
			} else
				cont++;
				
		});
		if(cont == 3)
			tabela += "</tr>";
		$("#area-imoveis table").html(tabela);
		
		AbrirImovel();
	}
});