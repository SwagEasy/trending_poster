// Generated by CoffeeScript 1.6.3
var RankView, Ranking, ShopItem, getRankingsFromUrl;

ShopItem = Backbone.Model.extend({
  defaults: {
    name: "Some Item",
    img: "/default.png",
    description: "This is the default item.",
    rank: 0
  }
});

Ranking = Backbone.Collection.extend({
  model: ShopItem,
  comparator: 'rank'
});

RankView = Backbone.View.extend({
  initialize: function() {
    this.collection.bind('add', this.render, this);
    return this.render();
  },
  render: function() {
    var renderedShopItems, template;
    renderedShopItems = this.collection.map(function(shopItem) {
      return _.template($('#ranking-item').html(), {
        shopItem: shopItem
      });
    });
    template = _.template($("#ranking-list").html(), {
      shopItems: renderedShopItems
    });
    return this.$el.html(template);
  }
});

getRankingsFromUrl = function(url) {
  var i, result, results, _i, _len;
  results = [
    {
      name: "Dildo",
      img: "http://upload.wikimedia.org/wikipedia/commons/9/93/Dildos_o_Consoladores_Nena.jpg",
      description: "A dildo is a sex toy, often explicitly phallic in appearance, intended for bodily penetration during masturbation or sex with partners."
    }, {
      name: "Potato",
      img: "http://upload.wikimedia.org/wikipedia/commons/4/4c/Potato_heart_mutation.jpg",
      description: "Potatoes are delicious, particularly if you are Irish"
    }, {
      name: "Egg",
      img: "http://upload.wikimedia.org/wikipedia/commons/4/4c/Potato_heart_mutation.jpg",
      description: "Eggs are slightly less delicious than potatoes"
    }
  ];
  for (i = _i = 0, _len = results.length; _i < _len; i = ++_i) {
    result = results[i];
    result.ranking = i;
  }
  return results.map(function(result) {
    return new ShopItem(result);
  });
};

$(function() {
  var rankings;
  rankings = ['free', 'paid', 'grossing'];
  return rankings.map(function(type) {
    var data, paidView;
    data = new Ranking(getRankingsFromUrl("" + type + ".json"));
    return paidView = new RankView({
      el: $("#" + type),
      collection: data
    });
  });
});
