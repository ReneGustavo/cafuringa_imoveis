<?php
class Imagem
{
	private $conn;
	private $tipo;
	private $nome;

	public function __construct($nome = NULL, $tipo = NULL, $id = NULL)
	{
		$this->nome = $nome;
		$this->tipo = $tipo;
		$this->id = $id;
	}
	public function show()
	{
		try
		{
			$tamanho = getimagesize("../img/fotos/originais/".$this->nome);
			$destino_300x180 = imagecreatetruecolor(300, 180);
			$destino_400x300 = imagecreatetruecolor(400, 300);
			switch($this->tipo){
				case "jpeg":
					$origem = imagecreatefromjpeg("../img/fotos/originais/".$this->nome);
					imagecopyresized($destino_300x180, $origem, 0, 0, 0, 0, 300, 180, $tamanho[0], $tamanho[1]);
					imagejpeg($destino_300x180, "../img/fotos/300x180/".$this->id.".".$this->tipo); 
					imagecopyresized($destino_400x300, $origem, 0, 0, 0, 0, 400, 300, $tamanho[0], $tamanho[1]);
					imagejpeg($destino_400x300, "../img/fotos/400x300/".$this->id.".".$this->tipo); 
					break;
				case "png":
					$origem = imagecreatefrompng("../img/fotos/originais/".$this->nome);
					imagecopyresized($destino_300x180, $origem, 0, 0, 0, 0, 300, 180, $tamanho[0], $tamanho[1]);
					imagepng($destino_300x180, "../img/fotos/300x180/".$this->id.".".$this->tipo); 
					imagecopyresized($destino_400x300, $origem, 0, 0, 0, 0, 400, 300, $tamanho[0], $tamanho[1]);
					imagepng($destino_400x300, "../img/fotos/400x300/".$this->id.".".$this->tipo); 
					break;
				case "gif":
					$origem = imagecreatefromgif("../img/fotos/originais/".$this->nome);
					imagecopyresized($destino_300x180, $origem, 0, 0, 0, 0, 300, 180, $tamanho[0], $tamanho[1]);
					imagegif($destino_300x180, "../img/fotos/300x180/".$this->id.".".$this->tipo); 
					imagecopyresized($destino_400x300, $origem, 0, 0, 0, 0, 400, 300, $tamanho[0], $tamanho[1]);
					imagegif($destino_400x300, "../img/fotos/400x300/".$this->id.".".$this->tipo); 
					break;
			}
			$retorno['msg'] = "Imagem salva!";
			$retorno['erro'] = 0;
			return $retorno;
		}
		catch(Exception $e)
		{
			$retorno['erro'] = 1;
			return $retorno;
		}
	}
}
?>