<?php
    class Login {
        private $login;
        private $senha;
        private $conn;

        public function __construct() {
            TTransaction::open('conecta');
            TTransaction::setLogger(new TLoggerTXT('login.txt'));
            if(isset($_POST['login'], $_POST['senha'])){
                $this->conn = TTransaction::get();
                $this->login = $this->conn->quote($_POST['login']);
                $this->senha = $this->conn->quote(sha1($_POST['senha']));
                include_once("app.ado/TSession.class.php");
                new TSession;
            }
        }

        public function show() {
            try {
                $sql = "SELECT id, login FROM usuarios WHERE login=$this->login AND senha=$this->senha";
                TTransaction::log($sql);
                $res_Login = $this->conn->Query($sql);
                if ($res_Login->rowCount()) {
                    if ($res_Login->rowCount() == 1) {
                        $Login = $res_Login->fetchObject();
                        $resultado["erro"] = 0;
                        $resultado["login"] = $Login->login;
                        $resultado["resp"] = "success";
                        $resultado["texto"] = "Login efetuado com $Login->login.";
                        
						TSession::setValue('login', $Login->login);
						
						return $resultado;
                    } else {
                        $resultado["erro"] = 1;
                        $resultado["resp"] = "danger";
                        $resultado["texto"] = "Ops! Ocorreu um erro interno. Contacte o administrador.";
                    }
                } else {
                    $resultado["erro"] = 1;
                    $resultado["resp"] = "danger";
                    $resultado["texto"] = "Usuário e Senha incorretos. Tente novamente!";
                }
                TTransaction::close();
                return $resultado;
            } catch (Exception $e){
                TTransaction::log($e->getMessage());
                TTransaction::rollback();
                $resultado["erro"] = 1;
                $resultado["resp"] = "danger";
                $resultado["texto"] = "Ops! Ocorreu um erro interno. Contacte o administrador.";
                return $resultado;
            }
        }
    }
?>
