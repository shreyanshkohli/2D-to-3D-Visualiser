<?php
if (isset($_POST['submit'])) {
  $targetDir = "uploads/";
  $targetFile = $targetDir . basename($_FILES['pdfFile']['name']);
  $uploadOk = 1;
  $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // Check if file is a PDF
  if ($fileType != "pdf") {
    echo '<div class="container mt-4"><div class="alert alert-danger" role="alert">Only PDF files are allowed.</div></div>';
    $uploadOk = 0;
  }

  // Check if file already exists
  if (file_exists($targetFile)) {
    echo '<div class="container mt-4"><div class="alert alert-danger" role="alert">File already exists.</div></div>';
    $uploadOk = 0;
  }

  // Check file size
  if ($_FILES['pdfFile']['size'] > 5242880) { // 5MB
    echo '<div class="container mt-4"><div class="alert alert-danger" role="alert">File size exceeds the limit.</div></div>';
    $uploadOk = 0;
  }

  // Upload the file
  if ($uploadOk == 0) {
    echo '<div class="container mt-4"><div class="alert alert-danger" role="alert">File could not be uploaded.</div></div>';
  } else {
    if (move_uploaded_file($_FILES['pdfFile']['tmp_name'], $targetFile)) {
      echo '<div class="container mt-4"><div class="alert alert-success" role="alert">File uploaded successfully.</div></div>';

      // Display the uploaded PDF file
      echo '<div class="container mt-4"><embed src="' . $targetFile . '" type="application/pdf" width="100%" height="600px" /></div>';
    } else {
      echo '<div class="container mt-4"><div class="alert alert-danger" role="alert">Error uploading the file.</div></div>';
    }
  }
}
?>
