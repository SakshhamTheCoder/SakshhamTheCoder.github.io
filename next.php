<?php
$dscid = $_POST['dscid'];
$dscdsm = $_POST['dscdsm'];
$email = $_POST['email'];

?>

<html>
    <head>
        <title>Thanks</title>
</head>
<body background-color="rgb(204, 255, 204)">
<h1>Thank you for submitting your details, <?php echo $dscid ?></h1>
<br>
<h3>Your details:</h3>
<div class="tab">
    <h4> <?php echo $dscid;echo $dscdsm ?></h4>
    <h4>Your user id will be your email i.e. <b><?php echo $email;?></b></h4>
</div>
<script>
    if $email.value === ""{
        $email.value == "NOT GIVEN"
    }
</script>
<style>
    body{
        background-color: darkkhaki;
    }
    .tab {
        text-indent:40px;
        }

</style>
</html>
    <!-- "" ,$fname ," ", $lname, "<br>"; -->
    <!-- "Your email address is: " ,$email, "<br>"; -->
