<?php
class CadastrarUsuario
{
	private $conn;
	private $login;
	private $senha;
	
	public function __construct()
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("CadastraUsuario.txt"));
		if(isset($_POST["login"], $_POST["senha"]) )
		{
			$this->conn = TTransaction::get();
			$this->login = $this->conn->quote($_POST["login"]);
			$this->senha = $this->conn->quote(sha1($_POST["senha"]));
		}
	}
	public function show()
	{
		try
		{
			$verifica = new VerificaUsuario($this->login);
			$retornoVerifica = $verifica->show();
			if($retornoVerifica["erro"] == 0){
				if($retornoVerifica["verifica"] == 0){
					$sql = "INSERT INTO usuarios (login, senha) VALUES ($this->login, $this->senha)";
					TTransaction::log($sql);
					$result = $this->conn->Query($sql);
					if($result->errorCode()==0)
					{
						TTransaction::close();
						$retorno["erro"] = 0;
						$retorno["resp"] = "success";
						$retorno["texto"] = "Usuário $this->login inserido com sucesso!";
						return $retorno;
					}
					else 
					{
						TTransaction::close();
						$retorno["erro"] = 1;
						$retorno["resp"] = "error";
						$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador.";
						return $retorno;
					}
				} else {
					TTransaction::close();
					$retorno["erro"] = 1;
					$retorno["resp"] = "warning";
					$retorno["texto"] = "O usuário $this->login já existe. Escolha outro!";
					return $retorno;
				}
			} else {
				TTransaction::close();
				$retorno["erro"] = 1;
				$retorno["resp"] = "error";
				$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador!";
				
				return $retorno;
			}
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