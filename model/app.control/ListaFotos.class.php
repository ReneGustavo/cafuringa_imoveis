<?php
class Lista
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
			$sql = "SELECT * FROM tb_livro ORDER BY titulo";
			TTransaction::log($sql);
			$result = $conn->Query($sql);
			$resultado = array();
			while($dados = $result->fetchObject()) 
			{
				$resultado[] = $dados;
			}			
			return $resultado;
			TTransaction::close();
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