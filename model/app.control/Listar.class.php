<?php
	class Listar
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("Lista.txt"));
		}
		public function show()
		{
			try
			{
				$conn = TTransaction::get();
				$sql = "SELECT id, tipo, modo, cidade, estado, preco FROM imoveis ORDER BY id";
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
				
				return 1;
			}
		}
	}
?>