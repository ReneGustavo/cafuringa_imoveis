function AbrirImovel(){
	$(".imovel-lista").on("click", function(){
		AlertaCarregando();
		$(".link-menu").removeClass("active");
		var codigo = $(this).attr("codigo");
		$.post("model/index.php?class=Visualizar", "id="+codigo, function(model){
			if(model == 0 || model == 1){
				if(model == 0)
					Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");
				else
					Alerta("warning","Este imóvel não existe!");	
			} else {
				var model = JSON.parse(model);
				$("#corpo").hide("slow");
				
				var modo = "";
				var tipo = "";
				
				if(model.modo == 1) modo = "Aluguel";
				if(model.modo == 2) modo = "Temporada";
				if(model.modo == 3) modo = "Venda";
				
				if(model.tipo == 1) tipo = "Apartamento";
				if(model.tipo == 2) tipo = "Casa";
				if(model.tipo == 3) tipo = "Rural";
			
				var preco = number_format(model.preco, 2, ',', '.');
				
				$.get("view/imovel.html", function(view){
					$("#corpo").html(view);
					$("#corpo #tipo").html(tipo);
					$("#corpo #modo").html(modo);
					$("#corpo #estado").html(model.estado);
					$("#corpo #cidade").html(model.cidade);
					$("#corpo #bairro").html(model.bairro);
					$("#corpo #endereco").html(model.endereco+", "+model.numero+" ("+model.complemento+")");
					$("#corpo #quartos").html(model.quartos);
					$("#corpo #suites").html(model.suites);
					$("#corpo #banheiros").html(model.banheiros);
					$("#corpo #salas").html(model.salas);
					$("#corpo #andares").html(model.andares);
					$("#corpo #garagem").html(model.garagem);
					$("#corpo #metragem").html(model.metragem+"m²");
					$("#corpo #outros").html(model.outros);
					$("#corpo #detalhes").html(model.detalhes);
					$("#corpo #preco").html(preco);
					
					$.post("model/index.php?class=Fotos", "id="+codigo, function(foto){
						var foto = JSON.parse(foto);
						var indicators="", inner="", active;
						if(foto == ""){
							indicators = "<li data-target=\"#carousel\" data-slide-to=\"0\" class=\"active\"></li>";
							inner = "<div class=\"item active\"><img src=\"img/fotos/400x300/padrao.jpg\"></div>";

						} else {
							$.each(foto, function(index, value){
								if(index == 0) active = "active";
								else active = "";
								indicators += "<li data-target=\"#carousel\" data-slide-to=\""+index+"\" class=\""+active+"\"></li>";
								var imagem = value.id+"."+value.tipo;
								inner += "<div class=\"item "+active+"\"><img src=\"img/fotos/400x300/"+imagem+"\"></div>";
							});
						}
						$(".carousel-indicators").html(indicators);
						$(".carousel-inner").html(inner);
						$(".inner").carousel({
							interval: 3000,
							cycle: true
						});
					});
					
					$("#corpo").show("slow");
					FechaAlerta();
				});
			}
		});
	});
}