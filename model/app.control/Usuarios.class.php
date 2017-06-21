<?php
	class Usuarios
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("Usuarios.txt"));
		}
		public function show()
		{
			try
			{
				$conn = TTransaction::get();
				$sql = "SELECT id, login FROM usuarios WHERE login != 'admin' ORDER BY login";
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