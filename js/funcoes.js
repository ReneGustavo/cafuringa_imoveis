function Alerta(tipo, mensagem){
	$("#alerta-canto").removeClass();
	$("#alerta-canto").addClass("alert alert-"+tipo);
	$("#alerta-canto").html(mensagem);
	$("#alerta-canto").show("slow");
	setTimeout("$('#alerta-canto').hide('slow')", 3000);
}
function AlertaCarregando(){
	$("#alerta-canto").removeClass();
	$("#alerta-canto").addClass("alert alert-warning");
	$("#alerta-canto").html("Carregando...");
	$("#alerta-canto").show("slow");
}
function FechaAlerta(){
	$("#alerta-canto").hide("slow");
}
function MenuAdmin(acao){
	switch(acao){
		case "show":
			$("#menu-admin").fadeIn('slow');
			$("#cabecalho").css("margin","90px 0 30px 0");
			break;
		case "hide":
			$("#menu-admin").fadeOut('show');
			$("#cabecalho").css("margin","30px 0");
			break;	
		default:
			$("#menu-admin").fadeIn('slow');
			$("#cabecalho").css("margin","90px 0 30px 0");
			$("#login-do-usuario").html(acao+" <b class='caret'></b>");
			break;
	}
	CliqueMenuAdmin();
}
function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
	prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	s = '',
	toFixedFix = function(n, prec) {
		var k = Math.pow(10, prec);
		return '' + Math.round(n * k) / k;
	};
	
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	.split('.');
	if (s[0].length > 3) {
	s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}