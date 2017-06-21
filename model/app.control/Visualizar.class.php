<?php
	class Visualizar
	{
		private $conn;
		private $id;
		
		public function __construct()
		{
			TTransaction::open("conecta");
			TTransaction::setLogger(new TLoggerTXT("Visualiza.txt"));
			if(isset($_POST['id'])){
            	$this->conn = TTransaction::get();
				$this->id = $this->conn->quote($_POST['id']);
			}
		}
		public function show()
		{
			try
			{
				$conn = TTransaction::get();
				$sql = "SELECT * FROM imoveis WHERE id=$this->id";
				TTransaction::log($sql);
				$result = $conn->Query($sql);
				if($result->rowCount()) {
                    if($result->rowCount() == 1)
						$resultado = $result->fetchObject();
					else
						$resultado = 0;
				} else
					return 1;
				TTransaction::close();
				
				return $resultado;
			}
			catch(Exception $e)
			{
				TTransaction::log($e->getMessage());
				TTransaction::rollback();
				
				return 0;
			}
		}
	}
?>