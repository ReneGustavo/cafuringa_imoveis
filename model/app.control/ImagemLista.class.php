<?php
class ImagemLista
{
	public function __construct()
	{
		TTransaction::open("my_livrog1");
		TTransaction::setLogger(new TLoggerTXT("lista.txt"));
	}
	public function show()
	{
		try
		{
			$conn = TTransaction::get();
			$sql = "SELECT * FROM imagem";
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
			$result = "Ocorreu um erro entre em contato com o administrador";
			return $result;
		}
	}
}

?>