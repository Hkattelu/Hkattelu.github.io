---
layout: post
title: "Lessons in leadership: My last year and a half at Google"
date: 2020-03-13 00:58:00 -0500
categories: blog Personal
tags: [Personal]
---

For the last year and a half I've been working on the Cloud Logging Front end team in GCP at Google. The time I spend programming is mostly client side code using Angular/TypeScript. I also write middleware in Java between the client and the back end.

Google is definitely a place to find challenging work. I've encountered a lot of very difficult front end problems in my short time here. I don't just mean that in a coding complexity sense, but also in a user experience and accessibility/internationalization sense. In college I always thought that the hard part of the job was writing the code, but that isn't true at all - __especially__ in the front end development.

The best way for me to sum up what I've learned about software development and leadership at Google is by me running through the roadmap of what it takes to launch a user-facing feature. Some of these things may be easier at other software companies, but some of them are probably also harder.

In the interest of not giving away what I do at work - I'll use an example of a personal project I made - the [Messenger bulk archiver](https://github.com/Hkattelu/Messenger-Bulk-Archiver). This project is just a chrome extension that goes through your chats on messenger and then archives them all for you automatically. It was fairly easy for me to develop using a little bit of javascript and a little bit of money to buy a license to sell software on the chrome store.

If I worked at Facebook, I might try and make a little button at the top of the screen that says "Archive all" which just archives the chats properly using the messenger back end. Here is a vastly oversimplified map of what I might have to do:

1. Speak to Product Managers to determine if this something customers want. Obtain consensus to experiment with this feature.
2. Work with UX to design some experimental mocks
3. Conduct User research with users on the mocks
4. Analyze research data to determine if this would help users, and how it might affect user happiness or some other metrics
5. If results are good, run the feature by legal to determine if archiving people's chats in one button doesn't breach any laws since the button involves marking the user's chats non-manually
6. Consult Facebook security teams to determine if the button might allow users to become victim to some potentially harmful attack
7. Begin an engineering design and obtain approval for engineering stakeholders - this at least includes some messenger back end teams and your front end team.
8. Implement the feature and guard it by flag so that it can be rolled out incrementally
9. Roll out the feature to some set of users and then perform some analysis to determine how users are impact with or without the feature
10. If the feature does well, roll out to all users
11. Put measures in place to make sure that the feature is always online and that engineers are notified if it breaks, so that it can be rolled back immediately

Taking a look at this list - it actually looks like implementing the feature is the easiest part of the map.  Among these 11 steps, a Front end engineer would likely be a part of __at least__ 7 of the above steps - if not all of them. 

It follows that half of the job of a Front end engineer is to know how to get people to work together and create consensus. The stakeholders might be Product managers who want to push new features or Back end engineers who want to do less work. Having smart and opinionated co-workers who are good at arguing makes it even harder if they disagree with you.

Two core skills that are important to get anything actually done for users are being able to talk in "corp-speak", and being able to set up effective meetings.

Corp-speak is the way of talking at work in a way that gets things done, without directly assigning blame or doing anything that might cause unwarranted harm to any party. This entails speaking in a way that makes you sound confident so that people can trust you. It entails not calling out your coworkers for mistakes or miscommunications. But most importantly, it entails making it clear who needs to do what, and who is responsible for what.

There are a lot of subtleties with corp speak because no one actually will ever sit down and teach you it. It's something you have to learn on your own. If you're perceptive, you can pick up on how people do their corp-speak.

On my team, instead of ever saying the phrase "I don't know", I say "I don't have context" and then redirect the person asking me a question to someone else. This is a great example because the former makes someone lose confident in you and it doesn't produce an actionable outcome. The latter gives someone else a path to move forward, without making them lose confidence in you.

A couple of other examples of corp speak are to ask "Are you familiar with X?" instead of "Do you know X?", and saying "Can we have X done by friday?" instead of "Get this done by friday?".

The other skill is being able to organize effective meetings. On paper this is actually really straightforward. Don't let conversations get derailed, only invite people who need to be there, have an agenda. It's all standard stuff, but I see people screw it up a lot.

A mistake would be to think that a meeting is "more important" or "more effective" if there are more important people, but that's not true. Plenty of ineffective meetings happen even with upper management, since they're all spread so thin. Only bring in people who are focused on the task you are organizing the meeting for.

Also make sure that meetings stay on topic. Agendas help people stay on track and be more deliberate with there time. Don't assume that agendas will fix problems themselves. Expect to be vocal and have to consistently direct focus on the task at hand, since lots of people means lots of ways to derail the conversation.

Those are the really important things I learned at work over the last year or so. The stuff that's really core is the non-coding parts.




