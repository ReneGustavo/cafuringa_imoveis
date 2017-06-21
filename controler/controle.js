$.get("model/index.php?class=VerificaSessao", function(model){
	if(model != 0){
		usuario = model.substring(1, model.length-2);
		$.get("view/admin/menu.html", function(view){
			$("#admin").html(view);
			if(usuario == "admin"){
				$.get("view/admin/botao-usuarios.html", function(view){
					$("#menu-admin ul:first-child").append(view);
					$(".menu-admin[menu='usuarios']").on("click", function(e){
						e.preventDefault();	
						$.get("view/admin/usuarios.html", function(view){
							$("#resp").html(view);
							$("#modal-usuarios").modal("show");
						});
					});
				});
			}
			MenuAdmin(usuario);
			Alerta("success","Bem-vindo novamente, "+usuario+"!")
			$("#link-admin").hide();
		});
	}
});
$.get("view/inicio.html", function(view){
	$("#corpo").html(view);
	$("#carregando").hide("slow");
});	
$(".link-menu").click(function(e){
	e.preventDefault();
	if($(this).hasClass("active") == 0){
		$("#corpo").hide("slow");
		$(".link-menu").removeClass("active");
		$(this).addClass("active");
		AlertaCarregando();
		var menu = $(this).attr("menu");
		$.get("view/"+menu+".html", function(view){
			$("#corpo").html(view);
			$("#corpo").show("slow");
			FechaAlerta();
		});
	}
});
$("#menu-admin a").click(function(e){
	e.preventDefault();
	menu = $(this).text();
	switch(menu){
		case "Cadastrar":
			$.get("view/modal-cadastrar.html", function(view){
				alert(view);
			});
			break;	
	}
});
$("#link-admin").click(function(e){
	e.preventDefault();
	AlertaCarregando();
	$.get("view/login.html", function(view){
		$("#resp").html(view);
		FechaAlerta();
		$("#modal-login").modal('show');
	});
});