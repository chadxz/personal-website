---
permalink: index.html
---

# Hey

I'm Chad and this is my site.

## Posts

<ul>
{% for post in collections.posts %}
<li>
    <a href="{{ post.url }}">
        <time>{{ post.date | formatDate }}</time> - {{ post.data.title }}
    </a>
</li>
{% endfor %}
</ul>
