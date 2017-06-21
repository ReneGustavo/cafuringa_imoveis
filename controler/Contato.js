$("form").validate({
	rules: {
		nome: "required",
		email: {
			required: true,
			email: true
		},
		assunto: "required",
		mensagem: "required"
	},
	messages: {
		nome: "Preencha o nome!",
		email: {
				required: "Preencha o e-mail!",
				email: "Isto não é um e-email"
		},
		assunto: "Preencha o assunto!",
		mensagem: "Escreva a mensagem"
	},
	errorClass: "form-group has-error",
	validClass: "form-group has-success",
	highlight: function(element, errorClass, validClass) {
		$(element).parent().addClass(errorClass).removeClass(validClass);
		Alerta("warning", "Preencha todos os campos");
	},
	unhighlight: function(element, errorClass, validClass) {
		$(element).parent().removeClass(errorClass).addClass(validClass);
	},
	submitHandler: function (e) {
		AlertaCarregando();
		var dados = $("form").serialize();
		$.post("PHPMailer/examples/cefetmg1ano.php", dados, function (email) {
			var email = JSON.parse(email);
			if(email.erro==0){
				Alerta(email.resp, email.msg);
				$("form input, form textarea").val("");	
			}
			else
				Alerta(email.resp, email.msg);
		});
		return false;
	}
});
