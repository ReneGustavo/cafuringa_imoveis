// COLOCAR function lista()

$("#modal-enviar-foto form").validate({
	rules: {
		arquivo: {
			required: true
		}
	},
	messages: {
		arquivo: {
			required: "Selecione um arquivo!"
		}
	},
	unhighlight: function(element, errorClass, validClass) {
		AlertaCarregando();
	},
	submitHandler: function(e){
		var dados = new FormData();
		var arq = $("input[name='arquivo']")[0].files;
		$.each(arq, function(index, value){
			dados.append("arquivo[]", value);
		});
		dados.append('id', $("#modal-enviar-foto form").attr("codigo"));
		$.ajax({
			url: "model/index.php?class=UploadImagem",
			data: dados,
			type: "POST",
			cache: false,
			processData: false,
			contentType: false,
			mimeType: "multipart/form-data",
			success: function(model)
			{
				var model = JSON.parse(model);
				if(model.erro==0)
				{
					Alerta("success", "Fotos enviadas com sucesso!");
					$("#modal-enviar-foto").modal("hide");
				}
				else
					Alerta("error", "Ops! Ocorreu um erro interno. Contacte o administrador!");
				$("#status .modal-body").html(model.msg);
				$("#formulario").modal("hide");
				$("#status").modal("show");
			}
		});
		//lista();
		return false;
	}
});