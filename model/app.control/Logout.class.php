<?php
    class Logout {

		private $sessao;

        public function __construct() {
            include_once("app.ado/TSession.class.php");
			new TSession;
			TSession::freeSession();
			$this->sessao = TSession::getValue("login");
        }

        public function show() {
			if($this->sessao == NULL)
				return 1;
			else
				return 0;
        }
    }
?>
