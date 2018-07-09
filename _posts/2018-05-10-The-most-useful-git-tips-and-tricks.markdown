---
layout: post
title:  "My most useful git tips and tricks"
date:   2018-05-10 00:58:00 -0500
categories: blog Other
tags: [Other]
---

Most people see git as a nuisance when they first learn about it in school.
There are a lot of commands to learn. Fetch, clone, push, commit, add, reset,
stash, and so on. What I did when I first started is just learned the bare
minimum of the commands I needed to know. Clone to download the repo,
add to add changes, commit to persist changes, and push to push changes to
the repository on github. It became a cycle -

(1) git add .

(2) git commit -m "Brief commit message"

and occasionally,

(3) git pull

After all, for most projects (especially solo ones) that's all you need.
The truth is each one of these has caused me a lot of problems before.
In this post i'm going to outline the problem and then put a better solution
to use for each one. Trust me, it'll save you a lot of time and headache
if you follow this post.

<h3>git add .</h3>

The problem with this command is that it adds every change to your list of
staged changes. Isn't that what you always want anyway? Not always. When it
comes to group work this single command can waste hours of time if one person
accidentally pushes a set of cached files or IDE settings. For example, if
I push my eclipse settings which link to JRE8 and my coworker who pulls it
has JRE9, it will break their program. It'll also take a while for them to find
the error because the commit message will say something like "Added this 
feature to this module", but it's neither the module nor the feature that
caused him the error in reality. The only giveaway that it's a setting will
be that the code works on your computer but not theirs.

How can we get around this? You might think to just add the settings folders
to your .gitignore but even then you might stage accidental changes. The only
good way to do this is to take your time to manually add the files you want
to add. *git status* will tell you a list of unstaged changes and you can
just go through them and add them individually. This may seem like a lot of
work, but if you are commiting in proper increments you should only be adding
a few files at once.

<h3>git commit -m </h3>

This one seems like a really good command at first. You get to input a 
brief but descriptive commit message, commit all the changes you staged, and
do it easily in one command. The problem is that the commit message that
git automatically generates for you is probably better. It includes all
the files that were changed (for debugging) and all you have to do is get
rid of the '#'s to uncomment them

You can combine this one with the add in the last one using a command
thats in the more updated versions of git called *git commit -p*. This great
command actually automatically loops through every file change and asks if
you want to add and commit it or not. If you master it and the shortcut,
you can add and commit every file change in seconds, and without making the
mistakes I mentioned earlier.

<h3>git pull</h3>

The problem with git pull when you work in a team is that it usually will
try to do a merge and then force you to resolve conflicts yourself. 99% of the
time what you really would like it to do is pull their changes and then 
put your changes on top of them (usually will avoid merge conflicts) and
is what you want. You can accomplish this by using git fetch to pull the changes
on the remote branches. Then, you can git rebase to move your changes on top
of their branch, avoid marge problems and keeping your tree clean of MERGE
commit messages. This will also make is so you don't accidentally resolve
the merge conflicts incorrectly and introduce more problems.

There you have it. A few new git commands that will help you improve your
productivity in development. If you thought any of this was helpful, or if
you know any better commands, please feel free to shoot me an e-mail or message. 
