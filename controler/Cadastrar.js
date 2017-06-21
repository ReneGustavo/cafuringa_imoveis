$("#form-cadastrar").validate({
	rules: {
		cidade: "required",
		bairro: "required",
		endereco: "required",
		numero: "required",
		quartos: {
			required: true,
			min: 0
		},
		suites: {
			required: true,
			min: 0
		},
		banheiros: {
			required: true,
			min: 0
		},
		andares: {
			required: true,
			min: 1
		},
		garagem: {
			required: true,
			min: 0
		},
		metragem: {
			required: true,
			min: 1
		},
		preco: {
			required: true,
			min: 1
		}
	},
	messages: {
		cidade: "Preencha este campo!",
		bairro: "Preencha este campo!",
		endereco: "Preencha este campo!",
		numero: "Preencha este campo!",
		quartos: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 0!"
		},
		suites: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 0!"
		},
		banheiros: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 0!"
		},
		andares: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 1!"
		},
		garagem: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 0!"
		},
		metragem: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 1!"
		},
		preco: {
			required: "Preencha este campo!",
			min: "Valor mínimo de 1!"
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
		dados = $("#form-cadastrar").serialize();
		$.post("model/index.php?class=Cadastrar", dados, function(model){
			var model = JSON.parse(model);
			Alerta(model.resp, model.texto);
			if(model.erro == 0){
				$("#modal-cadastrar").modal("hide");
				if($("a[menu='inicio']").hasClass("active")){
					$("a[menu='inicio']").removeClass("active").click();
				}
			}
		});
		return false;
	}
});