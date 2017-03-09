{% assign counter=0 %}
{% assign cat_counter=0 %}
{% assign cat_size = site.data.faqs.size | divided_by:2 %}

  <div class="row">
    <div class="col-xs-12 col-sm-6">

      {% for category in site.data.faqs limit:cat_size %}
        {% include faqs.html %}
      {% endfor %}

    </div>
    <div class="col-xs-12 col-sm-6">

      {% for category in site.data.faqs limit:cat_size offset:cat_size %}
        {% include faqs.html %}
      {% endfor %}

    </div>
  </div>

<p>Didn't find your answer? Just <a href="/contact">contact us</a>.</p>
