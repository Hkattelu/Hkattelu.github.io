---
layout: post
title:  "Transfer Protocols"
date:   2016-09-04 02:03:00 -0100
categories: blog Other
tags: [Web]
---

In a world where the internet is becoming an increasingly 
integral part of our lives, the need for secure information 
transfer is greater than ever. On the web, information is 
transferred mainly through two protocols -- HTTP (HyperText 
Transfer Protocol) and HTTPS (Secure). You have 
definitely seen both of these in your browser URL box, but 
what do they actually mean and how do they work? To answer 
those questions, we have to go into detail.

<h4>Transfer Protocols</h4>

The concept of a transfer protocol is simple. How can the 
client and server transfer information securely. By secure,
I mean that transfer must ideally:

* Not be able to be intercepted
* Only be understood by the proper parties
* Not require prior contact between the parties

You can see secure transfers outside of the internet in 
many places. For example, the US postal service mails items
in trucks so that other people can't just steal your mail. 
Additionally, the only thing that the mailer's must know 
about eachother is their addresses. They don't have to 
agree on a envelope size, color, or even the postal service 
to use.

This isn't anything new, Julius Caesar also used to send out 
letters to his allies. However, they didn't have armored 
trucks back then, so he settled for a very primitive form of 
encryption known today as the Caesar cipher. Basically, he 
would "encrypt" his messages by shifting the letters of the 
alphabet a certain number of times. This way, even if an 
attacker intercepted the letter,they wouldn't be able to 
decrypt it and understand it. Sounds good right? Almost. The 
only problem with this is that Caesar would have to 
communicate the number of times to shift the alphabet to his 
allies **before** the letter is sent out. It sucks for 
Caesar, but this isn't a problem in the modern day. HTTP and 
HTTPS are vastly more advanced, but at the core they follow 
the exact same concepts.

<h4>HTTP</h4>

HTTP is a protocol that specifies the format of the HTTP
request, which allows for information to be sent between client
and server. HTTP requests are typically sent over port 80, but
can be done over any port. 

The format is as follows:

1. "HTTP://"
2. The url of the host domain (EX: www.hkattelu.github.io)
3. The path to the resource (EX: /blog)
4. Query string to search (EX: ?date=9.02.16)

This tells the server to return the resource at the path /blog
that fulfills the query string's requirement. If there is no
resource or query string, the server will typically return
the index.html file to client. The query string can also specify
a POST or DELETE request which is meant to edit the resources of
the server.

HTTP provides a solid interface for fast client-server interaction, but
there is a problem. It is entirely possible for a middle man to
intercept the requests and edit them for their own purposes. This can
lead to bad things if the request contained sensitive information
such as passwords, credit card information, or even a social security
number. The attacker could also edit the request to attack the information
of the server with a POST or DELETE request.

<h4>HTTPS</h4>

HTTPS is almost identical to HTTP from the user's perspective, but
there is much more going on that is abstracted from the user. There
are only three perceived differences are that the URL contains an "HTTPS"
instead of "HTTP", that the request usually takes longer to process, and
that the HTTPS URLS use port 443 instead of port 80 by default.
Under the hood, HTTPS is a very secure transfer that makes it nearly
impossible for an attacker to target a connection. The process is as 
follows:

1. The client and server agree on an encryption algorithm and SSL (Secure Socket Layer) version
2. The server sends a certificate to a trusted 3rd party to identify itself and obtain a certificate public key
3. The client uses its public key to encrypt the message and sends it to the server
4. The server uses its private key to decrypt the message and understand it
5. Both client and server now know eachothers keys and can send further messages securely

This is somewhat oversimplified, so I'll explain more. 

In the first step, the SSL is an interface that allow for encrypted communications through sockets. It is
the link that messages will go through.

The second step is essentially a verification step. The server must send a certificate to a 3rd party
to verify that it is legit. The certificate will usually include the details of the website like domain name,
and the business registry info. It also includes a digital signature which truly verifies it. For example,
you can claim to be chase bank to steal credit card information, but you cannot verify yourself without the
digital signature. After the verification, the public key is obtained

In the following steps, there is an exchange of "keys". Basically, a public key is the key that you share with others
and you use it to encrypt data. The private key is the one you keep to yourself to decrypt incoming messages.
The benefit of this two key system is that even if a middle man intercepts your messages, he
cannot decrypt them or make any sense of them without the private key (which is never shared). This 
allows for a secure communication between only the client and server.

Keep in mind that although this HTTPS is vastly more secure, it comes at the cost of time. In most
cases the time for the transactions to occur is negligible, but it is still worth mentioning.

Those are the basics of internet transfer protocols. I hoped this post helped you learn something new
or clarify any existing problems.