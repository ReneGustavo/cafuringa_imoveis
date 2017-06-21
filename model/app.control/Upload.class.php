<?php
class Upload
{
	private $arquivo;
	public function __construct()
	{
			$this->arquivo = $_FILES['arquivo'];
	}
	public function show()
	{
		foreach($this->arquivo['error'] as $cod => $arq)
		{
			if($arq == "UPLOAD_ERROR_OK")
			{
				if(move_uploaded_file($this->arquivo['tmp_name'][$cod], "../img/originais/".$this->arquivo['name'][$cod]))
				{
					$retorno['erro'] = 0;
					$retorno['msg'] = "Arquivo enviado";
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
}
?>