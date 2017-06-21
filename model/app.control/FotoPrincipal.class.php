<?php
	class FotoPrincipal
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("FotoPrincipal.txt"));
		}
		public function show()
		{
			try
			{
				$id = $_GET['id'];
				$imovel = $_GET['imovel'];
				$conn = TTransaction::get();
				$sql = "UPDATE imoveis SET img_principal='$id' WHERE id='$imovel'";
				TTransaction::log($sql);
				$result = $conn->Query($sql);
				if($result->errorCode() == 0)
				{
					$retorno['erro'] = 0;
					$retorno['resp'] = "success";
					$retorno['msg'] = "A foto escolhida como principal com sucesso!";
				}
				else
				{
					$retorno['erro'] = 1;
					$retorno['resp'] = "danger";
					$retorno['msg'] = "Falha ao escolher a foto como principal!";	
				}
				TTransaction::close();
				return $retorno;
			}
			catch(Exception $e)
			{
				TTransaction::log($e->getMessage());
				TTransaction::rollback();
				
				$retorno['erro'] = 1;
				$retorno['resp'] = "danger";
				$retorno['msg'] = "Falha ao escolher a foto como principal!";	
					
				return $retorno;
			}
		}
	}
?>