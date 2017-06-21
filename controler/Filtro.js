$("#form-filtro").submit(function(e){
	e.preventDefault();
	var filtro = "";
	
	var tipo = $("#tipo").val();
	var modo = $("#modo").val();
	var cidade = $("#cidade").val();
	var quartos = $("#quartos").val();
	var suites = $("#suites").val();
	var banheiros = $("#banheiros").val();
	var salas = $("#salas").val();
	var andares = $("#andares").val();
	var garagem = $("#garagem").val();
	
	if(tipo != "-") filtro += " AND tipo='"+tipo+"'";
	if(modo != "-") filtro += " AND modo='"+modo+"'";
	if(cidade != "-") filtro += " AND cidade='"+cidade+"'";
	if(quartos != "-") quartos += " AND tipo='"+quartos+"'";
	if(suites != "-") filtro += " AND suites>='"+suites+"'";
	if(banheiros != "-") filtro += " AND banheiros>='"+banheiros+"'";
	if(salas != "-") filtro += " AND salas>='"+salas+"'";
	if(andares != "-") filtro += " AND andares>='"+andares+"'";
	if(garagem != "-") filtro += " AND garagem>='"+garagem+"'";
	$.post("model/index.php?class=Filtro", "filtro="+filtro, function(model){
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
			$("#area-imoveis table").hide("slow").html(tabela).show("slow");
			
			AbrirImovel();
		}
	});
});