<?php
class ImagemInsere
{
	private	$tipo;
	private	$id;
	private $conn;
	public function __construct($tipo = NULL, $id = NULL)
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("ImagemInsere.txt"));
		$this->conn = TTransaction::get();
		$this->tipo = $this->conn->quote($tipo);
		$this->id = $this->conn->quote($id);
	}
	public function show()
	{
		try
		{
			$sql = "INSERT INTO fotos (imovel, tipo) VALUES ($this->id, $this->tipo)";
			TTransaction::log($sql);
			$res = $this->conn->Query($sql);
			if($res->rowCount())
			{
				$retorno['erro'] = 0;
				$retorno['msg'] = "Inserido com sucesso!";
				$retorno['id'] = $this->conn->lastInsertId();
			}
			else
			{
				$retorno['erro'] = 1;
				$retorno['msg'] = "Falha ao inserir!";	
			}
			TTransaction::close();
			return $retorno;
		}
		catch(Exception $e)
		{
			TTransaction::rollback();
			TTransaction::log($e->getMessage());
			$retorno['erro'] = 1;
			$retorno['msg'] = "Falha ao inserir!";
			return $retorno;
		}
	}
}
?>