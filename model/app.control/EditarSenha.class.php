<?php
class EditarSenha
{
	private $senha;
	private $novasenha;
	private $login;
	
	public function __construct()
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("EditaSenha.txt"));
		if(isset($_POST["senha"], $_POST["nova_senha"]))
		{
			$conn = TTransaction::get();
			$this->senha = $conn->quote(sha1($_POST["senha"]));
			$this->novasenha = $conn->quote(sha1($_POST["nova_senha"]));
			
            include_once("app.ado/TSession.class.php");
			new TSession;
			$this->login = $conn->quote(TSession::getValue("login"));
		}
	}
	public function show()
	{
		try
		{
			$conn = TTransaction::get();
			$sql = "SELECT * FROM usuarios WHERE login=$this->login AND senha=$this->senha";
			TTransaction::log($sql);
			$result = $conn->Query($sql);
			if($result->rowCount() == 1){
				$sql = "UPDATE usuarios SET senha=$this->novasenha WHERE login=$this->login";
				TTransaction::log($sql);
				$result = $conn->Query($sql);
				if($conn->errorCode()==0)
				{
					TTransaction::close();
					$retorno["erro"] = 0;
					$retorno["resp"] = "success";
					$retorno["texto"] = "Senha alterada com sucesso! Faça o login novamente!";
				}
				else 
				{
					TTransaction::close();
					$retorno["erro"] = 1;
					$retorno["resp"] = "error";
					$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador.";
				}
				return $retorno;
			} else {
				TTransaction::close();
				$retorno["erro"] = 1;
				$retorno["resp"] = "warning";
				$retorno["texto"] = "Senha atual incorreta!";
				
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