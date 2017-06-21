<?php
class Fotos
{
	public function __construct()
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("Fotos.txt"));
	}
	public function show()
	{
		try
		{
			$conn = TTransaction::get();
			$id = $_POST['id'];
			$sql = "SELECT * FROM fotos WHERE imovel='$id'";
			TTransaction::log($sql);
			$result = $conn->Query($sql);
			$resultado = array();
			while($dados = $result->fetchObject())
			{
				$resultado[] = $dados;
			}
			TTransaction::close();
			return $resultado;
		}
		catch(Exception $e)
		{
			TTransaction::log($e->getMessage());
			TTransaction::rollback();
			$result = "Ops! Ocorreu um erro interno. Contacte o administrador!";
			return $result;
		}
	}
}

?>