function Editar(codigo){
	$("#form-editar").validate({
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
		submitHandler: function (e) {
			AlertaCarregando();
			dados = $("#form-editar").serialize();
			$.post("model/index.php?class=Editar", "id="+codigo+"&"+dados, function(model){
				if(model == 0){
					Alerta("error","Ops! Ocorreu um erro interno. Contacte o administrador!");	
				} else {
					Alerta("success", "Imóvel editado com sucesso!");
					$("#modal-editar").modal("hide");
					$('.modal-backdrop').remove();
					AlertaCarregando();
					$.get("view/admin/listar.html", function(view){
						$("#resp").html(view);
						$("#modal-listar").modal("show");
						FechaAlerta();
					});
					if($("a[menu='inicio']").hasClass("active")){
						$("a[menu='inicio']").removeClass("active").click();
					}
				}
			});
			return false;
		}
	});
}