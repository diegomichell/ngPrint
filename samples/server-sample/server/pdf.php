<?php
	$post = file_get_contents("php://input");

	if($post)
	{
		$data = (array) json_decode($post);

		$title = $data['title'];
		$content = $data['content'];

		if(file_put_contents('temp/'.$title.'.html', $content))
		{
			echo $title;
		}
		else
		{
			echo "No se pudo crear el archivo";
		}

	}

 ?>
