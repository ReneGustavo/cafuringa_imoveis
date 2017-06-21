$("#form-editar-senha").validate({
	rules: {
		senha: "required",
		nova_senha: {
			required: true,
			minlength: 6,
			maxlength: 20
		},
		confirma_senha: {
			required: true,
			equalTo: "#nova_senha"
		}
	},
	messages: {
		senha: "A sua senha atual não esta correta!",
		nova_senha: {
			required: "Preencha este campo!",
			minlength: "A senha deve ter no mínimo 6 caracteres e no máximo 20",
			maxlength: "A senha deve ter no mínimo 6 caracteres e no máximo 20"
		},
		confirma_senha: {
			required: "Preencha este campo!",
			equalTo: "As senhas não coincidem!"	
		}
	},
	errorClass: "form-group has-error",
	validClass: "form-group has-success",
	highlight: function(element, errorClass, validClass) {
		$(element).parent().addClass(errorClass).removeClass(validClass);
	},
	unhighlight: function(element, errorClass, validClass) {
		$(element).parent().removeClass(errorClass).addClass(validClass);
	},
	submitHandler: function () {
		AlertaCarregando();
		dados = $("#form-editar-senha").serialize();
		$.post("model/index.php?class=EditarSenha", dados, function(model){
			var model = JSON.parse(model);
			Alerta(model.resp, model.texto);
			if(model.erro == 0){
				$("#form-editar-senha input").text("");
				$("#modal-editar-senha").modal("hide");
				$.get("model/index.php?class=Logout", function(model){
					MenuAdmin("hide");
					$("#link-admin").show();
				});
			}
		});
	}
});