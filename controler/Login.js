$("#form-login").submit(function(e){
	e.preventDefault();
	AlertaCarregando();
	var dados = $("#form-login").serialize();
	$.post("model/index.php?class=Login", dados, function(model){
		var model = JSON.parse(model);
		Alerta(model.resp, model.texto);
		if(model.erro == 0){
			$.get("view/admin/menu.html", function(view){
				$("#admin").html(view);
				$("#modal-login").modal('hide');
				MenuAdmin(model.login);
				$("#link-admin").hide();
			});
		}
	});
});