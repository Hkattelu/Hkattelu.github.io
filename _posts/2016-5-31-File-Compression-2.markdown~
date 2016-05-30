---
layout: post
title:  "File Compression Part 2"
date:   2016-05-31 03:46:00 -0500
categories: jekyll update
---

Here I continue to talk about methods used to compress files. The two discussed here
are the Lempel-Ziv (1977) method and Huffman encoding. Both of these (or variants) are
used widely in modern file compressors such as WinRar and 7zip. The file compressor
I'm working on uses Huffman encoding in particular.

<h3>Lempel-Ziv Method</h3>

The Lempel-ziv method takes advantage of the fact that in a file, it is very likely
that certain strings of text will be repeated. Suppose we have this sentence:

{% highlight java %}

This is a sentence. Here's another sentence.

{% endhighlight %}

Notice that certain strings such as "sentence". We can take advantage of this by using what
is called a distance-length pair. A distance length pair takes the form <d,l>. The d is
the number of characters you have to go back and the l is the number of characters to copy.
To compress the file, we would start reading it and then once we reach the second "sentence.",
we replace it with a distance-length pair as follows.

{% highlight java %}

This is a sentence. Here's another <25,9>

{% endhighlight %}

Let's say that a character is 1 byte long and a distance-length pair is 2 bytes long.
We've just decreased the file length from 44 to 37. Not much, but the compression ratio increases
dramatically as file size increases (>100 bytes). To decompress, we would start writing until we've
reached the pair, then we copy over what we wrote 25 bytes ago for 9 bytes. This restores the
file to the original state. 

Although the idea is simple, my example is oversimplified and it turns out that
this method can get complicated fast. How do we remember strings to create pairs 
for later? How do we represent our distance-length pair? How does the decompressor
know when it has hit a distance-length pair? Nonetheless, this method is very useful
when you have it all figured out.

<h3>Huffman Encoding</h3>

Huffman encoding takes advantage of the fact that certain characters or strings appear
more often than others, and it allows you to represent the frequent characters with fewer
bits than the rare characters. The process of Huffman encoding involves creating a
Huffman tree which is daunting at first, but extremely useful. Suppose we have this sentence:

{% highlight java %}

She seems silly

{% endhighlight %}

The first step to compression is to build a table mapping each character with the number of
times it appears. This can be done in O(n) time.

| Char | Frequency | Char | Frequency |
| :--: | :-------: | :--: | :-------: |
| s | 4 | i | 1 |
| h | 1 | l | 2 |
| e | 3 | y | 1 |
| m | 1 | space | 2 |
{:.mtablestyle}

Now that we have this table , we can generate a huffman tree by doing the following (O(nlogn)):

1. Create leaf nodes for each character-frequency pair and insert them into a priority queue (least frequency"
2. Pop 2 elements from the queue, create a new node and set its children to the two popped elements.
3. Set the frequency of the new node to the sum of the frequencies of its children and then insert it into the queue.
4. If there is more than one element in the queue, go back to step 2.
5. You are done, the last element in the queue is the root of the tree.

We should now have a binary tree containing each pair as a leaf node. Using this tree,
we can obtain the encodings by the path from the root to each leaf. A left represents '0 and
a right represents '1'. Here are the encodings for this example.

| Char | Frequency | Char | Frequency |
| :--: | :-------: | :--: | :-------: |
| s | 11 | i | 0011 |
| h | 0000 | l | 100 |
| e | 01 | y | 0001 |
| m | 0010 | space | 101 |
{:.mtablestyle}

Finally, we can compress the sentence with this mapping to the following:

{% highlight %}

110000011011101010010111011100111001000001

{% endhighlight %}

Note that in the originaly sentence, each character would have been represented by
one byte for a total of 15 bytes or 120 bits. The compressed file was written in bits
in only 42 bits! If the decompressor does not know the tree, you would also have to 
encode the tree into the file. In this example it could be done in 80 bits, bumping
the file size to 122 bits. However, the tree size will stay small as the file size,
meaning this method is more effective as file size increases. 

To decompress, we simply read bit by bit and traverse the huffman tree. If we read a 
0 we go left and if we read a 1 we go right. When we hit a leaf node, we just write down
the character in that leaf node. 

To conclude, the lempel-ziv method is most useful when certain strings repeat in the file.
The huffman method works best when certain characters appear very frequently. Both methods
work well for large files, and both are widely used in file compressors.




