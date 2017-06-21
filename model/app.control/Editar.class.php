<?php
class Editar
{
	private $id;
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
		TTransaction::setLogger(new TLoggerTXT("Editar.txt"));
		if(isset($_POST["id"], $_POST["modo"],$_POST["tipo"],$_POST["situacao"],$_POST["estado"],$_POST["cidade"],$_POST["bairro"],$_POST["endereco"],$_POST["numero"],$_POST["complemento"],$_POST["quartos"],$_POST["suites"],$_POST["banheiros"],$_POST["andares"],$_POST["garagem"],$_POST["metragem"],$_POST["outros"],$_POST["detalhes"]))
		{
			$conn = TTransaction::get();
			$this->id = $conn->quote($_POST["id"]);
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
			$sql = "UPDATE imoveis SET modo=$this->modo, tipo=$this->tipo, situacao=$this->situacao, estado=$this->estado, cidade=$this->cidade, bairro=$this->bairro, endereco=$this->endereco, numero=$this->numero, complemento=$this->complemento, quartos=$this->quartos, suites=$this->suites, banheiros=$this->banheiros, andares=$this->andares, garagem=$this->garagem, metragem=$this->metragem, outros=$this->outros, detalhes=$this->detalhes, preco=$this->preco WHERE id=$this->id";
			TTransaction::log($sql);
			$result = $conn->Query($sql);
			if($conn->errorCode()==0)
			{
				TTransaction::close();
				
				return 1;
			}
			else 
			{
				TTransaction::close();
				
				return 0;
			}
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