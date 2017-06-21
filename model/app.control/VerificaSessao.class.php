<?php
    class VerificaSessao {

		private $sessao;

        public function __construct() {
            include_once("app.ado/TSession.class.php");
			new TSession;
			$this->sessao = TSession::getValue("login");
        }

        public function show() {
			
			if($this->sessao != NULL)
				return $this->sessao;
			else
				return 0;
				
        }
    }
?>
