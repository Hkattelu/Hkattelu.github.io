---
layout: post
title:  "File Compression Part 1"
date:   2016-05-27 00:58:00 -0500
categories: blog programming
tags: [Programming]
---

I have recently started working on my own file compressor titled 'himanZip'. While working,
I've had to do a lot of research including reading articles, watching videos, and studying
protocols. File compression can be really interesting so I've decided to write some blog posts
detailing what I've learned.

Firstly, there are two types of compression:

**Lossy Compression:** Takes file A and compresses it into a smaller file B. However,
decompressing B back to A will result in a loss of quality. This is because some quality is removed
in order to compress A to B.

**Lossless Compression:** Takes file A and compresses it into smaller file B. Decompression
from B back to A does not result in any quality loss. The compression only removes redundant information.

To illustrate the quality loss of lossy compression, here is an example: Suppose you are trying
to compress an image file of someone's face. We know that most faces are generally symmetric,
so to compress we simply save one half of the person's face, and to decompress we copy that half over to
fully recreate the face again. However, you will lose a lot of the fine detail of the face this way because
faces are not actually symmetric.

I will be focusing only on lossless compression because it is inherently more valuable. One simple
form of lossless compression is run-length encoding.

<h3>Run-length Encoding</h3>

Run-length Encoding is a very simple form of compression that makes a lot of assumptions about the format
of a file, but is nonetheless useful for illustrating the concept of compression. Suppose we have a simple text
file:

{% highlight java %}

Hiiiiiiiiiiiiiiiiiii Weeeeeeeeeeeeeeeeeeoooooooooooooooooooooowwwwwwwwwwwww.

{% endhighlight %}

Notice that there are huge stretches of the same type of characters (i,e,o,w). We can take advantage of
this and represent these another way. Instead of writing out the huge stretch, we can replace the i's
by (# of i's)(i). We can do this for each character stretch to compress. The compressed text file would
look like this:

{% highlight java %}

H19i W18e22o13w.

{% endhighlight %}

After compression, the total character length dropped from 76 to 16! To decompress, everytime we run into a
number we just have to copy the following character that many times. Note that this may not work if you actually
have numbers in your text file, or if there aren't a lot of huge streches in the text, although there are ways to
get around this.

That's all for now, in the next post I will talk about Lempel-Ziv(1977) encoding, and Huffman encoding.


