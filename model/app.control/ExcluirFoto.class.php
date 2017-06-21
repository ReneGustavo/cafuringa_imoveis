<?php
	class ExcluirFoto
	{
		private $conn;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("ExcluirFoto.txt"));
		}
		public function show()
		{
			try
			{
				$id = $_GET['id'];
				$conn = TTransaction::get();
				$sql = "UPDATE imoveis SET img_principal='0' WHERE img_principal='$id';
						DELETE FROM fotos WHERE id='$id'";
				TTransaction::log($sql);
				$result = $conn->Query($sql);
				if($result->errorCode() == 0)
				{
					$retorno['erro'] = 0;
					$retorno['resp'] = "success";
					$retorno['msg'] = "Foto excluída com sucesso!";
				}
				else
				{
					$retorno['erro'] = 1;
					$retorno['resp'] = "danger";
					$retorno['msg'] = "Falha ao excluir!";
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
				$retorno['msg'] = "Falha ao excluir!";
					
				return $retorno;
			}
		}
	}
?>