<?php
class Cadastrar
{
	private $modo;
	private $tipo;
	private $situacao;
	private $estado;
	private $cidade;
	private $bairro;
	private $endereco;
	private $numero;
	private $complemento;
	private $quartos;
	private $suites;
	private $banheiros;
	private $andares;
	private $garagem;
	private $metragem;
	private $outros;
	private $detalhes;
	private $preco;
	
	public function __construct()
	{
		TTransaction::open("conecta");
		TTransaction::setLogger(new TLoggerTXT("Cadastra.txt"));
		if(isset($_POST["modo"],$_POST["tipo"],$_POST["situacao"],$_POST["estado"],$_POST["cidade"],$_POST["bairro"],$_POST["endereco"],$_POST["numero"],$_POST["complemento"],$_POST["quartos"],$_POST["suites"],$_POST["banheiros"],$_POST["andares"],$_POST["garagem"],$_POST["metragem"],$_POST["outros"],$_POST["detalhes"]))
		{
			$conn = TTransaction::get();
			$this->modo = $conn->quote($_POST["modo"]);
			$this->tipo = $conn->quote($_POST["tipo"]);
			$this->situacao = $conn->quote($_POST["situacao"]);
			$this->estado = $conn->quote($_POST["estado"]);
			$this->cidade = $conn->quote($_POST["cidade"]);
			$this->bairro = $conn->quote($_POST["bairro"]);
			$this->endereco = $conn->quote($_POST["endereco"]);
			$this->numero = $conn->quote($_POST["numero"]);
			$this->complemento = $conn->quote($_POST["complemento"]);
			$this->quartos = $conn->quote($_POST["quartos"]);
			$this->suites = $conn->quote($_POST["suites"]);
			$this->banheiros = $conn->quote($_POST["banheiros"]);
			$this->andares = $conn->quote($_POST["andares"]);
			$this->garagem = $conn->quote($_POST["garagem"]);
			$this->metragem = $conn->quote($_POST["metragem"]);
			$this->outros = $conn->quote($_POST["outros"]);
			$this->detalhes = $conn->quote($_POST["detalhes"]);
			$this->preco= $conn->quote($_POST["preco"]);
		}
	}
	public function show()
	{
		try
		{
			$conn = TTransaction::get();
			$sql = "INSERT INTO imoveis (modo, tipo, situacao, estado, cidade, bairro, endereco, numero, complemento, quartos, suites, banheiros, andares, garagem, metragem, outros, detalhes, preco) VALUES ($this->modo, $this->tipo, $this->situacao, $this->estado, $this->cidade, $this->bairro, $this->endereco, $this->numero, $this->complemento, $this->quartos, $this->suites, $this->banheiros, $this->andares, $this->garagem, $this->metragem, $this->outros, $this->detalhes, $this->preco)";
			TTransaction::log($sql);
			$result = $conn->Query($sql);
			if($conn->errorCode()==0)
			{
				TTransaction::close();
				$retorno["erro"] = 0;
				$retorno["resp"] = "success";
				$retorno["texto"] = "Imóvel inserido com sucesso!";
			}
			else 
			{
				TTransaction::close();
				$retorno["erro"] = 1;
				$retorno["resp"] = "error";
				$retorno["texto"] = "Ops! Ocorreu um erro. Contacte o administrador.";
			}
			return $retorno;
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