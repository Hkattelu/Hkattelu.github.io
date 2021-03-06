---
layout: post
title:  "The Hungarian Algorithm"
date:   2016-01-07 02:54:00 -0500
categories: blog programming
tags: [Programming]
---

Here I'll talk about the other side project I worked on and	
the lesson it taught me. This is one that I thought
would be easy but turned out to be hard.

This is an algorithm I learned about last semester in my deterministic
models class. It is a quick way to solve an assignment problem, which is
a problem where you assign m workers to n jobs in order to minimize a cost
or maximize a profit. This is not be confused with the quadratic assignment problem,
which is NP-hard.

You can read more about it here: 
<a href=" http://www.math.harvard.edu/archive/20_spring_05/handouts/assignment_overheads.pdf">Harvard slides</a>

If you've ever used the hungarian algorithm before, you'll know that
it is actually pretty straightforward to do on paper. However, there are
some things that are a lot easier to do on paper than they are to do on a 
computer.

The two steps in particular I am talking about are the "covering" step and the 
"selection" step.

<h3>The Covering Step</h3>

In this step we are given an m x n matrix with some random numbers in it,
some of which are zeroes. Our goal is to cover this matrix with horizontal
or vertical lines such that we cover all zeroes with the minimum number of
lines. 

This is easy to do on paper, but on a computer, how would we do this? 
At first I tried to find an easy way to do this, such as drawing a vertical
and horizontal line at every zero, and then removing unnecessary lines. It
turns out this ruins the next step, so I wasn't able to do this. After spending
a lot of time on thinking how to select which lines to draw, I just decided to
draw a line in the direction with the most zeroes. Originally this didn't work, but
I made a few tweaks and somehow it managed to pass the tests I put in place.

<h3>The Selection Step</h3>

In this step we are given an m x n matrix with some random numbers in it, 
some of which are zeroes. What we must do here is select certain zeroes
from the matrix such that each row and each column has exactly one selected
zero. If we have more rows than columns or vice versa, then certain rows
or columns will not have a zero.

At first I thought I could just go through the rows and select the 0 in
the first column that wasn't already used. This works in some cases, but
not all. In the end, I decided I would have to brute force it (O(N^2) at worst).
I ended up looking around and found out a cool way to recursively go through a matrix.

{% highlight java %}
//Call this with empty arrays for selection and filledRows. Also use row = 0.
public static boolean hungarianSelect(
  int[][] pivotedMatrix, int[][] selection, int[] filledRows, int row) {
  
  if (row == pivotedMatrix.length)
    return true; // When we reach the bottom of the matrix, we are done.
       
	for(int i = 0; i < pivotedMatrix[row].length; i++){
	  if(pivotedMatrix[row][i] == 0 && filledRows[i] == 0){
	    selection[row][i] = 1;
			filledRows[i] = 1; // If we run into a zero, select it
			if(hungarianSelect(pivotedMatrix,selection,filledRows,row+1))
			  return true;
			selection[row][i] = 0; // If that zero didn't work, reset and continue to the next zero
			filledRows[i] = 0;
		}
	}
	   
	return false;
}
{% endhighlight %}

With this, I was able to brute force select zeroes from my matrix which allowed me to 
finish up the algorithm successfully.

<h3> What I learned </h3>

The Hungarian algorithm is fairly useful. Although I don't see myself using it in
the foreseeable future, I can see some ways it might be used. The lessons to learn here
are that, once again, you should always create a test suite for your projects. It was
extremely helpful for this project, as I was always jumping between steps trying to fix
new problems that kept on popping up. 

Another lesson is that you should not be afraid to look through the internet for help about certain things. Here I did it to figure out a way to brute force through a matrix for the selection step. Yet another lesson would be that you should not be afraid to make helper methods and helper classes. In this particular problem it helped me break down the steps which were complicated on their own. But by breaking them into smaller steps, it became much more manageable. 

Be persistent in finding solutions. I spent alot of time trying to implement methods for the steps, and then realizing there was a special case that I was forgetting about. It was frustrating that I had to keep on rewriting the methods, but every time I rewrote the method I learned more about the problem so
in the end it was worth it.
