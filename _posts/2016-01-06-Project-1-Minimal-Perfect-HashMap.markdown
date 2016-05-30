---
layout: post
title:  "The Minimal Perfect HashMap"
date:   2016-01-06 02:54:00 -0500
categories: jekyll update
---

So over these past couple of weeks I've been working on two
side projects that I thought were interesting so that I wouldn't
forget some of the computer science I learned over the last semester.
Both of the projects were actually much more challenging than I 
originally thought they were, and doing them both taught me
a few lessons about coding do's and don'ts. I'll go over one of
them here.

While browsing the internet I came across an article about O(1) Hash map lookups by using a method called Minimal perfect hashing. You can read about it here:

<a href="http://blog.demofox.org/2015/12/14/o1-data-lookups-with-minimal-perfect-hashing/"> DemoFox's Blog</a>

In short, this is a method that removes collisions entirely from HashMaps which allows for consistent O(1) lookups. The downside is that it requires more memory. 

When I started working on this, I originally thought it was basically
just a chained hash map with linear probing, and the "salt" values were basically
just the location offsets from inside the map. It turns out this does not
really work or make sense, and I ran into some problems when implementing.
After I looked into it more, it turned out to be a lot more complicated than I
thought it was. Essentially, the salt values are a lot more like nonce values.
Instead of hashing a key once to find the hashmap position, you actually have to hash
a second time with the salt value to find the hashmap position if there was a collision.

{% highlight java %}
private int saltHash(Object key, int salt){
    	return salt ^ key.hashCode();
    }
// XORing the hashed key with the salt value creates a decent second hash function
{% endhighlight %}

Another thing about the minimal hash map is that it is not meant to be used
in the same way as a regular hash map. In the regular hash map, you can put and
remove elements freely as well as overwrite certain elements if you put in two elements
with the same key.

The minimal hash map however, is meant to be used as a data structure where you
put everything in, calculate the hash function, and then access elements. Once you
calculate the hash function you are not able to add in more elements and you cannot
remove or overwrite elements either. 

Its use is somewhat specific, you need to have
a set of data that you know will not change, and you must only want to access from that
data, and not want to change it in any way. An example of this would be if you were
managing a school database. You could create a map of student IDs to student Names, which
would then allow you to instantaneously get a students name just from knowing their ID, and
not having to manually search through a whole database.

<h3> What I learned </h3>

Overall I think that the Minimal Hashmap is a useful data structure even though the
use case is somewhat specific. The lesson I learned here is that when you try to make
something, you sure assure yourself that you really know what you are trying to make. Do this
by looking through multiple sources, and maybe even trying specific use examples and see if it
works. Also, creating test suites is very useful for these scenarios. I originally implemented
the whole thing wrong, but because I created a test suite I was able to test my program
quickly, and identify the problems properly when I was refactoring.


