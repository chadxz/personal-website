---
permalink: index.html
---

# Hey

I'm Chad and this is my site.

## Posts

<ul>
{% for post in collections.posts | reverse %}
<li>
    <a href="{{ post.url }}">
        <time>{{ post.date | formatDate('yyyy-MM-dd') }}</time> - {{ post.data.title }}
    </a>
</li>
{% endfor %}
</ul>
