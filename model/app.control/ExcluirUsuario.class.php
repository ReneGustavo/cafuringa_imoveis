<?php
    class ExcluirUsuario {
		private $id;
        private $conn;

        public function __construct() {
            TTransaction::open('conecta');
            TTransaction::setLogger(new TLoggerTXT('ExcluirUsuario.txt'));
            if(isset($_POST['id'])){
                $this->conn = TTransaction::get();
                $this->id = $this->conn->quote($_POST['id']);
            }
        }

        public function show() {
            try {
                $sql = "DELETE FROM usuarios WHERE id=$this->id";
                TTransaction::log($sql);
                $result = $this->conn->Query($sql);
                
                TTransaction::close();
                return 1;
            } catch (Exception $e){
                TTransaction::log($e->getMessage());
                TTransaction::rollback();
				
                return 0;
            }
        }
    }
?>
