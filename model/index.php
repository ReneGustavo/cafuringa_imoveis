<?php
function __autoload($classe)
{
	   $pastas = array('app.ado', 'app.control');
	   foreach ($pastas as $pasta)
	   {
		      if (file_exists("{$pasta}/{$classe}.class.php"))
        		{
		
			         include_once "{$pasta}/{$classe}.class.php";
		      }
	   }
}


class TApplication
{
	   static public function run()
	   {
		      if ($_GET)
		      {
			         $class = $_GET['class'];
			         if (class_exists($class))
			         {
				            $pagina = new $class;
				            $retorno = $pagina->show();
				            echo json_encode($retorno);
			         }
		      }
	   }
}
TApplication::run();
?>

