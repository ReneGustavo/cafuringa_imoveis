<?php
	class ListaImoveis
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("ListaImoveis.txt"));
		}
		public function show()
		{
			try
			{
				$conn = TTransaction::get();
				$sql = "SELECT DISTINCT(i.id), i.tipo, i.modo, i.situacao, i.cidade, i.estado, i.bairro, i.preco, f.id AS id_foto, f.tipo AS extensao FROM imoveis i, fotos f WHERE i.img_principal = f.id ORDER BY i.id";
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
				$retorno["erro"] = 1;
				$retorno["resp"] = "error";
				$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador.";
	
				return $retorno;
			}
		}
	}
?>