AlertaCarregando();
$.get("model/index.php?class=Listar", function(model){
	var model = JSON.parse(model);
	var html = "";
	if(model == 0 || model == 1){
		if(model == 0){
			FechaAlerta();
			html = "<h3 class=\"text-center\">Não há imóveis cadastrados</h3>";
		}
		else{
			Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");
		}
	}
	else{
		FechaAlerta();
		var tabela = "<table width=\"100%\" class=\"table table-striped\">";
		tabela += "<tr class=\"active\">";
		tabela += "	<th width=\"5%\">Assunto</th>";
		tabela += "	<th width=\"30%\">Nome do cliente</th>";
		tabela += "	<th width=\"30%\">Endereço</th>";
		tabela += "	<th width=\"25%\">Cidade</th>";
		tabela += "	<th width=\"10%\"></th>";
		tabela += "</tr>";
		$.each(model, function(index, value){
			cont = index+1;

			tabela += "<tr class=\"active\" codigo=\""+value.id+"\">";
			tabela += "	<td>"+value.assunto+"</td>";
			tabela += "	<td>"+value.cliente+"</td>";
			tabela += "	<td>"+value.endereco+"</td>";
			tabela += "	<td>"+value.cidade+"</td>";
			tabela += "	<td>"+value.estado+"</td>";
			tabela += "	<td><a href=\"\">Detalhes</a></td>";
			tabela += "</tr>";
		});
		tabela += "</table>";
		html = tabela;
	}
	$("#lista_os table").html(html);
	/*
	$("#modal-listar .modal-body button").on("click", function(){
		var botao = $(this).attr("botao");
		var codigo = $(this).parent().parent().parent().attr("codigo");
		switch(botao){
			case "visualizar":
						AlertaCarregando();
						$(".link-menu").removeClass("active");
						var codigo = $(this).parent().parent().parent().attr("codigo");
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
									$("#imovel").attr("codigo", model.id);
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
									
									$("#corpo").show("slow");
									FechaAlerta();
									$("#modal-listar").modal("hide");
								});
							}
						});
						break;
					case "excluir":
						var codigo = $(this).parent().parent().parent().attr("codigo");
						$.get("view/confirma.html", function(view){
							$("#modal-listar").modal("hide");
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
									$.get("view/admin/listar.html", function(view){
										$("#resp").html(view);
										$("#modal-listar").modal("show");
									});
								}
								if(escolha == "sim"){
									AlertaCarregando();
									$.post("model/index.php?class=Excluir", "id="+codigo, function(model){
										if(model == 0){
											$("#modal-confirma").modal("hide");
											Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");
										}
										if(model == 1){
											$("#modal-confirma").modal("hide");
											$('.modal-backdrop').remove();
											Alerta("success","Imóvel removido com sucesso!");
											$.get("view/admin/listar.html", function(view){
												$("#resp").html(view);
												$("#modal-listar").modal("show");
												if($("a[menu='inicio']").hasClass("active")){
													$("a[menu='inicio']").removeClass("active").click();
												}
											});
										}
									});
								}
							});
						});
						break;
					case "editar":
						$("#modal-listar").modal("hide");
						$('.modal-backdrop').remove();
						AlertaCarregando();
						$.post("model/index.php?class=Visualizar", "id="+codigo, function(model){
							if(model == 0){
								Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");	
							} else {
								var model = JSON.parse(model);
								$.get("view/admin/editar.html", function(view){
									$("#resp").html(view);
									$("#modal-editar").attr("codigo", codigo);
									
									$("#modal-editar #modo option[value='"+model.modo+"']").attr("selected","");
									$("#modal-editar #tipo option[value='"+model.tipo+"']").attr("selected","");
									$("#modal-editar #situacao option[value='"+model.situacao+"']").attr("selected","");
									$("#modal-editar #estado option[value='"+model.estado+"']").attr("selected","");
									$("#modal-editar #cidade").val(model.cidade);
									$("#modal-editar #bairro").val(model.bairro);
									$("#modal-editar #endereco").val(model.endereco);
									$("#modal-editar #numero").val(model.numero);
									$("#modal-editar #complemento").val(model.complemento);
									$("#modal-editar #quartos").val(model.quartos);
									$("#modal-editar #suites").val(model.suites);
									$("#modal-editar #banheiros").val(model.banheiros);
									$("#modal-editar #andares").val(model.andares);
									$("#modal-editar #garagem").val(model.garagem);
									$("#modal-editar #metragem").val(model.metragem);
									$("#modal-editar #outros").val(model.outros);
									$("#modal-editar #detalhes").val(model.detalhes);
									$("#modal-editar #preco").val(model.preco);
									
									$("#modal-editar").modal("show");
									
									Editar(codigo);
								});
							}
						});
						break;
					case "enviar-fotos":
						$("#modal-listar").modal("hide");
						$('.modal-backdrop').remove();
						AlertaCarregando();
						$.get("view/admin/enviar-foto.html", function(view){
							$("#resp").html(view);
							$("#modal-enviar-foto form").attr("codigo", codigo);
							FechaAlerta();
							$("#modal-enviar-foto").modal("show");				
						});						
						break;
					case "fotos":
						$("#modal-listar").modal("hide");
						$('.modal-backdrop').remove();
						AlertaCarregando();
						$("#resp").attr("codigo", codigo);
						$.get("view/admin/fotos.html", function(view){
							$("#resp").html(view);
							FechaAlerta();
							$("#modal-fotos").modal("show");				
						});				
						break;
		}
	});*/
});
