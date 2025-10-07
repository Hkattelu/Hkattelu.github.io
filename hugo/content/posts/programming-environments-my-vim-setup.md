---
title: "How important is coding fast?"
date: 2018-07-08 00:58:00 -0500
draft: false
tags: ["Programming"]
categories: ["blog", "Programming"]
slug: "programming-environments-my-vim-setup"
aliases: ["/2018/07/08/Programming-Environments-my-vim-setup.html", "/2018/07/08/Programming-Environments-my-vim-setup/"]
---

Every once in a while I find myself in a conversation with a friend about
typing. Sometimes they talk about their typing speeds, sometimes about the
text editors they use, and sometimes even the keyboards they use. As
someone who has to type code for a living, I decided to see what I could
do to optimize my programming before I start my new job. I already knew
that increasing my actually typing speed with practice wasn't going to
help too much. The best thing to do was to learn a new text editor with a
lot of shortcuts and tricks to make things easier. I wasn't going to bother
buying a fancy new keyboard because that would cost too much time to learn,
and possibly a lot of money. Then I started to think - what is typing
*really* and what's the best thing I can do.

<h2>Logging machines</h2>

Typing is, first and foremost, just a method of logging down your thoughts.
Handwriting and typing have the same purpose, but typing just makes your
thoughts easier to spread and process because it produces digital logs. 
What we're interested in isn't necessarily typing fast - we care more about
logging fast. To generalize, think of editors as just a type of logging
machine - a tool that takes inputs (keystrokes) and outputs logs.

Logging machines don't have to be editors like Microsoft word, Emacs,
or notepad. A pen and paper are a logging machines with handstrokes as
inputs. A camera is a logging machine with a visible light input.
Even the copy/paste tool is a logging machine that takes highlightable 
text as input. It happens to be that some machines are better
than others at logging down certain thoughts - it would take me a very
long time to log the contents of a 300-page book to another book with
notepad, but I could do it really fast with a printing press. A nice
thing about logging machines is that you can build one thats tailored
to the thoughts you want to log. It (mostly) does not matter what the
thought is.

It follows that in theory, a machine can only ever log as fast as you 
can think. Keeping that bottleneck in mind, the theoretical optimal editor
doesn't just let you type inputs as fast as you can think - it also 
interrupts your thinking the least. Additionally, the optimal editor should
not take any time to learn and should be completely intuitive. Basically,
we want to come as close as possible to a machine that literally hooks up
to your brain and puts your thoughts down. While that's probably never
going to happen, it is interesting to think about all of the properties
of logging machines to better compare them.

<h2>Things to consider</h2>

* Input Complexity - An editor with a lot of inputs is going to not just
require a lot of learning time, but it might also interrupt your thinking
while typing. For example, notepad has few inputs - just the letters on
the keyboard plus a little more. Vim on the otherhand uses a lot of keys
you wouldn't normally use like ESC and CTRL, and basically has a different
function for every combination of keystrokes imaginable. We would like 
to minimize the number of inputs as much as possible.
* Input tools - It should be easy to input into a logging machine. It
takes a lot of time to use a mouse (think of the last time you used a 
visual keyboard on your PC), so we want to minimize the time we spend
switching between mouse and keyboard.
* Generality - If i'm writing a document, my editor needs to be versatile
enough to handle and maybe input images. The ability to handle images
will require additional input complexity, but it will greatly add to 
logging power.
* Similarity to known machines - It's generally a lot easier to learn
an editor that is similar something you already know. For example, you
should be able to pick up Google docs pretty fast if you already know
Microsoft word.

<h2>My final choice(s): Vim and Sublime</h2>

I think that because different editors are better at doing different
things, its natural that I select two different editors for the two
different kinds of programming I do.

For java, python, and scala programming I use vim.
Despite the fact that it's complex, it allows you do things all on
the keyboard. No more clicking around to navigate and open files.
Vim is also great because it's customizable, so I can easily add
shortcuts from other editors that I like - such as the ability to
move lines up and down. Also, vim runs in a terminal which is very
convenient for any sort of writing on a mac or linux. For anyone
interested, by .vimrc is here..

{{< highlight java >}}
colorscheme slate
syntax enable "Enable syntax highlighting"
set tabstop=2 "Tabs are displayed as 2 spaces"
set softtabstop=2 "Tab actually enters 2 spaces"
set expandtab
set number "Display line numbers"
set wildmenu "Tab completion for files and commands"
set lazyredraw "Update display only when necessary"
set showmatch
set hlsearch "Highlight all matches when ? or / searching"
nnoremap J 0v$yddp
nnoremap K k0v$yddpk
nnoremap <leader><space> :nohlsearch<CR>
{{< /highlight >}}

For HTML, CSS, and Javascript I like to use sublime. The convenient
thing about sublime is that my mouse is already going to be moving
around because I'm testing out website front ends, so I don't feel
slowed down by using it, and I get the benefits of it like easy
copy/pasting. Sublime also has a great plugin for HTML writing 
called emmet which allows me to create tabs insanely fast without
ever having to type a '<','>', or '/'.

I highly recommend both vim and sublime for productivity. Even though
I probably wasted more time researching and learning editors than
I will save, I recommend everyone to go out and try to learn something
new. You might find something new you like. 
