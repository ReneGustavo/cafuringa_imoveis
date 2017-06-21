<?php
class UploadImagem
{
	//private $id;
	private $arquivo;
	
	public function __construct()
	{
		if(isset($_POST['id'])){
			$this->id = $_POST['id'];
			$this->arquivo = $_FILES['arquivo'];
		}
	}
	public function show()
	{
		try
		{
			$retorno['msg'] = "";
			foreach($this->arquivo['error'] as $cod => $arq)
			{
				if($arq == "UPLOAD_ERROR_OK")
				{
					if(move_uploaded_file($this->arquivo['tmp_name'][$cod], "../img/fotos/originais/".$this->arquivo['name'][$cod]))
					{
						$tipo = explode("/", $this->arquivo['type'][$cod]);
						$imagemInsere = new ImagemInsere($tipo[1], $this->id);
						$retornoImagemInsere = $imagemInsere->show();
						$imagem = new Imagem($this->arquivo['name'][$cod], $tipo[1], $retornoImagemInsere['id']);
						$retornoImagem = $imagem->show();
						$retorno['erro'] = 0;
						$retorno['msg'] .= "Arquivo enviado<br>";
						$retorno['msg'] .= $retornoImagemInsere['msg']."<br>";
						$retorno['msg'] .= $retornoImagem['msg']."<br>";
					}
					else
					{
						$retorno['erro'] = 1;
						$retorno['msg'] = "Falha no envio";
					}
				}
				else
				{
					$retorno['erro'] = 1;
					$retorno['msg'] = "Falha no envio";		
				}
			}
			return $retorno;
		}
		catch(Exception $e)
		{
			$retorno['erro'] = 1;
			$retorno['msg'] = "Falha no envio";
			return $retorno;
		}
	}
}
?>