<?php
    class VerificaUsuario {
        private $login;
        private $conn;

        public function __construct($login) {
            TTransaction::open('conecta');
            TTransaction::setLogger(new TLoggerTXT('VerificaUsuario.txt'));
			$this->conn = TTransaction::get();
			$this->login = $this->conn->quote(substr($login, 1, -1));
        }

        public function show() {
            try {
                $sql = "SELECT login FROM usuarios WHERE login=$this->login";
                TTransaction::log($sql);
                $res_Login = $this->conn->Query($sql);

				$resultado["erro"] = 0;
				$resultado["verifica"] = $res_Login->rowCount();

                TTransaction::close();
                return $resultado;
            } catch (Exception $e){
                TTransaction::log($e->getMessage());
                TTransaction::rollback();
                $resultado["erro"] = 1;
                $resultado["resp"] = "danger";
                return $resultado;
            }
        }
    }
?>
