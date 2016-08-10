---
layout: post
title:  "New website and Javascript"
date:   2016-05-20 01:59:00 -0500
categories: blog web
tags: [Web]
---

After another long and hard semester, I have found myself
with nothing to do. So, I decided to teach myself some more javascript
to revamp my website into one with more personality. I wanted to create a
site which served only to show off my projects, and show them off well.
This new site would need color, animations, and pictures, all three of which
my current site is lacking.

I decided to use javascript as the tool to make my new website look nice because
it gives you more control over HTML elements than jQuery does. Also, javascript
is an important skill to have in the world of web development, so it was
time I learned it.

After about 5 hours of coming up with ideas, searching through W3Schools, and 
typing up new files, I created a (somewhat) functional prototype. However, I
ended up hitting a roadblock which stopped me from turning my website vision into
a reality. Ironically, the problem I encountered could've been avoided if I had
just used a framework such as jQuery. Nonetheless, I did learn a lot and decided to
write a blog post about the animation and styling abilities of javascript.

<h3> Styling </h3>

Anyone who has ever made a website knows that all HTML elements have 'style' attributes
that can be modified through CSS. These style elements include all sorts of 
things from height and width to padding and borders to position coordinates. Through
javascript, you can access and modify those style elements to edit the look of an 
HTML element. Specifically, you can write a function that gets called when an event occurs
(such as a button click).

{% highlight javascript %}

function makeRed(elementID){

  var object = document.getElementById(elementID);
  var originalColor = object.style.color;
  console.log("Original Color: " + originalColor);

  object.style.color = "red";
  console.log("New Color: Red");

}

{% endhighlight %}

This is an example javascript function that can take an HTML element by its ID
and turn it to the color red. The object is obtained by the .getElementByID() method.
Then, the color field in the style can be set to red. To tie this function to the click
of a button, you would set the onClick field of the button to "makeRed(elementID);".
Functions like these can be written to change almost all existing attributes of an element.

<h3> Animation </h3>

This is what makes your website fancy. An animation can't be created by simply
changing attributes with javascript functions normally. However, you can create
animations by using an object's transformation and transition properties. The transform
property can be changed like any other style element, except it takes in a function
instead of a value. The function specifies what change will happen to the object.

{% highlight javascript %}

var order = ['home','skills','projects'];
var currIndex = 0;
var currSize = order.length;

function switchUp(){

  var object = document.getElementById(order[currIndex]);
  var height = object.clientHeight;

  object.style.transition = "transform 1s linear 0s"
  object.style.transform = "translate(0px," + height + "px)";

  currIndex = (currIndex + 1) % currSize;

  var newObject  = document.getElementById(order[currIndex]);

  object.style.transition = "transform 1s linear 0s"
  object.style.transform = "translate(0px," + height + "px)";

}

{% endhighlight %}

This is a snippet from my prototype where I shift an entire section
up and replace it with a new one from below. Here, the switchUp function is called
whenever the user clicks on the up arrow. If the user is on the home section, it will
shift the home up and the skills section will come from below to replace it.

In order to acheive this effect, I first obtain the height of the section. Then,
I set the transition property to "transform 1s linear 0s". This means, when the object 
has to transform, the transformation will take 1 second and the animation will occur in
linear time. There will also be a 0 second delay before the transform starts. Then, I 
actually change the transform property to "translate(0px, height px)". This translates
the section up by height pixels. Finally, I translate the skills section from below up
by that same height.

The transform property can also be used to scale up an object or rotate it along any axis.

<h3> What I learned </h3>

I learned to take HTML elements and transform them to create animations which add
flavor and aesthetic to a website. Any element can be edited, so you could have anything from
sliding colors to opening doors if you use the javascript properly. 

Additionally, I learned that you can use any website to teach you web development. You can view
any website's source files by simply right clicking and selecting "view page source". By doing this,
you can learn how most websites create their animations by looking into the associated javascript
and css files. By doing this, you can rapidly learn new things to add to your websites, and also
fix existing mistakes within your own site. 

Despite the fact that I will probably be going to be at 4:30AM tonight, and that I don't have
a real finished product, I am glad that I've learned some useful javascript skills.

 
