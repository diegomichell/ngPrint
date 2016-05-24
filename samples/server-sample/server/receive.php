<?php
	require __DIR__ . '/vendor/autoload.php';
	use mikehaertl\wkhtmlto\Pdf;

	$pdf = new Pdf();

	// $pdf->binary = 'path/wkhtmltopdf';

	$title = $_GET['title'];

	$content = file_get_contents('temp/'.$title.'.html');

	$pdf->addPage('<html>'.$content.'</html>');

	if (!$pdf->send($title.'.pdf')) {
	    echo $pdf->getError();
	}

 ?>
