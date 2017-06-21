<?php
class BuscaFoto
{
	public function __construct()
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("BuscaFotos.txt"));
	}
	public function show()
	{
		try
		{
			$conn = TTransaction::get();
			$id = $_POST['id'];
			$sql = "SELECT id, tipo FROM fotos WHERE imovel='$id' LIMIT 1";
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