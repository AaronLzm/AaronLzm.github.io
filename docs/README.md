---
home: true
layout: Blog
icon: house
title: Blog Home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: Zhimou "Aaron" Li's blog
tagline: <span id="typed"></span>
heroFullScreen: true
projects:
  - icon: folder-open
    name: project name
    desc: project detailed description
    link: https://your.project.link

  - icon: link
    name: link name
    desc: link detailed description
    link: https://link.address

  - icon: book
    name: book name
    desc: Detailed description of the book
    link: https://link.to.your.book

  - icon: newspaper
    name: article name
    desc: Detailed description of the article
    link: https://link.to.your.article

  - icon: user-group
    name: friend name
    desc: Detailed description of friend
    link: https://link.to.your.friend

  - icon: https://theme-hope-assets.vuejs.press/logo.svg
    name: custom item
    desc: Detailed description of this custom item
    link: https://link.to.your.friend

footer: <p><a href="mailto:lzm_aaron@outlook.com">Mind to drop me a mail?</a></p>
---
<script setup>
import { onMounted } from "vue";
import Typed from "typed.js"

onMounted(() => {
  new Typed('#typed', {
    strings: ["EX NIHILO NIHIL FIT", "Out of <b>nothing</b>, nothing comes."],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 2000,
    loop: true,
    showCursor: true
  });
});

</script>

Game is never over, we are not checkmated yet.
