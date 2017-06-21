<?php
	class ListarFotos
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("ListarFotos.txt"));
		}
		public function show()
		{
			try
			{
				$id = $_GET['id'];
				$conn = TTransaction::get();
				$sql = "SELECT id, tipo FROM fotos WHERE imovel='$id'";
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