<?php
	class BuscaCidades
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("BuscaCidades.txt"));
			$this->conn = TTransaction::get();
		}
		public function show()
		{
			try
			{
				$sql = "SELECT DISTINCT(cidade) FROM imoveis ORDER BY cidade";
				TTransaction::log($sql);
				$result = $this->conn->Query($sql);
				
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
				
				$retorno["erro"] = 1;
				$retorno["resp"] = "error";
				$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador.";
	
				return $retorno;
			}
		}
	}
?>