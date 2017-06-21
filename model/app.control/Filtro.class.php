<?php
	class Filtro
	{
		private $conn;
		private $filtro;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("Filtro.txt"));
			$this->conn = TTransaction::get();
			$this->filtro = $_POST['filtro'];
		}
		public function show()
		{
			try
			{
				$sql = "SELECT DISTINCT(i.id), i.tipo, i.modo, i.situacao, i.cidade, i.estado, i.bairro, i.preco, f.id AS id_foto, f.tipo AS extensao FROM imoveis i, fotos f WHERE i.img_principal = f.id $this->filtro ORDER BY i.id";
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