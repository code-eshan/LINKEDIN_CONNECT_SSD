# LINKEDIN_CONNECT

LinkedIn Connect is a web application which gets the authorization (OAuth 2.0) from your LinkedIn Account, and uses its resources and communicates with it.

## Features

- ✨ View Full Name ✨
- ✨ View Email ✨
- ✨ View Profile ID ✨
- ✨ View Profile Picture ✨
- ✨ Publish A Post with a URL in LinkedIn ✨
- ✨ Like A Post in LinkedIn ✨
- ✨ Comment on a Post in LinkedIn ✨

## Pre-requisites Before Testing

> Make sure you have installed XAMPP Server in your local machine. If you haven't done it so, visit ```https://www.apachefriends.org/index.html```, and download it.

> Make sure your machine has php installed, and is accessible through Command Prompt. Check this by passing the command
> 
> ```php -version``` on the Command Prompt.

> If your machine doesn't have Composer, Download & Install Composer by visiting ```https://getcomposer.org/Composer-Setup.exe``` in your local machine.

### Configuring PHP Back-End

Step One : Clone this project as a zip file, and extract it.

Step Two : Go into the folder named php-backend, there you will see a folder called ```linkedin```.

Step Three : Copy the ```linkedin``` folder.

Step Four : Locate XAMPP Server's root directory, and you will find a folder called ```htdocs```. Paste the copied folder inside ```htdocs``` folder.

Step Five : Open the copied ```linkedin``` folder in ```htdocs```, and open a Command Prompt in that directory. Then run
```sh
composer require guzzlehttp/guzzle
```

Step Six : Run the XAMPP Apache Server, and make sure it runs on ```PORT 80 , 443```.


## How to Test ?

Visit the below URL and click Sign In With LinkedIn.
```sh
https://linkedin-connect.herokuapp.com/
```

Provide your user credentials and allow the LinkedIn Connect App's Permissions.

Then you'll be redirected to another webpage, where you can find the information related to your account.

> NOTE : IN-ORDER FOR THE BELOW FEATURES (SECTION 1, SECTION 2, SECTION 3) TO WORK, YOU MUST HAVE SUCCESSFULLY CONFIGURED THE THINGS REQUIRED IN THE PRE-REQUISITES SECTION ABOVE.

### SECTION 1 : Publishing a Post in LinkedIn

Give any URL with the Share Title and the Text and click ```SHARE IT !```.

You can see a new tab opened with your logged in LinkedIn Account. Check your profile and the Post will has been posted !

### SECTION 2 : Liking A Post in LinkedIn

Copy any of the Post's URL from your LinkedIn Account by clicking the three dots on top right hand side corner, and selecting ```Copy Link to Post```,
and paste it here in the URL field and hit ```LIKE IT !```.

You can see a new tab opened with the post you have selected to like, has been liked.


### SECTION 3 : Commenting A Post in LinkedIn

Copy any of the Post's URL from your LinkedIn Account by clicking the three dots on top right hand side corner, and selecting ```Copy Link to Post```,
and paste it here in the URL field, along with a comment, and hit ```COMMENT IT !```.

You can see a new tab opened with the post you have selected to comment, has been commented.



