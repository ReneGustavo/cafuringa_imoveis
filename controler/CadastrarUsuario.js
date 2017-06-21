$("#form-cadastrar-usuario").validate({
	rules: {
		login: {
			required: true,
			minlength: 5,
			maxlength: 20
		},
		senha: {
			required: true,
			minlength: 6,
			maxlength: 20
		},
		confirma_senha: {
			required: true,
			equalTo: "#senha"
		}
	},
	messages: {
		login: {
			required: "Preencha este campo!",
			minlength: "O login deve ter no mínimo 5 caracteres e no máximo 20",
			maxlength: "O login deve ter no mínimo 5 caracteres e no máximo 20"
		},
		senha: {
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
		var dados = $("#form-cadastrar-usuario").serialize();
		$.post("model/index.php?class=CadastrarUsuario", dados, function(model){
			var model = JSON.parse(model);
			Alerta(model.resp, model.texto);
			if(model.erro == 0){
				$("#form-cadastrar-usuarios input").text("");
				$("#modal-cadastrar-usuario").modal("hide");
			}
		});
	}
});